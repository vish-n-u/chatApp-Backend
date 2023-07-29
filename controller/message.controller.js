const Message = require("../model/message.model");
const User = require("../model/user.model");

exports.createMessage = async (req, res) => {
  const messageObj = {
    sender: req.user._id,
    content: req.body.content,
    chatId: req.body.chatId,
  };
  // console.log(messageObj, req.body.chatId, req.body);
  try {
    let message = await Message.create(messageObj);

    message = await message.populate("sender", "-password");
    message = await message.populate("chatId");
    message = await User.populate(message, {
      path: "chatId.users",
      select: "username pic email",
    });

    return res.status(200).send({ message });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err });
  }
};

exports.fetchAllMessage = async (req, res) => {
  try {
    let messages = await Message.find({ chatId: req.params.chatId })
      .populate("sender", "username pic email")
      .populate("chatId");

    // messages = await messages.populate("chatId");
    //   messages = await User.populate(messages,{
    //     "path":
    //   })
    return res.status(200).send({ messages });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
