angular.module('ForumController', ['DataService'])
.controller('ForumController', function($scope, $http, dataService, $location) {

    //Forum attributes 

    $scope.title; 
    $scope.heading = "How do I leverage my network?";
    $scope.posts; 

        //Populates the Forum page with existing forums on page load.
        dataService.getForumList().then( function(searchResult){

            
            $scope.posts = [];  
            
            
            //console.log("In dataService promise function before: " + JSON.stringify($scope.posts));
           
            var i = 0;
            for (i = 0; i < searchResult.data.length ;i++) {

                var obj = { title: searchResult.data[i].title,
                            forumOwnerName: searchResult.data[i].forumOwnerName,
                            date: searchResult.data[i].date,
                            description: searchResult.data[i].description,
                            _id: searchResult.data[i]._id};
                $scope.posts.push(obj);
                //console.log("Element " + i + " in searchResult" + JSON.stringify(searchResult.data[i])); 
            }

           // console.log("In dataService promise function after: " + JSON.stringify($scope.posts));
        });


        // Saves the Forum created by the user. 
        $scope.createForum = function(forum){       
         var monthNames = [
              "January", "February", "March",
              "April", "May", "June", "July",
              "August", "September", "October",
              "November", "December"
            ];

         var date = new Date();
         var day = date.getDate();
         var monthIndex = date.getMonth();
         var year = date.getFullYear();

         var fullDate = monthNames[monthIndex] + ' ' + day + ', ' + year; 

         forum.forumOwnerId = sessionStorage.getItem('userId');
         forum.date = fullDate;

         dataService.createForum(forum);

        }

        $scope.addComment = function(){

        }

        $scope.loadForumById = function(post) {
            var postId = post._id;
            $location.path('/forumTopic/' + postId);
        }
})

.controller('ForumTopicController', function($scope, $routeParams, dataService, Upload) {
        var forumId = $routeParams._id;
        dataService.getForumById({'_id': forumId}).then(function(data){
        $scope.forum = data;
        console.log(data);
});

});