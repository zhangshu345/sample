events.broadcast.on("hello", function(name){
    toast("你好, " + name);
});
//保持脚本运行
setInterval(()=>{}, 1000);