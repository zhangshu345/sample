auto.waitFor()
auto.setMode("normal");
engines.stopOther()
const waitaction="auto.waitFor();\nauto.setMode(\"normal\");var sleepspeed=1.0;var actionspeed=1.0;"

var script="";
var downTime=new Date().getTime();
var clicknumber=0;
var actiontime=new Date().getTime();
var actions=waitaction;//+new Date().toLocaleDateString
var minactiontime=300
var 间隔时间=function(){
    return new Date().getTime()-actiontime
}
var sleepspeed=1.0
var actionspeed=1.0
var gfw   //调试悬浮窗口
var recording=false;
log(device)
var x = 0, y = 0;
var 动作时间间隔=function(){
    return new Date().getTime()-downTime
}
var screenactionwindow
var points=[1000];
var recordthread //录制线程
//最小间隔时间
function addnewactions(newactionstr){
    log(newactionstr)
    let t=间隔时间()
    if(t>minactiontime){
      actions=actions+"sleep("+t+"*sleepspeed);"+newactionstr+";\n";
    }else{
       actions= actions+"sleep("+minactiontime+"*sleepspeed);"+newactionstr+";";
    }
//    log(actions)
}
var  creatgfloatywindow=function(){

    gfw=floaty.rawWindow(
        <horizontal>
            <text  id="text" w="*" h="*" gravity="center" textSize="18sp" background="#22ffff00">提醒</text>
        </horizontal>
    );
    gfw.setSize(device.width, 120)
    gfw.setTouchable(false)
    gfw.setPosition(0,80)

 }

var show=function(txt,txtcolor){ 
    try {
     
        log(txt);
        if(!gfw){ creatgfloatywindow(); }else{
            ui.run(function(){ 
                gfw.text.setText(txt);
            })
        }
    } catch (error) {
        log(error)
    }
}


function startscreenrecord(){
//利用了悬浮窗
log("开始录屏")
 screenactionwindow = floaty.rawWindow(
    <frame id="action" w="{{device.width}}" h="{{device.height}}"  bg="#44ffcc00"/>

);
log("开始录屏1")
screenactionwindow.setSize(-1, -1);
log("开始录屏2")
screenactionwindow.action.setOnTouchListener(function(view, event){
    switch(event.getAction()){
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_UP:
            if(new Date().getTime() - downTime > 1000&&(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5)){
               长按(x,y);
            }else{
               if(Math.abs(event.getRawY() - y) < 10 && Math.abs(event.getRawX() - x) < 10){
                点击(x,y);
                // clicknumber=clicknumber+1
                //    if(clicknumber>1){
                //         点击(x,y,clicknumber);
                //    }else{
                       
                //    }
                     
                }
                else{
                //    滑动(x,y,event.getRawX(),event.getRawY()); 
                手势()
               }
           }
            return true;
        case event.ACTION_MOVE:
                    log("滑动"+event.getRawX()+","+event.getRawY())
                    addnewpath(event.getRawX(),event.getRawY())
            return true
    }
    log("开始录屏3")
    return true;
});
}

function addnewpath(pointx,pointy){
let  mx=parseInt(pointx)
 let   my=parseInt(pointy)
    points[0] = 动作时间间隔()
    points.push([mx,my])
    // log(points)
}

function 手势(){
    if(points.length<4){
        点击(point=points[1][0],point=points[1][1])
        return
    }
    addnewactions("gesture.apply(null,"+JSON.stringify(points)+")")
    threads.start(function(){
           screenactionwindow.setTouchable(false);
           show("执行手势")
           sleep(60);
           gesture.apply(null,points)
           sleep(60);
           screenactionwindow.setTouchable(true);
           actiontime= new Date().getTime();
           points=[1000];
       }); 
}

function 点击(x,y,n){
    x=parseInt(x)
    y=parseInt(y)
      threads.start(function(){
        ui.run(function(){
            screenactionwindow.setTouchable(false);
            })
            show("点击("+x+","+y+")");
           sleep(60);
           press(x,y,5);
         
           ui.run(function(){
            screenactionwindow.setTouchable(true);
            })
           actiontime= new Date().getTime();
       });
}

