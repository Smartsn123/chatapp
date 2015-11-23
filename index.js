//Chat App using socket.io : socket.io-server and socket.io-client 
//The main idea behind Socket.IO is that you can send and receive any events 
//you want, with any data you want. Any objects 
//that can be encoded as JSON will do, and binary data is supported too.

var app = require('express')();
var http = require('http').Server(app);
var path = require('path')
//initialize instance of  socket.io by passing the http server object
var io = require('socket.io')(http);

app.get('/', 
          function(req, res)
          {
            res.sendfile(path.join('index.html'));
          }
          );
          

// we listen on the connection  event for incoming page        
io.on('connection',
                  function(socket)
                  {  var socketId = socket.id;
                     var ipd = socket.request.connection.remoteAddress;
                     console.log(ipd+' is now online !');
                     io.emit('chat message',ipd+" is now  online");
                     //upon recieving a chat message
                      socket.on('chat message',
                                             function(msg)
                                              { msg=ipd+" : "+msg;
                                                //console.log(ipd+' message :'+msg);
                                                io.emit('chat message',msg);
                                                //for one to one chat
                                                //io.to(socketid).emit(nick+'message', msg');
                                              }
                               );
                     //upon disconnection tasks  performed
                     socket.on('disconnect',
                                           function()
                                            {
                                              //console.log('user disconnected!');
                                               io.emit('chat message',ipd+" left");
                                             }
                              );
                  }
                  
     );          

http.listen(8080,
                function()
                {
                   console.log('Magic Happens at 8080');
                 }
           );
