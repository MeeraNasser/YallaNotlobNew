var express=require("express");
var router=express.Router();
var bodyParser=require("body-parser");
var middleToParseRequestBody=bodyParser.urlencoded({extended:false});

var DBFunctions = require("./DBfunctions.js")
var Name,Email,Password,Password2;


//............................ LOG OUT  .........................................
//*******************************************************************************
router.get("/logOut",function(req,resp){
    req.session.logged=false;
    resp.render("index",{signMsg:"trueSignIn"});
});
//............................ redirect to HOME  ................................
//*******************************************************************************
router.get("/",function(req,resp){
    if(req.session.logged){
        var orders = DBFunctions.getLeatestOrders(Email);    
        //return[typeList,detaList];
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
friends});
//         resp.render("home",{Types:orders[0],Dates:orders[1]});
        
        
        
    }else{
        resp.render("index",{signMsg:"trueSignIn"});
    }

});
//............................ Sing IN ........................................
//*****************************************************************************
router.post("/signinAuth",middleToParseRequestBody,function(req,resp){
    Email=req.body.email;
    Password=req.body.password;


    var SignInUserObj =DBFunctions.checkSignIn(Password,Email);
    if(SignInUserObj){
        console.log("SIGNIN Successfully");
        console.log(SignInUserObj);
        // set session parameters
        req.session.logged=true
        req.session.userName=SignInUserObj.name;
        req.session.email=SignInUserObj.email;
        // console.log("sesssssssioon ",req.session.userName)
        // console.log("sesssssssioon ",req.session.logged)
  var orders = DBFunctions.getLeatestOrders(Email);    
        //return[typeList,detaList];
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
friends});
    }
    else {
        console.log(SignInUserObj);
         resp.render("index",{signMsg:"falseSignIn"});
    }
    console.log(Email)
    console.log(Password)

  });
//............................ Sing UP ........................................
//*****************************************************************************
  router.post("/signupAuth",middleToParseRequestBody,function(req,resp){
    Name=req.body.name;
    Email=req.body.email;
    Password = req.body.password1;
    Password2 = req.body.password2;

    console.log(req.body.name)
    console.log(req.body.email)

    if(checkPassword(Password,Password2)){
        console.log("Matched Password")
        if(DBFunctions.checkSignUp(Name,Email,Password)){
            console.log("SIGNUP Successfully");
            var orders = DBFunctions.getLeatestOrders(Email);    //return [typeList,detaList];
            resp.render("home",{Types:orders[0],Dates:orders[1],userName:Name});
        }else{
            console.log("ERROR!!: Email Alrady Exist !!!");
            resp.render("index",{signMsg:"falseSignUp-Email"});
        }
    }else{
        console.log("Password NotMached");
        resp.render("index",{signMsg:"falseSignUp-password"});
    }

    });

//_______________________________________________________________________________________
//***************************************************************************************
    //............................ CheckMachingPassword .......................
    function checkPassword(pass1,pass2){
        if (pass1==pass2)
            return true
        else
            return false
    }


module.exports=router;




















// var express=require("express");
// var router=express.Router();
// var bodyParser=require("body-parser");
// var middleToParseRequestBody=bodyParser.urlencoded({extended:false});
// var mongoose=require("mongoose");
//
// var Name,Email,Password,Password2;
//
// router.get("/",function(req,resp){
//
//
//     resp.render("index",{signMsg:"trueSignIn"});
// });
// //............................ Sing IN ........................................
// //*****************************************************************************
// router.post("/signinAuth",middleToParseRequestBody,function(req,resp){
//     Email=req.body.email;
//     Password=req.body.password;
//
//     req.session.userName="zaynaaab";
//     req.session.email="@yahoo.com";
//     req.session.logged=true;
//     console.log("sesssssssioon ",req.session.userName)
//     console.log("sesssssssioon ",req.session.logged)
//
//
//     console.log(Email)
//     console.log(Password)
//     var flag = false;
//     mongoose.model("users").find({},{"_id":0,"email":1,"password":1},function(err,users ) {
//         for(var i = 0; i <users.length; i++) {
//             if(Email==users[i].email && Password==users[i].password){
//                 flag=true;
//                 console.log("SIGNIN Successfully");
//
//                 mongoose.model("orders").find({"ownerEmail":Email},{"_id":false,"date":true,"type":true},{"$limit":10},function(err,orders){
//                 var datesList=[]
//                 var typesList=[]
//                 for(var i = 0; i <orders.length; i++) {
//                    console.log(orders[i].date);
//                    console.log(orders[i].type);
//                    datesList.push(orders[i].date);
//                    typesList.push(orders[i].type);
//                 }
//                 resp.render("home",{Types:typesList,Dates:datesList});
//             });
//             }
//         }
//         if(!flag){
//             console.log("ERROR: SIGNIN NOT Successfully!");
//             resp.render("index",{signMsg:"falseSignIn"});
//         }
//
//     })
//   });
// //............................ Sing UP ........................................
// //*****************************************************************************
//   router.post("/signupAuth",middleToParseRequestBody,function(req,resp){
//     Name=req.body.name;
//     Email=req.body.email;
//     Password = req.body.password1;
//     Password2 = req.body.password2;
//
//     console.log(req.body.name)
//     console.log(req.body.email)
//
//     if(checkPassword(Password,Password2)){
//         console.log("Matched Password")
//         var userModel= mongoose.model("users")
// 		var new_user= new userModel();
//         new_user.name=Name;
// 		new_user.email=Email;
// 		new_user.password=Password;
// 		new_user.save(function(err){
//             if (err){
//                 console.log("ERROR!!: Email Alrady Exist !!!");
//                 resp.render("index",{signMsg:"falseSignUp-Email"});
//             }else {
//                 console.log("SIGNUP Successfully");
//                 resp.render("home");
//             }
// 		});
//     }else{
//         console.log("Password NotMached");
//         resp.render("index",{signMsg:"falseSignUp-password"});
//     }
//
//     });
//
// //_______________________________________________________________________________________
// //***************************************************************************************
// //***************************************************************************************
//     //............................ CheckMachingPassword .......................
//     function checkPassword(pass1,pass2){
//         if (pass1==pass2)
//             return true
//         else
//             return false
//     }
//     //............................ CheckMachingPassword .......................
//
//
// module.exports=router;
