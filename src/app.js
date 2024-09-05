require("dotenv").config({ path: ".env"});
const express = require("express");
require("./database/database")
const userRouter = require("../src/routes/user");
const usersSetRouter = require("../src/routes/usersSet");

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/usersSet", usersSetRouter);

app.listen(process.env.PORT, () => { console.log(`Server listening at port ${process.env.PORT}`)})

module.export = app;

