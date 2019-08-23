$(function(){
    var socket=io.connect("http://localhost:8030");
    ///***************** EVENTS
    socket.on("connect",function(){
        var logEmail =localStorage.LogInEmail;
        console.log("Emmllldsjadshakmmmmmail :",logEmail );
        socket.emit("join",logEmail);
    })

    socket.on("join",function(onlineUsers){
    console.log("online:" ,onlineUsers)
    })
    //--------------------------------------------------------------- add Friend
    $("#addFreindBtn").on('click',function(){
        $('#addFriendError').html("");
        var friendemail=$("#friendemail2Add").val()
        console.log("friendemail: ",friendemail);
        socket.emit("addFriend",friendemail);
        $("#friendemail2Add").val("");
    })

    socket.on("addFriend",function(result){
        if(!result){
            console.log(result);
            $('#addFriendError').html("this Email is NOT a member in YallaNotlob");
        }else{
            console.log(result);
            var content = $('#friendsList').html();
            content += "<article class='one_third'><div class='hgroup'><h6 class='heading'>"+result+"</h6></div></article>"
            $('#friendsList').html(content)
        }
    })
    //------------------------------------------------------------------------- remove friend
    $("article button").on('click',function(){
        var friendemail=$(this).attr('id');
        console.log("friendemail: ",friendemail);
        socket.emit("removeFriend",friendemail);
    })

    socket.on("removeFriend",function(result,FrindsName){
        if(result){
            console.log("result",result);
            $("#friendsList").html("")
            var content =""
            for (var i=0;i<FrindsName.length;i++){
                content +=""

            }
            $('#addFriendError').html("this Email is NOT a member in YallaNotlob");
        }else{
            console.log("ERROR while Remove Friend ");
            var content = $('#friendsList').html();
            content += "<article class='one_third'><div class='hgroup'><h6 class='heading'>"+result+"</h6></div></article>"
            $('#friendsList').html(content)
        }
    })

    //------------------------------------------------------------------------- on click Group name
    $("#GroupsNameList #groupName").on('click',function(){
        var groupName =$(this).text();
        console.log("groupName: ",groupName);
        socket.emit("getGroupMembers",groupName);
    })

    socket.on("getGroupMembersResponse",function(memberFriends){
        console.log("eeeeeeeeeeeeeeeeeeeeeee",memberFriends);
        console.log("ffffffffffffffffffffffff",memberFriends);

        if(memberFriends){
            $("#groupMembersList").html("")
            var content =""
            for (var i=0;i<memberFriends.length;i++){
                console.log("memberFriends[i]",memberFriends[i]);
                content+="<article class='one_third'><div class='hgroup'><h6 class='heading'>"+memberFriends[i]+"</h6></div><img src='../assets/images/1.jpg'></article>"
            }
            $("#groupMembersList").html(content)
        }else{
            console.log("ERROR !!! Canot get members from DB");
        }
    })

    //------------------------------------------------------------------------- on click ADD Item
    $("#addItemBtn").on('click',function(){
        var orderID="xxx"
        var item=$("#itemName").val()
        var amount=$("#itemAmount").val()
        var price=$("#itemPrice").val()
        var comment=$("#itemComment").val()

        console.log("itemNamee: ",orderID,item,amount,price,comment);
        socket.emit("addItemToOrder",orderID,item,amount,price,comment);
    })
    socket.on("addItemToOrderResponse",function(isItemAdded){
        console.log(isItemAdded);
    })

    // socket.on("getGroupMembersResponse",function(memberFriends){
    //     console.log("eeeeeeeeeeeeeeeeeeeeeee",memberFriends);
    //     console.log("ffffffffffffffffffffffff",memberFriends);
    //
    //     if(memberFriends){
    //         $("#groupMembersList").html("")
    //         var content =""
    //         for (var i=0;i<memberFriends.length;i++){
    //             console.log("memberFriends[i]",memberFriends[i]);
    //             content+="<article class='one_third'><div class='hgroup'><h6 class='heading'>"+memberFriends[i]+"</h6></div><img src='../assets/images/1.jpg'></article>"
    //         }
    //         $("#groupMembersList").html(content)
    //     }else{
    //         console.log("ERROR !!! Canot get members from DB");
    //     }
    // })

    //Meera  Add FriendToGroup :D____________

  $("#AddF2G").on('click',function(){
       var F2Group;
      var test = $(this).parent().children()
       F2Group = test[0].value
      var test2 = $(this).parent().parent().parent().children()
      console.log(test2[0])
      var NameGroup = test2[0].textContent
//         $("#NameG")
      console.log(F2Group+"rrrrrrr"+NameGroup)
      socket.emit("AddFriend2Group",F2Group,NameGroup)
  })

  socket.on("AddFriend2GroupResponse",function(testFlag,F2Group) {
    if(testFlag==true){
        console.log("This User Is already Exist In This Group");
       $('#addFriendToGroupError').html("this User is Already Exist in this Group");
       }else{
           var connect = $('#addFriendToGroupList').html();
           connect +="<article class='one_third first'><div class='hgroup'><h6 class='heading'>"+F2Group+"</h6> </div><img src='../assets/images/1.jpg' alt=''><footer><a class='btn' href='#'>Remove&raquo;</a></footer></article>"
       }

  })

  ///////////// meera remove
      //MEERa Remove Group

       $(".removeG").on('click',function(){
           var parentTag = $( this ).parent().parent().children();
           console.log(parentTag[0].text)
           var GroupRemoved = parentTag[0].text ;
           socket.emit("RemoveGroup",GroupRemoved);
      })

      ////////////////////////////////////////////ASSSSSSSSSSSSSSSSMA///////////////////

    //-------------------------------asmaa---------------------------------------- ADD GROUP
    $("#addGroupBtn").on('click', function(){
      console.log("******************ADD GROUP********************");
      var groupName = $("#groupName").val()
      console.log("groupName ------> ", groupName);
      socket.emit("addGroup", groupName)
      $("#groupName").val()
    })

    socket.on("addGroup", function(result){
      if(!result){
        console.log(result);
        $('#addGroupError').html("ERROR !!! Group already exists");
      }else{
        console.log(result);
        var content = $('#GroupsNameList').html();
        content += '<li class="myGroupsItem"><a style="margin:10px" class="heading" id="groupName"><%=myGroups[i]%></a><div style="margin-left: 200px;margin-top: -28px;"><a><img src="../assets/images/addFriendIcon.png" style="width: 35px;height: 30px;"></a><a class="removeG"><img src="../assets/images/remove.png" style="width: 35px;height: 30px;"></a></div></li>'
        $('#GroupsNameList').html(content)
      }
    })

    //-----------------------------------assma-------------------------------------------ADD ORDER
    $("#publishOrderBtn").on('click', function(){
      console.log("******************Publish Order********************");
      var orderPlace = $("#addOrderFromInput").val()
      // varaddOrderFriendsInput = $("#addOrderFriendsInput").val()
      console.log("addOrderFromInput ------> ", orderPlace);
      // console.log("addOrderFriendsInput ------> ", addOrderFriendsInput);
      // $("#addOrderFromInput").val()
      socket.emit("addOrder", orderPlace)
    })
    socket.on("addOrder", function(result){
      console.log("hellllllllllllllllllllllllllllo");
    })





});
