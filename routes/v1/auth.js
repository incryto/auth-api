const redis = require("./../../services/redis");

const express = require("express");
var router = express.Router();

const { loginValidator,emailOtpValidator } = require("./middleware/validators");

const {createUserIfNotExist,validateUserExist} = require('./middleware/user');
const { validateOTP, createOtp } = require("./middleware/otp");
const { createToken } = require("./middleware/token");


router.post("/login", loginValidator,createUserIfNotExist,createOtp, async (req, res) => {
  res.status(200).json({response_code:200,message:"Otp sent to your mail",response:null})
});



router.post("/otp/verify",emailOtpValidator,validateUserExist,validateOTP,createToken, (req, res) => {
  res.status(200).json({"response_code":200,"message":"Login successful","response":{"token":req.token}})
});

module.exports = router;
