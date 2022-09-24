const axios = require("axios");
const generateOtp = function () {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

async function sendOtp(email, otp) {
  console.log(email);
  console.log(otp);
  const res = await axios.post(`http://localhost:8085/v1/send/otp`, {
    email: email,
    otp: otp,
  });
  console.log(res.data);
  if (res.status == 200) {
    return res.data["response_code"];
  } else {
    console.log(`response with status ${res.status}`);
    return 500;
  }
}

module.exports = { generateOtp, sendOtp };
