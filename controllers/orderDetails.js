var express=require("express");
var router=express.Router();
var bodyParser=require("body-parser");
var middleToParseRequestBody=bodyParser.urlencoded({extended:false});


router.get("/",function(req,resp){
    resp.render("orderDetails");
});



module.exports=router;
