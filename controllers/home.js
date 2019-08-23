var express=require("express");
var bodyParser=require("body-parser");
var DBFunctions = require("./DBfunctions.js")

var router=express.Router();
var middleToParseRequestBody=bodyParser.urlencoded({extended:false});

router.get("/",function(req,resp){

    var orders = DBFunctions.getLeatestOrders(req.session.email);    //return [typeList,detaList];
    console.log(req.session.email)
    var Activity = DBFunctions.getActivity(req.session.email)
    var friends = DBFunctions.getFriendsEmail(req.session.email)    
    for(var i=0;i<Activity.length;i++)
        {
            console.log(friends[i])
            console.log(Activity[i])
            for(var c=0;c<Activity[i].length;c++)
                {
                    console.log("from",Activity[i][c].from)
                    console.log("type",Activity[i][c].type)
                }
           
        }
    
resp.render("home",{Types:orders[0],Dates:orders[1],getAct:Activity,Friends:
friends}) ;
});

module.exports=router;
