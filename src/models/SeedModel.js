const mongoose = require("mongoose");

const seedSchema = new mongoose.Schema({
    key:{type:String,required:true},
    status:{type:Boolean,required:true,default:false},
},{timestamps:true,versionKey:false})

module.exports = mongoose.model("Seed",seedSchema)