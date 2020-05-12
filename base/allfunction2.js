importClass(com.hongshu.utils.PermissionUtils)
importClass(android.content.ComponentName)
importClass(com.hongshu.receiver.DeviceReceiver)
importClass(android.net.Uri)
importClass(com.hongshu.utils.SPUtils)
importClass(android.graphics.Bitmap)
importClass(com.hongshu.utils.KeyboardUtils)
importClass(com.hongshu.advice.AdviceManager)
importClass(com.hongshu.bmob.push.BmobPushUtils)
importClass(android.provider.Settings);  
var aduiscripturl="https://gitee.com/zhangshu345012/sample/raw/v1/script/快捷方式/系统快捷设置.js"
var admanager=AdviceManager.getInstance();
var 数据库= storages.create("hongshuyuedu");
var nowdate=function(){return new Date()};
var scriptstarttime=nowdate().getTime()
var rewardapplisturl="https://gitee.com/zhangshu345012/sample/raw/v1/config/rewardapplist.json"  //奖励app 运行的配置文件的路径
var today=function(){
    td=nowdate()
    return td.getFullYear()+"_"+td.getMonth()+"_"+td.getDate()
}
var enablegenius=device.sdkInt>=24
log("当前系统版本："+device.sdkInt+"--手势滑动："+enablegenius)
var scriptappname=app.getAppName(context.getPackageName())
log("脚本app名："+scriptappname)
var 刷宝邀请码=["96ZWEN","Q4FVDZ","APV3EA3"]  //我的 9X4T2X
var 快手极速版邀请码=["xps8bz"]
var 趣多多邀请码=["89797906"]
var bbshuabao="https://gitee.com/zhangshu345012/sample/raw/v1/base/邀请码/刷宝/baba.txt"
var mmshuabao="https://gitee.com/zhangshu345012/sample/raw/v1/base/邀请码/刷宝/mm.txt"
var hongshuabao="https://gitee.com/zhangshu345012/sample/raw/v1/base/邀请码/刷宝/1081.txt"
var hong2shuabao="https://gitee.com/zhangshu345012/sample/raw/v1/base/邀请码/刷宝/3841.txt"
var bbhuoshanjisuurl="https://gitee.com/zhangshu345012/sample/raw/v1/base/邀请码/火山极速版/bb.txt"
var yanghuoshanjisuurl="https://gitee.com/zhangshu345012/sample/raw/v1/base/邀请码/火山极速版/yang.txt"
var yangshuabao="https://gitee.com/zhangshu345012/sample/raw/v1/base/邀请码/刷宝/yang.txt"
var bbkuaishoujisuurl="https://gitee.com/zhangshu345012/sample/raw/v1/base/邀请码/快手极速版/bb.txt"
var 刷宝邀请链接=[bbshuabao,mmshuabao,yangshuabao,hongshuabao,hong2shuabao]
var 火山极速版邀请链接=[bbhuoshanjisuurl,yanghuoshanjisuurl]
var 快手极速版邀请链接=[bbkuaishoujisuurl,yanghuoshanjisuurl]
var  dpm
var  deviceadmincomponent
var changesetting=false //是否改变亮度和音量的标识
var isdeviceadmin=function(){
    deviceadmincomponent=new ComponentName(context.getPackageName(),"com.hongshu.receiver.DeviceReceiver")
     dpm=context.getSystemService("device_policy")
    return dpm.isAdminActive( deviceadmincomponent)
}
var 视频重复次数=2
var ratio=1
var gfw,gsfw
var gfwhave=false
var spt=SPUtils.getInstance()  //保证和APP交互 使用同一个

var getstrvalue=function(v){    return spt.getString(v)}
var getintvalue=function(v){    return spt.getInt(v)}
var getlongvalue=function(v){    return spt.getLong(v)}
var getfloatvalue=function(v){    return spt.getLong(v)}
var getbooleanvalue=function(v){    return spt.getBoolean(v)}

var getstrsetvalue=function(v){  return spt.getStringSet(v)}

var  creatgfloatywindow=function(){
    gfw=floaty.rawWindow(
        <horizontal  >
            <text  id="text" w="*" h="*" gravity="center" textSize="18sp" background="#55ffff00">提醒</text>
        </horizontal>
    );
    gfw.setSize(device.width, 120)
    gfw.setTouchable(false)
    gfw.setPosition(0,80)
    gfwhave=true
 }

var  creatsetfloatywindow=function(){
    gsfw=floaty.rawWindow(
        <horizontal clickable="false" >
              <vertical  w="90" h="65" >
              <text id="stop" w="auto" h="45"  textSize="16sp" textColor="#000000"  background="#1C86EE" >设置</text>
              <text id="coll" w="auto" h="45"  textSize="16sp"  textColor="#000000" background="#1C86EE"  >收缩</text>
              </vertical>
            <vertical  w="90" h="90" >
            <horizontal  >
                    <text id="jiasu" w="35" h="35" textColor="#000000" textSize="16sp" background="#1C86EE" >加速</text>
                     <text id="jiansu" w="35" h="35"  textColor="#000000" textSize="16sp" background="#1C86EE">减速</text>
            </horizontal>
            <horizontal >
                    <text id="jl" w="35" h="35" textColor="#000000" textSize="16sp" background="#1C86EE" >节流+</text>
                     <text id="nojl" w="35" h="35"  textColor="#000000" textSize="16sp" background="#1C86EE">正常</text>
            </horizontal>
            </vertical>
        </horizontal>
    );
    coll=true
    stoptime=0
    gsfw.setSize(90,90)
    gsfw.setPosition(0,device.height/2)
    gsfw.stop.on("click",function(){
        stoptime=stoptime+1
        if(stoptime==1){
            ui.run(function(){
                gsfw.stop.setText("停止")
                gsfw.setSize(device.width,180)
                toastLog("10秒后自动收缩")
                setTimeout(() => {
                    gsfw.stop.setText("设置")
                    gsfw.setSize(90,90)
                    gsfw.setPosition(0,device.height/2)
                    stoptime=0
                }, 10000);
             })
        }else{
            stoptime=0
            engines.stopAllAndToast()
        }
    })
    gsfw.coll.on("click",function(){
        stoptime=0
            ui.run(function(){
                gsfw.stop.setText("设置")
                gsfw.setSize(90,90)
                gsfw.setPosition(0,device.height/2)
                toastLog("收缩")})
    })
    gsfw.jiasu.on("click",function(){
        ratio=ratio*0.9
        toastLog("加速 1.1倍 当前速度："+ratio)
    })
    gsfw.jiansu.on("click",function(){
        ratio=ratio*1.1
        toastLog("减速 0.1倍 当前速度："+ratio)
        if(ratio<10){
            ratio=1
        }
    })
    gsfw.jl.on("click",function(){
        视频重复次数=视频重复次数+1
        toastLog("省流操作 重复视频播放 次数 +1  当前重复："+视频重复次数)
        if(ratio<1){
            视频重复次数=1
        }
    })
    gsfw.nojl.on("click",function(){
        视频重复次数=1
        toastLog("恢复正常 视频播放 持续上滑")
    })
}

