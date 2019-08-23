var express=require("express");
var router=express.Router();
var bodyParser=require("body-parser");
var DBFunctions = require("./DBfunctions.js")

var middleToParseRequestBody=bodyParser.urlencoded({extended:false});


router.get("/",function(req,resp){
    var myGroupList=DBFunctions.getMyGroups(req.session.email);
    console.log(myGroupList);
    resp.render("groups",{myGroups:myGroupList});
});



module.exports=router;
