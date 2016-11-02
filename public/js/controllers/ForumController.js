angular.module('ForumController', ['DataService'])
.controller('ForumController', function($scope, $http, dataService) {

    $scope.heading = "How do I leverage my network?";

    var posts = 

    	[{
    		postName: "LinkedIn or LinkedOut?", 
    		postAuthor: "Stacy Wong", 
    		postDate: "July 27, 2016", 
    		postContent:"Default content"
    	}, 

    	{
    		postName: "MEAN Stack, Play Nice", 
    		postAuthor: "Jonathan Chen", 
    		postDate: "August 18, 2016", 
    		postContent:"Default content"

    	}, 

    	{
    		postName: "My Reaction to React.js", 
    		postAuthor: "Aishwarya Borkar", 
    		postDate: "October 5, 2016", 
    		postContent:"Default content"

    	}, 

    	{
    		postName: "Big Data, Big Problems", 
    		postAuthor: "Anna Meng", 
    		postDate: "October 12, 2016", 
    		postContent:"Default content"

    	}]; 
    




    $scope.title = "";
    
    var post =

    [{
        title : "",
        forumOwner : "",
        date : "",
        description : ""
    }];

    $scope.posts; 


        // dataService.testForumService().then( function(forumResult){

        //     console.log("In dataService promise function b4 cpy: " + JSON.stringify(forumResult));
        //     console.log("In dataService promise function b4 cpy: " + JSON.stringify($scope.posts));   
           
            
        //     var i = 0;
        //     for (i = 0; i < forumResult.length ;i++) {
        //         var obj = { id: forumResult[i].id,
        //                     forumOwner: forumResult[i].forumOwner,
        //                     date: forumResult[i].date,
        //                     description: forumResult[i].description }
        //         $scope.posts.push(obj);
        //     }
            
        //     console.log("In dataService promise function after cpy: " + JSON.stringify(forumResult));
        //     console.log("In dataService promise function after cpy: " + JSON.stringify($scope.posts));
        // });


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