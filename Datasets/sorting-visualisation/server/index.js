/*
This JavaScript code snippet uses Express.js, a popular web application framework for Node.js, to set up a simple server that serves static files from a directory and listens to HTTP requests.

The code starts by importing the Express.js module and creating an instance of it, called app. The http module is also required, and a server is created using http.createServer(app). The server is then told to listen for connections on port 1337.

The express.static middleware is used with app.use to serve static files. These are files that are delivered to the client exactly as they are stored, without any server-side processing. In this case, the files are served from the client directory, located one level up from the directory where this index.js file is stored (as indicated by __dirname + "/../client").

Lastly, a route handler for GET requests to the root path (/) is defined. When such a request is received, the server responds by sending the file index.html located in the client directory. The res.sendFile method is used for this purpose, with the path to the index.html file constructed similarly to the path for the static files.

So, in summary, this is a minimalistic Node.js server that listens on port 1337 and serves an index.html file along with any other static files located in the client directory.
*/
const express = require("express");
const app = express();
const server = require("http").createServer(app);

server.listen(1337);

app.use(express.static(__dirname + "/../client"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/../client/index.html");
});
