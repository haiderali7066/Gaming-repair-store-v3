import { model, models, Schema } from "mongoose"
const BuyBackSchema = new Schema({ userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }, deviceType: String, brand: String, model: String, specifications: String, condition: String, description: String, image: String, expectedPrice: Number, offeredPrice: Number, status: { type: String, default: "submitted", index: true }, adminNotes: String }, { timestamps: true })
export const BuyBackRequest = models.BuyBackRequest || model("BuyBackRequest", BuyBackSchema)
