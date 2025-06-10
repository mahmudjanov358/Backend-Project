const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
async function connectToDB() {
  try {
    await connect(process.env.MONGO_URL);
    console.log("MongoDb is connected");
  } catch (error) {
    console.log("MongoDB connected failed:", error.message);
  }
}
connectToDB();

// Routers
const { user } = require("./routers/userRouter");
app.use("/user", user);
const { product } = require("./routers/productRouter");
app.use("/product", product);

// Server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
