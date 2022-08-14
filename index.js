const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
connectDB();

app.use(express.json());
app.use("/order", require("./routes/Order"));

app.get("/", (req, res) => {
  res.send("This is Dairy milk distributor api.");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
