var express=require("express");
var router=express.Router();
var bodyParser=require("body-parser");
var middleToParseRequestBody=bodyParser.urlencoded({extended:false});
var mongoose=require("mongoose");

var Name,Email,Password,Password2;

router.get("/",function(req,resp){
    resp.render("index",{isSignInERROR:false});
});

//........................... Sing IN ........................................
//____________________________________________________________________________
router.post("/signinAuth",middleToParseRequestBody,function(req,resp){
    Email=req.body.email;
    Password=req.body.password;
    console.log(Email)
    console.log(Password)
 
// mongoose.model("orders").insert({"ownerEmail":"SamaR@iti.com","type":"Dinner",
// "from" :
// "AbouShakra","date":"2017-01-11","status":"finished","invited":["meera@iti.com"
// ],"joined":["aya@iti.com"]})

//----------------------------- Log In -------------------------------------// 
//     var flag = false;
//     mongoose.model("users").find({},{"_id":0,"email":1,"password":1},function(err,users ) {
//         for(var i = 0; i <users.length; i++) {
//             if(Email==users[i].email && Password==users[i].password){
//                 flag=true;
//                 console.log("SIGNIN Successfully");
//                 resp.render("home");
//             }
//         }
//         if(!flag){
//             console.log("ERROR: SIGNIN NOT Successfully!");
//             resp.render("index",{isSignInERROR:true});
//         }
// 
//     })

//---------------------------------------------------------------------//      
//----------------------------- List My Own Friends FUNCTION :D--------// 
// mongoose.model("users").find({"email":mail},{"_id":0,"friend":1},
// function(err,data) {
//             console.log("Nadaaaaa :D");
//             console.log(data);
//             for(var i = 0; i <data.length; i++)
//                 {
//                     console.log(data[i].friend[i] +" "+ data[i].friend[i+1])
//                 }
// })
//   })
//---------------------------------------------------------------------//
//-------------------Remove Friend From My Group--------------------//
//------------ 1)) remove him from the group members -------------
// mongoose.model("groups").update({"groupName":"IOT"},
// {"$pull":{"members":"aya@iti.com"}},function(err){
//     if(err)
// {
//     console.log(err);
// }
// });
// console.log("first Step ")
//---------------2)) remove the group from his groups :D -----
// mongoose.model("users").update({"email":"aya@iti.com"},
// {$pull:{"groupName":"IOT"}},function(err){
//     if(err)
// {
//     console.log(err);
// }
// });
// console.log("second Step ")
//---------------------------------------------------------------
//--------------- Add Friend to My Group ---------------//
    
//-------------------- add him in the group-------//    
// mongoose.model("groups").update({"groupName":"IOT"},
// {$push:{"members":"sara@yahoo.com"}},function(err){
//     if(err)
// {
//     console.log(err);
// }
// });
// console.log("first Step ")
// // /// ----------- and add the group in his groups --//
// mongoose.model("users").update({"email":"sara@yahoo.com"},
// {$push:{"groupName":"IOT"}},function(err){
//     if(err)
// {
//     console.log(err);
// }
// });
// console.log("second Step ")
});

//.................. Sing UP ........................................
//___________________________________________________________________
  router.post("/signupAuth",middleToParseRequestBody,function(req,resp){
    Name=req.body.name;
    Email=req.body.email;
    Password = req.body.password1;
    Password2 = req.body.password2;

    console.log(req.body.name)
    console.log(req.body.email)


    if(checkPassword(Password,Password2)){
        console.log("Matched Password")

        var userModel= mongoose.model("users")
		var new_user= new userModel();
        new_user.name=Name;
		new_user.email=Email;
		new_user.password=Password;

		new_user.save(function(err){
            if (err){
                console.log("ERROR!!: Email Alrady Exist !!!");
//                 resp.render("home");
            }
            else {
                console.log("SIGNUP Successfully");
//                 resp.render("home");
             }
		});
    }
    else{
        console.log("Password NotMached");
//         resp.render("index",{isSignInERROR:true});
    }

    });

//................................................... CHECK SIGNUP ........................................................

    function checkPassword(pass1,pass2){
        if (pass1==pass2)
            return true
        else
            return false
    }

module.exports=router;
