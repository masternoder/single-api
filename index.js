var fs = require('fs');
var https = require('https');

var express = require('express');
var app = express();

var options = {
  key: fs.readFileSync('./dev_keys/file.pem'),
  cert: fs.readFileSync('./dev_keys/file.crt')
};
var serverPort = 443;

var server = https.createServer(options, app);
var io = require('socket.io')(server);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


/*
загрузка конфига 
проверка доступа по паролю + fail2Ban
проверка состояний демона
провека состояний системы
расчет времени блока
высота блока
Сколько всего было получено монет
состояние гетинфо + состояние мастерноды
статус
Версия пастуха
Сменить адрес отправки
рестарт мастрноды
перезапуск блокчейна
отправка монет 
статистика по мастернодам
*/


var block = 142403;
io.on('connection', function(socket) {
  console.log('new connection');
  socket.emit('message', 'This is a message from the dark side.');
  setInterval(function(){
	  block = block + 1;
  	socket.emit('blockHeight', block);
  },2000);
  
  
  
  socket.on('init', data => {
    socket.emit('message', 'INIT');
  });
  
});



server.listen(serverPort, function() {
  console.log('server up and running at %s port', serverPort);
});