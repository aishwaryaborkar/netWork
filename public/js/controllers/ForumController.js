angular.module('ForumController', ['DataService'])
.controller('ForumController', function($scope, $http, dataService) {

    $scope.heading = "How do I leverage my network?";
    $scope.posts; 

        dataService.getForumList().then( function(searchResult){

            
            $scope.posts = [];  
            
            
            //console.log("In dataService promise function before: " + JSON.stringify($scope.posts));
           
            var i = 0;
            for (i = 0; i < searchResult.data.length ;i++) {

                var obj = { title: searchResult.data[i].title,
                            forumOwnerName: searchResult.data[i].forumOwnerName,
                            date: searchResult.data[i].date,
                            description: searchResult.data[i].description};
                $scope.posts.push(obj);
                //console.log("Element " + i + " in searchResult" + JSON.stringify(searchResult.data[i])); 
            }

           // console.log("In dataService promise function after: " + JSON.stringify($scope.posts));
        });
        
        

  




});