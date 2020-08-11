/*
 * 作者：lepon
 * QQ：895115190
 * 代码请保留作者信息
 */
var WebsocketHeartbeatJs = require('./index.js');

const options = {
    url: 'ws://192.168.5.42:8888',//ip地址，请修改为websocket服务端对应地址
    pingTimeout: 5000,
    pongTimeout: 3000,
    reconnectTimeout: 3000,
    pingMsg: "heart beat",
    repeatLimit: 5
}

let websocketHeartbeatJs = new WebsocketHeartbeatJs(options);

websocketHeartbeatJs.onopen = function () {
    log('connect success');
    websocketHeartbeatJs.send('hello aj server');
    log('send hello');
}

websocketHeartbeatJs.onmessage = function (msg, ws) {
    log('onmessage: ' + msg);

    if(msg == 'close'){
        websocketHeartbeatJs.close();
    }
}

websocketHeartbeatJs.onreconnect = function () {
    log('reconnecting...');
}

websocketHeartbeatJs.onclose = function () {
    log('close...');
}

setInterval(
    () => { }, 1000
)