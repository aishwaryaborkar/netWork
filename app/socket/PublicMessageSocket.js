var ServiceFulfiller = require('../services/ServiceFulfiller');
//socket emit 
module.exports = {
    publicMessage : function (socket) {
        socket.on('message', function (message) {
        	var name = message.name;
        	console.log("connection is :" + name);
        	ServiceFulfiller.getProfileById(message.id).then(function(result) {
            	console.log(result);
            	message.name = result.name;
            	console.log(result.name);
               if(ServiceFulfiller.connection[name]) {
                   console.log("emit new Public message "  + message.name);
                   ServiceFulfiller.connection[name].emit('newPublicMessage', message); //broad cast
               } else {
                  console.log("test connection");
               }
        	})
            /*
            console.log('receive message');
            ServiceFulfiller.publicMessage(message, function (err, result) {
                console.log('public message');
                if (err) {
                    socket.emit('status', "not success");
                } else {
                    console.log('newPublicMessage');
                    if(result._id) {
                        var name = message.name;
                        console.log("connection is :" + name);
                        if(ServiceFulfiller.connection[name]) {
                            console.log("emit new Public message "  + name);
                            ServiceFulfiller.connection[name].emit('newPublicMessage', message); //broad cast
                        } else {
                            console.log("test connection");
                        }
                    }
                }
            });*/
        
        });
        socket.on('join', function(id) {
            ServiceFulfiller.getProfileById(id).then(function(result) {
            	console.log(result);
            	console.log(result.name + 'join chat room');
            	ServiceFulfiller.connection[result.name] = socket;
                //console.log(name + 'join chat room');
            });  
            
        });
    }


};