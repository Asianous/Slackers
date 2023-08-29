const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender: { type: String, ref: "User" },
    content: { type: String, trim: true },
    recipients: [{ type: String, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);
