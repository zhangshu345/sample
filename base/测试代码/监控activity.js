var ca=""
var lastca="1"
while(true){
    ca=currentActivity()
    if(ca!=lastca){
        lastca=ca
        log("当前activity："+currentActivity())
    }
    
    sleep(50)
}