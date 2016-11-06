angular.module('ForumController', ['DataService'])
.controller('ForumController', function($scope, $http, dataService) {

    $scope.heading = "How do I leverage my network?";
    $scope.posts; 

        dataService.testForumService().then( function(searchResult){

            
            $scope.posts = [];  
            
            
            console.log("In dataService promise function before: " + JSON.stringify($scope.posts));
            
            var i = 0;
            for (i = 0; i < searchResult.length ;i++) {
                var obj = { title: searchResult[i].title,
                            forumOwner: searchResult[i].forumOwner,
                            date: searchResult[i].date,
                            description: searchResult[i].description};
                $scope.posts.push(obj);
            }
        });
        
        //changing the temp value right under the search criteria for testing purpose....
        console.log("In dataService promise function after: " + JSON.stringify($scope.posts));

  




});