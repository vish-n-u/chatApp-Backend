import chatModel from "../model/chat.model.js";
const Chat = chatModel;

export const validateAddOrRemoveUserV = async (req, res, next) => {
  try {
    const isValidGroupChat = await validateGroupChatIdV(req.body.groupChatId);
    if (!isValidGroupChat) {
      return res.status(400).send({
        message: "Invalid group chat id",
      });
    } else {
      req.groupChat = isValidGroupChat;

      if (
        req.body.updateUser &&
        req.body.updateUser.toString() === req.user._id.toString()
      )
        next();
      else {
        console.log("00000", req.user._id, req.body.updateUser, req.body);
        if (
          isAdmin(req.user, isValidGroupChat) ||
          req.body.updateUser.toString() === req.user._id.toString()
        ) {
          next();
        } else {
          return res.status(401).send({
            message:
              "You are not authorized to perform this action ,since not an Admin",
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export async function validateGroupChatIdV(groupChatId) {
  try {
    const groupChat = await Chat.findById(groupChatId);
    if (!groupChat) {
      return false;
    }
    return groupChat;
  } catch (err) {
    console.log(err);
    return "err";
  }
}

function isAdmin(userObj, groupChat) {
  if (groupChat.admin.toString() == userObj._id.toString()) {
    return true;
  }
  return false;
}
