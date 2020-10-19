auto.waitFor()
auto.setMode("normal");
engines.stopOther()
const waitaction="auto.waitFor();\nauto.setMode(\"normal\");var sleepspeed=1.0;var actionspeed=1.0;"

var script="";
var downTime;
var actiontime=new Date().getTime();
var actions=waitaction;//+new Date().toLocaleDateString
var minactiontime=300
var 间隔时间=function(){
    return new Date().getTime()-actiontime
}
var sleepspeed=1.0
var actionspeed=1.0
log(device)

var 动作时间间隔=function(){
    return new Date().getTime()-downTime
}
var screenactionwindow
var points=[1000];

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
   
function startscreenrecord(){
//利用了悬浮窗
 screenactionwindow = floaty.rawWindow(
    <frame id="action" w="{{device.width}}" h="{{device.height}}"  bg="#44ffcc00">
    </frame>
);

screenactionwindow.setSize(-1, -1);
setInterval(()=>{}, 1000);
var x = 0, y = 0;
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
           sleep(60);
           gesture.apply(null,points)
           toastLog("执行手势")
           screenactionwindow.setTouchable(true);
           actiontime= new Date().getTime();
           points=[1000];
       }); 
}

function 点击(x,y){
    x=parseInt(x)
    y=parseInt(y)
      addnewactions("click("+x+","+y+")")
      threads.start(function(){
           screenactionwindow.setTouchable(false);
           sleep(60);
           press(x,y,1);
           toastLog("点击("+x+","+y+")");
           screenactionwindow.setTouchable(true);
           actiontime= new Date().getTime();
       });
}

function 长按(x,y){
    x=parseInt(x)
    y=parseInt(y)
    addnewactions("press("+x+","+y+",1000)")
    threads.start(function(){
           screenactionwindow.setTouchable(false);
           sleep(60);
           press(x,y,1000);
           toastLog("长按("+x+","+y+")");
           screenactionwindow.setTouchable(true);
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
           screenactionwindow.setTouchable(false);
           sleep(60);
           swipe(x,y,x1,y1,350);
           toastLog("从("+x+","+y+")滑到("+x1+","+y1+")");
           screenactionwindow.setTouchable(true);
           actiontime= new Date().getTime();
           });
}



//开始物理按键记录
function startkeyrecord(){
//启用按键监听
events.observeKey();
//监听音量上键按下
events.onKeyDown("volume_up", function(event){
    log("音量上键被按下了");
});

//监听音量下键按下
events.onKeyDown("volume_down", function(event){
    log("音量上键被按下了");
});
//监听菜单键按下
events.onKeyDown("menu", function(event){
    log("菜单键被按下了");
});
//返回键按下
events.onKeyDown("back", function(event){
    log("返回键被按下了");
    addnewactions("back()")
});

//返回键按下
events.onKeyDown("home", function(event){
    log("主页被按下了");
    addnewactions("home()")
});
}

function startactivityrecord(){
    threads.start(function(){
        while(true){
            sleep(1000)
            log("当前activity:"+currentActivity())
        }
    })
}


//
function startrecord(){
    toastLog("开始录制脚本")
    startactivityrecord()
    startkeyrecord()
    startscreenrecord()
}

function stoprecord(){

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
    saveScriptRecord()
});

startrecord()

