import { model, models, Schema } from "mongoose"

const OrderSchema = new Schema({
  orderNumber: { type: String, unique: true, index: true }, userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  items: [{ productId: { type: Schema.Types.ObjectId, ref: "Product" }, name: String, slug: String, image: String, price: Number, quantity: Number }],
  subtotal: { type: Number, required: true }, status: { type: String, default: "pending", index: true },
  shipping: { fullName: String, phone: String, address: String, city: String, notes: String },
}, { timestamps: true })
OrderSchema.pre("validate", function () { if (!this.orderNumber) this.orderNumber = `ADG-${Date.now().toString(36).toUpperCase()}` })
export const Order = models.Order || model("Order", OrderSchema)
