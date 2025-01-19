const mongoose = require("mongoose");

const wordSoupSchema = new mongoose.Schema({
    word:{type:String,required:true},
    description:{type:String,required:true},
    level:{type:mongoose.Schema.Types.ObjectId,ref:"Level",required:true},
    deleteAt:{type:Boolean,required:false,default:false},
    createdAt:{type:Date,required:true,default:Date.now},
    updatedAt:{type:Date,required:true,default:Date.now},
},{timestamps:true,versionKey:false})

module.exports = mongoose.model("WordSoup",wordSoupSchema)