function 长按(x,y){
    x=parseInt(x)
    y=parseInt(y)
    addnewactions("press("+x+","+y+",1000)")
    threads.start(function(){
        ui.run(function(){
            screenactionwindow.setTouchable(false);
        })
          
           sleep(60);
           press(x,y,1000);
           show("长按("+x+","+y+")");
           ui.run(function(){
            screenactionwindow.setTouchable(true);
            })
          
           actiontime= new Date().getTime();
           });
}
           
function 滑动(x,y,x1,y1){
    x=parseInt(x)
    y=parseInt(y)
    x1=parseInt(x1)
    y1=parseInt(y1)
    addnewactions("swipe("+x+","+y+","+x1+","+y1+",350)")
    threads.start(function(){
        ui.run(function(){
            screenactionwindow.setTouchable(false);
            })
           sleep(60);
           swipe(x,y,x1,y1,350);
           show("从("+x+","+y+")滑到("+x1+","+y1+")");
           ui.run(function(){
            screenactionwindow.setTouchable(true);
            })
           actiontime= new Date().getTime();
           });
}

//开始物理按键记录
function startkeyrecord(){
    log("启动监听")
//启用按键监听
events.observeKey();
//监听音量上键按下
events.onKeyDown("volume_up", function(event){
    show("音量上键被按下了");
});

//监听音量下键按下
events.onKeyDown("volume_down", function(event){
    show("音量上键被按下了");
});
//监听菜单键按下
events.onKeyDown("menu", function(event){
    show("菜单键被按下了");
});
//返回键按下
events.onKeyDown("back", function(event){
    show("返回键被按下了");
    if(recording){
        addnewactions("back()")
    }
});

//返回键按下
events.onKeyDown("home", function(event){
    show("主页被按下了");
    if(recording){
        addnewactions("home()")
    }
});

log("启动监听后")

}

//
function startrecord(){
    recording=true;
    show("开始录制脚本")
    
    recordthread=threads.start(function(){
        startkeyrecord()
        startscreenrecord()
    })
   
}

function stoprecord(){
    recording=false
    if(recordthread){
        recordthread.interrupt()
        recordthread=null
    }
    screenactionwindow.setSize(1,1)
    
    saveScriptRecord()
}

function saveScriptRecord(){
    if(actions.length<waitaction.length+6){
        toastLog("没有录制到动作")
        return
    }
    let td=new Date();
    // rawInput("请输入录制动作文件名", td.toLocaleTimeString(), name => {
         n =files.getSdcardPath()+"/脚本/"+td.toLocaleTimeString() + ".js"
        // n="/脚本/"+td.toLocaleTimeString() + ".js"
        if(files.create(n)){
            files.write(n, actions)
            alert("录制完成","录制脚本保存在 根目录下"+n)
        }else{
            setClip(actions)
            alert("录制完成","录制脚本保存文件无法创建,已复制录制代码到剪贴板,请自行创建文件！！")
        }
//    });
}

events.on("exit", function(){
    events.removeAllTouchListeners()
    if(recording){
        saveScriptRecord()
    }
    
});

function showcontrolfloaty(){
    var controlw = floaty.rawWindow(
        <horizontal gravity="center" bg="#44ffcc00" w="auto" h="auto" >
            <text id="setstart" text="设置起始页" w="auto" h="auto" marginRight="16" padding="8"/>
            <text id="start" text="开始" w="auto" h="auto" padding="8"/>
         </horizontal>
    );
    
    controlw.setSize(-2, -2);
    controlw.setTouchable(true);
    controlw.setPosition(20,device.height/2)
    controlw.setstart.on("click",function(v){
        log("ks1")
        pkg=currentPackage()
        log("ks2")
        activity=currentActivity()
        log("ks3")
        actions=actions+"app.launch("+pkg+")/n;waitForPackage("+pkg+");/n"
    })
    controlw.start.on("click",function(v){
        log("ks4")
        if(recording){
            log("ks5")
            controlw.start.setText("开始")
            log("ks6")
            stoprecord()
            log("ks7")
        }else{
            log("ks8")
            controlw.start.setText("停止")
            log("ks9")
            startrecord()
            log("ks10")
        }
        
        
    })
}

showcontrolfloaty()
// startrecord()
setInterval(()=>{
    show("等待:"+动作时间间隔()+"ms")
}, 1000);
