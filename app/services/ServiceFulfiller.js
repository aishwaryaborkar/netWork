var service = {};
 
service.checkLoginCredential = checkLoginCredential;
 
 
//to be deleted testService calls 
service.testService = testService;
service.testForumService = testForumService;
service.testConnectionService = testConnectionService;
service.testPendingConnectionService = testPendingConnectionService;
service.testProfileService = testProfileService;
 
module.exports = service;


/*
var profileSchema = require('./app/models/Profile.js');
var personProfile = mongoose.model('Profile', profileSchema);

var userSchema = require('./app/models/User.js');
var user = mongoose.model('User', userSchema);
			
var createUser = new user({
				email : "jonathan.chen.89@gmail.com",
				password : "password"
			});			
createUser.save(function (err, createUser) {
  if (err) 
	  return console.error(err);
  else
	  return console.log("INSERTED DATA INTO DB");
});

user.find({name:'JC'}, function(err, result){

});

var createProfile = new personProfile({
				name : "JC",
				jobTitle : "Software Consultant",
				company : "net[Work]",
				summary : "O.O",
				education : "too many years to keep count....",
				experience : [{jobTitle : "Software Consultant", company : "Thomson Reuters", responsibility : "Corporate Slave"}],
				skills : [{skillName : "Java", skillLevel : 100},
						  {skillName : "ReactJS", skillLevel : 60},
						  {skillName : "AngularJS", skillLevel : 40}]
			});
createProfile.save(function (err, createProfile) {
  if (err) 
	  return console.error(err);
  else
	  return console.log("INSERTED DATA INTO DB");			

});
ABOVE ARE SAMPLES ON BASIC DB INSERTION, first get a document schema using predefine JSON in each model js file.
base on the schema, create an object and pass in the correct value for each field.
save the object into db
*/





var mongoose = require('mongoose');
var userSchema = require('../models/User.js');
var db = mongoose.connection;
//===========================================
//LOGIN or REGISTRATION RELATED SERVICES.....
//===========================================
function checkLoginCredential(loginInfo){
	var data = JSON.stringify(loginInfo);
	console.log("IN CHECK LOGIN CREDENTIAL : " + data);
	var user = mongoose.model('Users', userSchema);
	return user.find({email: loginInfo.email, password: loginInfo.password}, function(err, result){
		if(err) return console.error(err);
		console.log(result);
		return result;
	});
	
		/* finds a specific user with email = stacywong0402@gmail.com from the user collection
	user.find({email:"stacywong0402@gmail.com"}, function(err, result){
		if(err) return console.error(err);
		console.log(result);
	});*/
	
	/*finals all user from user collection
	user.find(function(err, result){
		if(err) return console.error(err);
		console.log(result);
	});*/

}

//===========================================
//PROFILE RELATED SERVICES...................
//===========================================
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

function testConnectionService(){
		return [{id: 1,name:"JC v1",jobTitle:"Software Consultant",company:"Thomson Reuters"},
				{id: 2,name:"Stacy Wong",jobTitle:"Software Engineer",company:"net[work]"}];
}

function testPendingConnectionService(){
		return [{id: 3,name:"Ash Borkar",jobTitle:"Software Developer",company:"Visa"}];
}

function testService(){
		return [{id: 1,name:"JC v1",jobTitle:"Software Consultant",company:"Thomson Reuters"},
				{id: 2,name:"Stacy Wong",jobTitle:"Software Engineer",company:"net[work]"},
				{id: 3,name:"Ash Borkar",jobTitle:"Software Developer",company:"Visa"}];
}


//===========================================
//MESSAGE RELATED SERVICES...................
//===========================================


//===========================================
//FORUM RELATED SERVICES.....................
//===========================================
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