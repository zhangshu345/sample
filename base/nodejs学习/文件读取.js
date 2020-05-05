var fs = require("fs")
function makemime(){
 
// 异步读取
fs.readFile('\\新建文本文档.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
   // console.log("异步读取: " + data.toString());

    var c=data.toString();
  
    var ls=c.split("\n")
    var nlss="{"
    for(let index = 0; index < ls.length; index++) {
        console.log("位置："+index+"---"+ls[index])
         ss=ls[index].split('----')
       nls="\""+ss[1].trim()+"\":\""+ss[0].trim()+"\","
        nlss=nlss+nls
    }
    nlss=nlss+"}"
    fs.writeFile('\\新建文本2.txt',nlss,function(err,data){
        if(err){
            return console.error(err);
        }
        console.log("写成成功")
    })

 });
}

var path = require('path');
function tojsoa(){
    const con=fs.readFileSync(path.dirname(__filename) +"\\新建文本2.txt").toString()
console.log(con)
 var ss=JSON.parse(con)
 ss.forEach(e => {
     console.log(e)
 });
}

fs.readFile('\\新建文本文档.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
   // console.log("异步读取: " + data.toString());

    var c=data.toString();
    var v=new Object()
    var vs=new Array();
    var ls=c.split("\n")
    var nlss="{"
    for(let index = 0; index < ls.length; index++) {
        console.log("位置："+index+"---"+ls[index])
         ss=ls[index].split('----')
       v.key=ss[1].trim()
       v.value=ss[0].trim()
       vs[vs.length]=v
    }
    var ssss=JSON.stringify(vs)
    fs.writeFile('\\新建文本2.txt',ssss,function(err,data){
        if(err){
            return console.error(err);
        }
        console.log("写成成功")
    })

 });


//  // 同步读取
//  var data = fs.readFileSync('‪\\新建文本文档.txt');


//  console.log("程序执行完毕。");