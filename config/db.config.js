require("dotenv").config();

const DB_URL = process.env.mongo_URI;

module.exports = DB_URL;
