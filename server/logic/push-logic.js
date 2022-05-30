const http = require("http");
const express = require("express");

const expressServer = express();
const httpServer = http.createServer(expressServer);
const socketIO = require("socket.io")(httpServer, {
    cors: {
        origin: ['http://localhost:3000']
    },
});
const jwt_decode = require('jwt-decode');

const socketServer = socketIO.listen(httpServer);

let userIdToSocketsMap = new Map();

socketServer.sockets.on("connection", socket => {
    let userId = getUserIdFromSocket(socket);

    console.log("User id: " + userId);

    console.log("One client has been connected... Total clients: " + userIdToSocketsMap.size);

    if (userIdToSocketsMap.has(userId)) {
        userIdToSocketsMap.get(userId).push(socket);
    }
    else {
        userIdToSocketsMap.set(userId, [socket]);
    }

    // 7. When user disconnects: 
    socket.on("disconnect", () => {
        let userId = getUserIdFromSocket(socket);

        let socketArray = userIdToSocketsMap.get(userId);
        if (socketArray.length > 1) {
            socketArray = socketArray.filter((userSocket) => userSocket != socket);
            userIdToSocketsMap.set(userId, socketArray);
        }
        else {
            userIdToSocketsMap.delete(userId);
        }

        console.log(userId + " client has been disconnected. Total clients: " +
            userIdToSocketsMap.size);
    });

});

function getUserIdFromSocket(socket) {
    var handshakeData = socket.request;
    let token = handshakeData._query['token'];
    let decodedToken = jwt_decode(token);
    let userId = decodedToken.userId;
    return userId;
}

async function broadcast(actionName, data) {
    for (let [id, socketArray] of userIdToSocketsMap) {
        for (let socket of socketArray) {
            console.log("Action: " + actionName, id)
            socket.emit(actionName, data);
        }
    };
};

httpServer.listen(3002, () => console.log("Push server listening on http://localhost:3002"));

module.exports = {
    broadcast,
}