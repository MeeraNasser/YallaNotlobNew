var mongoose=require("mongoose")
// register model
var Schema=mongoose.Schema
var notifications=new Schema({
  recieverEmail:{type:String,ref:'users'},
  senderEmail:{type:String,ref:'users'},
  type:String,
})
// ORM
mongoose.model("notifications",notifications)
