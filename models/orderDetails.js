var mongoose=require("mongoose")
// register model
var Schema=mongoose.Schema
var orderDetails=new Schema({
  person:{type:String,ref:'users'},
  orderId:String,
  itemName:String,
  price:String,
  amount:String,
  comment:String,
})
// ORM
mongoose.model("orderDetails",orderDetails)
