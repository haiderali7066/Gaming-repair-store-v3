"use server"

import { auth } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { User } from "@/models/User"

export async function updateProfileAction(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: "Not authenticated" }
    }

    await connectToDatabase()

    const name = formData.get("name")?.toString()?.trim()
    const phone = formData.get("phone")?.toString()?.trim()
    const address = formData.get("address")?.toString()?.trim()

    if (!name) {
      return { error: "Name is required" }
    }

    if (name.length < 2) {
      return { error: "Name must be at least 2 characters" }
    }

    if (phone && phone.length < 5) {
      return { error: "Phone number is not valid" }
    }

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        name,
        phone: phone || undefined,
        address: address || undefined,
      },
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      return { error: "User not found" }
    }

    return { success: true, message: "Profile updated successfully" }
  } catch (error) {
    console.error("[v0] Profile update error:", error)
    return { error: "Failed to update profile. Please try again." }
  }
}
