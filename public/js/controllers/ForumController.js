angular.module('ForumController', ['DataService'])
.controller('ForumController', function($scope, $http, $routeParams, dataService, $location) {

    //Forum attributes 
    $scope.title; 
    $scope.heading = "How do I leverage my network?";
    $scope.posts;

        //Populates the Forum page with existing forums on page load.
        dataService.getForumList($routeParams.ownerId).then( function(searchResult){

            
            $scope.posts = [];  
            var anArray = [];
            $scope.commentsArr = [];
            //console.log("In dataService promise function before: " + JSON.stringify($scope.posts));
            var i = 0;
            for (i = 0; i < searchResult.data.length ;i++) {
                anArray.push(searchResult.data[i]._id)
                var obj = { title: searchResult.data[i].title,
                            ownerId:searchResult.data[i].ownerId,
                            forumOwnerName: searchResult.data[i].forumOwnerName,
                            date: searchResult.data[i].date,
                            description: searchResult.data[i].description,
                            _id: searchResult.data[i]._id};
                $scope.posts.push(obj);
                //console.log("Element " + i + " in searchResult" + JSON.stringify(searchResult.data[i])); 
            }
            second();
            function second(){
                console.log(anArray)
                for(var i = 0; i < anArray.length; i++){
                    dataService.getForumById({'_id': anArray[i]}).then(function(data){
                        $scope.commentsArr.push(data.comments.length)
                    });
                }
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

         forum.ownerId = sessionStorage.getItem('userId');
         forum.date = fullDate;

        dataService.createForum(forum).then(function(data){
            toastr.success('Forum Created.')
            $location.path('/forum');     
         }); 
        }

        $scope.loadForumById = function(post) {
            var postId = post._id;
            $location.path('/forumTopic/' + postId);
        }

        $scope.visitProfile = function(post){
        console.log(post.ownerId);
        $location.path('/viewprofile/' + post.ownerId);
    }
})

.controller('ForumTopicController', function($scope, $routeParams, dataService, Upload) {
        $scope.comments; 

        var forumId = $routeParams._id;
        dataService.getForumById({'_id': forumId}).then(function(data){
        $scope.forum = data;
        $scope.forumComments = data.comments;
        console.log(data);
        console.log(comments);

            $scope.comments = [];

            for (var i = 0; i < $scope.forumComments.length ; i++) {

                var obj = { ownerId: $scope.forumComments[i].ownerId,
                            commentOwnerName: $scope.forumComments[i].commentOwnerName,
                            date: $scope.forumComments[i].date,
                            description: $scope.forumComments[i].description
                            };
                $scope.comments.push(obj);

            }
        });
		
		$scope.visitProfile = function(post){
        console.log(post);
        $location.path('/viewprofile/' + post.ownerId);
	   }

        $scope.addComment = function(comment){
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

         comment.ownerId = sessionStorage.getItem('userId');
         comment.commentOwnerName = sessionStorage.getItem('userName');

         console.log("commentOwnerName: " + comment.commentOwnerName);
         comment.date = fullDate;

         $scope.comments.push(comment);

         dataService.addComment(forumId, $scope.comments);
        }

});