
"use strict";

var userList = {};
var socket = io();

function freshUserList() {
    console.log("freshUserList");
    $.ajax({
        url: "/users",
        dataType: "json",
        success: function(data) {
            console.log(data);
            clearUserList();
            updateUserList(data);
        },
        type: "GET"
    });
}

$(document).ready(function( ) {

    console.log('as');
    freshUsers(); //get user list
    retrievePublicMessage();

});

//comments

function getStatusByName(username) {
    if(username in userList) {
        return userList[username].status;
    }
    return "OK";
}

function chat(e) {

    var login = sessionStorage.getItem('loggedIn') ;
	var name = e.getAttribute("dst-name");
	var textarename = 'textarea' + name;
    var content = document.getElementById(textarename).value;
    var message = {
    	name: name,
    	content: content,
    	date: new Date()
    }
    socket.emit('message', message);
    var id = 'dialog' + name;
    var textid = 'textarea' + name;
    document.getElementById(id).innerHTML = document.getElementById(id).innerHTML +
    '<div class=\'item\'><span>You:</span><br>' + 
    document.getElementById(textid).value + '</div>';
}

function search(e) {
    var content = document.getElementById("search").value;
    $.ajax({
        type: 'GET',
        url:  "/search",
        dataType: "json",
        data: {name: content},
        success: function (data) {
            if(data.length != 0) {
                if(data[0].find == 'true') {
                    clearUserList();
                    updateUserList(data);
                } else {
                    alert("search failed");
                }
            }
              
        },
        error: function (xhr, statusText, err) {
            alert("search failed");
        }
    });
}

socket.on('newPublicMessage', function(data) {
    var id = data.id;
    var self = sessionStorage.getItem('userId') ;
    if(id == self) {
        var name = data.name;
        var content = data.content;
        var id = 'dialog' + name;
        var textid = 'textarea' + name;
        document.getElementById(id).innerHTML = document.getElementById(id).innerHTML + 
        '<div class=\'item\'><span>' + name +':</span><br>' + content + '</div>';
        document.getElementById(textid).value='';
    }
});

socket.on('status', function () {
    $.ajax({
        url: "/users",
        dataType: "json",
        success: function (data) {
            if(data.length != 0) {
               clearUserList();
               updateUserList(data);
            } else
            {
                alert('search failed');
            }
            
        },
        type: "GET"
    });
});


function freshUsers() {
    var postAnnouncement = $.ajax({
        type: 'GET',
        url:  "/listUsers",
        // data: {content, author, location},
        // dataType: "text",
        success:function(data, textStatus, xhr) {
            if(xhr.status == 200) {
                var out = "";
                var res = "";
                for (var i = 0; i < data.length; i++) {
                    var htm = '<a href="javascript:void(0);" onclick=\"';
                    for(var j = 0; j < data.length; j++) {
                        if(i != j)
                        {
                            htm = htm + 'document.getElementById(\'' + data[j].name
                                + '-msg\').style.display=\'none\';';
                        }
                        else
                        {
                            htm = htm + 'document.getElementById(\'' + data[j].name + 
                                '-msg\').style.display=\'block\';';
                        }
                    }
                    htm = htm + '\">';
                    htm = htm + "<span>" + data[i].name + "</span></a>";
                    out += htm;
 
                    if(i == 0)
                    {
                        res = res + "<div id=\"" + data[i].name + '-msg\" style=\"display:block;float:left;width:75%;margin-left:2%;\" ">';
                    }
                    else
                    {
                        res = res + "<div id=\"" + data[i].name + '-msg\" style=\"display:none;float:left;width:75%;margin-left:2%;\" ">';
                    }
                    res = res +
                        "<div class=\"mydialog\" id=\"dialog" + data[i].name + "\"> </div>" +
                        "<div class=\"enter\">" +
                        "<textarea id=\'textarea" + data[i].name + "\' placeholder=\"say something...\"></textarea>" +
                        "<div class=\"subb\"><button dst-name=\"" + data[i].name + "\"" +
                        "onClick=\"chat(this)\">Reply</button></div>" +
                        '</div></div>';

                    /*
                    "onclick=\"document.getElementById(\'dialog" +
                    data[i].name +'\').innerHTML = document.getElementById(\'dialog' +
                    data[i].name +'\').innerHTML' + '+\'<div class=\\' + '\'item' + '\\' + '\'' + '><span>Someone:</span><br>\'' +
                    '+document.getElementById(\'textarea1' + '\').value' + 
                    '+\'</div>\';' + 'document.getElementById(\'textarea1' + '\').value=\'\';\">Reply</button></div>' +
                    '</div></div>';
                    */
                
                    console.log(res);
                }

                $('#icon-list').append(out);
                $('#list').append(res);
            }
        },
        error: function (xhr, statusText, err) {
            alert("Server error");
        }
    });
}