var closerecentapp=function(){
    recents()
    if(device.brand=="samsung"){
                
        sleep(2000)
        textclick("全部关闭")
        sleep(1000)
    }else if(device.brand=="HONOR"){
        sleep(2000)
        id("clear_all_recents_image_button").findOne().click()
    }
    back()
}
//指定app 运行脚本
var runscriptIntent=function(apppkg,scriptsurl){
    let i = app.intent({
        packageName:apppkg,
        className:"com.hongshu.androidjs.external.open.RunIntentActivity",
           flags:["activity_new_task"],
        // data: "file:///sdcard/1.png"
        extras:{
            "action":"runscript",
            "source":2,
            "path":scriptsurl
            }
        }
    );
    context.startActivity(i);
}
var sendforcestopIntent=function(apppkg){
    let i = app.intent({
        packageName:apppkg,
        className:"com.hongshu.androidjs.external.open.RunIntentActivity",
           flags:["activity_new_task"],
        // data: "file:///sdcard/1.png"
        extras:{
            "action":"forcestop",
            "source":2,
            "path":scriptsurl
            }
        }
    );
    context.startActivity(i);
}

var runadui=function(pkg){
    runscriptIntent(pkg,aduiscripturl)
}
var show=function(txt){ log(txt);   
    if(!gfw){
        creatgfloatywindow()
    }
    ui.run(function(){
        gfw.text.setText(txt)
     })
}
var 上滑=function(){
    滑动(20,13,17,10,4,500,500)
}
var 下滑=function(){
    滑动(20,10,3,13,17,500,500)
}

var alter=sync(function(txt,t,left,top,width,height){
    var issleep=false
    t=t||5000
    left= left ||0
    top =top || device.height/15
    width =width|| device.height
    height =height || device.height/15
    var fw=floaty.rawWindow(
        <horizontal gravity="center">
            <text id="sleep" w="50dp">暂停</text>
        <text id="text" w="*" h="*" gravity="center" textSize="18sp" background="#55ffff00">提醒</text>
        <text id="stop" w="50dp">退出</text>
        </horizontal>
    );
    fw.sleep.click(function(){
        issleep=!issleep
        while(issleep){
            sleep(1000)
        }
    })
    fw.stop.click(function(){
        exit()
    })
   
    fw.setTouchable(false)
   
    fw.setPosition(0,85)
      ui.run(function(){
         console.log(txt)
        fw.text.setText(txt)
        fw.setSize(width, height)
        setTimeout(()=>{
            fw.close()
        },t)
     })
});

var 今日签到=function(name){
    cs=数据库.get(name+"_sign_"+today(), false)
    show(name+"今日签到:"+cs)
    return cs
}

var 今日已签到=function(name){
     数据库.put(name+"_sign_"+today(), true)
}

var 今日时长=function(name){
   s=数据库.get(name+"_time_"+today(), 0)
   show(name+"今日时长:"+s)
   return s
}

var 今日滑动次数=function(name){
    name= name||"glode"
    cs=数据库.get(name+"_"+today()+"_move", 0)
    show(name+"：今日滑动次数:"+cs)
    return cs
}
var 设置今日滑动次数=function(name,i){
    name=name||"glode"
    i=i||0
    数据库.put(name+"_"+today()+"_move", i)
    show(name+"：记录今日滑动次数:"+i)
    return cs
}

var 记录今日时长=function(name,t){
    t=t||0
    数据库.put(name+"_time_"+today(),今日时长()+t)
}

var 今日提现=function(name){
    name=name || ""
    return 数据库.get(name+"_cashout_"+today(),false)
}

var 今日已提现=function(name){
    数据库.put(name+"_cashout_"+today(),true)
    show(name+"今日已提现")
}
var 记录现在金币=function(name,i){
    数据库.put(name+"_lastcoin_"+today(),i)
}
var 上次金币=function(name){ 
       s= 数据库.get(name+"_lastcoin_"+today(), 0)
       show(name+"上次金币："+s)
       return s
 } 
 //可以通过上次的金币来判断是否 还可以获取金币
 var 记录现在余额=function(name,f){ 
   数据库.put(name+"_lastmoney_"+today(),f)
 } 

 var 上次余额=function(name){ 
    s=   数据库.get(name+"_lastmoney_"+today(), 0.0)
    show(name+"上次余额"+s)
    return s
 } //可以通过上次的金币来判断是否 还可以获取金币

 var 记录现在滑动次数=function(name,f){ 
    数据库.put(name+"_lastswipetime_"+today(),f)
} //可以通过上次的金币来判断是否 还可以获取金币
 
