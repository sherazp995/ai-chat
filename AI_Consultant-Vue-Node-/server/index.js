require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const httpServer = require("http").createServer();

const io = require("socket.io")(httpServer, {
	cors: {
		origin: "http://localhost:8080",
	},
});

const config = new Configuration({
	apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(config);

const runPrompt = async (user) => {
	const prompt = `
        ${user}. Return response in the following parsable JSON format:
        {
            "Q": "question",
            "A": "answer"
        }

    `;

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 2048,
		temperature: 0.8,
	});

	const parsableJSONresponse = response.data.choices[0].text;

	return parsableJSONresponse;
};

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
socket.on("private message", async ({ content, to }) => {
    let response;

    if (!content) {
        response = await runPrompt(
            `Hi, my name is ${socket.username}. I need counseling.`
        );
    } else {
        response = await runPrompt(`${content}`);
    }

    // console.log(response);

    try {
        const parsedResponse = JSON.parse(response); // Parse the JSON response from the API
        // console.log(parsedResponse); // Check the parsed response in your server logs
        
        // Emit the AI response to both sender and recipient
        socket.emit("private message", {
            content: {
                parsedResponse: parsedResponse,
                question: content, // Add the question to the response
            },
            from: socket.id,
        });

        socket.to(to).emit("private message", {
            content: { parsedResponse }, // Send the parsed question and answer
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

const PORT = process.env.PORT;

httpServer.listen(PORT, () =>
	console.log(`server listening at http://localhost:${PORT}`)
);