function  updateUserList(data) {
    var res = "";
    var htm = '<a href="javascript:void(0);" onclick=\"';
    htm = htm + 'document.getElementById(\'' + data[0].name
                + '-msg\').style.display=\'block\';'
    htm = htm + '\">';
    htm = htm + "<span>" + data[0].name + "</span></a>";
    res = res + "<div id=\"" + data[0].name + '-msg\" style=\"display:block;float:left;width:75%;margin-left:2%;\" ">';
    res = res +
        "<div class=\"mydialog\" id=\"dialog" + data[0].name + "\"> </div>" +
        "<div class=\"enter\">" +
        "<textarea id=\'textarea" + data[0].name + "\' placeholder=\"say something...\"></textarea>" +
        "<div class=\"subb\"><button dst-name=\"" + data[0].name + "\"" +
        "onClick=\"chat(this)\">Reply</button></div>" +
        '</div></div>';
    $('#icon-list').append(htm);
    $('#list').append(res);
}


// Listen rehistered users
socket.on('icon-list', function (data) {

    var out = "";
    var res = "";
    for (var i = 0; i < data.length; i++) {
        var htm = '<a href="javascript:void(0);" onclick=\"';
        for(var j = 0; j < data.length; j++) {
            if(i != j)
            {
                htm = htm + 'document.getElementById(\'' + data[j].name
                + '-msg\').style.display=\'none\';';
            }
            else
            {
                htm = htm + 'document.getElementById(\'' + data[j].name + 
                '-msg\').style.display=\'block\';';
            }
        }
        htm = htm + '\">';
        htm = htm + "<span>" + data[i].name + "</span></a>";

        out += htm;
 
        if(i == 0)
        {
            res = res + "<div id=\"" + data[i].name + '-msg\" style=\"display:block;float:left;width:75%;margin-left:2%;\" ">';
        }
        else
        {
        	res = res + "<div id=\"" + data[i].name + '-msg\" style=\"display:none;float:left;width:75%;margin-left:2%;\" ">';
        }
        res = res +
            "<div class=\"mydialog\" id=\"dialog" + data[i].name + "\"> </div>" +
            "<div class=\"enter\">" +
            "<textarea id=\'textarea" + data[i].name + "\' placeholder=\"say something...\"></textarea>" +
            "<div class=\"subb\"><button dst-name=\"" + data[i].name + "\"" +
            "onClick=\"chat(this)\">Reply</button></div>" +
            '</div></div>';

            /*
            "onclick=\"document.getElementById(\'dialog" +
            data[i].name +'\').innerHTML = document.getElementById(\'dialog' +
            data[i].name +'\').innerHTML' + '+\'<div class=\\' + '\'item' + '\\' + '\'' + '><span>Someone:</span><br>\'' +
            '+document.getElementById(\'textarea1' + '\').value' + 
            '+\'</div>\';' + 'document.getElementById(\'textarea1' + '\').value=\'\';\">Reply</button></div>' +
            '</div></div>';
            */
                
        console.log(res);
    }

    $('#icon-list').append(out);
    $('#list').append(res);
});


