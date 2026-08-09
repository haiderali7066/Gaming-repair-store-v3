"use server"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { slugify } from "@/lib/helpers"
import { Product } from "@/models/Product"
import { Order } from "@/models/Order"
import { RepairRequest } from "@/models/RepairRequest"
import { BuyBackRequest } from "@/models/BuyBackRequest"

async function guard() {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized: admin access required. Please sign in with an admin account.")
  }
  await connectToDatabase()
}

function revalidateAll(slug?: string) {
  revalidatePath("/")
  revalidatePath("/shop")
  revalidatePath("/admin/products")
  if (slug) revalidatePath(`/shop/${slug}`)
}

export async function saveProduct(formData: FormData) {
  await guard()
  const id = String(formData.get("id") || "")
  const name = String(formData.get("name") || "").trim()
  if (!name) return { ok: false, error: "Product name is required." }

  // Parse key-value specifications from form entries like spec_key_0, spec_val_0
  const specifications: Record<string, string> = {}
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("spec_key_")) {
      const index = key.replace("spec_key_", "")
      const val = String(formData.get(`spec_val_${index}`) || "").trim()
      const k = String(value).trim()
      if (k && val) specifications[k] = val
    }
  }

  const slug = slugify(name)
  const data = {
    name,
    slug,
    category: String(formData.get("category")),
    brand: String(formData.get("brand") || "").trim(),
    price: Math.max(0, Number(formData.get("price"))),
    stock: Math.max(0, Number(formData.get("stock"))),
    image: String(formData.get("image") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
    specifications,
  }

  if (!data.brand) return { ok: false, error: "Brand is required." }
  if (!data.image) return { ok: false, error: "Image URL is required." }
  if (!data.description) return { ok: false, error: "Description is required." }

  try {
    if (id) {
      // Preserve slug if name changed to something with the same slug
      const existing = await Product.findById(id).select("slug").lean()
      const finalSlug = existing ? (slugify(name) === slugify((existing as { slug: string }).slug) ? (existing as { slug: string }).slug : slug) : slug
      await Product.findByIdAndUpdate(id, { ...data, slug: finalSlug })
      revalidateAll(finalSlug)
    } else {
      // Check slug uniqueness
      const conflict = await Product.findOne({ slug }).lean()
      const finalSlug = conflict ? `${slug}-${Date.now()}` : slug
      await Product.create({ ...data, slug: finalSlug })
      revalidateAll(finalSlug)
    }
  } catch (err) {
    console.error("[v0] saveProduct error:", err)
    return { ok: false, error: "Failed to save product. Please try again." }
  }

  return { ok: true }
}

export async function deleteProduct(formData: FormData) {
  await guard()
  const id = String(formData.get("id") || "")
  if (!id) return { ok: false, error: "Missing product id." }
  try {
    const product = await Product.findById(id).select("slug").lean() as { slug: string } | null
    await Product.findByIdAndDelete(id)
    revalidateAll(product?.slug)
  } catch (err) {
    console.error("[v0] deleteProduct error:", err)
    return { ok: false, error: "Failed to delete product." }
  }
  return { ok: true }
}

export async function updateStatus(formData: FormData) {
  await guard()
  const kind = String(formData.get("kind"))
  const id = String(formData.get("id"))
  const status = String(formData.get("status"))
  const Model =
    kind === "order" ? Order : kind === "repair" ? RepairRequest : BuyBackRequest
  await Model.findByIdAndUpdate(id, { status })
  revalidatePath(`/admin/${kind === "order" ? "orders" : kind === "repair" ? "repairs" : "buy-back"}`)
  revalidatePath(`/admin/${kind === "order" ? "orders" : kind === "repair" ? "repairs" : "buy-back"}/${id}`)
}

export async function setBuybackOffer(formData: FormData) {
  await guard()
  const id = String(formData.get("id") || "")
  if (!id) return { ok: false, error: "Missing request id." }
  const offeredPrice = Math.max(0, Number(formData.get("offeredPrice")))
  if (!Number.isFinite(offeredPrice) || offeredPrice <= 0) {
    return { ok: false, error: "Enter a valid offer amount." }
  }
  try {
    // Quoting an offer also moves the request to "quoted" so its status
    // reflects that the customer now has a price to review.
    await BuyBackRequest.findByIdAndUpdate(id, { offeredPrice, status: "quoted" })
  } catch (err) {
    console.error("[v0] setBuybackOffer error:", err)
    return { ok: false, error: "Failed to save offer. Please try again." }
  }
  revalidatePath("/admin/buy-back")
  revalidatePath(`/admin/buy-back/${id}`)
  return { ok: true }
}

export async function updateStock(formData: FormData) {
  await guard()
  const id = String(formData.get("id"))
  const stock = Math.max(0, Number(formData.get("stock")))
  const product = await Product.findByIdAndUpdate(id, { stock }, { new: true }).select("slug").lean() as { slug: string } | null
  revalidatePath("/admin/inventory")
  revalidatePath("/shop")
  if (product?.slug) revalidatePath(`/shop/${product.slug}`)
}
