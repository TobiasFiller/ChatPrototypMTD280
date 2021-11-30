let io = require('socket.io')(9942, {
    cors: {
        origin: '*'
    }
});

let clients = [];

function joinHandler(name){
    let message;
    message = {
        name: "",
        text: name + " joined!"
    }

    distributeMessage(message);
}

function distributeMessage(message){
    for(let i=0; i <clients.length;i++){
        clients[i].send(message);
    }
     console.log(message.name + ": " + message.text);

}

function leaveHandler(name) {
    let message;
    message = {
        name: "",
        text: name + " left!"
    }
    distributeMessage(message);
}

function messageHandler(data) {
    if (data.join){
        joinHandler(data.name);
    } else if (data.leave){
        leaveHandler(data.name);
    } else {
        distributeMessage(data);
    }
}

io.on('connection' ,function (socket) {
    clients.push(socket);
    socket.on('message',messageHandler);

});

console.log("Server listening on port 9942");