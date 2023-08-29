const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socketSchema = new Schema(
  {
    socketId: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Socket", socketSchema);
