const Chat = require("../model/chat.model");
const User = require("../model/user.model");
const Message = require("../model/message.model");

exports.accessChat = async (req, res) => {
  try {
    const chat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: req.body.userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
    // console.log(chat, "reached access chat", req.user._id, chat);

    const isChat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "username email pic",
    });
    // console.log(isChat, "chat", chat);
    if (isChat.length == 0) {
      const newChat = await Chat.create({
        name: "sender",
        isGroupChat: false,
        users: [req.user._id, req.body.userId],
      });
      const fullChat = await Chat.findOne({ _id: newChat._id }).populate(
        "users",
        "-password"
      );
      // console.log(newChat);
      return res.status(200).send({ message: "Chat created", fullChat });
    } else {
      return res.send(chat);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

exports.getAllChat = async (req, res) => {
  try {
    const userChat = await Chat.find({
      users: { _id: req.user._id },
    })
      .populate("users", "-password")
      .populate("latestMessage");
    const pathSpecified = await User.populate(userChat, {
      path: "latestMessage.sender",
      select: "username email pic",
    });
    // console.log(userChat, "------", pathSpecified);
    return res.status(200).send({ userChat, pathSpecified });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.createGroupChat = async (req, res) => {
  try {
    const groupchatObj = {
      name: req.body.name,
      isGroupChat: true,
      users: req.body.users,
      admin: req.user._id,
    };
    console.log(groupchatObj);
    const newGroupChat = await Chat.create(groupchatObj);
    const returnData = await newGroupChat.populate("users", "-password");
    // console.log(newGroupChat, returnData, "}}}");
    return res.status(201).send({ newGroupChat, returnData });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.updateGroupChatName = async (req, res) => {
  try {
    // console.log(req.body);
    const groupChat = await Chat.findByIdAndUpdate(
      req.body.groupChatId,
      {
        name: req.body.name,
      },
      { new: true }
    ).populate("users", "-password");
    // console.log("groupChat", groupChat);
    return res.status(200).send({ message: groupChat });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error: ");
  }
};

exports.removeUser = async (req, res) => {
  try {
    // console.log("$$$$", req.groupChat.users, req.groupChat.users.length);
    for (let x = 0; x < req.groupChat.users.length; x++) {
      // console.log(
      // "//===",
      // req.groupChat.users[x].toString() === req.body.removeUserId,
      // req.body.removeUserId,
      // req.groupChat.users[x].toString()
      // );
      if (req.groupChat.users[x]._id.toString() === req.body.updateUser) {
        console.log("deleteing an item");
        req.groupChat.users.splice(x, 1);
        break;
      }
    }
    const updatedgroupChat = await req.groupChat.save();
    // console.log("updatedgroupChat==", updatedgroupChat);
    const returnUpdatedGroupChat = await updatedgroupChat.populate(
      "users",
      "-password"
    );

    return res.status(200).send({ message: returnUpdatedGroupChat });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.removeMultipleUser = async (req, res) => {
  try {
    // console.log("$$$$", req.groupChat.users, req.groupChat.users.length);
    for (let x = 0; x < req.groupChat.users.length; x++) {
      if (
        req.body.updateUser.toString() == req.groupChat.users[x]._id.toString()
      ) {
        console.log("deleteing an item");
        req.groupChat.users.splice(x, 1);
      }
    }
    const updatedgroupChat = await req.groupChat.save();
    // console.log("updatedgroupChat==", updatedgroupChat);
    const returnUpdatedGroupChat = await updatedgroupChat.populate(
      "users",
      "-password"
    );
    // console.log("returnUpdatedGroupChat==", returnUpdatedGroupChat);

    return res.status(200).send({ message: returnUpdatedGroupChat });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.addUser = async function (req, res) {
  try {
    await req.groupChat.users.push(req.body.updateUser);

    const returnUpdatedGroupChat = await req.groupChat.save();
    const returnData = await returnUpdatedGroupChat.populate(
      "users",
      "-password"
    );
    return res.status(200).send({ message: returnData });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};
