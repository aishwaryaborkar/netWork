var mongoose = require('mongoose');

module.exports = mongoose.model('Profile', 
	{
		name : String,
		jobTitle : String,
		company : String,
		summary : String,
		education : String,
		experience : [{jobTitle : String, company : String, responsibility : String}]
		skills : [{skillName : String, skillLevel : Int}]
	}
});
