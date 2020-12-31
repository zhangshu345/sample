function 抖音红包辅助(){
 
    let n_close=  packageName('com.ss.android.ugc.aweme').className('android.widget.ImageView').depth(4).drawingOrder(10).visibleToUser(true).findOne(300)
    if(n_close){ 
        clicknode(n_close)
    }



 let n_hb=  packageName('com.ss.android.ugc.aweme').boundsInside(0,0,device.width/2,device.height/4).className('android.widget.TextView').depth(20).drawingOrder(2).findOne(300)
if(n_hb){
    log(n_hb.text())
    if(n_hb.text()){
        let hbtime= n_hb.text().split(":")
        let hbtimedjs =parseInt(hbtime[0])*60+parseInt(hbtime[1])
        log("红包倒计时:"+hbtimedjs+"秒")
        if(hbtimedjs>20){
            return true
        }
        clicknode(n_hb)
        sleep(1000)
    }else{
        return false
    }
   
}else{
    return false
}

  let bt_hbdm=  packageName("com.ss.android.ugc.aweme").className('android.widget.Button').depth(5).drawingOrder(3).visibleToUser(true).findOne(300)
    if(bt_hbdm){
    let txt_time=bt_hbdm.text()
    let bounds=bt_hbdm.bounds();
    let x=bounds.centerX()
    let y=bounds.centerY()
    if(txt_time){
       let   delay= 60;
        if(txt_time.includes("分")){
              let ts=txt_time.split("分")
              if(ts.length==2){
                 delay=parseInt(ts[0])*60+ parseInt(ts[1].replace("秒后可抢","")) 
              } else{
                return true 
              }
             if(delay>60){
                toastLog("时间:"+delay)
                 return true
             }
        }else{
            delay = parseInt(txt_time)
           
        }
        sleep((delay-1)*1000)
       let  t1=new Date().getTime()
        for(i=0;i<200;i++){
            press(x,y,1)
        }
        toastLog("时间:"+delay+"--"+(new Date().getTime()-t1))
        let n_close=  packageName('com.ss.android.ugc.aweme').className('android.widget.ImageView').depth(4).drawingOrder(10).visibleToUser(true).findOne(300)
        if(n_close){ 
            clicknode(n_close)
        }
    }
    }
}

while(true){
    
    抖音红包辅助()
    sleep(10000)
}