var 上次滑动次数=function(name){ 
     s=   数据库.get(name+"_lastswipetime_"+today(), 0)
     show(name+"上次滑动次数"+s)
     return s
} 
var lastscriptapp=spt.getString("lastscriptapp")
var closelastscriptapp=function(){ forcestop(lastscriptapp)}
var getrandforstrs=function(strs){    if(strs==null||strs.length==0){ return ""    };    let r=Math.floor(random()*strs.length);    return strs[r];}
var 记录现在观看视频数=function(name,f){     数据库.put(name+"_lastvideonumber_"+today(),f)} //可以通过上次的金币来判断是否 还可以获取金币
var 上次观看视频数=function(name){ s= 数据库.get(name+"_lastvideonumber_"+today(), 0);    show(name+"上次观看视频个数"+s);     return s;} 
var 记录现在观看文章数=function(name,f){     数据库.put(name+"_lastwenzhangnumber_"+today(),f)} //可以通过上次的金币来判断是否 还可以获取金币
var 上次观看文章数=function(name){ s= 数据库.get(name+"_lastwenzhangnumber_"+today(), 0); show(name+"上次观看视频个数"+s);     return s;} 
var 记录=function(name,key,n){      数据库.put(name+"_"+key,n)}
var 获取记录=function(name,key){    数据库.get(name+"_"+key,0)}
var 今日记录=function(name,key,n){    数据库.put(name+"_"+key+"_"+today(),n)}
var 获取今日记录=function(name,key){  数据库.get(name+"_"+key+"_"+today(),0)}
//
function httpget(url) {var r = http.get(url);    if (r.statusCode == 200) {   return r.body.string();  } else { toastLog("五秒后重试");sleep(5000);  return "";}  }
 
var forcestop=function(appname,st){
    if(!appname){
        return
    }
    if(!getPackageName(appname)){  
        show(appname+"：没有安装");  
        return  
    };   
     show("强制关闭应用:"+appname); 
      st=st||10000;  
       packagename=app.getPackageName(appname);  
       app.openAppSetting(packagename);
      if( device.brand=="samsung"){
        closetexts= ["强制停止","强制停止"];

       }else if(device.brand=="HONOR"){
        closetexts= ["强行停止","强行停止"];
       }
       else if(device.brand=="DOCOMO"){
        closetexts= ["强制停止","停止运行","强制关闭","强行停止","结束运行","确定"];
    }
    else if(device.brand=="Meizu"){
        closetexts= ["强行停止","确定"];
    }
    else if(device.brand=="xiaomi"){
        closetexts= ["结束运行","确定"];
    }
    else if(device.brand=="OPPO"){
        closetexts= ["强行停止","强行停止"];
    }else{
        closetexts= ["强制停止","停止运行","强制关闭","强行停止","结束运行","确定"];
    }
 
  sleep(2000)
  i=0;  while(i<3){
     if (clickalltexts(closetexts,300,2000) ){
          return true
      }
     i=i+1;
    sleep(2000) 
}
}

var  tofloatysetting=function(){
   let i = app.intent({
        action: "android.settings.action.MANAGE_OVERLAY_PERMISSION",
        flags:["activity_new_task"]
    });
    context.startActivity(i);
}
var  todevelopersetting=function(){
    let i = app.intent({ action: "android.settings.APPLICATION_DEVELOPMENT_SETTINGS", flags:["activity_new_task"] // data: "file:///sdcard/1.png"  
});
     context.startActivity(i);
 }
 
var toPkgandClass=function(pkg,classname){
        let i = app.intent({  packageName: pkg, className:classname });
         context.startActivity(i);
}

var todeviceadmin=function(){
       toandroidsetting("com.android.settings.DeviceAdminSettings")
}
var toinputsettings=function(){
    let i = app.intent({
        action: "android.settings.INPUT_METHOD_SETTINGS",
        flags:["activity_new_task"]
        // data: "file:///sdcard/1.png"
    });
    context.startActivity(i);
}
var toinputmethodsubtypesetting=function(){
    tosettingsbyaction("android.settings.INPUT_METHOD_SUBTYPE_SETTINGS")
}
var tolanguagesetting=function(){
    let i = app.intent({
        action: "android.settings.LOCALE_SETTINGS",
        flags:["activity_new_task"]
        // data: "file:///sdcard/1.png"
    });
    context.startActivity(i);
}
var tosettingsbyaction=function(actionname){
    let i = app.intent({
        action: actionname,
        flags:["activity_new_task"]
        // data: "file:///sdcard/1.png"
    });
    context.startActivity(i);
}
var toairpalnemodesetting=function(){
    tosettingsbyaction("android.settings.AIRPLANE_MODE_SETTINGS")
}
var tosearchsetting=function(){
    tosettingsbyaction("android.search.action.SEARCH_SETTINGS")
}
 //到android设置页面
 var  toandroidsetting=function(classname){     toPkgandClass("com.android.settings",classname) }
 //到用户使用情况页面
var tousagestate=function(){    tosettingsbyaction("android.settings.USAGE_ACCESS_SETTINGS")}
var toaccessibilitysetting=function(){    tosettingsbyaction("android.settings.ACCESSIBILITY_SETTINGS")}
var tosystemsetting=function(){    tosettingsbyaction("android.settings.SETTINGS")}
var towifisetting=function(){    tosettingsbyaction("android.settings.WIFI_SETTINGS")}
var toapnsetting=function(){    tosettingsbyaction("android.settings.APN_SETTINGS")}
var todatesetting=function(){    tosettingsbyaction("android.settings.DATE_SETTINGS")}
var towifiipsetting=function(){    tosettingsbyaction("android.settings.WIFI_IP_SETTINGS")}
var tovpnsetting=function(){    tosettingsbyaction("android.settings.VPN_SETTINGS")}
var tophonenetsetting=function(){    tosettingsbyaction("android.settings.DATA_ROAMING_SETTINGS")}
var tosecuritysetting=function(){    tosettingsbyaction("android.settings.SECURITY_SETTINGS")}
var todisplaysetting=function(){    tosettingsbyaction("android.settings.DISPLAY_SETTINGS")}
var toappmanagesetting=function(){    tosettingsbyaction("android.settings.MANAGE_APPLICATIONS_SETTINGS")}
var toallappmanagesetting=function(){    tosettingsbyaction("android.settings.MANAGE_ALL_APPLICATIONS_SETTINGS")}
var tomangerwritesetting=function(){    tosettingsbyaction("android.settings.action.MANAGE_WRITE_SETTINGS")}
var toignorebatteryoptintizationsetting=function(){   tosettingsbyaction("android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS")}
var isfloaty=function(){  return Settings.canDrawOverlays(context)}
var checkfloaty=function(appname){
     appname=appname||app.getAppName(context.getPackageName())
     log("当前应用名:"+appname)
   if(!isfloaty){
       tofloatysetting()
       sleep(2000)
       while(true){
            if (textclick(appname)){
                break
            }
           滑动(20,10,15,10,5,500,300)
           sleep(2000)
       }
   }
}
var sleepr=function(short,long){
    long=long||short+1000
    rt=random(short,long)
    show("等待:"+rt +" 毫秒")
    sleep(rt)
}

