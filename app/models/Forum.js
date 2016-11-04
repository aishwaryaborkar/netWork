var mongoose = require('mongoose');

module.exports = mongoose.Schema(  
	{
		title : String,
		forumOwnerId : String,
		forumOwnerName : String,
		date : String,
		description : String,
		comments: [{ commentOwnerId : String,
					 commentOwnerNmae : String,
					  date : String,
					  description : String,
					  reply : [{ replyOwnerId : String,
								 replyOwnerName : String,
								 date : String,
								 description : String}]
					}]
	}
);