// Listen new private message
socket.on('newPrivateMessage', function (data) {
    if (data.target === $("#username").val()) {
        console.log(data.author);
        $('#notify_new_message').text("new message from " + data.author);
        $('#notify_new_message').show();
        $('#notify_new_message').delay(5000).fadeOut(300);

        $("#sendMessageBox").before(
            '<div class="answer left">' +
            '<div class="avatar">' +
            '<img src="http://bootdey.com/img/Content/avatar/avatar6.png" alt="User name">' +
            '<div class=\"status '+ getStatusByName(data.author) +'\"></div>' +
            '</div>' +
            '<div class="name">' + data.author + '</div>' +
            '<div class="text">' + data.content + '</div>' +
            '<div class="time">' + convertTimeStampToDate(data.postedAt) + '</div>' +
            '</div>'
        );
    }
});

function convertTimeStampToDate(timeStamp) {
    var date = new Date(timeStamp);
    return ((date.getMonth() + 1) + '/' + (date.getDate()) + '/' + date.getFullYear() + " " +
    date.getHours() + ':' + ((date.getMinutes() < 10) ? ("0" + date.getMinutes()) : (date.getMinutes())) + ':' +
    ((date.getSeconds() < 10) ? ("0" + date.getSeconds()) : (date.getSeconds())));
}

// Clear user list
function clearUserList(){
    $("#icon-list").empty();
    $("#list").empty();
}

// Retrieve public message
function retrievePublicMessage() {
    $.ajax({
        url: "/messages/public",
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var left = '<div class="answer left">';
                var right = '<div class="answer right">';
                var position = left;
                if (data[i].author === $("#username").val()) {
                    position = right;
                }
                $("#sendMessageBox").before(
                    position +
                    '<div class="avatar">' +
                    '<img src="http://bootdey.com/img/Content/avatar/avatar6.png" alt="User name">' +
                    '<div class=\"status '+ getStatusByName(data[i].author) +'\"></div>' +
                    '</div>' +
                    '<div class="name">' + data[i].author + '</div>' +
                    '<div class="text">' + data[i].content + '</div>' +
                    '<div class="time">' + convertTimeStampToDate(data[i].postedAt) + '</div>' +
                    '</div>'
                );
                //<div class="well">'+ convertTimeStampToDate(data[i].postedAt) + ' <strong>' + data[i].author + '</strong>: ' + data[i].content + '</div>');
            }
        },
        //If there was no resonse from the server
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("GET JSON Error: " + textStatus);
        },
        type: "GET"
    });
}


// Retrieve private message
function reply_click(clicked_id)
{
    var data = clicked_id.split("_");
    $("#privateTitle").html('<h6>'+ 'Private chat with ' + data[3] + '</h6><input id = "sendTo" type="hidden" value="'+data[3]+'">');
    $(document).ready(function( ) {
        $.ajax({
            url: "/messages/private/" + $("#username").val() + "/" + $("#sendTo").val(),
            dataType: "json",
            success: function (data) {
                $("div").remove(".answer.left, .answer.right");
                for (var i = 0; i < data.length; i++) {
                    var left = '<div class="answer left">';
                    var right = '<div class="answer right">';
                    var position = left;

                    console.log(data[i].author);
                    if (data[i].author === $("#username").val())
                        position = right;
                    $("#sendMessageBox").before(
                        position +
                        '<div class="avatar">' +
                        '<img src="http://bootdey.com/img/Content/avatar/avatar6.png" alt="User name">' +
                        '<div class="status '+ getStatusByName(data[i].author) +'\"></div>' +
                        '</div>' +
                        '<div class="name">' + data[i].author + '</div>' +
                        '<div class="text">' + data[i].content + '</div>' +
                        '<div class="time">' + convertTimeStampToDate(data[i].postedAt) + '</div>' +
                        '</div>'
                    );
                    //<div class="well">'+ convertTimeStampToDate(data[i].postedAt) + ' <strong>' + data[i].author + '</strong>: ' + data[i].content + '</div>');
                }
            },
            //If there was no resonse from the server
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("GET JSON Error: " + textStatus);
            },
            type: "GET"
        });
    });
}