var getTextfromid=function(idstr,defaulttext){
    if(!idstr){
        return ""
    }
    defaulttext=defaulttext||""
    node_id=id(idstr).findOne(300)
    if(node_id){
        return node_id.text()
    }else{
        return ""
    }
}
function idclick(idstr,t,left,top,right,bottom){
    t= t|| 100;
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=id(idstr).boundsInside(left, top, right, bottom).findOne(t);
    if(f){
        if(clicknode(f)){
            return true
        }  
    }
    return false
}
//文本点击
function textclick(i,t,left,top,right,bottom){
    t=t || 100
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=text(i).boundsInside(left, top, right, bottom).findOne(t);
    if(!f){
        show("text："+i+":没找到了")
        return false
    }
    show("text："+i+":找到了")
    if(clicknode(f)){
        return true
    }  
    return false
}


function maytextclick(i,t,left,top,right,bottom){
    t=t || 100
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=text(i).boundsInside(left, top, right, bottom).findOne(t);
    if(!f){
         f=textContains(i).boundsInside(left, top, right, bottom).findOne(t)
         if(!f){
             return false
         }
    }
     show("text："+i+":控件找到了")
      if(clicknode(f)){
          return true
      }  
    return false
}

//node 执行点击 
var clicknode=function(v){
    if(!v){
        return
    }
    if(v.clickable()){
      return  v.click()
    }
    if(enablegenius){
             b=v.bounds()
        if(b.centerX()>0&&b.centerY()>0){
         
           if(click(b.centerX(),b.centerY())){
               return true
           }else{
               return clicknode(v)
           }
          
        }else{
            return false
        }
     }else{
      
        if(clickparents(v)){
            return true
        }
        if(clickchilds(v)){
            return true
        }
        r=v.bounds()
        var w = boundsContains(r.left, r.top, r.right, r.bottom).clickable().findOne()
        if(w){
            return w.click()
        }else{
            return false
        }
    }

  
}

//一直找到可以点击控件向上查找
var clickparents=function(v,n){
    i=0
    n=n||15
    while(i<n){
        p=v.parent()
        if(p&&p.clickable()){
            show("找到可点击控件"+toString(p))
            return p.click()
        }else{
            i=i+1
            show("向上查找层数："+i)
            v=p
        }
    }
    return false
}
//找到子类 点击下去
var clickchilds=function(v){
   if(v.childCount()>0){
       for(i=0;i<v.childCount();i++){
           c=i.child(i)
           if(c.clickable()){
               return c.click()
           }else{
             if(clickchilds(v.child(i))){
                return true
             }
           }
       }
   }else{
       return false
   }
   return false 
}
//ids id集合 t 查找id的时间 st 每次点击完成休息时间  
var clickids=function(ids,t,st){
    t=t||500
    st=st||500
    ids.forEach(i => {
       if (idclick(i,t)){
            sleep(st)
       }
    });
}

//点击文本集合
var clicktexts=function(texts,t,st){
    show("开始点击文本集合:"+texts)
    st=st || 500
    t=t || 500
    for(i=0;i<texts.length;i++){
        if(textclick(texts[i],t)){
            sleep(st)
        }
    }
}

var clickalltexts=function(texts,t,st){
    show("开始点击文本集合:"+texts)
    st=st || 500
    t=t || 500
    n=0
    for(i=0;i<texts.length;i++){
        if(textclick(texts[i],t)){
            sleep(st)
            n=n+1
        }
    }
    return n==texts.length
}
//点击仁意一个id就是真真
var clickoneids=function(ids,t,st){
    show("开始点击id集合:"+ids)
    st=st || 500
    t=t || 500
    for(i=0;i<id.length;i++){
        if(idclick(ids[i],t)){
            sleep(st)
            return true
        }
    }
    return false
}

var clickonetexts=function(texts,t,st){
    show("开始点击文本集合:"+texts)
    st=st || 500
    t=t || 500
    for(i=0;i<texts.length;i++){
        if(textclick(texts[i],t)){
            sleep(st)
            return true
        }
    }
    return false
}

//在文本标志出现之前一直点击文本的 t 是最长等待时间 默认十秒无点击效果就退出 发现stop 文本出现就退出
var whileclicktextsbeforetexts=function(clicktexts,stoptexts,t){
    t=t||10000   
    
    st=nowdate().getTime()
    while(true){
       clicktexts(clicktexts)
       if(textoneexist(stoptexts)){
           return true
       }
       if(nowdate().getTime()-st>t){
           return false
       }
    }
 }

//在文本标志出现之前一直点击id的 t 是最长等待时间
var whileclickidsbeforeids=function(ids,stopids,t){
    t=t||10000
    st=nowdate().getTime()
    while(true){
       clickids(ids)
       if(idoneexist(stopids)){
           return true
       }
       if(nowdate().getTime()-st>t){
           return false
       }
    }
 }

