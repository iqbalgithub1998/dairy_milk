const router = require("express").Router();

const Order = require("../models/order");

router.post("/add", async (req, res) => {
  const {
    customerId,
    customerName,
    milkQuantityInLitres,
    shippingAddress,
    pricePerLitre,
    paymentMethod,
    deliveryDate,
  } = req.body;

  if (
    !customerId ||
    !customerName ||
    !milkQuantityInLitres ||
    !shippingAddress ||
    !pricePerLitre ||
    !paymentMethod ||
    !deliveryDate
  ) {
    return res.status(404).json({ error: "missing data" });
  }

  const newOrder = new Order({
    customerId,
    customerName,
    milkQuantityInLitres,
    shippingAddress,
    pricePerLitre,
    paymentMethod,
    deliveryDate,
    orderStatus: "placed",
  });

  try {
    const savedOrder = await newOrder.save();
    return res.status(200).json(savedOrder);
  } catch (error) {
    return res.status(400).json({ error: "server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updateOrder);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put("/updateStatus/:id", async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: req.body.orderStatus,
      },
      { new: true }
    );
    return res.status(200).json(updateOrder);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Order has been deleted." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
