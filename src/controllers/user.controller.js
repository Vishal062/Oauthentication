const express = require("express");
const router = express.Router();
//get the user here
const User = require("../models/user.model")

//import protect
const protect = require("../middleware/protect")

//fetch the users
router.get("/", protect, async (req, res) => {
  console.log("req user", await req.user);
  const users = await User.find({}).select("-password").lean().exec();
  //here if you use select('-password') then never send password at browser>
  return res.status(200).json({ data: users });
})
module.exports = router;