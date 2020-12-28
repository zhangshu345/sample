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
var ratio=1
var gfw
var  creatgfloatywindow=function(){
    gfw=floaty.rawWindow(
        <horizontal >
           <text id="stop" w="45" h="45" gravity="center" textSize="18sp" background="#55ff0000" >停止</text>
           <text id="jiasu" w="45" h="45" gravity="center" textSize="16sp" background="#55ff0000" >加速</text>
           <text id="jiansu" w="45" h="45" gravity="center" textSize="16sp" background="#55ff0000">减速</text>
            <text id="text" w="*" h="*" gravity="center" textSize="18sp" background="#55ffff00">提醒</text>
        </horizontal>
        
    );
    gfw.setSize(device.width, 120)
    
    gfw.setPosition(0,80)
    gfw.stop.on("click",function(){
        exit()
    })
    gfw.jiasu.on("click",function(){
        ratio=ratio*0.9
        toast("加速 1.1倍 当前速度："+ratio)
    })
    gfw.jiansu.on("click",function(){
        ratio=ratio*1.1
        toast("减速 0.1倍 当前速度："+ratio)
        if(ratio<10){
            ratio=10
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
var 上滑=function(){
    滑动(20,13,17,10,3,500,500)
}

var 下滑=function(){
    滑动(20,10,3,13,17,500,500)
}
滑动次数=0
while(true){
    上滑()
    sleepr(8000*ratio,12000*ratio)
    滑动次数=滑动次数+1
}

