const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "is required"],
    unique: [true, "Phone already in use"],
  },
  name: {
    type: String,
  },
  wallet:{
    type:Number,
    default:5000
  },
  number:{
    type:String,
  },
  profile_completion: {
    type: Number,
    default: 0,
  },
  purchases: {
    type: Array,
    default: [],
  },
  created: {
    type: Array,
    default: [],
  },
  api_key: {
    type: String,
  },
  api_secret: {
    type: String,
  },
  creation_ip: {
    type: String,
  },
  profile:{
    type:String,
    default:"https://i.pinimg.com/736x/f0/ce/2b/f0ce2bb845800dbf95f57fe928166d83.jpg"
  }
});

module.exports = mongoose.model("Users", user);
