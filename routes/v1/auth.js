const redis = require("./../../services/redis");

const express = require("express");
var router = express.Router();

const { loginValidator,emailOtpValidator,schemaOneValidation } = require("./middleware/validators");

const {createUserIfNotExist,validateUserExist,setProfileCompletion} = require('./middleware/user');
const { validateOTP, createOtp } = require("./middleware/otp");
const { createToken,validateToken } = require("./middleware/token");


router.post("/login", loginValidator,createUserIfNotExist,createOtp, async (req, res) => {
  res.status(200).json({response_code:200,message:"Otp sent to your mail",response:null})
});



router.post("/otp/verify",emailOtpValidator,validateUserExist,validateOTP,createToken, (req, res) => {
  res.status(200).json({"response_code":200,"message":"Login successful","response":{"token":req.token,"user_id":req.temp_user._id ,"completion":req.temp_user.profile_completion}})
});

router.post('/profile/step-one/',validateToken,schemaOneValidation,setProfileCompletion,(req,res)=>{
  res.status(200).json({"response_code":200,"message":"Updated profile successfully","response":null})
})

module.exports = router;
