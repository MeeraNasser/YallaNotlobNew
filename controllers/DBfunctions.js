var mongoose=require("mongoose");
//____________________________________________________________ Return true if correct username and password __________//
function checkSignIn(Password,Email){
    var flag = false;
    var source ;
    mongoose.model("users").find({},{"_id":0,"name":1,"email":1,"password":1},function(err,users ) {
        source = users;
        for(var i = 0; i <users.length; i++) {
            if(Email==users[i].email && Password==users[i].password){
                flag=users[i];
                if(!flag){
                    console.log("ERROR: SIGNIN NOT Successfully!");
                    return false
                }
            }
        }
    });
    while(source === undefined) {
        require('deasync').runLoopOnce();
    }
    return flag;
}
//___________________________________________return List of type and list of details of the user ______//
function getLeatestOrders(Email){
    var detaList=[]
    var typeList=[]
    var source ;
    mongoose.model("orders").find({"ownerEmail":Email},{"_id":false,"date":true,"type":true},{"$limit":10},function(err,orders){
        source=orders;
        for(var i = 0; i <orders.length; i++) {
           console.log(orders[i].date);
           console.log(orders[i].type);
           detaList.push(orders[i].date);
           typeList.push(orders[i].type);
        }
    });
    while(source === undefined) {
        require('deasync').runLoopOnce();
    }
    return [typeList,detaList];
}
//______________________________________________________________________return True if success Sign In__________//
function checkSignUp(Name,Email,Password){
    var userModel= mongoose.model("users")
    var new_user= new userModel();
    var source ;
    var flag = true;

    new_user.name=Name;
    new_user.email=Email;
    new_user.password=Password;
    new_user.save(function(err){
        source=err;
        if(err)
            flag=false
    });
    while(source === undefined) {
        require('deasync').runLoopOnce();
    }
    return flag;
}
function displayImage(Imgsrc)
{
        var source ;
    mongoose.model("fs.files").find({"md5":Imgsrc},{"_id":0,"filename":1},function(err,data){
        source=data;
            console.log("ffffffffeeeedddd")
            console.log(data)

    });
return source;

}
//_____________________ getOrderList _____________________
function getMyOrdersList(email) {
    var OrderList = []
    var source
    var test
    console.log("orders list");
    mongoose.model("orders").find({$or:[{joined:{"$in":[email]}},{ownerEmail:email}]},function(err,OrderList){
        source=OrderList
        if(!err){
//             console.log("OrderList",OrderList)
//             console.log("sssssssssssssssssssssssss"+OrderList[0])
            if(!OrderList){
//                 console.log("data",OrderList);
                for(var i=0; i<OrderList.length; i++){
                    flag=OrderList[i].type;
                    OrderType=OrderList[i].type;
                    OrderRest=OrderList[i].from;
                    OrderInvited=OrderList[i].invited.length;
                    OrderJoined=OrderList[i].joined.length;
                    OrderStatus=OrderList[i].status;
                }
            }
        if(OrderList)
        {   console.log("_____________________")
            //  console.log(OrderList)
             test = OrderList
        }
}
})

while(source === undefined) {
    require('deasync').runLoopOnce();
}
 // console.log("Liiiiiiiiiiiiiiiiiiiiiiiist")
 // console.log(test)
return test
}//end fun


