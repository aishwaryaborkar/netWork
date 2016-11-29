var app = angular.module('MessageController', ['DataService', 'ngSanitize'])

app.factory('socket', function($rootScope) {
    var socket = io();
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
})

app.controller('MessageController', function($scope, $rootScope, $http, dataService, Upload, $sce, socket, $location) {
console.log('MessageController loaded[]');
    var isLoggedIn = (sessionStorage.getItem('loggedIn') == 'true');
    var id = sessionStorage.getItem('userId');
    console.log('loggedIn user id ' + id);
    $scope.chatHistory = [];
    $scope.selectedUser = ''
    socket.on('newPublicMessage',function(message) {
        // console.log(message);
         $scope.chatMessage = $scope.chatMessage + '<div class=\'item\'><span>' + 
         message.name + 
         ':</span><br>' + message.content 
            + '</div>';
        $scope.chatHistory.push({
            name: message.name,
            content: message.content,
            id: message.id,
            style: 'pull-right'
        })
        console.log('********',$scope.chatHistory)
    });
    $scope.namesCollection = [];
    socket.emit('join', id);
    dataService.getAllUsers(id).then(function(data) {
        console.log(data)
        // console.log('get all users');
        var out = "";
        var res = "";
        $scope.namesCollection = data;
        for (var i = 0; i < data.length; i++) {
            $scope.namesCollection[i].selected = false;
            var htm = '<a href=\"javascipt:void(0)\" ng-click=\"chat(' + 
            '\'' + data[i].name + '\'' + ')\">';
            htm = htm + "<span>" + data[i].name + "</span></a>";
            out += htm;
            // console.log(out);
        }
        sessionStorage.setItem('chatName', data[0].name);
        $scope.chatMessage = "";
        $scope.chatHistory = [];
        $scope.myVal =  $sce.trustAsHtml(out);
    });

    //initial load?
    // dataService.getHistoryChatMsg(sessionStorage.getItem('userId'),
    //         sessionStorage.getItem('chatName')).then(function (data) {
    //             console.log('from first call', sessionStorage.getItem('userId'), sessionStorage.getItem('chatName'))
    //             console.log("getHistoryChatMsg: %s",  JSON.stringify(data));
    //             console.log(data);
    //             for (var i = 0; i < data.length; i++) {
    //                 $scope.chatMessage = $scope.chatMessage + '<div class=\'item\'><span>' +
    //                 (data[i].fromUserId ==sessionStorage.getItem('userId') ? "You" : data[i].toUserName)+
    //                     ':</span><br>' + data[i].msgContent
    //                     + '</div>';
    //                 if(data[i].fromUserId == sessionStorage.getItem('userId')){
    //                     $scope.chatHistory.push({
    //                         name: data[i].fromUserId,
    //                         content: data[i].msgContent,
    //                         id: sessionStorage.getItem('userId'),
    //                         style: 'pull-left',
    //                         time: data[i].time
    //                     })                        
    //                 }
    //                 else{
    //                     $scope.chatHistory.push({
    //                         name: data[i].toUserName,
    //                         content: data[i].msgContent,
    //                         id: data[i].fromUserId,
    //                         style: 'pull-right',
    //                         time: data[i].time
    //                     })                            
    //                 }
    //                 console.log('********',$scope.chatHistory)
    //             }
    // dataService.getHistoryChatMsg(sessionStorage.getItem('chatName'),
    //                 sessionStorage.getItem('userId')).then(function (data) {

    //             console.log("getHistoryChatMsg: %s",  JSON.stringify(data));
    //             console.log(data);
    //             for (var i = 0; i < data.length; i++) {
    //                 $scope.chatMessage = $scope.chatMessage + '<div class=\'item\'><span>' +
    //                 (data[i].fromUserId ==sessionStorage.getItem('userId') ? "You" : data[i].toUserName)+
    //                     ':</span><br>' + data[i].msgContent
    //                     + '</div>';
    //                 if(data[i].fromUserId == sessionStorage.getItem('userId')){
    //                     $scope.chatHistory.push({
    //                         name: data[i].fromUserId,
    //                         content: data[i].msgContent,
    //                         id: sessionStorage.getItem('userId'),
    //                         style: 'pull-left',
    //                         time: data[i].time
    //                     })                        
    //                 }
    //                 else{
    //                     $scope.chatHistory.push({
    //                         name: data[i].toUserName,
    //                         content: data[i].msgContent,
    //                         id: data[i].fromUserId,
    //                         style: 'pull-right',
    //                         time: data[i].time
    //                     })                            
    //                 }
    //                 console.log('********',$scope.chatHistory)
    //             }
    //         });
    // });

// $scope.chatHistory.sort(function(x, y){
//     return x.time - y.time;
// })
// console.log($scope.chatHistory)

    //get reverse


    $scope.chat = function(index, user) {
        $scope.selectedUser = 'with ' + user.name
        for(var i = 0; i < $scope.namesCollection.length; i++){
            $scope.namesCollection[i].selected = false;
        }
        $scope.namesCollection[index].selected = true;

        $(this).addClass('active');
        $scope.chatMessage = '';
        $scope.chatHistory = [];
        console.log('chat user is ' + user.name);
        var otherUser = user._id;
        $scope.username = user.name;
        sessionStorage.setItem('chatName', user.name);
    
        var id = sessionStorage.getItem('userId');
        var name = sessionStorage.getItem('chatName');        
        // $http.post("/api/getHistoryChatMsg/", { fromUserId: id, toUserName: name })
        //     .success(function (data, status) {
        //         console.log("/api/saveChatMessage/", data, status);

        //         for (var i = 0; i < data.length; i++) {
        //             $scope.chatMessage = $scope.chatMessage + '<div class=\'item\'><span>' +
        //                 (data[i].fromUserId == id ? "You" : data[i].toUserName) +
        //                 ':</span><br>' + data[i].msgContent
        //                 + '</div>';
        //             if(data[i].fromUserId == id){
        //                 $scope.chatHistory.push({
        //                     name: data[i].fromUserId,
        //                     content: data[i].msgContent,
        //                     id: id,
        //                     style: 'pull-left',
        //                     time: data[i].time
        //                 })                        
        //             }
        //             else{
        //                 $scope.chatHistory.push({
        //                     name: data[i].toUserName,
        //                     content: data[i].msgContent,
        //                     id: data[i].fromUserId,
        //                     style: 'pull-right',
        //                     time: data[i].time
        //                 })                            
        //             }
        //             console.log('********',$scope.chatHistory)
        //         }
        //     }); 
    //initial load?
    dataService.getHistoryChatMsg(user._id, sessionStorage.getItem('userName')).then(function (data) {
                console.log('first', user._id, sessionStorage.getItem('userName'))
                console.log("getHistoryChatMsg: %s",  JSON.stringify(data));
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    $scope.chatMessage = $scope.chatMessage + '<div class=\'item\'><span>' +
                    (data[i].fromUserId ==sessionStorage.getItem('userId') ? "You" : data[i].toUserName)+
                        ':</span><br>' + data[i].msgContent
                        + '</div>';
                    if(data[i].fromUserId == sessionStorage.getItem('userId')){
                        $scope.chatHistory.push({
                            name: data[i].fromUserId,
                            content: data[i].msgContent,
                            id: sessionStorage.getItem('userId'),
                            style: 'pull-left',
                            time: data[i].time
                        })                        
                    }
                    else{
                        $scope.chatHistory.push({
                            name: data[i].toUserName,
                            content: data[i].msgContent,
                            id: data[i].fromUserId,
                            style: 'pull-right',
                            time: data[i].time
                        })                            
                    }
                    console.log('********',$scope.chatHistory)
                }
                dataService.getHistoryChatMsg(sessionStorage.getItem('userId'),
                                            sessionStorage.getItem('chatName')).then(function (data) {
                            console.log('second', sessionStorage.getItem('userId'), sessionStorage.getItem('chatName'))
                            console.log("getHistoryChatMsg: %s",  JSON.stringify(data));
                            console.log(data);
                            for (var i = 0; i < data.length; i++) {
                                $scope.chatMessage = $scope.chatMessage + '<div class=\'item\'><span>' +
                                (data[i].fromUserId ==sessionStorage.getItem('userId') ? "You" : data[i].toUserName)+
                                    ':</span><br>' + data[i].msgContent
                                    + '</div>';
                                if(data[i].fromUserId == sessionStorage.getItem('userId')){
                                    $scope.chatHistory.push({
                                        name: data[i].fromUserId,
                                        content: data[i].msgContent,
                                        id: sessionStorage.getItem('userId'),
                                        style: 'pull-left',
                                        time: data[i].time
                                    })                        
                                }
                                else{
                                    $scope.chatHistory.push({
                                        name: data[i].toUserName,
                                        content: data[i].msgContent,
                                        id: data[i].fromUserId,
                                        style: 'pull-right',
                                        time: data[i].time
                                    })                            
                                }
                                console.log('********',$scope.chatHistory)
                            }
                        $scope.chatHistory.sort(function(a,b){ 
                            if (a.time < b.time) return -1; 
                            else if (a.time > b.time) return 1; 
                            else return 0;
                        });
// window.setInterval(function() {
//   var elem = document.getElementById('chatarea');
//   elem.scrollTop = elem.scrollHeight;
// }, 5000);
                });

    });


    };

    $scope.myStyle = function(x) {
        $scope.value = 'chat-img1' + ' ' + x.style
        return $scope.value;
    } 

    $scope.visitProfile = function(post){
        console.log(post);
        $location.path('/viewprofile/' + post.id);
    }

    $scope.reply = function() {
        console.log($scope.replyMessage);
        var id = sessionStorage.getItem('userId');
        var name = sessionStorage.getItem('chatName');
        
        

        console.log("reply", id, name);
        console.log('chat user is ' + name);
        var message = {
            id: id,
            name: name,
            content: $scope.replyMessage,
            date: new Date()
        }
        socket.emit('message', message);
        var h = $scope.myDialog;

        $scope.chatMessage = $scope.chatMessage + '<div class=\'item\'><span>You:</span><br>' + $scope.replyMessage 
            + '</div>';

        $scope.chatHistory.push({
            name: id,
            content: $scope.replyMessage,
            id: id,
            style: 'pull-left'
        })    
        console.log('********',$scope.chatHistory)
        $scope.replyMessage = '';
        
        $http.post("/api/saveChatMessage/", message).success(function (data, status) {
            console.log("/api/saveChatMessage/", data, status);
        });
        
    };
})

app.directive('dir', function($compile, $parse) {
    return {
      restrict: 'E',
      link: function(scope, element, attr) {
        scope.$watch(attr.content, function() {
          element.html($parse(attr.content)(scope));
          $compile(element.contents())(scope);
        }, true);
      }
    }
  })