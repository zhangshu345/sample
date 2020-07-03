var server = require('./server');
var mysql = require('mysql');
var pool = mysql.createPool({
	host: '192.168.1.2',
    user: 'zhangshu',
	password: 'zsh123456',
	database: 'hc',
	port: 3306
});
server.start(pool);
 