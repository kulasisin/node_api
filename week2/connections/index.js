const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const productionDB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

const DB =
  process.env.NODE_ENV === "production"
    ? productionDB
    : process.env.DATABASE_LOCAL;

mongoose.connect(DB).then(() => console.log("資料庫連接成功"));
