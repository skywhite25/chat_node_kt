const express = require('express')
const path = require('path')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//���������ϱ� ��������
console.log("outside io");

io.on('connection', function (socket) {

    //�α����ϸ� �̰� �ؿ� �ΰ���
    console.log('User Conncetion');

    socket.on('connect user', function (user) {
        console.log("Connected user ");
        socket.join(user['roomName']);
        console.log("roomName : ", user['roomName']);
        console.log("state : ", socket.adapter.rooms);
        io.emit('connect user', user);
    });

    //Ÿ�����߿� �̰Ŷ�
    socket.on('on typing', function (typing) {
        console.log("Typing.... ");
        io.emit('on typing', typing);
    });

    //�޼��� �Է��ϸ� ���� �α׿� �̰Ŷ�
    socket.on('chat message', function (msg) {
        console.log("Message " + msg['message']);
        console.log("������ �޼��� : ", msg['roomName']);
        io.to(msg['roomName']).emit('chat message', msg);
    });
});

//��ó���� ���� �����ϸ� �����Ʈ�� ���� ����Ǿ��ִ��� ����
http.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});