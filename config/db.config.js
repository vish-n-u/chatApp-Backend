import dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.mongo_URI;

export default DB_URL;