function control_click(button, vlause, left, top, right, bottom) {
    // 功能---点击控件
    // 输入---参数1:元素[id、text 、desc、className],参数2:元素值,剩余参数:left, top, right, buttom
    // 默认后四位为当前屏幕
    // 返回---真假
    var result
    var button_info
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    sleep(200)
    if (button == 1) {
        button_info = id(vlause).boundsInside(left, top, right, bottom).findOne(3000);
    } else if (button == 2) {
        button_info = text(vlause).boundsInside(left, top, right, bottom).findOne(3000);
    } else if (button == 3 ) {
        button_info = desc(vlause).boundsInside(left, top, right, bottom).findOne(3000);
    } else if (button == 4) {
        button_info = className(vlause).boundsInside(left, top, right, bottom).findOne(3000);
     } else if (button == 5) {
        button_info = textContains(vlause).boundsInside(left, top, right, bottom).findOne(3000);
    } else {
        console.log("传参错误");
        result = false
        return false
    }
    if (button_info) {
        if(button_info.click()){
            return true
        }
        var xy_info = button_info.bounds()
        if (  0 < xy_info.centerX() && xy_info.centerX() < device.width 
        	&&0 < xy_info.centerY() && xy_info.centerY() < device.height){
        	click(xy_info.centerX(), xy_info.centerY());
        	return true
        }else{
            return false
        }
    } else {
        return false
    }
}
//  0就是控件滑动 x1 < x2  向后滑动  x>x2 向前滑动  y1>y2 向上滑动 向前    y1 <y2 向下滑动 向后 
function 滑动(z,x1,y1,x2,y2,t,r) {
    if(z>0){
        var w = device.width/z;
        var h = device.height/z;
        startx=w * x1
        endx=w*x2
        starty=h*y1
        endy=h*y2
    }else{
        startx=x1
        endx=x2
        starty=y1
        endy=y2
    }
     if(enablegenius){
        r=r||1000
       // show("滑动"+x1+","+y1+"->"+x2+","+y2)
        swipe(startx, starty , endx , endy, t+random(0, r))
    }else{
        if(startx>=endx){
            left=endx
            right=startx
        }else{
            left=startx
            right=endx
        }
        if(starty>endy){
            top=endy
            bottom=starty
        }else{
            top=starty
            bottom=endy
        }
        var w = boundsContains(left, top, right,bottom).scrollable().findOne();
        if(w){
            if(startx<endx){
                w.scrollBackward()
            }else{
                w.scrollForward()
            }
        }
    }
}



/*所有文本存在才返回真 */
var textallexist=function(texts){
    s=0
    if(texts.length>0){
        for(i=0;i<texts.length;i++){
            if(text(texts[i]).exists()){
                s=s+1
            }else{
                return false
            }
        }
        if(s==texts.length){
            return true
        }
    }
    return false
}

/* 所有id都存在才返回真  只要有一个不存在就返回false */
var idallexist=function(ids){
    s=0
    if(ids.length>0){
        for(i=0;i<ids.length;i++){
            if(id(ids[i]).exists()){
                s=s+1
            }else{
                return false
            }
        }
        if(s==ids.length){
            return true
        }
    }
    return false
}

/*文本只要存在一个就返回真 */
var textoneexist=function(texts){
     if(texts.length>0){
        for(i=0;i<texts.length;i++){ if(text(texts[i]).exists()){  return true }  }
    }
    return false
}
/**只要存在一个id就返回真 */
var idoneexist=function(ids){
     if(ids.length>0){
        for(i=0;i<ids.length;i++){  if(id(ids[i]).exists()){ return true;  }  }
    }
    return false
}
var firstrunapp=function(appname){
    importClass(com.hongshu.utils.AppUtils);
    packagename=app.getPackageName(appname)
    app.launchPackage(packagename)
    允许启动文字=['允许',"确定","始终允许","打开"]
    cfirsti=0
    while(cfirsti<5){
        if(idContains(packagename).findOne()){
            show(packagename+" 在前台："+currentPackage())
            return true
        }else{
            show(packagename+" 不在在前台："+currentPackage())
            app.launchPackage(packagename)
            sleep(2000)
        }
        clicktexts(允许启动文字)
        cfirsti=cfirsti+1
    }
    return true
}

