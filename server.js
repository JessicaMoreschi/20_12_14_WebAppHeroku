// SERVER
console.log("node is running")
// crea local server
let express = require("express");
let socket = require("socket.io");
let app = express();
var port = process.env.PORT || 3000;
let server = app.listen(port);
app.use(express.static("public"));
//crea connessione input/output
let io = socket(server)
io.on("connection", newConnection) //esegui quando un client si connette


// RICEZIONE/INVIO (from 1 client to all)
function newConnection(socket) {

  socket.on("testoOut", function(dataReceived) { // testo coundown
    socket.broadcast.emit("testoIn", dataReceived)
  });
  socket.on("startTimer", function() { // start timer
    socket.broadcast.emit("startTimer")
  });
  socket.on("stopTimer", function() { // reset timer
    socket.broadcast.emit("stopTimer")
  });
  socket.on("resetTimer", function() { // stop timer
    socket.broadcast.emit("resetTimer")
  });

  socket.on("bonusOut", function(dataReceived) { //bonus
    socket.broadcast.emit("bonusIn", dataReceived)
  });

  socket.on("daspoOut", function(dataReceived){//daspo
  socket.broadcast.emit("daspoIn", dataReceived)
  });

  socket.on("trombettaSocketOn", function(){//trombettaon
  socket.broadcast.emit("trombettaSocketOn")
  });

  socket.on("trombettaSocketOff", function(){//trombettaoff
  socket.broadcast.emit("trombettaSocketOff")
  });

  socket.on("sayForza", function(){//forza
  socket.broadcast.emit("sayForzaOut")
  });

  socket.on("sayBravi", function(){//bravi
  socket.broadcast.emit("sayBraviOut")
  });

  socket.on("sayOpla", function(){//opla
  socket.broadcast.emit("sayOplaOut")
  });


  //* aggiungi qui i messaggi per farli rimbalzare a tutti
}
