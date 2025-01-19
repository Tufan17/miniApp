const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    deleteAt:{type:Boolean,required:false,default:false},
    createdAt:{type:Date,required:true,default:Date.now},
    updatedAt:{type:Date,required:true,default:Date.now},
},{timestamps:true,versionKey:false})

module.exports = mongoose.model("Role",roleSchema)