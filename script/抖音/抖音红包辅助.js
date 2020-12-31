

function 抖音红包辅助(){
    toastLog("抖音红包辅助")
  let bt_hbdm=  packageName("com.ss.android.ugc.aweme").className('android.widget.Button').depth(5).drawingOrder(3).visibleToUser(true)
.findOne(300)
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
    }
}
}

while(true){
    抖音红包辅助()
    sleep(10000)
}