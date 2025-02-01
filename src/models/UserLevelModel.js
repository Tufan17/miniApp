const mongoose = require("mongoose");

const userLevelSchema = new mongoose.Schema({
    levelId:{type:mongoose.Schema.Types.ObjectId,required:true ,ref:"Level"},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true ,ref:"User"},
    point:{type:Number,required:true,default:0},
    maxPoint:{type:Number,required:true,default:0},
    deleteAt:{type:Boolean,required:false,default:false},
    createdAt:{type:Date,required:true,default:Date.now},
    updatedAt:{type:Date,required:true,default:Date.now},
},{timestamps:true,versionKey:false})

module.exports = mongoose.model("UserLevel",userLevelSchema)