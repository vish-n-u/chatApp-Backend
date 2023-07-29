const mongoose = require("mongoose");

const MessageModel = mongoose.Schema(
  {
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true, trim: true },
    chatId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Chat",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageModel);