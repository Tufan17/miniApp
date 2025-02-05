const mongoose = require("mongoose");

const cefrSchema = new mongoose.Schema({
    key:{type:Number,required:true,unique:true},
    name:{type:String,required:true},
    deleteAt:{type:Boolean,required:false,default:false},
    createdAt:{type:Date,required:true,default:Date.now},
    updatedAt:{type:Date,required:true,default:Date.now},
},{timestamps:true,versionKey:false})

module.exports = mongoose.model("CEFR",cefrSchema)