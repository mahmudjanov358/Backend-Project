const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  name: { type: String, trim: true, default: "" },
  lastName: { type: String, trim: true, default: "" },
  phone: { type: String },
  email: { type: String },
  address: { type: String, default: "" },
  photo: { type: String },
});

const User = model("User", userSchema);
module.exports = { User };
