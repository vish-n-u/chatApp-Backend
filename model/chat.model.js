const mongoose = require("mongoose");

const ChatModel = mongoose.Schema(
  {
    name: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
    ],
    latestMessage: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Message",
    },
    admin: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatModel);
