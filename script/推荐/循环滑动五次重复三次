auto.waitFor()
auto.setMode("normal")
/*---------------------------------lib-------------------------------*/

function 滑动(z,x1,y1,x2,y2,t,r) {
    var w = device.width/z;
    var h = device.height/z;
    r=r||1000
     show("滑动"+x1+","+y1+"->"+x2+","+y2)
    swipe(w * x1, h * y1 , w *x2 , h * y2, t+random(0, r))
}
var sleepr=function(short,long){
    rt=random(short,long)
    show("等待:"+rt +" 毫秒")
    sleep(rt)
}
var gfw
var  creatgfloatywindow=function(){
    gfw=floaty.rawWindow(
        <horizontal >
           <text id="stop" w="45" h="45" gravity="center" textSize="18sp" background="#55ff0000">停止</text>
        <text id="text" w="*" h="*" gravity="center" textSize="18sp" background="#55ffff00">提醒</text>
        </horizontal>
        
    );
    gfw.setSize(device.width, 120)
    
    gfw.setPosition(0,85)
    gfw.stop.on("click",function(){
        engines.stopAllAndToast()
    })
}

var show=function(txt){
    if(!gfw){
      creatgfloatywindow()
    }
    ui.run(function(){
     
        gfw.text.setText(txt)
     })

}
var 上滑=function(){
    滑动(20,13,17,10,3,500,500)
}

var 下滑=function(){
    滑动(20,10,3,13,17,500,500)
}
滑动次数=0
while(true){
    if(滑动次数%10==0){
        下滑()
    }else if(滑动次数%10==1){
        上滑()
    }else if(滑动次数%10==2){
         上滑()
    }else if(滑动次数%10==3){
         上滑()
    }else if(滑动次数%10==4){
       下滑()
    }else if(滑动次数%10==5){
        下滑()
    }else if(滑动次数%10==6){
        上滑()
    }else if(滑动次数%10==7){
         上滑()
    }else if(滑动次数%10==8){
         下滑()
    }else if(滑动次数%10==9){
         上滑()
    }else {
        上滑()
    }
    
    sleepr(8000,15000)
    滑动次数=滑动次数+1
}

