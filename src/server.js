const express = require('express');
const connect = require("./config/db");

const app = express();
app.use(express.json());

//lets import the authController
const { signup, signin } = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");

//for authentication we need two middleware
app.post("/signup", signup);
app.post("/signin", signin);

app.use("/users",userController)

//Connect function>>
const start = async () => {
    await connect();

    app.listen(6789, () => {
        console.log("Listening on port 6789");
    });
}

module.exports = start;