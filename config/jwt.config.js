import dotenv from "dotenv";
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

export default jwtSecretKey;
