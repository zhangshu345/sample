var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var Appdata=require('./appdata.js');
var appdata=new Appdata();


var yuedudb="hongshuyuedu"
var yueducollection="yuedu"
app.get('/',function(req,res){
   console.log("访问空路径")
   res.end("红薯阅读api系统")
})

app.post('/yuedu/api/insertone',urlencodedParser, function (req, res) {
   // 输出 JSON 格式
   console.log("data:"+req.body)
  appdata.insertone(res,req.body.db,req.body.collect,req.body.insertobj)

})

app.post('/yuedu/api/insertmany',urlencodedParser, function (req, res) {
   // 输出 JSON 格式
  appdata.insertmany(res,req.body.db,req.body.collect,req.body.insertobj)

})


app.post('/yuedu/api/find',urlencodedParser, function (req, res) {
   // 输出 JSON 格式
  appdata.find(res,req.body.db,req.body.collect,req.body.findwhere)

})

app.post('/yuedu/api/updateone',urlencodedParser, function (req, res) {
   // 输出 JSON 格式
  appdata.updateone(res,req.body.db,req.body.collect,req.body.updatewhere,req.body.updateobj)

})

app.post('/yuedu/api/updatemany',urlencodedParser, function (req, res) {
   // 输出 JSON 格式
  appdata.updatemany(res,req.body.db,req.body.collect,req.body.updatewhere,req.body.updateobj)

})

app.post('/yuedu/api/deleteone',urlencodedParser, function (req, res) {
   // 输出 JSON 格式
  appdata.deleteone(res,req.body.db,req.body.collect,req.body.deletewhere)

})

app.post('/yuedu/api/deletemany',urlencodedParser, function (req, res) {
   // 输出 JSON 格式
   appdata.deletemany(res,req.body.db,req.body.collect,req.body.deletewhere)

})


app.post('/yuedu/api/drop',urlencodedParser, function (req, res) {
   // 输出 JSON 格式
   appdata.drop(res,req.body.db,req.body.collect)

})


// 示例   http:/localhost:8081/yuedu/api/share user=1828s&ip=192.168.2.1&app=快手&type=2&url=https://www.kuaishou.nebula/apid?
app.post('/yuedu/api/share',urlencodedParser, function (req, res) {
   console.log(req.body)
  appdata.insertshare(res,req.body.db,req.body.collect,req.body.user,req.ip,req.body.app,req.body.url,req.body.type)

})

app.post('/yuedu/api/getshare',urlencodedParser, function (req, res) {
   // 输出 JSON 格式
  appdata.getshare(res,req.body.db,req.body.collect,req.body.user,req.ip,req.body.app,req.body.type)

})

app.post('/yuedu/api/getusershare',urlencodedParser, function (req, res) {
   // 输出 JSON 格式
   console.log(req.body)
  appdata.getusershare(res,req.body.db,req.body.collect,req.body.user)

})

app.post('/yuedu/api/seeurl',urlencodedParser, function (req, res) {
   // 输出 JSON 格式
  appdata.seeurl(res,req.body.db,req.body.collect,req.body.url)

})

   
app.get('/yuedu/api/getshare',urlencodedParser, function (req, res) {
   // 输出 JSON 格式
   var response = {
      "user":req.body.user,
      "ip":req.body.ip,
      "app":req.body.app,
      "type":req.body.type
   };
   console.log(response);
   res.end(JSON.stringify(response));
})





//获取任务
app.post('/yuedu/api/gettask',urlencodedParser,function(req,res){
   appdata.gettask(res,req.body.)
}
)

//添加任务
app.post('/yuedu/api/addtask',urlencodedParser,function(req,res){

}
)

//移除任务
app.post('/yuedu/api/removetask',urlencodedParser,function(req,res){

}
)

//上报任务完成度 
app.post('/yuedu/api/reporttask',urlencodedParser,function(req,res){

}
)




app.get('/androidjs/api/login', function (req, res) {
   res.send('androidjs login -get');
   res.end()
})

 //  POST 请求
app.post('/androidjs/api/login', function (req, res) {
    console.log("主页 POST 登录");
    res.send('androidjs login -get');
    res.end()
 })

 app.get('/androidjs/api/logout', function (req, res) {
    res.send('androidjs login -get');
    res.end()
 })
  //  POST 请求
 app.post('/androidjs/api/logout', function (req, res) {
     console.log("主页 POST 登录");
     res.send('androidjs login -post 登出');
     res.end()
})

app.get('/androidjs/api/check', function (req, res) {
    res.send('androidjs login -get');
    res.end()
 })


var server = app.listen(8081, function () {
   var host = server.address().address
  var port = server.address().port
   console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})