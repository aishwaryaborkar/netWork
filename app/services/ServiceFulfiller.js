var service = {};
 
service.testService = testService;
 
module.exports = service;


function testService(){
		return [{
			name:"Stacy Wong",
			jobTitle:"Software Engineer",
			company:"net[work]"
		},
		{
			name:"Ash Borkar",
			jobTitle:"Software Developer",
			company:"Visa"
		}];
}