//____________________________________________________ return List of Frinds Emails for the user _________________________________//
function getFriendsEmail(Email){
    var frindsEmail=""
    var source;
    console.log(Email)
    mongoose.model("users").find({"email":Email},{"_id":0,"friend":1},function(err,friend){
        source=friend;
        for(var i = 0; i <friend.length; i++) {
           frindsEmail=friend[i].friend;
        }
    });
    while(source === undefined) {
        require('deasync').runLoopOnce();
    }
    return frindsEmail;
}
//_____________________________________________________________return List of Frinds Names for the user _______//
function getFriendsName(resp,Email){
    var frindsEmail=getFriendsEmail(Email)
    console.log("eeeeeeeeeeeeee ",frindsEmail);

    var frindsName=[];

    for (var i = 0; i <= frindsEmail.length; i++) {
    (function (i) {
        mongoose.model("users").find({"email":frindsEmail[i]},{"_id":0,"name":1},function(err,friendName){
            if (err) throw err;
            if (!err && (i == frindsEmail.length)) {
                resp.render('friends',{FrindsName:frindsName,FrindsEmail:frindsEmail});
            }else{
                console.log("i",i);
                frindsName.push(friendName[0].name)
                console.log("friendName[0].name",friendName[0].name);
                console.log("frindsName ",frindsName)
            }

        });
    })(i)
}
}
//____________________________________________________________????????????????????????__//
function getEmail(name){
    var Email = "";
    var source ;
    mongoose.model("users").find({"name":name},{"_id":0,"email":1},function(err,users ) {
        source = users;
        for(var i = 0; i <users.length; i++) {
            if(Email==users[i].email && Password==users[i].password){
                flag=users[i];
                if(!flag){
                    console.log("ERROR: SIGNIN NOT Successfully!");
                    return false
                }
            }
        }
    });
    while(source === undefined) {
        require('deasync').runLoopOnce();
    }
    return flag;
}
//______________________________________________________________________________ return false if Account is NOT Exist //
function checkIfFriendAccountExist(Email){
    var flag = false;
    var source ;
    mongoose.model("users").find({},{"_id":0,"email":1},function(err,users ) {
        source = users;
        for(var i = 0; i <users.length; i++) {
            if(Email==users[i].email){
                flag=users[i];
                if(!flag){
                    console.log("ERROR: Email Not Successfully!");
                    return false
                }
            }
        }
    });
    while(source === undefined) {
        require('deasync').runLoopOnce();
    }
    return flag;
}
//______________________________________________________________________________ add Email to Friends List //
function addEmailtoFriendsList(myEmail,friendEmail) {
    var source;
    var flag=true ;
    mongoose.model("users").update({"email":myEmail},{$push:{"friend":friendEmail}},function(err){
        source=err;
        if(err)
            flag=false
    });
    while(source === undefined) {
        require('deasync').runLoopOnce();
    }
    return flag;

}
//______________________________________________________________________________ remove friend from freind List //
function removeFriend(myEmail,friendEmail) {
    var source;
    var flag=true ;
    mongoose.model("users").update({"email":myEmail},{$pull:{"friend":friendEmail}},function(err){
        source=err;
        if(err)
            flag=false
    });
    while(source === undefined) {
        require('deasync').runLoopOnce();
    }
    return flag;
}
////////////////////////////////////////////// Groups ////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//_________________________________________________________________________________ return List of user Groups __//
function getMyGroups(myEmail) {
        var source;
        var flag=true ;
        mongoose.model("users").find({"email":myEmail},{"_id":0,"groupName":1},{},function(err,groupList){
            source=groupList;
            if(err)
                flag=false
        });
        while(source === undefined) {
            require('deasync').runLoopOnce();
        }
        return source[0].groupName;
}
//_________________________________________________________________________________ return List of members Emails __//
function getGroupObject(groupName) {
        var source;
        var flag=true ;
        mongoose.model("groups").find({"groupName":groupName},{"_id":0,"members":1},{},function(err,group){
            source=group;
            if(err)
                flag=false
        });
        while(source === undefined) {
            require('deasync').runLoopOnce();
        }
        return source[0].members;
}

//___________________________ Activity :D ___________________________________

//___________________________________ Function Activity Zefts :D _____________//
function getActivity(email){
            var friendsEmails=getFriendsEmail(email)
            console.log(friendsEmails)
            var allOrders=[]
            var source
     for(var i=0;i<=friendsEmails.length;i++) {
    (function (i) {
mongoose.model("orders").find({"ownerEmail":friendsEmails[i]},{"_id":0,"type":1,
"from":1},function(err,data){
//             console.log(friendsEmails[i])
//             console.log(data)
            if (err) throw err;
            if (!err && (i == friendsEmails.length)) {
            console.log("Hello :D")
            }else{
                console.log("i",i);
                allOrders.push(data)            
                console.log(allOrders)
                source=allOrders;
            }
        });
    })(i)
} // End For

while(source === undefined) {
        require('deasync').runLoopOnce();
    }
console.log("________Soooorce______")
console.log(source)
console.log("_____Aalllll________")
console.log(allOrders)
return allOrders
} //End FUNCTION




 // End For
//    for(var c=0 ; c<friendsNames;c++)
//         {
//             for(var i=0;i<allOrders[c].length;i++)
//                 {
//         console.log(friendsNames[c]+"has created an orderfor"+)
//                 }
//            
//         }
////////////////////////////////////////////// Order Details ////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//_________________________________________________________________________________ return List of order Item __//
function ListOrderItems(myEmail) {

}
//_________________________________________________________________________________ radd new Item To Order __//
function addItemToOrder(orderID,personEmail,item,amount,price,comment){
    console.log("order :",orderID);
    var userModel= mongoose.model("orderDetails")
    var newItem= new userModel();
    var source ;
    var flag = false;

    newItem.orderId=orderID;
    newItem.person=personEmail;
    newItem.itemName=item;
    newItem.price=price;
    newItem.amount=amount;
    newItem.comment=comment;
    newItem.save(function(err){
        source=err;
        if(err)
            flag=false
        else {

            flag=true
        }
    });
    while(source === undefined) {
        require('deasync').runLoopOnce();
    }
    return flag;
}
//_________________________________________________________________________
/////////////////////////////// sammmmiraa
/////////////////////////////// sammmiraa
/////////////////////////////// sammmmmiraa

