var mongoose=require("mongoose")
// register model
var Schema=mongoose.Schema
var groups=new Schema({
  ownerEmail:{ type : String, ref: 'users' },
  members:[{ type : String, ref: 'users' }],
  groupName:String,
  })
// ORM
mongoose.model("groups",groups)
