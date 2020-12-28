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
           <text id="stop" w="45" h="45" gravity="center" textSize="18sp" background="#22ff0000">停止</text>
        <text id="text" w="*" h="*" gravity="center" textSize="18sp" background="#22ffff00">提醒</text>
        </horizontal>
    );
    gfw.setSize(device.width, 120)
    gfw.setPosition(0,85)
    gfw.stop.on("click",function(){
       try {
        stop()
       } catch (error) {
           
       }
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

while(true){
    比例滑动(20,10,3,10,17,500,500)
    sleepr(8000,12000)
}

