var mongoose = require('mongoose');

module.exports = mongoose.Schema(  
	{
		title : String,
		forumOwner : String,
		date : String,
		description : String,
		comments : [{ commentOnwer : String,
					  date : String,
					  description : String,
					  reply : [{ replyOnwer : String,
								 date : String,
								 description : String}]
					}]
	}
);
