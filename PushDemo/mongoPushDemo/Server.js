var app       =     require("express")();
var mongoose  =     require("mongoose");
var http      =     require('http').Server(app);
var io        =     require("socket.io")(http);

var Schema=mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/tst');
// ORM
mongoose.model("groups",{ownerEmail:String,members:String,groupName:String});

app.get("/",function(req,res){
    res.sendFile(__dirname + '/index.html');
});

/*  This is auto initiated event when Client connects to Your Machine.  */
io.on('connection',function(socket)
{  
    console.log("A user is connected");
    socket.on('email added',function(friendMail){
      add_friend(friendMail,function(res){
        if(res){
            io.emit('refresh feed',friendMail);
        } else {
            io.emit('error');
        }
      });
    });
});

mongoose.model("groups").find(function(err,data)
{   
    //get data from text field
    //insert data into database
	console.log(data);
});

http.listen(3000,function(){
    console.log("Listening on 3000");
});