//下载app
function downloadApk(name,url,isinstall) {
    isinstall=isinstall || false
    runtime.requestPermissions(["WRITE_EXTERNAL_STORAGE","READ_EXTERNAL_STORAGE"])
     // 在每个空格字符处进行分解。
     file_name_url = url
     file_name = name+".apk"
     console.log('要下载的APP的：' + file_name);
     // 设置APP的路径
     file_path_root = files.getSdcardPath()
     filePath = file_path_root + "/" + file_name
     importClass('java.io.FileOutputStream');
     importClass('java.io.IOException');
     importClass('java.io.InputStream');
     importClass('java.net.MalformedURLException');
     importClass('java.net.URL');
     importClass('java.net.URLConnection');
     importClass('java.util.ArrayList');
     log("开始下载之前："+name)
     var url = new URL(url);
     var conn = url.openConnection(); //URLConnection
     var inStream = conn.getInputStream(); //InputStream
     var fs = new FileOutputStream(filePath); //FileOutputStream
     var connLength = conn.getContentLength(); //int
     var buffer = util.java.array('byte', 1024); //byte[]
     var byteSum = 0; //总共读取的文件大小
     var byteRead; //每次读取的byte数
     // log('要下载的文件大小=');
    //   log('要下载的文件大小='+connLength);
    //  if(files.exists(filePath)&&FileUtils.getContentLength(files)==connLength){
    //     log("本地文件是源文件")
    //     if(isinstall){
    //         install_app(filePath,name)
    //         return
    //      }
    //   }
    log("开始下载："+name)
     var threadId = threads.start(function () {
         while (1) {
             var 当前写入的文件大小 = byteSum;
             var progress = (当前写入的文件大小 / connLength) * 100;
             if (progress > 0.1) {
                 var progress = parseInt(progress).toString() + '%';
                 ui.run(function () {
                    show(name.substr(0,6) + ":下载进度-"+progress);
                    // toast(name + "下载进度" + progress)
                     // w.progressNum.setText(progress);
                 });
                 if (当前写入的文件大小 >= connLength) {
                     break;
                 }
             }
             sleep(1000);
         }
     });
     while ((byteRead = inStream.read(buffer)) != -1) {
         byteSum += byteRead;
         //当前时间
         currentTime = java.lang.System.currentTimeMillis();
         fs.write(buffer, 0, byteRead); //读取
     }
     threadId && threadId.isAlive() && threadId.interrupt();
     show(name+'下载完成');
     if(isinstall){
        install_app(filePath,name)
     }    
 }
 function install_app(filePath, name) {
     ////--------------安装--------------////
     if(filePath){
        installapp(filePath)
     }
     clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]
     if( device.brand=="samsung"){
        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]

       }else if(device.brand=="HONOR"){
        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]
       }
       else if(device.brand=="DOCOMO"){
        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]
    }
    else if(device.brand=="Meizu"){
        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]
    }
    else if(device.brand=="xiaomi"){
        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]
    }
    else if(device.brand=="OPPO"){
        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]
    }else{
        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]
    }

    // installappwithfilepath(filePath)
     for (let i = 0; i < 100; i++) {
         // is_first = textMatches(/(始.*|.*终.*|.*允.*|.*许)/).findOne(1000);
            toastLog("检测中....")
            if(textclick("允许此来源")){
                back()
                sleep(1000)
            }
           clicktexts(clickarray)
           if(text("允许此来源").exists()){
              if(idclick("android:id/switch_widget")){
                  control_click(3,"向上导航")
              }
            }
            if(textclick("允许来自此来源的应用")){
               back()
               sleepr(1200)
            }
            //夏普手机的禁止安装
            if(device.brand=="DOCOMO"){
                if(text("出于安全考虑，已禁止您的手机安装来自此来源的未知应用").exists()){
                    if(textclick("设置")){
                        sleep(2000)
                        if(textclick("允许来自此来源的应用")){
                            sleep(500)
                            back()   } }  } 
                        }
          //这里是佳佳的那个hd1的 特殊设置
         if (textclick("安全保护")) {
             toast("安全保护安全保护安全保护")
             sleep(500)
             // var 坐标 = is_button.bounds()
             // click(坐标.left + 5, 坐标.bottom - 2)
             while (true) {
                 idclick("security_install_protection_switch")
                 sleep(500)
                 is_first = id("security_install_protection_switch").findOne(500)
                 if (!is_first.checked()) {
                     show("已取消保护")
                     sleep(1000)
                     break;
                 }
             }
             back()
         }
         if (textclick("完成")){
             return
         }
         if (text("打开").exists()){
             return
        }   
        //系统可以获取到app 的包名的时候就
        if(app.getPackageName(name)){
            sleep(1000)
            return
        }
     }
     back()
     sleep(1000)
 }
 var checkinstallapp=function(){
    runtime.requestPermissions(["WRITE_EXTERNAL_STORAGE","READ_EXTERNAL_STORAGE"])
     var appconfigs=httpget(rewardapplisturl)
     var apps=JSON.parse(appconfigs)
     apps.forEach(app => {
         show("name:"+app.name+"package:"+app.package)
         if(!getPackageName(app.name)&&app.install){
            show("检测到本机没有安装应用："+app.name+"即将自动下载并安装")
            downloadandinstallapp(app.name,app.package)
         }
     })
  }

 //根据app名下载并安装应用
 var downloadandinstallapp=function(appname,apppkg){
    appinfo=getAppInfobyAppNameAndPkg(appname,apppkg)
    if(appinfo){
        log("应用详情：获取成功")
        downloadApk(appname+"-"+appinfo.appDetail.apkMd5,appinfo.appDetail.apkUrl,true)
    }
}
//关闭其他应用
var stopOtherScript=function(){
    var thisengs=engines.myEngine()
    var allengs=engines.all()
    allengs.forEach(e =>{
        if(e.getId()!=thisengs.getId()){
            engines.stop(e.getId())
        }
    })
}
var runurlscript=function(name,url){
    content=httpget(url)
    if(content){
       engines.execScript(name,content, {"useFeatures":["continuation"]})
       last=app
       sleep(app.onetime*1000)
    }
}

