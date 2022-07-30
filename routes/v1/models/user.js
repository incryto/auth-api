const mongoose = require('mongoose');


const user = new mongoose.Schema({
    email:{
        type:String,
        required: [true, 'is required'],
        unique: [true, 'Phone already in use'],
    },
    name:{
        type:String,
    },
    profile_completion:{
        type:Number,
        default:0
    },
    
    api_key:{
        type:String
    },
    api_secret:{
        type:String
    },
    creation_ip:{
        type:String
    }
})

module.exports = mongoose.model('Users',user)