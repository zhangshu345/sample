var express = require('express');
var app = express();
 
app.get('/androidjs/api/login', function (req, res) {
   res.send('androidjs login -get');
})
 //  POST 请求
app.post('/androidjs/api/login', function (req, res) {
    console.log("主页 POST 登录");
    res.send('androidjs login -get');
 })

 app.get('/androidjs/api/logout', function (req, res) {
    res.send('androidjs login -get');
 })
  //  POST 请求
 app.post('/androidjs/api/logout', function (req, res) {
     console.log("主页 POST 登录");
     res.send('androidjs login -post 登出');
})

app.get('/androidjs/api/check', function (req, res) {
    res.send('androidjs login -get');
 })


var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})