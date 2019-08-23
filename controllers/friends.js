var express=require("express");
var bodyParser=require("body-parser");
var DBFunctions = require("./DBfunctions.js")

var router=express.Router();
var middleToParseRequestBody=bodyParser.urlencoded({extended:false});
var mongoose=require("mongoose");

//............................ friends Page ........................................
//*****************************************************************************
router.get("/",function(req,resp){
    DBFunctions.getFriendsName(resp,req.session.email)
})
//............................ UNFriend ........................................
//*****************************************************************************
// router.get("/unfriend/:friendEmail",function(req,resp){
//     var myEmail=req.session.email;
//     var frindEmail=req.params.friendEmail;
//     mongoose.model("users").update({"email":myEmail},{$pull:{"friend":frindEmail}},function(err){
//         resp.redirect("/friends");
//         console.log("Done:Deleted!!");
//     });
// })
//............................ ADD Friend ........................................
// //***************************************************************************** CHEEEEEK
// router.get("/addFriend/:friendEmail",function(req,resp){
//     var myEmail=req.session.email;
//     var frindEmail=req.params.friendEmail;
//     mongoose.model("users").update({"email":Email},{$push:{"friend":"meera@iti.com"}},function(err)
//         resp.redirect("/friends");
//         console.log("Done:Deleted!!");
//     });
// })

module.exports=router;
