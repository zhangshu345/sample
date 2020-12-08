events.observeWakeUp(true)
events.on("wakeup",function(wakeupresult){
    console.log("唤醒")
    console.log(wakeupresult)
})
events.on("recogn",function(recognresult){
    console.log("识别",recognresult.origalJson)
})

setInterval(function(){
    log("循环")
},2000)