//__________ AddFriendToGroup ___________
function AddFriendToGroup(F2Group,NameGroup)
{
//--------------- Add Friend to My Group ---------------//
//-------------------- add him in the group-------//

mongoose.model("groups").update({"groupName":NameGroup},
{$push:{"members":F2Group}},function(err){
    if(err){
    return true
    console.log(err);
}else {
    return false
}
});
} //End Function
//////////////////////
//_______________ checkIfFriendAccountExist In This Group____
function checkIfFriendInGroup(F2Group,NameGroup)
{
    //---------------List Member Of the Group -----------
    var addGFlag = false;
     var source ;

mongoose.model("groups").find({"groupName":NameGroup},{"_id":0,"members":1},
function(err,groups) {
                source = groups;
                var len = source[0].members.length;
                var list =source[0].members;
                    for(var i = 0; i <len; i++) {
//                         console.log("Item"+list[i])
            if(F2Group==list[i]){
                addGFlag=true;
                console.log(addGFlag)
                console.log("This User Is already Exist In This Group");
            }
                    }
                    });
while(source === undefined) {
        require('deasync').runLoopOnce();
    }
return addGFlag;
} // End Function
//____________________________________________________ Remove Group

function removeGroup(Email,gName){
    console.log("Fffff"+Email+"ffffff"+gName)
mongoose.model("users").update({"email":Email},{$pull:{"groupName":gName}},
function(err){
    if(err)
{
    console.log(err);
}
    else
    {
mongoose.model("groups").remove({"ownerEmail":Email,"groupName":gName},
function(err){
    if(err)
{
    console.log(err);
}
})
    }//end else
    }); //end big err
}
///////////////////////ASSSSSSSSSSSSSSSSSSSSSSma////////////////////////////////
//--------------------------------------------------ADD GROUP

function addGroupToGroups(groupName, ownerEmail){
var Flag = false;
var source;
  var groupModel= mongoose.model("groups")
	var new_group= new groupModel();
  new_group.ownerEmail=ownerEmail;
	new_group.groupName=groupName;
  // new_group.members[0]=Email;
	new_group.save(function(err){
        source=err;
        if (err){
            console.log("ERROR!!: Group Alrady Exist !!!");
        }else {
            console.log("New Group Is Created Successfully");
            Flag = true;
            addGroupToUsers(groupName,ownerEmail)
        }
	});

    while(source === undefined) {
            require('deasync').runLoopOnce();
        }
    return Flag;
}

function addGroupToUsers(groupName, ownerEmail){
    mongoose.model("users").update({"email":ownerEmail},{$push:{"groupName":groupName}},
    function(err){
      if(err){
        console.log(err);
      }
    });
}

//-------------------------------------------------------------PUBLISH ORDER
function addOrderWithInviteAndMenu(email, orderPlace /*, orderType, orderDate, orderStatus, members, image*/)
{
    console.log("****************add order********************");
    var orderModel= mongoose.model("orders");
    console.log("get last order")
    mongoose.model("orders").find({},{"_id":1},{ "$sort": { _id : -1 } },function(err,data){
        if(!err){
            console.log("lastOrder",data[data.length-1]._id)
            orderIndex=data[data.length-1]._id+1;
            var new_order= new orderModel();
            new_order._id=orderIndex;
            console.log("orderIndex",orderIndex);
            new_order.ownerEmail=email;
            // new_order.type="lunch";
            new_order.from=orderPlace;
            console.log("orderPlace -------> ", orderPlace);
            // new_order.date="1-1-2017";
            // new_order.status="waiting";
            // if(members!=null){
            //     console.log("in if");
            //     new_order.invited="asmaa@gmail.com";
            //     console.log("saved with image")
            //     if(image!=null)
            //         new_order.menuImage="public/assets/images/1.jpg";
            // }
            new_order.save(function(err){
                if (!err)
                    console.log("not error add order", err)
                else
                  console.log("error add order --> ", err);
            });
        }
    });
}


module.exports = {
   checkSignIn,
   checkSignUp,
   getLeatestOrders,
   getFriendsEmail,
   getFriendsName,
   checkIfFriendAccountExist,
   addEmailtoFriendsList,
   removeFriend,
   getGroupObject,
   getMyGroups,
   displayImage,
   addItemToOrder,
   AddFriendToGroup,
   checkIfFriendInGroup,
   removeGroup,
   getMyOrdersList,
   addGroupToGroups,
   addGroupToUsers,
   addOrderWithInviteAndMenu,
   getActivity


}
