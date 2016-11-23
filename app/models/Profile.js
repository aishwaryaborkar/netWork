var mongoose = require('mongoose');

module.exports = mongoose.Schema( 
	{
		name : String,
		jobTitle : String,
		company : String,
		summary : String,
		education : [{
						schoolName: String,
						graduationDate: String,
						description: String
					}],
		experience :[{
						jobTitle : String,
						company : String,
						yearsOfExp: Number,
						responsibility : String
					 }],
		skills : [{
					skillName : String,
					skillLevel : { type: Number, min: 0, max: 100 },
					endorsementLevel: { type: Number, min: 0},
					endorsementList: []
				 }],
		connections : [String],
		pendingConnections : [String]
	}
);
