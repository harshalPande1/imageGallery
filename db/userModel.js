const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    emailId : {type : String , unique: true, trim: true, lowercase: true, required: [true, "email required"] },
    password : {type : String  , required: [true, "password required"]},
});

const usermodel = new mongoose.model('users',userSchema)

module.exports = usermodel