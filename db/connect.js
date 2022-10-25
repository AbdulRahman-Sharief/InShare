require("dotenv").config();
const mongoose = require("mongoose");
// function connectDB(DB) {
//   // Database connection 🥳
//   mongoose.connect(DB, {
//     useNewUrlParser: true,
//     // useCreateIndex: true,
//     useUnifiedTopology: true,
//     // useFindAndModify: true,
//   });
//   const connection = mongoose.connection;
//   connection.once("open", () => {
//     console.log("Database connected 🥳🥳🥳🥳");
//   });
// }

// mIAY0a6u1ByJsWWZ

const connectDB = function (DB) {
  return mongoose.connect(
    DB,
    {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    },
    () => {
      console.log(
        `connected to DATABASE ((${DB.split("/")[3]})) Successfully 🥳🥳`
      );
    }
  );
};

module.exports = connectDB;
