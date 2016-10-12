angular.module('ForumController', []).controller('ForumController', function($scope) {

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
    

    $scope.posts = posts; 





});