var phonenumber=function(){
    runtime.requestPermissions(["READ_PHONE_STATE"])
    var telephoneservice = context.getSystemService("phone")
     pnumber = telephoneservice.getLine1Number()
     
     if(!pnumber){
         pnumber=spt.getString("phonenumber")
     }
     if(pnumber.startsWith("+86")){
         pnumber=pnumber.substr(3)
     }
     if(pnumber){
         return pnumber
     }else{
         return null
     }
}
//本地配置启用脚本
var startallapp = function(){
    addbmobchannel("hongshuyuedu")
    let apps=数据库.get("runlist","")
    var last
    if(!apps){
        show("本地运行配置为空，从云端获取默认配置")
        var appconfig=httpget(rewardapplisturl)
        apps=JSON.parse(appconfig)
    }
    apps.forEach(app =>{
      if(last){
        记录今日时长(last.name,last.onetime)
        forcestop(last.name)
      }
      stopOtherScript()
      if(app.open){
        if(!getPackageName(app.name)){
            log("没有安装："+app.name)
            downloadandinstallapp(app.name,app.package)
        }
        if(app.scripturl && getPackageName(app.name)){
            log(app.name+":云端url脚本存在："+app.scripturl)
            content=httpget(app.scripturl)
            if(content){
               engines.execScript(app.name,content, {"useFeatures":["continuation"]})
               last=app
               sleep(app.onetime*1000)
            }
       }else if(app.bmobid && getPackageName(app.name)){
           log(app.name+":bmob脚本存在："+app.bmobid)
           engines.execBmobScriptWithName(app.name,app.bmobid,{})
           last=app
       }else{
           log(app.name+":没有找到可以运行脚本存在：")
       }
      }
    })
}
var clickscreencapture=function(){
    while(true){  if(clicktexts(["不再提醒","不在显示"])){  } ; if(textclick("立即开始")){break  };  sleep(2000); }
}
var checkscreencapture=function(){

  // engines.execScript("requestscreencapture",httpget("https://gitee.com/zhangshu345012/sample/raw/v1/base/requestscreencapture.js"),{})
  threads.start(function () {
      while(n_t<5){
          n_t=n_t+1
        star_ing = text("立即开始").findOne(2000)
        if (star_ing) {
            star_ing.click()
            return
        }
        sleep(1500)
      }
  
})
if (!requestScreenCapture()) {
    show("请求截图权限失败！");
}
}
//运行广告app
var runadapp=function(appname,apppkg,showadtime,isforcestop){
    if(!appname&&!apppkg){
        return false
    }
    if(!getPackageName(appname)){
        return false 
    }
  
app.launchApp(appname)
runapppkg=app.getPackageName(appname)
runappisfirst=getbooleanvalue(appname+"_firstrun")
sleep(2000)
runtime=showadtime||random(5,10)*60*1000
runstarttime=nowdate().getMilliseconds()
toastLog("当前运行app："+appname+"--包名:"+runapppkg+"\n当前时间："+runstarttime+"--计划运行时间:"+runtime)
while(nowdate().getMilliseconds()-runstarttime<runtime){
    if(!idContains(runapppkg).findOne(1000)){
        app.launchPackage(runapppkg)
        sleep(5000)
    }
}
if(isforcestop){
    forcestop(appname)
}

}
var isNotificationManager=function(){    importClass(com.hongshu.utils.PermissionUtils);    return PermissionUtils.isnotificationListenerEnable()}
var toNotificationManager=function(){    tosettingsbyaction("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS")}
var addbmobchannel=function(channels){ BmobPushUtils.addchannel(channels)}

var removebmobchannel=function(channels){    BmobPushUtils.removechannel(channels)}

var bmobpushmessage=function(channels,message){BmobPushUtils.pushmessage(channels,message)}


//启动deviceadmin
var startdeviceadmin=function(){
    if(isdeviceadmin()){
        show("设备管理器激活了")
        return
    }
    ui函数=httpget("https://gitee.com/zhangshu345012/sample/raw/v1/script/快捷方式/系统快捷设置.js");
    app.launch(context.getPackageName())
    sleep(1000)
    var eeee= engines.execScript("uiname",ui函数,{})
    sleep(1000)
    let ss=true
    while(ss)
    {
        if(isdeviceadmin()){
            show("设备管理 ok")
            if(eeee.getId()){
                show("getid："+eeee.getId())
                engines.stop(eeee.getId())
            }
            ss=false
            return true
        }else{
            show("设备管理 no")
        }
        clicktexts(["设备管理","激活",scriptappname,"启动","启用此设备管理应用","激活此设备管理员"],500,2000)
      
        sleepr(500,1000)
        滑动(20,10,17,10,5,500,300)
    }
}

//检测权限
var checkpermission=function(permissions){
    permissions.forEach(p =>{
        switch (p) {
            case "悬浮":
                checkfloaty()
                break;

            case "悬浮":
                
                 break;
            case "悬浮":
                
                  break;
             case "悬浮":
                
                   break;
            default:
                break;
        }
    })
}

//执行函数 在一定时间内 最小10秒
var doactionmaxtime=function(action,maxtime){
    if(!action){
        return
    }
    maxtime=maxtime||10000
    stime=nowdate().getTime()
    while(nowdate().getTime()-stime<maxtime){
        action()
    }
}
//执行函数 几次  
var doactionmaxnumber=function(action,maxnumber){
    if(!action){
        return
    }
    maxnumber=maxnumber||1
    i=0
    while(i<maxnumber){
        action()
        i=i+1
    }
}
   
var uninstallapp=function(appname){
  pkg=getPackageName(appname)
  if(!pkg){
      return false
  }
  if(appname){
    let i = app.intent({
        action: "android.intent.action.DELETE",
        flags:["activity_new_task"],
        data: "package:" +pkg  //Uri.parse("package:" + getPackageName(appname))
    });
    context.startActivity(i);
    n_uninstall=0
    while(n_uninstall<4){
        if(textclick("确定")){
            return true
        }
        if(textclick("卸载")){
            return true
        }
        sleep(1000)
        n_uninstall=n_uninstall+1
    }
  }
}
var uninstallpackage=function(packageName){
    name=app.getAppName(packageName)
    if(!name){
        return false
    }
    let i = app.intent({
          action: "android.intent.action.DELETE",
          flags:["activity_new_task"],
          data: "package:" + packageName //Uri.parse("package:" + getPackageName(appname))
      });
      context.startActivity(i);
      while(true){
          if(textclick("确定")){
              return
          }
          if(textclick("卸载")){
              return
          }
      }
  }
  
var issystemsettings=function(){
   return PermissionUtils.isGrantedWriteSettings()
}
var checksystemsettings=function(){
    if(issystemsettings()){
        log("有系统设置权限")
        return true
    }else{
        log("没有系统设置权限")
        PermissionUtils.requestWriteSettings(null)
        while(true){
            sleep(1000)
            if(issystemsettings()){
                log("有系统设置权限")
                return true
            }else{
                if(clickonetexts(["允许权限","允许许可","允许修改系统设置"],200,1500)){
                    sleep(1000)
                }else{
                    app.openAppSetting(context.getPackageName())
                    滑动(20,10,17,10,3,500,500)
                    if(clickonetexts(["更改系统设置","可更改系统设置的应用程序","允许修改系统设置","允许编写系统设置"])){
                        sleep(1000)
                        if(clickonetexts(["允许","允许许可","允许权限","允许修改系统设置"])){
                            
                        }
                  }
                }
            }
        }
    }
}
// 
var alltest=function(){
    log("全部测试")
    // localstartallapp()
    device.wakeUpIfNeeded()
    checkfloaty()
    checksystemsettings()
    startdeviceadmin()
}
var 刷宝邀请=function(){
    var h=httpget(getrandforstrs(刷宝邀请链接))
    toastLog(h)
    setClip(h) 
}
var 邀请链接=function(url){
    let content=httpget(url)
    let invitecodes=content.split("--------")  //8ge
    str=""
    if(invitecodes){
        if(invitecodes.length>1){
           str= invitecodes[random(0,invitecodes.length)]
        }else{
            str=content
        }
        setClip(str)
    }
}


