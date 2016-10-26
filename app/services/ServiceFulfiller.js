var service = {};
 
service.testService = testService;
 
module.exports = service;

function testService(){
		return [{id: 1,name:"JC v1",jobTitle:"Software Consultant",company:"Thomson Reuters"},
				{id: 2,name:"Stacy Wong",jobTitle:"Software Engineer",company:"net[work]"},
				{id: 3,name:"Ash Borkar",jobTitle:"Software Developer",company:"Visa"}];
}

function testForum(){
	return [{
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
}