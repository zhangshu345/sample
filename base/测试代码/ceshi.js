log(device.device)
threads.start(function(){
    i=0
    while(true){
        toastLog("截屏"+i)
        sleep(1000)
       t= text("立即开始").findOne(500)
       if(t){
         toastLog("点击截屏")
           t.click()
            captureScreen("/sdcard/screencapture" + i + ".png");
     
          break
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
    for(var i = 0; i < 10; i++){
        captureScreen("/sdcard/screencapture" + i + ".png");
        sleep(1000);
    }


sleep(5000)
     
captureScreen("/sdcard/screencapture" + i + ".png");
toastLog("5之后")