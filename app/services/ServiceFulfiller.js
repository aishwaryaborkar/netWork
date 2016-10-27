var service = {};
 
service.testService = testService;
service.testForumService = testForumService;
service.testConnectionService = testConnectionService;
service.testPendingConnectionService = testPendingConnectionService;
service.testProfileService = testProfileService;
 
module.exports = service;

function testService(){
		return [{id: 1,name:"JC v1",jobTitle:"Software Consultant",company:"Thomson Reuters"},
				{id: 2,name:"Stacy Wong",jobTitle:"Software Engineer",company:"net[work]"},
				{id: 3,name:"Ash Borkar",jobTitle:"Software Developer",company:"Visa"}];
}

function testForumService(){
	return [{title: "LinkedIn or LinkedOut?", 
				ownerName: "Stacy Wong", 
				date: "July 27, 2016", 
				description:"Default content",
				comments : [{ ownerName : "JC",
								date : "October 26, 2016",
								description : "#1troll strikes with some spams",
								reply : [{ replyOnwer : "Stacy Wong",
											date : "October 26, 2016",
											description : "OMG..."}]},
							{ ownerName : "JC",
								date : "October 26, 2016",
								description : "some more spams",
								reply : [{ replyOnwer : "Stacy Wong",
											date : "October 26, 2016",
											description : "STAHP"}]},
							{ ownerName : "JC",
								date : "October 26, 2016",
								description : "and a bit more than some more spams"}]}, 
			{title: "MEAN Stack, Play Nice", 
				ownerName: "Jonathan Chen", 
				date: "August 18, 2016", 
				description:"Default content"}, 
			{title: "My Reaction to React.js", 
				ownerName: "Aishwarya Borkar", 
				date: "October 5, 2016", 
				description:"Default content"}, 
			{
				title: "Big Data, Big Problems", 
				ownerName: "Anna Meng", 
				date: "October 12, 2016", 
				description:"Default content"}]; 
}

function testConnectionService(){
		return [{id: 1,name:"JC v1",jobTitle:"Software Consultant",company:"Thomson Reuters"},
				{id: 2,name:"Stacy Wong",jobTitle:"Software Engineer",company:"net[work]"}];
}

function testPendingConnectionService(){
		return [{id: 3,name:"Ash Borkar",jobTitle:"Software Developer",company:"Visa"}];
}

function testProfileService(){
	return 	{
				name : "Ash Borkar",
				jobTitle : "Project Manager",
				company : "net[Work]",
				summary : "HI!",
				education : "SJSU Class of 2017",
				experience : [{jobTitle : "President", company : "SWE", responsibility : "BE THE BOSS"},
							  {jobTitle : "Intern", company : "Visa", responsibility : "anything and everything"}],
				skills : [{skillName : "Java", skillLevel : 100},
						  {skillname : "Angular", skillLevel : 50}]
			}
}