const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:false},
    levelId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Level"},
    deleteAt:{type:Boolean,required:false,default:false},
    createdAt:{type:Date,required:true,default:Date.now},
    updatedAt:{type:Date,required:true,default:Date.now},
},{timestamps:true,versionKey:false})

module.exports = mongoose.model("Content",contentSchema)