const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nickname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    deviceId:{type:String,required:true},
    avatar:{type:String,required:false},
    status:{type:Boolean,required:true,default:true},
    roleId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Role"},
    deleteAt:{type:Boolean,required:false,default:false},
    createdAt:{type:Date,required:true,default:Date.now},
    updatedAt:{type:Date,required:true,default:Date.now},
},{timestamps:true,versionKey:false})

module.exports = mongoose.model("User",userSchema)