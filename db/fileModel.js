const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    fileName :  String,
    mimetype :  String,
    downloadCode :  String,
    url :  String,
    user : {type : mongoose.Schema.Types.ObjectId , ref : "users"}
},{timestamps : true});

const fileModel = new mongoose.model('file',fileSchema)

module.exports = fileModel