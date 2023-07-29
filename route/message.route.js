import {
  createMessageC,
  fetchAllMessageC,
} from "../controller/message.controller.js";
import {
  validateCreateMessageV,
  validateFetchAllChatV,
} from "../validation/message.validation.js";
import { validateJwtV } from "../validation/user.validation.js";

export default function messageRoute(app) {
  console.log("called");
  app.post(
    "/chatApp/api/v1/messages",
    [validateJwtV, validateCreateMessageV],
    createMessageC
  );
  app.get(
    "/chatApp/api/v1/messages/:chatId",
    [validateJwtV, validateFetchAllChatV],
    fetchAllMessageC
  );
}
