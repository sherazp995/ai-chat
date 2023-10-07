const socket = require('socket.io');
const { runPrompt } = require('./openai');
let io;

function initializeSocket(server) {
    io = socket(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.use((socket, next) => {
        const username = socket.handshake.auth.username;
        if (!username) {
            return next(new Error("invalid username"));
        }
        socket.username = username;
        next();
    });

    io.on("connection", (socket) => {
        // fetch existing users
        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
            users.push({
                userID: id,
                username: socket.username,
            });
        }
        socket.emit("users", users);

        // notify existing users
        socket.broadcast.emit("user connected", {
            userID: socket.id,
            username: socket.username,
        });

        // forward the private message to the right recipient
        socket.on("private message", async ({ question, to }) => {
            let response;

            if (!question) {
                response = await runPrompt(
                    `Hi, my name is ${socket.username}. I need counseling.`
                );
            } else {
                response = await runPrompt(`${question}`);
            }

            // console.log(response);

            try {
                // Emit the AI response to both sender and recipient
                socket.emit("private message", {
                    content: {
                        question: question, // Add the question to the response
                        answer: response,
                    },
                    from: socket.id,
                });

                socket.to(to).emit("private message", {
                    content: { 
                        question: question,
                        answer: response,
                     }, // Send the parsed question and answer
                    from: socket.id,
                });
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        });


        // notify users upon disconnection
        socket.on("disconnect", () => {
            socket.broadcast.emit("user disconnected", socket.id);
        });
    });
}

function getIO() {
    return io;
}

module.exports = {
    initializeSocket,
    getIO,
};
