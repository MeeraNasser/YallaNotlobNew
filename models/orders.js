var mongoose=require("mongoose")
// register model
var Schema=mongoose.Schema
var orders=new Schema({
  _id: {
    type:Number,
    required: true,
    lowercase: true,
    index:{unique: true}
  },
  ownerEmail:{ type : String, ref: 'users' },
  invited:[{ type : String, ref: 'users' }],
  joined:[{ type : String, ref: 'users' }],
  from:String,
  type:String,
  date:String,
  status:String,
  menuImage:String
  })
// ORM
mongoose.model("orders",orders)
