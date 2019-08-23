var mongoose=require("mongoose")
// register model
var Schema=mongoose.Schema
var test = "fs.files";
var test=new Schema({
  filename:String,
  contentType :String,
  length:Number,
  chunkSize:Number,
  uploadDate:String,
  aliases:String,
  metadata:String,
  md5:String
  })
// ORM
mongoose.model("fs.files",test)
