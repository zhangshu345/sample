importClass(com.hongshu.advice.AdviceManager)
var admanager=AdviceManager.getInstance();
var gfw
var  creatgfloatywindow=function(){
    gfw=floaty.rawWindow(
        <vertical  >
            <text  id="text" w="*" h="36dp" gravity="center" textSize="14sp" background="#55ffff00">提醒</text>
            <vertical id="fad" ></vertical>
        </vertical>
        
    );
    gfw.setSize(device.width, 120)
    gfw.setTouchable(false)
    gfw.setPosition(0,80)
    
 }
 function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}
 creatgfloatywindow()
 sleep(3000)
  url="https://gitee.com/zhangshu345012/sample/raw/v1/script/%E5%BF%AB%E6%8D%B7%E6%96%B9%E5%BC%8F/%E7%B3%BB%E7%BB%9F%E5%BF%AB%E6%8D%B7%E8%AE%BE%E7%BD%AE.js"
  engines.execScript("快捷键", httpget(url) , )
i=0
  while(true){
      cysp=text("创意视频").findOne();
    if(cysp) {
       if( cysp.click()){
           sleep(10000)
       }
    }
    sleep(3000)
    i=i+1
    if(i==5){
        back()
    }
  }
