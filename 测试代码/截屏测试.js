function checkscreencapture(){
    threads.start(function(){
        i=0
        while(true){
            toastLog("截屏"+i)
            sleep(1000)
           t= text("立即开始").findOne(100)
           if(!t){
            t= text("允许").findOne(100)
           }
           if(t){
             toastLog("点击截屏")
               t.click()
               sleep(1000)
                captureScreen("/sdcard/screencapture" + i + ".png");
              return
           }
           i=i+1
        }
    })
    i=0
        if(!requestScreenCapture(true)){
            toastLog("请求截图失败");
            // exit();
        }else{
            toastLog("请求截图成功");5
        }
        //连续截图10张图片(间隔1秒)并保存到存储卡目录
        for(var i = 0; i < 1; i++){
            captureScreen("/sdcard/screencapture" + i + ".png");
            sleep(1000);
        }
    captureScreen("/sdcard/screencapture" + i + ".png");
    toastLog("5之后")
}
checkscreencapture()