"ui";

ui.layout(
    <frame>
        <list id="list">
            <vertical>
                <text id="name" textSize="16sp" textColor="{{color}}" text="name: {{name}}"  />
               
            </vertical>
        </list>
    </frame>
);

var items = [
    {name: "小明",color:"#000000"},
        {name: "小明",color:"#ff0000"}

];

ui.list.setDataSource(items);


setInterval(function () {
    if(items.length>7)
     items.splice(0, 1);
     items.splice(items.length, 0,{name:items.length,color:"#00ff00"});
}, 1000);


// var btncClose = floaty.window(
//     <Button id="stopScrip" text= "停止脚本"  w="90" h="40" />
// );
// btncClose.setPosition(20, 20);

// btncClose.stopScrip.click(() => {
//     finish();
// });
setInterval(function () {
}, 1000);


// events.observeKey();
// var huoshan = require("./hzHuoshan.js");

// var HzNewsClass = require("./hzNews.js");
// var hzNews = new HzNewsClass()

// function ClassA(sColor){

//     this.color = sColor;

//     this.sayColor = function(){

//             log(this.color);

//     };
//     this.saywhoami = function(){
//         log(" i am father")
//     }

// }

// function ClassB(sColor,sName){

//      ClassA.call(this,sColor);

//      this.name = sName;

//      this.sayName = function (){

//           log(this.name+this.color);

//     };
//      this.saywhoami = function(){
//         this.prototype.saywhoami()
//         log(" i am son")
//     }

// }

// ClassB.prototype = createObject(ClassA.prototype)
// ClassB.prototype.constructor = ClassB;

// function createObject(o){
//     function fn(){}
//     fn.prototype = o;
//     return new fn;
// }
// hzNews.openApp()
// sleep(3000)
// // 69722830785
// hzNews.doFocusByUserId("69722830785")
// // var cb = new ClassB("red","yama")
// // // cb.sayName()
// // cb.saywhoami()
// // // cb.sayColor()


// //   huoshan.openApp();
// //      sleep(1000);

// // // swipe(device.width * 0.5, device.height * 0.8, device.width * 0.5, device.height * 0.3, 100);
// // // sleep(1000)
// // // log("1")

// // // swipe(device.width * 0.5, device.height * 0.8, device.width * 0.5, device.height * 0.3, 50);
// // // sleep(1000)
// // // log("2")
// // var titleAv = id("com.ss.android.ugc.live:id/arz").text("视频").findOnce();
// //     console.hide()
// //     if(titleAv)
// //     {
// //         click(titleAv.bounds().centerX(), titleAv.bounds().centerY());

// //         sleep(2000)
// //     }
// //     var titleLive = text("直播").findOnce();
// //     var avList = id("azt").boundsInside(0, 0, device.width, device.height).find();
// //     if (titleAv != null && titleLive != null) {
// //         if(avList.size()>1)
// //         {
// //             var oneAv = avList.get(1);
// //             click(oneAv.bounds().centerX(), oneAv.bounds().centerY());
// //             sleep(2000);
// //         }
// //     }


// events.onKeyDown("volume_down",function(event)
// {
//     log("finish")
//    threads.shutDownAll();
//     engines.stopAll();
//     exit();
  
// } );
// // //token参数定义
// // var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjFkOTlkYTM1In0.eyJpc3MiOiJodHRwOlwvXC9odWxpLndlaWJvdC5jblwvYXBpXC9sb2dpblwvdGhpcmQiLCJpYXQiOjE2MDI0MDYwNTIsImV4cCI6MjIwMjQwNTk5MiwibmJmIjoxNjAyNDA2MDUyLCJqdGkiOiJzcHBLNUl4UTZtUDJGYVpiIiwic3ViIjoiMzQ3MjEiLCJwcnYiOiI5ZWZkOTk5NDNhZTQwNzliYTUzNjM3NjYyOTkyZTMxZmI2MTY0NDc0IiwiYXVkIjoibmNrSVRkYmI5QThkSFp3MSIsImF1dGhfdGltZSI6MTYwMjQwNjA1Miwid2VpX2JvX3VpZCI6bnVsbCwiZG91X3lpbl91aWQiOjUyODM2NSwicmVkX2Jvb2tfdWlkIjpudWxsLCJiaV9saV91aWQiOm51bGwsInpoaV9odV91aWQiOm51bGx9.Yyz0FfBov4btwsSeFib6rSos9m0JYZeH9QmkcRaqoYk";
// // //定义ws服务器地址，参数可参见官方文档
// // var url="wss://socket.hulihuzhu.com/socket.io/?user_type=single&user_not=&sku_type=all&sku_not=&token="+token+"&EIO=3&transport=websocket";
// // //定义websocket
// // let ws = web.newWebSocket(url, { eventThread: 'this' });
// // //监听服务器返回的消息
// // ws.on('text', (message, webSocket) => {
// //     //此处可根据返回的信息判断抢单是否成功
// //     log(message)
// //     if(message.substring(0, 2) == "42"){
// //         var nstr = message.substring(2,message.length)
// //         // log("typeof+"+typeof(nstr))
// //         var es = eval(nstr)
// //         // var as  = JSON.parse(nstr)
// //         // log(es[0])
// //         if(es[0]=="task-dispatch")
// //         {
// //             var data = JSON.stringify(es[1].data)
// //             log("send:"+data)
// //                 ws.send("{task-receive:"+data+"}");

// //         }
// //         // log("As"+as)
// //         // log("nstr:"+eval(nstr))
// //     }
// //     // log("first:"+message[0]);
// // });
// // ws.on('task-dispatch', (message, webSocket) => {
// //     //此处可根据返回的信息判断抢单是否成功
// //     log("task-dispatch")
// //     log(message);
// // });
// // ws.on('task-received', (message, webSocket) => {
// //     //此处可根据返回的信息判断抢单是否成功
// //     log("task-received")
// //     log(message);
// // });
// // //监听服务器连接信息
// // ws.on('open', (res, webSocket) => {
// //     log('服务器连接成功');
// //     log('服务器返回消息：' + res);
// // });
// // //监听失败信息
// // ws.on('failure', (err, res, ws) => {
// //     log('failure'+err);
// // });
// // //监听错误信息
// // ws.on('error', (err, res, ws) => {
// //     log('error');
// // });
// // //监听关闭连接信息
// // ws.on('closed', (code, reason, ws) => {
// //     log('连接已关闭');
// // }); //发送心跳包
// // setInterval(function () {
// //     ws.send("2");
// // }, 25000);




