auto.waitFor()

function 快手红包辅助(){
    //检测一分钟内的倒计时
   let n_djs= packageName('com.smile.gifmaker').id('live_red_pack_count_down_second_text_view').findOne(300)
    let djs=0;
   if(n_djs){
       let b =n_djs.bounds()
       let x=b.centerX()
       let y= b.centerY()
       djs=parseInt(n_djs.text())
       if(djs>15){
           return 
       }
       toastLog("红包倒计时出现 开始自动:"+djs)
       sleep((djs*1000-800))
     let  t=new Date().getTime()
        for(i=0;i<200;i++){
            press(x,y,1)
        }
        let  t2=new Date().getTime()-t
       log("用时："+t2)
    }
    
}
while(true){
    快手红包辅助()
    sleep(5000)
}
