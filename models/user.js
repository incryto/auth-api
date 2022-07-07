const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    "email":{
        type:String,
        required: [true, 'is required'],
        unique: [true, 'Phone already in use'],
    },
    "name":{
        type:String,
    },
})