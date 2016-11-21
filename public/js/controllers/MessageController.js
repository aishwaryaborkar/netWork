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

app.controller('MessageController', function($scope, $rootScope, dataService, Upload, $sce, socket) {
    console.log('MessageController loaded[]');
    var isLoggedIn = (sessionStorage.getItem('loggedIn') == 'true');
    var id = sessionStorage.getItem('userId');
    console.log('loggedIn user id ' + id);
    socket.on('newPublicMessage',function(message) {
        console.log('new receive message: ' + message);
         $scope.chatMessage = $scope.chatMessage + '<div class=\'item\'><span>' + 
         message.name + 
         ':</span><br>' + message.content 
            + '</div>';

    });
    socket.emit('join', id);
    dataService.getAllUsers(id).then(function(data) {
        console.log('get all users');
        var out = "";
        var res = "";
        for (var i = 0; i < data.length; i++) {
            var htm = '<a href=\"javascipt:void(0)\" ng-click=\"chat(' + 
            '\'' + data[i].name + '\'' + ')\">';
            htm = htm + "<span>" + data[i].name + "</span></a>";
            out += htm;
            console.log(out);
        }
        sessionStorage.setItem('chatName', data[0].name);
        $scope.chatMessage = "";
        $scope.myVal =  $sce.trustAsHtml(out);
    });

    $scope.chat = function(user) {
        console.log('chat user is ' + user);
        $scope.username = user;
        sessionStorage.setItem('chatName', user);
    };

    $scope.reply = function() {
        console.log($scope.replyMessage);
        var id = sessionStorage.getItem('userId');
        var name = sessionStorage.getItem('chatName');
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