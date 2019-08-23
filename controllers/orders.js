var express=require("express");
var router=express.Router();
var bodyParser=require("body-parser");
var DBFunctions = require("./DBfunctions.js")
var middleToParseRequestBody=bodyParser.urlencoded({extended:false});

router.get("/",function(req,resp){
    console.log("____________________________")
    var testList=DBFunctions.getMyOrdersList(req.session.email)

    console.log(" testList ------->---->",testList);
    for(var c =0;c<testList.length;c++)
        {
            console.log("cccccccc"+c);
            console.log(testList[c]);
        }
    // var ownerEmail =testList.ownerEmail
    // var type = testList.type
    // var froom = testList.from
    // var date = testList.date
    // var status = testList.status
    // var joined = testList.joined
    // var invited = testList.invited
    // resp.render("orders",{ownerEmail:ownerEmail,type:type,froom:froom,date:date,status:status,joined:joined,invited:invited});
    resp.render("orders",{testList:testList,owneerEmail:req.session.email})
});



module.exports=router;
