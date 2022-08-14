const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    milkQuantityInLitres: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    pricePerLitre: { type: Number },
    paymentMethod: { type: String, required: true },
    deliveryDate: { type: String, required: true },
    orderStatus: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
