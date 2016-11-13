var mongoose = require('mongoose');

module.exports = mongoose.Schema( 
	{	
		email : String,
		password : String,
		premium : Boolean,
		birthday : String,
		sQuestion : String,
		sAnswer : String,
		birthday : String
	}
);
