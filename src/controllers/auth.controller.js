//const express = require('express');
//const router = express.Router();
//module.exports = router;
const User = require("../models/user.model")
const jwt = require('jsonwebtoken');
require("dotenv").config();

const newToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY)
};
const signup = async (req, res) => {
    try {
        const user = await User.create(req.body);
        //let token = "Demo Token";
        const token = newToken(user);
        return res.status(201).json({ data: {token} });
    } catch (e){
        return res.status(500).json({ status: "failed", message: "Something went wrong" });
    }
}

const signin = async (req, res) => {
    //let token = "Demo Token";
    //we will try to find the user with the email that comes in
    let user;
    try {
         user = await User.findOne({ email: req.body.email }).exec();
         console.log('user:', user) //this is printing>>

        if (!user) return res.status(401).json({
            status: 'Failed',
            message: "Your Email and Password is not correct"
        })
    } catch (e) {
        return res.status(500).json({
            status: "Failed",
            message: "Something Went Wrong"
        });
    }
    //2 we will try to match the password stored in the 
    //letmatch;
    try {
      const match = await user.checkPassword(req.body.password);
        console.log('match:', match)

        if (!match)
          return res.status(401).json({
            status: "Failed",
            message: "Your Email and Password is not correct for signup",
          });
    } catch (e) {
        return res.status(500).json({
          status: "Failed",
          message: "Something Went Wrong",
        });
    }
    //if this is correct then>>
    //3 create a new token for user and return 
    const token = newToken(user);
    return res.status(201).json({ data: { token } });

};

module.exports = {
    signup,
    signin,
};