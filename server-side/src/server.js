// Requiring all modules that I will need
require('dotenv').config();
const express = require('express');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');

// Declaring importain variables
const app = new express();
const server = http.createServer(app);
const io = socketIo(server);

//Calling routes handlers
(async() => {
	await require('./handlers/routes')(app);
})();

// Configuring the view engine of the server
app.set('view engine', 'ejs');

// Configuring the Express server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Paths
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Cookies
app.use(cookieParser());

// Configuring the Socket.io server
io.on('connection', async(socket) => {
    require('./handlers/socket_io_events')(socket).then(() => {
		console.log('New user has been connected to the server');
		socket.emit('client_connected');
	})
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ error: err.message, status: err.status });
});

module.exports = app;