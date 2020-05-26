var addbmobchannel=function(channels){
    importClass(com.hongshu.bmob.push.BmobPushUtils)
    BmobPushUtils.addchannel(channels)
}

var removebmobchannel=function(channels){
    importClass(com.hongshu.bmob.push.BmobPushUtils)
    BmobPushUtils.removechannel(channels)
}

var bmobpushmessage=function(channels,message){
    importClass(com.hongshu.bmob.push.BmobPushUtils)
    BmobPushUtils.pushmessage(channels,message)
}
addbmobchannel("bmob")
sleep(3000)
bmobpushmessage("bmob","js:runrul:")
