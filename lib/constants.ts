export const PRODUCT_CATEGORIES = ["gaming-pcs", "gaming-laptops", "mobile-phones", "accessories"] as const
export const PRODUCT_CATEGORY_LABELS: Record<string, string> = {
  "gaming-pcs": "Gaming PCs",
  "gaming-laptops": "Gaming Laptops",
  "mobile-phones": "Mobile Phones",
  accessories: "Accessories",
}
export const ORDER_STATUSES = ["pending", "confirmed", "processing", "ready", "completed", "cancelled"] as const
export const REQUEST_STATUSES = ["submitted", "reviewing", "quoted", "in-progress", "completed", "rejected"] as const
export const DEVICE_TYPES = ["Gaming PC", "Gaming Laptop", "Mobile Phone"] as const
export const BUY_BACK_TYPES = ["Gaming PC", "Gaming Laptop", "Desktop PC", "Mobile Phone", "Graphics Card", "Gaming Console", "PC Component"] as const
