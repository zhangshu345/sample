auto.waitFor()



function 快手红包辅助(){

   let n_djs= packageName('com.smile.gifmaker').id('live_red_pack_count_down_second_text_view').findOne(300)
    let djs=0;
   if(n_djs){
       let b =n_djs.bounds()
       let x=b.centerX()
       let y= b.centerY()

       djs=parseInt(n_djs.text())
       sleep((djs*1000-600))
     let  t=new Date().getTime()
        for(i=0;i<50;i++){
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
