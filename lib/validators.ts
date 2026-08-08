import { z } from "zod"
import { BUY_BACK_TYPES, DEVICE_TYPES, PRODUCT_CATEGORIES } from "@/lib/constants"

export const loginSchema = z.object({ email: z.email().transform((v) => v.toLowerCase()), password: z.string().min(8) })
export const registerSchema = loginSchema.extend({ name: z.string().min(2).max(80), phone: z.string().min(7).max(20) })
export const productSchema = z.object({
  name: z.string().min(2), slug: z.string().min(2), category: z.enum(PRODUCT_CATEGORIES), brand: z.string().min(2),
  price: z.coerce.number().positive(), description: z.string().min(10), image: z.url(), stock: z.coerce.number().int().min(0),
  featured: z.boolean().default(false), published: z.boolean().default(true), specifications: z.record(z.string(), z.string()).default({}),
})
export const repairSchema = z.object({ deviceType: z.enum(DEVICE_TYPES), brand: z.string().min(2), model: z.string().min(1), problem: z.string().min(10), contact: z.string().min(7), image: z.url().optional().or(z.literal("")) })
export const buyBackSchema = z.object({ deviceType: z.enum(BUY_BACK_TYPES), brand: z.string().min(2), model: z.string().min(1), specifications: z.string().min(5), condition: z.string().min(2), description: z.string().min(10), expectedPrice: z.coerce.number().positive(), image: z.url().optional().or(z.literal("")) })
export const checkoutSchema = z.object({ fullName: z.string().min(2), phone: z.string().min(7), address: z.string().min(10), city: z.string().min(2), notes: z.string().max(500).optional(), items: z.array(z.object({ productId: z.string(), quantity: z.number().int().positive() })).min(1) })
