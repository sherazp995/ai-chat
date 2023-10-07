require("dotenv").config();
const express = require('express');
const cors = require('cors');
const auth = require("./services/authentication");
const routes = require('./routes');
const { initializeSocket } = require('./services/socket')

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(auth);
app.use(routes);
app.set('port', PORT);

// Create and start server
const httpServer = require("http").createServer(app);

initializeSocket(httpServer);

httpServer.listen(PORT);
httpServer.on('listening', onListening);

function onListening() {
console.log(`server listening at http://localhost:${PORT}`)
}