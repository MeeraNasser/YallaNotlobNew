var mongoose=require("mongoose");
var express= require("express");
var session=require("express-session")
var DBFunctions = require("./controllers/DBfunctions.js")

var fs=require("fs");
var app=express();

//** http server
var http = require('http');
var server = http.createServer(app);
var socketIO = require('socket.io').listen(server);

//.................................................................................
//.................................................................................

var users = {}

socketIO.on("connection",function(client){
    console.log("Hooopa");
    //........................................ new connection
    client.on("join",function(clientEmail){
        client.email = clientEmail;
        console.log(client.email,"is CONNECTED Now !!!");
        users[clientEmail]= client;
        client.emit("join",Object.keys(users)); //// send connected users
        client.broadcast.emit("join",Object.keys(users));
        })

    //........................................ ADD Friend
    client.on("addFriend",function (friendEmail) {
        console.log("friend to add", friendEmail);
        var result="Friend already Added";
        var isExist=DBFunctions.checkIfFriendAccountExist(friendEmail) //check if Friend Exist

        if (isExist){   //email is Exist
            console.log("isExist",isExist);
            result = DBFunctions.addEmailtoFriendsList(this.email,friendEmail);
            if(result)
                result=friendEmail  // Change !!!!
            console.log("result: ",result);
            client.emit("addFriend",result)
        }else{
            console.log(friendEmail," is NOT member  in YallaNotlob!!");
        }
        client.emit("addFriend",result)
    });
    //........................................ remove friend
    client.on("removeFriend",function (friendEmail) {
        console.log("friend to remove", friendEmail);
        var isDeleted=DBFunctions.removeFriend(this.email,friendEmail) //check if Friend Exist
        if (isDeleted){   //email is Exist
            var friendsList = DBFunctions.getFriendsName(this.email)
            console.log("isDeleted",isDeleted);
            client.emit("removeFriend",isDeleted,friendsList)
        }else{
            console.log("Error while Remove Friend ");
        }
    });
    //........................................ get Group Mambers
    client.on("getGroupMembers",function (groupName) {
        console.log("Group Name: ", groupName);
        var groupObject = DBFunctions.getGroupObject(groupName);
        console.log("groupObjecti: ",groupObject);

        if(groupObject === undefined){
            groupObject="Error While get data From DB"
        }
        client.emit("getGroupMembersResponse",groupObject)
        console.log(groupObject);
    });

    //........................................ Add Item to Order
    client.on("addItemToOrder",function (orderID,item,amount,price,comment) {
        console.log("item details: ",this.email,item,amount,price,comment);
        var isItemAdded = DBFunctions.addItemToOrder(orderID,this.email,item,amount,price,comment);
        console.log("isItemAdded: ",isItemAdded);
        var ordersList =
        client.emit("addItemToOrderResponse",isItemAdded)
    });

    //........................................ close  connection
    client.on("disconnect",function(){
        delete users[client.userName];
        console.log(client.userName,"is DISCONNECTED Now !!!");
     })
     //__________Meera_______ Add Friend 2 Group _________________

    client.on("AddFriend2Group",function (F2Group,NameGroup){
         console.log(F2Group,NameGroup)
         console.log(this.email)
      var testFlag = DBFunctions.checkIfFriendInGroup(F2Group,NameGroup)
    //   var isAdded ;
         //check
         if(testFlag){
             console.log("Exisssssssssst ya meera");

         }else {
             DBFunctions.AddFriendToGroup(F2Group,NameGroup)
             console.log("is Adeeeeeeed")
         }

        console.log("qqqqqqqqqqqqqqq"+testFlag)
        client.emit("AddFriend2GroupResponse",testFlag,F2Group)
    });
    //-----------MEEra------------- Remove Group
        client.on("RemoveGroup",function (GroupRemoved) {
            console.log("Group will Remove"+GroupRemoved)
            console.log(this.email)
         DBFunctions.removeGroup(this.email,GroupRemoved) //check

    });

    //____________ asmaa ____________________
    //----------------------------asmaa---------------------- ADD Group
client.on("addGroup",function (groupName, ownerEmail) {
    console.log("GroupName --> ", groupName);
    var result = "group already Added";
    var group = DBFunctions.addGroupToGroups(groupName, this.email)
    if(result){
      result = groupName
      console.log("result: ",result);
      client.emit("addGroup",result)
    }else{
      console.log(groupName," is new in YallaNotlob!!");
    }
    client.emit("addGroup",result)
});

//----------------------------asmaa--------------------------PUBLISH ORDER
client.on("addOrder",function (orderPlace /*, orderType,orderDate, orderStatus, members, image*/) {
  //console.log("OrderPlace ----->", orderPlace);
  console.log("orderPlace ----->", orderPlace);
  var order = DBFunctions.addOrderWithInviteAndMenu( this.email ,orderPlace/*, orderType,orderDate, orderStatus, members, image*/)
  var result = "order already Added";
  if(result){
    result = orderPlace
    console.log("result: ",result);
    client.emit("addOrder",result)
  }else{
    console.log(result," is new orderPlace in YallaNotlob!!");
  }
  client.emit("addOrder",result)

});


});

//mongoose.connect("mongodb://127.0.0.1:27017/notlob");  //connect the database
var conn = mongoose.connection; //open connection
var gfs;

var Grid = require("gridfs-stream");  //mechanism for storing large files in MongoDB
Grid.mongo = mongoose.mongo;  //assign the driver(mongoose) directly to the gridfs-stream

conn.once("open", function(){ // we are connected
    
  gfs = Grid(conn.db);  //open db using grid module
  app.get("/", function(req,res){
    res.render("/home");
  });
    
});
//end upload

//................ Moddlewares
app.use(session({secret:"@#$%$^%$"}))
app.use(function (req,resp,next) {
    resp.locals={
        loggedIn:req.session.logged,
        userName:req.session.userName,
        userEmail:req.session.email
    }
    next();
});

//........... Routers
var homeRoutes=require("./controllers/home");

app.use("/home",homeRoutes);

//................ Views
app.set('view engine','ejs');
app.set('views','./views');

//................. Data Base
mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://127.0.0.1:27017/notlob");

var files_arr=fs.readdirSync(__dirname+"/models")
files_arr.forEach(function(file){
  require(__dirname+"/models/"+file);
});

//.................. static Files
app.use(express.static(__dirname + '/public'));


//app.listen(8030);
server.listen(8030)
