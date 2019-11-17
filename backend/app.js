const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const socket = require("socket.io");

//routes
const usersRouter = require("./routes/users.js");
const sessionsRouter = require("./routes/sessions.js")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, "../frontend/build")));


app.use(
    session({
      secret: "aubrey",
      resave: false,
      saveUninitialized: true
    })
  );

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", usersRouter);
app.use("/api/sessions/", sessionsRouter);

const server = app.listen(3100, function() {
	console.log(3100);
});
// app.use(express.static('public'))
const io = socket(server);

io.on("connection", function(socket) {
	console.log("made the connection", socket.id);

	socket.on("chat", function(data) {
		io.sockets.emit("chat", data);
	});

	socket.on("typing", function(data) {
		console.log(data);
		socket.broadcast.emit("typing", data);
	});
});
