import {
  registrationC,
  loginC,
  getUserC,
} from "../controller/user.controller.js";
import { registrationV, validateJwtV } from "../validation/user.validation.js";

export function userRoute(app) {
  app.post("/chatApp/api/v1/users/register", [registrationV], registrationC);
  app.post("/chatApp/api/v1/users/login", loginC);
  app.get("/chatApp/api/v1/users", [validateJwtV], getUserC);
}
