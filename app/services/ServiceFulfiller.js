var service = {};
 
service.testService = testService;
 
module.exports = service;

function testService(){
		return [{id: 1,name:"JC v1",jobTitle:"Software Consultant",company:"Thomson Reuters"},
				{id: 2,name:"Stacy Wong",jobTitle:"Software Engineer",company:"net[work]"},
				{id: 3,name:"Ash Borkar",jobTitle:"Software Developer",company:"Visa"}];
}