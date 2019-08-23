var express=require("express");
var mongoose=require("mongoose");
var router=express.Router();


router.get("/",function(req,resp){
  /* Update
  mongoose.model("users").update({},{},{},function(){

  })*/
  /* Remove
  mongoose.model("users").remove({},function(){

  })*/
  email="a@gmail.com"
  mongoose.model("orders").find({"ownerEmail":"a@gmail.com"},{"_id":false,"date":true,"type":true},{"$limit":2},function(err,orders){
    // mongoose.model("orders").populate(data,{path:"ownerEmail"},function(err,orders){
        var dates=""
        var types=""
    for(var i = 0; i <orders.length; i++) {

       console.log(orders[i].date);
       console.log(orders[i].type);
           dates+=orders[i].date+" ";
           types+=orders[i].type+" ";

        }
               resp.json(dates +types);

    // })
    //resp.render("home/index",{"products_data":data});
  })
})




module.exports=router;
