import mongoose from "mongoose";

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

export default mongoose.model("Message", MessageModel);
