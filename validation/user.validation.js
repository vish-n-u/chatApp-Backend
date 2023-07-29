import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import jwtSecretKey from "../config/jwt.config.js";
const User = userModel;
export const registrationV = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) next();
  else {
    return res.status(400).send({ message: "email already exists" });
  }
};

export const validateJwtV = async function (req, res, next) {
  console.log("jwt---SK", jwtSecretKey, req.headers);
  try {
    const token = req.headers.authorization;

    const verifyJwt = jwt.verify(token, jwtSecretKey);

    const decodeJwt = jwt.decode(token, jwtSecretKey);

    const user = await User.findOne({ email: decodeJwt.email });
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "internal server err" });
  }
};
