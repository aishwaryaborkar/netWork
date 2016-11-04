var service = {};
 
//account related service
service.checkLoginCredential = checkLoginCredential;

//profile related service
service.getProfileById = getProfileById;
service.performSearch = performSearch;

 
//forum related service
service.getForumList = getForumList;
service.getForumById = getForumById;
service.createForumPost = createForumPost;

//message related service
 
 
//to be deleted testService calls 
service.testService = testService;
service.testForumService = testForumService;
service.testConnectionService = testConnectionService;
service.testPendingConnectionService = testPendingConnectionService;
service.testProfileService = testProfileService;
 
module.exports = service;


/* CREATING USER ACCOUNT -> THEN CREATE PROFILE (REGISTRATION PROCESS)
var profileSchema = require('./app/models/Profile.js');
var personProfile = mongoose.model('Profile', profileSchema);

var userSchema = require('./app/models/User.js');
var user = mongoose.model('User', userSchema);
			
var createUser = new user({
				email : "admin",
				password : "password"
			});			
createUser.save(function (err, createUser) {
  if (err) 
	  return console.error(err);
  else
	  return console.log("INSERTED DATA INTO DB");
});

user.find({email: /admin/}, function(err, result){
	console.log(result);
	var createProfile = new personProfile({
				_id : result[0]._id,
				name : "admin",
				jobTitle : "admin",
				company : "net[Work]",
				summary : ".",
				education : ".",
				experience : [],
				skills : []
			});
	createProfile.save(function (err, createProfile) {
		if (err) 
			return console.error(err);
		else
			return console.log("INSERTED DATA INTO DB");			

	});
});

ABOVE ARE SAMPLES ON BASIC DB INSERTION, first get a document schema using predefine JSON in each model js file.
base on the schema, create an object and pass in the correct value for each field.
save the object into db
*/





var mongoose = require('mongoose');
var userSchema = require('../models/User.js');
var profileSchema = require('../models/Profile.js');
var forumSchema = require('../models/Forum.js');
var messageSchema = require('../models/Message.js');
var db = mongoose.connection;

//===========================================
//ACCOUNT RELATED SERVICES.....
//===========================================
function checkLoginCredential(loginInfo){
	var data = JSON.stringify(loginInfo);
	console.log("IN CHECK LOGIN CREDENTIAL : " + data);
	var user = mongoose.model('Users', userSchema);
	return user.findOne({email: loginInfo.email, password: loginInfo.password}, '_id premium',function(err, result){
		if(err) return console.error(err);
		console.log(result);
		return result;
	});
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

function getProfileById(userId){
	console.log("IN getProfileById : " + userId);
	var profile = mongoose.model('Profiles', profileSchema);
	return profile.findById(userId, function(err, result){
		if(err) return console.error(err);
		console.log(result);		
		return result;
	});
}

function performSearch(searchInfo){
	var data = JSON.stringify(searchInfo);
	console.log("IN PERFORMSEARCH : " + data);
	
	var searchObj = {};
	Object.keys(searchInfo).forEach(function(key, index){
		if(searchInfo[key] !== ''){
			searchObj[key] = new RegExp(searchInfo[key], "g");
		}
	}); //so far it only works for normal properties. skills and experience currently not working
	
	var profile = mongoose.model('Profiles', profileSchema);
	//return profile.find(searchInfo, function(err, result){
	return profile.find(searchObj, function(err, result){
		if(err) return console.error(err);
		console.log(result);
		return result;
	});
}

//===========================================
//FORUM RELATED SERVICES.....................
//===========================================
function getForumList(){
	console.log("IN getForumList : requesting data from DB");
	var forum = mongoose.model('Forums', forumSchema);
	return forum.findOne( {}, '_id title forumOwnerId forumOwnerName date description',function(err, result){
		if(err) return console.error(err);
		console.log(result);		
		return result;
	});	
}

function getForumById(forumId){
	console.log("IN getForumById : " + forumId);
	var forum = mongoose.model('Forums', forumSchema);
	return forum.findById(forumId, function(err, result){
		if(err) return console.error(err);
		console.log(result);		
		return result;
	});	
}

function createForumPost(forumData){
	console.log("IN createForumPost : " + forumData);
	var forum = mongoose.model('Forums', forumSchema);
	
	//create the forum object`
	var createForum = new forum(forumData);
	
	//saving the forum object
	return createForum.save(function (err, createForum) {
		if (err) 
			return console.error(err);
		else
			return {message:"OK"};
	});
}

//===========================================
//MESSAGE RELATED SERVICES...................
//===========================================

function testForumService(){
	return [{title: "LinkedIn or LinkedOut?", 
				ownerName: "Stacy Wong", //58123f3d1cdd73d423e93971
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