var 火山极速版邀请=function(){
    var h=httpget(getrandforstrs(火山极速版邀请链接))
    setClip(h)
 }

 var 快手极速版邀请=function(){
    var h=httpget(getrandforstrs(快手极速版邀请链接))
    setClip(h)
 }

//直接从应用宝获取应用信息
var getAppInfobyAppNameAndPkg=function(appname,apppkg){
    log("查找app:"+appname+"--"+apppkg)
    let appinfos=httpget("https://sj.qq.com/myapp/searchAjax.htm?kw="+appname)
    log("查找app之后:"+appname+"--"+apppkg)
    if(appinfos){
        log("获取成功")
        data=JSON.parse(appinfos)
        let obj=data.obj
  
        if(obj){
            let items=obj.items
            if(items){
                i=0
                while(i<items.length){
                    let e=items[i]
                    if(apppkg){
                        if(e.pkgName==apppkg){
                            log(e.pkgName+"=="+apppkg)
                            return e
                        }else{
                            log(e.pkgName+"<>"+apppkg)
                        }
                    }else{
                        appDetail=e.appDetail
                        if(appDetail.appName==appname){
                            return e
                        }
                    }
                    i=i+1
                }
            }else{
                log("items为空")
            }
        }else{
            log("obj为空")
        }        
    }
    return null
}

function get_phone_code(app_name,reg,startwords,endwords){
    contet = ""
    packname = ""
    code = ""
    reg=reg|| /\d{4}/ig
    //--------------------------*******************--------------------------//
    var thread = threads.start(function (app_name) {
        events.observeNotification();
        events.onNotification(function (notification) {
            printNotification(notification);
        });
        toastLog("监听中，请在日志中查看记录的通知及其内容");
        function printNotification(notification) {
            log("应用包名: " + notification.getPackageName())
            log("通知文本: " + notification.getText());
            log("通知优先级: " + notification.priority);
            log("通知目录: " + notification.category);
            log("通知时间: " + new Date(notification.when));
            log("通知数: " + notification.number);
            log("通知摘要: " + notification.tickerText);
            if(notification.getText()){
                contet = notification.getText()
            } 
            if (notification.tickerText){
                contet = notification.tickerText
            }
            packname = notification.getPackageName()
        }
    });
    num = 0
    while (true) {
        num +=1 
        if(num > 20){
            toastLog("监听时长1分钟,接受短信失败,退出自动登录"); 
            thread.interrupt();
            return
        } 
        toastLog("短信监听中...");
        sleep(2000);
        if(!contet){
            continue
        }
        if(contet.includes(appname)){
            if(startwords){
                startindex=contet.indexOf(startwords)+startwords.length
                if(startindex>-1){
                    contet=contet.substr(startindex)
                }
            }
            if(endwords){
                endindex=contet.indexOf(endwords)
                if(endindex>-1){
                    contet=contet.substr(0,endindex)
                }
            }
            toastLog("找到对应的短信");
            code =contet.match(reg)[0]
            toastLog("停止监听")
        thread.interrupt();
            break
        } 
    }
    show("接受的验证码是:"+code)
    setClip(code)
    return code
}


//关闭穿山甲激励视频广告
var close_ad_toutiao=function(apppkg){
    if(currentActivity()=="com.bytedance.sdk.openadsdk.activity.TTRewardVideoActivity"){
        while(true){
            if(idclick(apppkg+":id/tt_video_ad_close_layout",300)){
                return true
            }
            if( idclick(apppkg+":id/tt_video_ad_close",100)){
                return true
            }
           
            sleep(1000)
            if(currentActivity()=="com.bytedance.sdk.openadsdk.activity.TTRewardVideoActivity"){
                
                return true
            }
        }
      
    }

   return false
}

var close_ad_qq=function(apppkg){
    // ccj_file_paths 
    if(currentActivity()=="com.qq.e.ads.PortraitADActivity"){
        while(true){
            ci=className("android.widget.ImageView").clickable().findOne(300)
            if(ci){
                if(clicknode(ci)){
                    isclose=true
                    return true
                }else{
                    return false
                }
            }
            if(text("点击下载").exists()){
                ci=className("android.widget.ImageView").clickable().findOne(300)
                if(ci){
                    if(clicknode(ci)){
                        isclose=true
                        return true
                    }else{
                        return false
                    }
                }
            }
            sleep(1000)
            if(currentActivity()!="com.qq.e.ads.PortraitADActivity"){
               
                return true
            }
        }
    }
       
}
 //log(device.device + device.isCharging() +device.getBattery()+device.getTotalMem()+"--"+device.getAvailMem())
// log()

// device.setMusicVolume(0)
// maytextclick("查看领取")

// log("手机号："+phonenumber())

// reg = /\d{4}/ig
// code= get_phone_code("刷宝",reg)
//  toastLog("最后一步了验证码："+code )      
//engines.execScript("获取短信",get_phone_code.toString()+";get_phone_code()",null)
// log(userinfo())
// device.wakeUpIfNeeded()
// sleep(2000)

 //device.lockScreen()
  
// function cc(){
//     i=0
//     while(i<10){
//         toastLog("次数："+i)
//     }
// }
// threads.start(cc)


//  log(device)
//  forcestop("刷宝短视频")
//  toPkgandClass("com.android.settings","com.android.settings.SubSettings")