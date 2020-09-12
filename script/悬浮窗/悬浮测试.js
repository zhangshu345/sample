
var  creatgfloatywindow=function(){
    log("createdfloaty")
    gfw=floaty.rawWindow(
        <horizontal>
            <text  id="text" w="*" h="*" gravity="center" textSize="18sp" background="#55ffff00">提醒</text>
        </horizontal>
    );
    gfw.setSize(device.width, 120)
    gfw.setTouchable(false)
    gfw.setPosition(0,80)
    isshowfloaty=true
 }

 creatgfloatywindow()
var w = floaty.window(
    <frame gravity="center" bg="#44ffcc00"/>
);


var w = floaty.rawWindow(
    <frame gravity="center" bg="#44ffcc00"/>
);
