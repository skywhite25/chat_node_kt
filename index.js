const express = require('express')
const path = require('path')
var app = express();
var http = require('http').Server(app);
var io = require(socket.io)(http);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views는 모든 템플릿 파일을 위한 저장공간
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// 서버 연결 직전
console.log("outside io");

io.on('connection', function (socket) {

	// 로그인 콘솔
	console.log('user connection');

	socket.on('connect user', function (user) {

		console.log("Connection User");
		socket.join(user['roomName']);
		console.log("roomName : ", user['roomName']);
		console.log("state : ", socket.adapter.rooms);
		io.emit('connect user', user);
	});

		// 메시지 입력시 뜨는 로그
		socket.on('chat message', function (msg) {
		console.log("Message " + msg['message']);
		console.log("보내는 아이디 : ", msg['roomName']);
		io.to(msg['roomName']).emit('chat message', msg);
		});
	)};

// 맨 처음 서버 연결시 포트 확인
http.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});
