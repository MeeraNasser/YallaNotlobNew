var express=require("express");
var mongoose=require("mongoose");
var router=express.Router();


router.get("/",function(req,resp)

{
  // mongoose.model("groups").find(function(err,data){
  //         console.log(data)
  //   mongoose.model("groups").populate(data[0],{path:"ownerEmail"},function(err,groups)
  //   {
  //      console.log(groups)
  //     resp.json(groups);
  //   })
  email="a@gmail.com"
  mongoose.model("groups").find({"ownerEmail":email},{"_id":false,"groupName":true},function(err,groups)
  {

     for(var i = 0; i <groups.length; i++)
     {
       console.log(groups[i].groupName);
            var  names=""
            names+=groups[i].groupName

        }
             resp.json(names);
      })
  mongoose.model("groups").find({"groupName":"iti"},{},{},function(err,groups){
    // mongoose.model("orders").populate(data,{path:"ownerEmail"},function(err,orders){

         var str=""
    for(var i = 0; i <groups.length; i++) {

      for(var j=0;j<groups[i].members.length;j++)
      {
             console.log(groups[i].members[j]);
             mongoose.model("users").find({"email":groups[i].members[j]},{},{},function(err,users)
             {
               console.log(users[0].name)
               str+=users[0].name
             })
               console.log("str",str)

           }

        }
                // resp.json(str);
  })
})




module.exports=router;
