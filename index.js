const express = require("express");
const cors = require("cors");
const router = require("./app/router/route");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`);
});
