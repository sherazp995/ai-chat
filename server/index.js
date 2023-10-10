require("dotenv").config();
const express = require('express');
const cors = require('cors');
const auth = require("./services/authentication");
const routes = require('./routes');
const { initializeSocket } = require('./services/socket')
const app = express();

// Create and start server
const httpServer = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(auth);
app.set('port', PORT);
app.use(routes);

initializeSocket(httpServer);

httpServer.listen(PORT);
httpServer.on('listening', onListening);

function onListening() {
console.log(`server listening at http://localhost:${PORT}`)
}