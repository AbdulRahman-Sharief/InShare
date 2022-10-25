const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./db/connect");

const cors = require("cors");
// Cors
// const corsOptions = {
//   origin: process.env.ALLOWED_CLIENTS.split(","),
//   // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
// };

// Default configuration looks like
// {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }

app.use(cors());

const PORT = process.env.PORT || 3000;
const app = require("./app");

const server = async () => {
  try {
    const DB = process.env.DATABASE.replace(
      "<password>",
      process.env.DATABASE_PASSWORD
    );
    connectDB(DB);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
server();
