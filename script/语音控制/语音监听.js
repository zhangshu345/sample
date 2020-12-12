setInterval(function(){
    toast("你好")
},1000)

events.observeVoice()
events.onVoice(function(voiceEvent){
    log(voiceEvent)
})