var events=require("events")
var eventEmitter=new events.EventEmitter();
eventEmitter.on("event1",function(){
    console.log("event1 触发事件")
})

eventEmitter.on("event2",function(){
    console.log("触发事件2")
})

eventEmitter.emit("event2")

eventEmitter.emit("event1")
var j=0
//循环计时
setInterval(function(){
j=j+1
console.log("计数："+j)
eventEmitter.emit("event2")
},1000)
