
const Ajv = require("ajv")
const ajv = new Ajv()

// Validate email for login
const schemaLogin = {
  type: "object",
  properties: {
    email: { type: "string", maxLength: 50, minLength: 4 },
  },
  required: ["email"],
  additionalProperties: false,
}
const validateEmail = ajv.compile(schemaLogin)
function loginValidator(req, res, next) {
  const valid = validateEmail(req.body) && emailValidator(req.body.email)
  if (!valid) {
    return res.status(200).json({ "response_code": 400, "message":"data validation error", "response" : null })
  } else {
    next();
  }
}


// Validate email and otp for validate-ootp endpoint
const schemaEmailOtp = {
  type: "object",
  properties: {
    email: { type: "string", maxLength: 50, minLength: 4 },
    otp: {type:"string" }
  },
  required: ["email", "otp"],
  additionalProperties: false,
}
const validateEmailOtp= ajv.compile(schemaEmailOtp)
function emailOtpValidator(req, res, next) {
  const valid = validateEmailOtp(req.body) && emailValidator(req.body.email)
  if (!valid) {
    return res.status(200).json({ "response_code": 400, "message": "Data validation error", "response" : null })
  } else {
    next();
  }
}




function emailValidator(email){
    return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
}

module.exports = {
  loginValidator,
  emailOtpValidator
};