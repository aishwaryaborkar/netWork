var mongoose = require('mongoose');

module.exports = mongoose.Schema( 
	{	
		email : String,
		password : String,
		premium : Boolean,
		sQuestion : String,
		sAnswer : String
	}
);
