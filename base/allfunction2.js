importClass(com.hongshu.utils.PermissionUtils)
importClass(android.content.ComponentName)
importClass(com.hongshu.receiver.DeviceReceiver)
importClass(com.hongshu.utils.IntentUtils)
importClass(android.net.Uri)
importClass(com.hongshu.utils.SPUtils)
importClass(android.graphics.Bitmap)
importClass(com.hongshu.utils.KeyboardUtils)
importClass(com.hongshu.advice.AdviceManager)
importClass(com.hongshu.bmob.push.BmobPushUtils)
importClass(android.provider.Settings);  
importClass(android.icu.text.SimpleDateFormat);
importClass(java.util.HashSet);
importClass(com.hongshu.utils.GsonUtils)
importClass(com.hongshu.utils.AppUtils)
importClass(com.hongshu.androidjs.core.script.Scripts)
importClass(com.hongshu.utils.SDCardUtils)
importClass(com.hongshu.androidjs.core.debug.DevPluginService)
// DevPluginService.getInstance().debugtoip("zhangshuhong888.iask.in");
device.wakeUpIfNeeded()
var allrewardappurl="https://gitee.com/zhangshu345012/sample/raw/v1/config/newrewardapplist.json"
var aduiscripturl="https://gitee.com/zhangshu345012/sample/raw/v1/script/快捷方式/系统快捷设置.js"
var whiteapps=["微信","京东","淘宝","冰箱","开发者助手","云闪付","QQ浏览器","支付宝","多开分身","哪吒",
"快手","抖音","微视","QQ","拼多多","应用宝","酷安","搜狗输入法","讯飞输入法",
"唐诗精选","一个就够","随便粘","东东随便","KeepHealth","东览","唐诗宋词集合","动物的叫声","小白闹钟天气","手机营业厅",
"小白日历","减压声音","英语四级单词汇","冥想音乐","宝宝常识","小强助理","儿童绘画板","MD编辑器","休息声音"
]
const alldelectdirs=["yysdk","yy_video1","91AV"]
var readerapps=["微信","京东","淘宝","冰箱","开发者助手","云闪付","QQ浏览器","支付宝","多开分身","抖音短视频","手机营业厅","哪吒",
"快手","抖音","微视","QQ","拼多多","应用宝","酷安","搜狗输入法","讯飞输入法","随便粘"]
var scriptapps={"随便粘":163,"东东随便":0}

const sdtotalsize=SDCardUtils.getExternalTotalSize()
log("内存总大小:"+sdtotalsize)
var sdavailablesize=function(){
    return SDCardUtils.getExternalAvailableSize()
}
log("可用:"+sdavailablesize())
log("比例:"+sdavailablesize()/sdtotalsize)
const disableapps=["AT&T ProTech","Caller Name ID","游戏中心","Google Play 商店","Samsung Gear","简报","Lookout",
"AT&T Remote Support","ANT + DUT","Gmail","YP","Google Play 音乐","myAT&T","游戏工具","云端硬盘","地图",
"Call Log Backup/Restore","Google 备份传输","环聊","YouTube","Google","DIRECTV","游戏中心","Smart Limits","Remote"
]

var 多分分身邀请码=["FA9X9K"]
var admanager=AdviceManager.getInstance();
var 数据库= storages.create("hongshuyuedu");
var nowdate=function(){return new Date()};
var scriptstarttime=nowdate().getTime()
var scriptruntime=function(){return(nowdate().getTime()-scriptstarttime)/1000}
var rewardapplisturl="https://gitee.com/zhangshu345012/sample/raw/v1/config/newrewardapplist.json"  //奖励app 运行的配置文件的路径
var today=function(){let td=nowdate();return td.getFullYear()+"_"+td.getMonth()+"_"+td.getDate();}
var enablegenius=device.sdkInt>=24
var weixinloginactivity="com.tencent.mm.plugin.webview.ui.tools.SDKOAuthUI"
log("当前系统版本："+device.sdkInt+"--手势滑动："+enablegenius)
var scriptappname=app.getAppName(context.getPackageName())
log("脚本app名："+scriptappname)
var 刷宝邀请码=["96ZWEN","Q4FVDZ","APV3EA3"]  //我的 9X4T2X
var 快手极速版邀请码=["xps8bz","8ca66w","2gz5jwv","2bu24wu","26b2w7z","2bn23jb","26bmyff"]
var 趣多多邀请码=["89797906"]
var 快手极速版邀请集合="https://gitee.com/zhangshu345012/sample/raw/v1/base/邀请码/快手极速版/invitecode.txt"
var 刷宝短视频邀请集合="https://gitee.com/zhangshu345012/sample/raw/v1/base/邀请码/刷宝/invitecode.txt"
var 火山极速版邀请集合="https://gitee.com/zhangshu345012/sample/raw/v1/base/邀请码/火山极速版/invitecode.txt"
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
var dpm
var deviceadmincomponent
var changesetting=false //是否改变亮度和音量的标识

var isdeviceadmin=function(){
    deviceadmincomponent=new ComponentName(context.getPackageName(),"com.hongshu.receiver.DeviceReceiver");
    dpm=context.getSystemService("device_policy");    return dpm.isAdminActive( deviceadmincomponent);
}
var 微信扫一扫=function(){
    var intent = com.hongshu.utils.IntentUtils.getComponentIntent("com.tencent.mm","com.tencent.mm.ui.LauncherUI",true)
    intent.putExtra("LauncherUI.From.Scaner.Shortcut", true);
    intent.setFlags(335544320);
    intent.setAction("android.intent.action.VIEW");
    context.startActivity(intent);
}
var 微信浏览=function(url){
    var intent = com.hongshu.utils.IntentUtils.getComponentIntent("com.tencent.mm","com.tencent.mm.plugin.base.stub.WXCustomSchemeEntryActivity",true)
     intent.putExtra("LauncherUI.From.Scaner.Shortcut", true);
    // intent.setFlags(335544320);
    // intent.setAction("android.intent.action.VIEW");
    context.startActivity(intent);
}

var 视频重复次数=2
var ratio=1
var gfw,gsfw
var isshowfloaty=false  //是否显示提醒
var spt=SPUtils.getInstance()  //保证和APP交互 使用同一个
var getstrvalue=function(key,defaultvalue){ defaultvalue=defaultvalue||"";   return spt.getString(key,defaultvalue)}
var getintvalue=function(key,defaultvalue){  defaultvalue=defaultvalue||-1;  return spt.getInt(key,defaultvalue)}
var getlongvalue=function(key,defaultvalue){  defaultvalue=defaultvalue||-1;  return spt.getLong(key,defaultvalue)}
var getfloatvalue=function(key,defaultvalue){  defaultvalue=defaultvalue||-1;  return spt.getLong(key,defaultvalue)}
var getbooleanvalue=function(key,defaultvalue){  defaultvalue=defaultvalue||false;   return spt.getBoolean(key,defaultvalue)}
var getstrsetvalue=function(key){   return spt.getStringSet(key)}
var  creatgfloatywindow=function(){
    gfw=floaty.rawWindow(
        <horizontal  >
            <text  id="text" w="*" h="*" gravity="center" textSize="18sp" background="#55ffff00">提醒</text>
        </horizontal>
    );
    gfw.setSize(device.width, 120)
    gfw.setTouchable(false)
    gfw.setPosition(0,80)
    isshowfloaty=true
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

//列出所有应用 delectapp  删除非应用
function listapp(keepapps,delectapp){
    let allapps=[]
    let  appnames=whiteapps
    if(keepapps){
        appnames=keepapps
    }

    if(device.brand=="samsung"){
        delectapp=delectapp||true
        if(delectapp){
            var appconfig=httpget(allrewardappurl)
            apps=JSON.parse(appconfig)
            apps.forEach(app =>{
             if(app.install){
                appnames.push(app.app.name)
             }
            })
        }
    }else{
        delectapp=false
    }

    //列出app
    var packageManager=context.getPackageManager()
    var packageInfos = packageManager.getInstalledPackages(0);
    for(var i = 0; i < packageInfos.size(); i++) {
        var packageInfo = packageInfos.get(i);
            //todo 压缩只对保存有效果bitmap还是原来的大小
        //第一次安装时间
        dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        appDate = packageInfo.firstInstallTime;
        app_name=packageInfo.applicationInfo.loadLabel(packageManager),
        app_version= packageInfo.versionName,
        app_packageName= packageInfo.packageName,
        app_firstInstall=  dateFormat.format(appDate),
        app_issystem= (packageInfo.flags&1)!=0
        app_isselect=false
        allapps.push({
            name: app_name,
            version: "版本号: " + app_version,
            packageName: app_packageName,
            firstInstall: "安装时间: " + app_firstInstall,
            isselect:app_isselect,
            issystem:app_issystem
        });
    };
    m=0
    log("白名单："+appnames.length+"+++"+appnames)
    allapps.forEach(app =>{
        log(app.name+":"+app.packageName)
      if(!AppUtils.isAppSystem(app.packageName)){
          if(appnames.indexOf(app.name)==-1){
                toastLog(app.name+"不是白名单app")
                if(delectapp){
                    uninstallapp(app.name)
                }
                // log("第三方应用"+GsonUtils.toJson(app))
          }else{
                toastLog(app.name+"是白名单app")
          }
            m=m+1
      }
  })
    return allapps
}

function keepappclear(url){
    var appconfig=httpget(url)
    var allapps=[]
    appnames=whiteapps
    apps=JSON.parse(appconfig)
    apps.forEach(app =>{
     if(app.install){
        appnames.push(app.name)
     }
    }) 
    var packageManager=context.getPackageManager()
    var packageInfos = packageManager.getInstalledPackages(0);
    for(var i = 0; i < packageInfos.size(); i++) {
        var packageInfo = packageInfos.get(i);
            //todo 压缩只对保存有效果bitmap还是原来的大小
        //第一次安装时间
        dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        appDate = packageInfo.firstInstallTime;
        app_name=packageInfo.applicationInfo.loadLabel(packageManager),
        app_version= packageInfo.versionName,
        app_packageName= packageInfo.packageName,
        app_firstInstall=  dateFormat.format(appDate),
        app_issystem= (packageInfo.flags&1)!=0
        app_isselect=false
        allapps.push({
            name: app_name,
            version: "版本号: " + app_version,
            packageName: app_packageName,
            firstInstall: "安装时间: " + app_firstInstall,
            isselect:app_isselect,
            issystem:app_issystem
        });
    };
    m=0
     log("白名单："+appnames)
    allapps.forEach(app =>{
      if(!AppUtils.isAppSystem(app.packageName)){
          if(appnames.indexOf(app.name)==-1){
                toastLog(app.name+"不是白名单app")
                uninstallapp(app.name)
                log("第三方应用"+GsonUtils.toJson(app))
          }else{
            toastLog(app.name+"是白名单app")
          }
            m=m+1
      }
  })
    log("一共第三方应用："+m)
    return allapps
}


var appstophander=function(){
    if( device.brand=="samsung"){clicktexts(["关闭应用","关闭应用程序"]) }
    else if(device.brand=="HONOR"){ clicktexts(["关闭应用","关闭应用程序"])}
    else if(device.brand=="DOCOMO"){clicktexts(["关闭应用","关闭应用程序"])}
    else if(device.brand=="Meizu"){clicktexts(["关闭应用","关闭应用程序"])}
    else if(device.brand=="xiaomi"){clicktexts(["关闭应用","关闭应用程序"])}
    else if(device.brand=="OPPO"){clicktexts(["关闭应用","关闭应用程序"])}
    else{if(textoneexist(["关闭应用","关闭应用程序"])){clickonetexts(["确定","关闭应用","关闭应用程序"])}}
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
            "task_source":2,
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
            "tast_source":2,
            "source":2,
            "path":scriptsurl
            }
        }
    );
    context.startActivity(i);
}

var runadui=function(pkg){ runscriptIntent(pkg,aduiscripturl)}
var show=function(txt){ 
    try {
        if(!isshowfloaty){  toastLog(txt);return  };
        if(!gfw){ creatgfloatywindow(); }else{
            ui.run(function(){ gfw.text.setText("运行:"+scriptruntime()+"秒："+txt);})
        }
       
    } catch (error) {
        log(error)
    }

}
var 上滑=function(){    滑动(20,13,17,10,4,500,500);}
var 下滑=function(){    滑动(20,10,3,13,17,500,500);}
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

var 应用登录=function(name){return getbooleanvalue(name+"_login",false)}
var 应用已登录=function(name){spt.put(name+"_login",true)}
var 今日签到=function(name){cs=数据库.get(name+"_sign_"+today(), false);toastLog(name+"今日签到:"+cs);  return cs;}
var 今日已签到=function(name){数据库.put(name+"_sign_"+today(), true)}
var 今日时长=function(name){s=数据库.get(name+"_time_"+today(), 0);toastLog(name+"今日时长:"+s);return s;}
var 今日滑动次数=function(name){name= name||"glode";cs=数据库.get(name+"_"+today()+"_move", 0);toastLog(name+"：今日滑动次数:"+cs);return cs;}
var 设置今日滑动次数=function(name,i){name=name||"glode";i=i||0;数据库.put(name+"_"+today()+"_move", i);toastLog(name+"：记录今日滑动次数:"+i); return cs;}
var 记录今日时长=function(name,t){    t=t || 0; 数据库.put(name+"_time_"+today(),今日时长(name)+t);}
var 今日提现=function(name){    name=name || "";    return 数据库.get(name+"_cashout_"+today(),false);}
var 今日已提现=function(name){    数据库.put(name+"_cashout_"+today(),true);    toastLog(name+"今日已提现");}
var 记录今日金币=function(name,i){    数据库.put(name+"_lastcoin_"+today(),i);}
var 上次今日金币=function(name){  s= 数据库.get(name+"_lastcoin_"+today(), 0); toastLog(name+"上次今日金币："+s);return s; } 
var 记录现在金币=function(name,i){    log(name+":现在金币："+i);    数据库.put(name+"_lastcoin",i);}
var 上次金币=function(name){   s= 数据库.get(name+"_lastcoin", 0);  toastLog(name+"上次金币："+s);  return s; } 
 //可以通过上次的金币来判断是否 还可以获取金币
var 记录现在余额=function(name,f){log(name+":现在余额："+i);  数据库.put(name+"_lastmoney",f); } 
var 上次余额=function(name){  s=   数据库.get(name+"_lastmoney", 0.0);toastLog(name+"上次余额："+s);    return s; } 
var  记录现在滑动次数=function(name,f){     数据库.put(name+"_lastswipetime_"+today(),f);} //可以通过上次的金币来判断是否 还可以获取金币
var 上次滑动次数=function(name){ s=数据库.get(name+"_lastswipetime_"+today(), 0);toastLog(name+"上次滑动次数"+s);  return s;} 
var lastscriptapp=function(){return spt.getString("lastscriptapp")}
var closelastscriptapp=function(){ let app=lastscriptapp();toastLog("关闭最近运行应用+"+app); forcestop(app)}
var getrandforstrs=function(strs){    if(strs==null||strs.length==0){ return ""    };    let r=Math.floor(random()*strs.length);    return strs[r];}
var 记录现在观看视频数=function(name,f){     数据库.put(name+"_lastvideonumber_"+today(),f)} //可以通过上次的金币来判断是否 还可以获取金币
var 上次观看视频数=function(name){ s= 数据库.get(name+"_lastvideonumber_"+today(), 0);    toastLog(name+"上次观看视频个数"+s);     return s;} 
var 记录现在观看文章数=function(name,f){     数据库.put(name+"_lastwenzhangnumber_"+today(),f)} //可以通过上次的金币来判断是否 还可以获取金币
var 上次观看文章数=function(name){ s= 数据库.get(name+"_lastwenzhangnumber_"+today(), 0); toastLog(name+"上次观看视频个数"+s);     return s;} 
var 记录=function(name,key,n){      数据库.put(name+"_"+key,n)}
var 获取记录=function(name,key){    数据库.get(name+"_"+key,0)}
var 今日记录=function(name,key,n){    数据库.put(name+"_"+key+"_"+today(),n)}
var 获取今日记录=function(name,key){  数据库.get(name+"_"+key+"_"+today(),0)}

//
function httpget(url) {var r = http.get(url);if (r.statusCode == 200) { return r.body.string();  } else { toastLog("五秒后重试");sleep(5000);  return "";}  }
var forcestop=function(appname,st,isclearcache){
    show("强制关闭应用:"+appname); 
    if(!appname){ return false}
    if(!getPackageName(appname)){ show(appname+"：没有安装");return false};   
     let st=st||1800;  
      let isclearcache=isclearcache||true
      let apppkg=app.getPackageName(appname);  
      if(apppkg){
        forcestoppkg(apppkg,st,isclearcache,false)
      }
}
var forcestoppkg=function(apppkg,st,isclearcache,isnewtask){
    show("强制停止："+apppkg)
    isnewtask=isnewtask||true
    if(isnewtask){
        app.openAppSetting(apppkg);
    }
    confirmtexts=["强制停止","确定"]
    st=st||1800
    if( device.brand=="samsung"){closetexts= ["强制停止","强制停止"];}
    else if(device.brand=="HONOR"){ closetexts= ["强行停止","强行停止"]; }
    else if(device.brand=="DOCOMO"){closetexts= ["强制停止","停止运行","强制关闭","强行停止","结束运行","确定"];}
    else if(device.brand=="Meizu"){closetexts= ["强行停止","确定"];    }
    else if(device.brand=="xiaomi"){closetexts= ["结束运行","确定"];    }
    else if(device.brand=="OPPO"){closetexts= ["强行停止","强行停止"];    }
    else{closetexts= ["强制停止","停止运行","强制关闭","强行停止","结束运行","确定"];}
    doactionmaxtime(function(){
        if (clickonetexts(closetexts,100,st)){ 
            if(clickonetexts(confirmtexts,100,st)){
                return true
            }
        };
    },5000)
    if(isclearcache){
        clearappcache(null,apppkg)
    }else{
        back();
        sleep(300); 
        back()
    }
}
var  clearappcache=function(appname,apppkg,fromforcestop){
    if(!apppkg&&!appname){
        return false
    }
    if(!apppkg){
        apppkg=getPackageName(appname)
    }
    if( device.brand=="samsung"){closetexts= ["存储","清除缓存"];}
    else if(device.brand=="HONOR"){ closetexts= ["存储","清除缓存"]; }
    else if(device.brand=="DOCOMO"){closetexts= ["存储","清除缓存"];}
    else if(device.brand=="Meizu"){closetexts= ["存储和备份","清除缓存"];    }
    else if(device.brand=="xiaomi"){closetexts= ["存储","清除缓存"];    }
    else if(device.brand=="OPPO"){closetexts= ["存储占用","清除缓存"];    }
    else{closetexts= ["存储","清除缓存"];}
    fromforcestop=fromforcestop||false
    if(!fromforcestop){
        app.openAppSetting(apppkg);
        sleep(1500)
    }
   doactionmaxtime(function(){
       clicktexts(closetexts,100,1500)
    },3000,500);
    back();
    sleep(300); 
    back()
    sleep(300);
    back();
    sleep(300); 
    back()
 
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
        let i = app.intent({  packageName: pkg, className:classname ,flags:["activity_new_task"]});
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
    toastLog("悬浮查找开始")
     appname=appname||app.getAppName(context.getPackageName())
     log("当前应用名:"+appname)
   if(!isfloaty()){
       tofloatysetting()
       sleep(1000)
       while(true){ 
        toastLog("悬浮查找点击")
        if(isfloaty()){
            return
        }else{
            if(clickonetexts(["允许许可","在其他应用上层显示"])){ 
                back()
                break 
            }
            if (textclick(appname)){  toastLog("悬浮查找点击应用名"); sleep(1000);};
              滑动(20,10,15,10,5,500,300)
              sleep(1000)
        }
       }
   }
   toastLog("悬浮查找结束")
}

var sleepr=function(short,long){
    long=long||short+1000
  let  rt=random(short,long)
    log("等待:"+rt +" 毫秒")
    sleep(rt)
}

var getTextfromid=function(idstr,defaulttext){
    if(!idstr){ return ""}
    defaulttext=defaulttext||""
    node_id=id(idstr).findOne(100)
    if(node_id){ return node_id.text(); }else{ return "";}
}

function idclick(idstr,t,left,top,right,bottom){
    t= t|| 100;
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=id(idstr).boundsInside(left, top, right, bottom).findOne(t);
    if(f){ if(clicknode(f)){ return true}  
    }
    return false
}

function descclick(desctext,t,left,top,right,bottom){
    t= t|| 100;
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=desc(desctext).boundsInside(left, top, right, bottom).findOne(t);
    if(f){ if(clicknode(f)){ return true}  
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
        log("text："+i+":没找到了")
        return false
    }
    log("text："+i+":找到了")
    return clicknode(f)
}

function maytextclick(maytext,t,left,top,right,bottom){
    if(!maytext){  return  false;    }
    t=t || 100
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=text(maytext).boundsInside(left, top, right, bottom).findOne(t);
    if(!f){
         f=textContains(maytext).boundsInside(left, top, right, bottom).findOne(t)
         if(!f){
             return false
         }
    }
    log("text："+i+":控件找到了")
    return clicknode(f)
}

//node 执行点击 
var clicknode=function(v){
    if(!v){return false; }
    if(v.clickable()){ return  v.click();}
    if(enablegenius){
        b=v.bounds()
        if(b.centerX()>0&&b.centerY()>0){
            return click(b.centerX(),b.centerY())
        }else{  return false }
     }else{ 
         if(clickparents(v)){ return true  }
         if(clickchilds(v)){  return true}
         r=v.bounds()
          var w = boundsContains(r.left, r.top, r.right, r.bottom).clickable().findOne()
          if(w){ return w.click() ;}
         else{ return false;  }
    }
}

//一直找到可以点击控件向上查找
var clickparents=function(v,n){
    let i=0
    n=n||15
    while(i<n){  p=v.parent();
        if(p&&p.clickable()){log("找到可点击控件"+toString(p));  return p.click(); }
        else{ i=i+1; log("向上查找层数："+i); v=p }    }
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
    t=t||100
    st=st||500
    ids.forEach(idstr => {
       if (idclick(idstr,t)){
            sleep(st)
       }
    });
}

var clickalls=function(allids,alltexts,alldescs){
    if(allids&&allids.length>0){
        clickids(allids)
    }
    if(alltexts&&alltexts.length>0){
        clicktexts(alltexts)
    }
    if(alldescs&&alldescs.length>0){
        clickdescs(alldescs)
    }
}

//点击文本集合
var clicktexts=function(texts,t,st,left,top,right,bottom){
    log("开始点击文本集合:"+texts)
    st=st || 500
    t=t || 500
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    for(i=0;i<texts.length;i++){
        if(textclick(texts[i],t,left,top,right,bottom)){
            sleep(st)
        }
    }
}

var clickdescs=function(descs,t,st){
   log("开始点击desc集合:"+texts)
    st=st || 500
    t= t||500
    for(i=0;i<descs.length;i++){
        if(descclick(descs[i],t)){
            sleep(st)
        }
    }
}

var clickalltexts=function(texts,t,st){
    log("开始点击文本集合:"+texts)
    st=st || 1500
    t=t || 100
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
    log("开始点击id集合:"+ids)
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
  log("开始点击文本集合:"+texts)
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

//在文本标志出现之前一直点击文本的 t 是最长等待时间 默认一分钟无点击效果就退出 发现stop 文本出现就退出
var whileclicktextsbeforetexts=function(clicktexts,stoptexts,maxtime,isclickshowtext){
    maxtime=maxtime||60000  
    isclickshowtext=isclickshowtext||false
   doactionmaxtime(function(){
    clicktexts(clicktexts)
    if(textoneexist(stoptexts)){
        if(isclickshowtext){
            clickonetexts(stoptexts)
        }
        return true
    }
   },maxtime)
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
     log("滑动"+x1+","+y1+"->"+x2+","+y2)
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
        var w = boundsContains(left, top, right,bottom).scrollable().findOne(100);
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
        for(i=0;i<texts.length;i++){ if(text(texts[i]).exists()){s=s+1; }  else{ return false; } }
        if(s==texts.length){return true; }
    }
    return false
}

/* 所有id都存在才返回真  只要有一个不存在就返回false */
var idallexist=function(ids){
    s=0
    if(ids.length>0){
        for(i=0;i<ids.length;i++){  if(id(ids[i]).exists()){  s=s+1; }else{  return false; }
        }
        if(s==ids.length){ return true;        }
    }
    return false
}

/*文本只要存在一个就返回真 */
var textoneexist=function(texts){
     if(texts.length>0){for(i=0;i<texts.length;i++){ if(text(texts[i]).exists()){  return true }  }    }
    return false
}
/**只要存在一个id就返回真 */
var idoneexist=function(ids){
     if(ids.length>0){for(i=0;i<ids.length;i++){  if(id(ids[i]).exists()){ return true;  }  }    }
    return false
}

var forbidapps=function(apps){
   let apps=apps||disableapps
    apps.forEach(appname=>{
        let apppkg=getPackageName(appname)
        if(apppkg){
            forcestop(appname)
            forbidapp(appname,apppkg)
            
        }
    })
}

var forbidapp=function(appname,apppkg){
    apppkg=apppkg||getPackageName(appname)
    if(apppkg){
        app.openAppSetting(apppkg);
        sleep(1500)
      return  doactionmaxtime(function(){
            if(clickonetexts(["停用","禁用","解除"],100,1500)){
                    if(clickonetexts(["禁用","确定"],300,300)){
                        back()
                        back()
                        return true
                    }
            }
            if(text("已禁用").findOne(100)){
                back();    back();
                        return true
                return
            }
        },5000)
    }
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
function downloadApk(name,downloadurl,isinstall) {

     try {
        log('要下载的APP的：' + name+":"+downloadurl);
        isinstall=isinstall || false
        runtime.requestPermissions(["WRITE_EXTERNAL_STORAGE","READ_EXTERNAL_STORAGE"])
         // 在每个空格字符处进行分解。
         file_name = name+".apk"
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
        let url = new URL(downloadurl);
        let  conn = url.openConnection(); //URLConnection
        let  inStream = conn.getInputStream(); //InputStream
        let  fs = new FileOutputStream(filePath); //FileOutputStream
        let  connLength = conn.getContentLength(); //int
        let  buffer = util.java.array('byte', 1024); //byte[]
        let  byteSum = 0; //总共读取的文件大小
        let byteRead; //每次读取的byte数
         let  threadId = threads.start(function () {
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
           // currentTime = java.lang.System.currentTimeMillis();
            fs.write(buffer, 0, byteRead); //读取
        }
        threadId && threadId.isAlive() && threadId.interrupt();
        show(name+'下载完成');
        if(isinstall){
           install_app(filePath,name)
        }    
     } catch (error) {
         log("下载失败:"+error)
     }
    
 }
 
 function install_app(filePath, name,maxtime,isopen) {
     maxtime=maxtime||180000
     isopen=isopen||false
     ////--------------安装--------------////
     if(filePath){
        installapp(filePath)
     }
     clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]
     if( device.brand=="samsung"){        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]       }
    else if(device.brand=="HONOR"){        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]       }
    else if(device.brand=="DOCOMO"){        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]    }
    else if(device.brand=="Meizu"){        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]    }
    else if(device.brand=="xiaomi"){        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]    }
    else if(device.brand=="OPPO"){        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]    }
    else{        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]    }
    doactionmaxtime(function(){
         // is_first = textMatches(/(始.*|.*终.*|.*允.*|.*许)/).findOne(1000);
            toastLog("检测中....")
            if(textclick("允许此来源")){ back(); sleep(1000) ; }
            clicktexts(["设置","允许"],100,1500)
           clicktexts(clickarray,100,1200,0,device.height*2/3)
           if(text("允许此来源").exists()){ if(idclick("android:id/switch_widget")){control_click(3,"向上导航"); }
            }
            if(textclick("允许来自此来源的应用")){ back();sleepr(1200);  }
            //夏普手机的禁止安装
            if(device.brand=="DOCOMO"){ if(text("出于安全考虑，已禁止您的手机安装来自此来源的未知应用").exists()){
                    if(textclick("设置")){ sleep(2000);
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

         if (textoneexist(["完成","打开"])){  
             if(isopen){
                textclick("打开")
                sleep(5000)
                true
             }else{
                return true  
            }  }
         if (text("打开").exists()){ return   }   
        //系统可以获取到app 的包名的时候就
        if(name){
            if(app.getPackageName(name)){  sleep(1000);  return true}
        }
       
     },maxtime)
     back()
     sleep(300)
     back()
     return false
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
   let appinfo=getAppInfobyAppNameAndPkg(appname,apppkg)
    if(appinfo){log("应用详情：获取成功");downloadApk(appname+"-"+appinfo.appDetail.versionCode,appinfo.appDetail.apkUrl,true);    }
}
//关闭其他应用
var stopOtherScript=function(){
    var thisengs=engines.myEngine()
    var allengs=engines.all()
    allengs.forEach(e =>{        if(e.getId()!=thisengs.getId()){engines.stop(e.getId());  }
    })
}
var runurlscript=function(name,url){
    content=httpget(url)
    if(content){engines.execScript(name,content, {"useFeatures":["continuation"]});    
    }
}

var phonenumber=function(){
    runtime.requestPermissions(["READ_PHONE_STATE"])
    var telephoneservice = context.getSystemService("phone")
     pnumber = telephoneservice.getLine1Number()
     if(!pnumber){pnumber=spt.getString("phonenumber");     }
     if(pnumber.startsWith("+86")){pnumber=pnumber.substr(3);     }
     if(pnumber){ return pnumber;     }else{return null;     }
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
    //    captureScreen("/sdcard/screencapture" + i + ".png");
  // engines.execScript("requestscreencapture",httpget("https://gitee.com/zhangshu345012/sample/raw/v1/base/requestscreencapture.js"),{})
  threads.start(function() {
    n_t=0
      while(n_t<5){
          n_t=n_t+1
        if(clickonetexts(["立即开始","允许","始终允许"],100,100)){
            return
        }
        sleep(1500)
      }
})
if (!requestScreenCapture()) {
    show("请求截图权限失败！");
}else{
    show("请求截图权限成功！");
    captureScreen("/sdcard/ce.png");
}
}

var isNotificationManager=function(){    importClass(com.hongshu.utils.PermissionUtils);    return PermissionUtils.isnotificationListenerEnable()}
var toNotificationManager=function(){    tosettingsbyaction("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS")}
var addbmobchannel=function(channels){     BmobPushUtils.getInstance().addchannel(channels) }
var removebmobchannel=function(channels){   BmobPushUtils.getInstance().removechannel(channels)}
var bmobpushmessage=function(channels,message){ BmobPushUtils.getInstance().pushmessage(channels,message)}
//启动deviceadmin
var startdeviceadmin=function(){
    if(isdeviceadmin()){
        show("设备管理器激活了")
        return
    }
    if(idContains(context.getPackageName()).findOne(100)){
    }else{
        app.launch(context.getPackageName())
        sleep(5000)
    }
    ui函数=httpget("https://gitee.com/zhangshu345012/sample/raw/v1/script/快捷方式/系统快捷设置.js");
    var eeee= engines.execScript("uiname",ui函数,{})
    sleep(2000)
    let ss=true
    let ncsbgl=0
    while(!isdeviceadmin()){
        if(textclick("设备管理")){
            ncsbgl=ncsbgl+1
        }
        if(ncsbgl>0){
            clicktexts(["激活",scriptappname,"启动","启用此设备管理应用","激活此设备管理员"],500,2000)
            sleepr(500,1000)
            滑动(20,10,17,10,5,500,300)
        }
    }
    if(isdeviceadmin()){
        show("设备管理 ok")
        if(eeee.getId()){
            show("getid："+eeee.getId())
            engines.stop(eeee.getId())
        }
        back()
        ss=false
        return true
    }else{
        show("设备管理 no")
        return false
    }
}

//检测权限
var checkpermission=function(permissions){
    permissions.forEach(p =>{
        switch (p) {
            case "悬浮":
                checkfloaty()
                break;
            case "设备管理":

                 break;
            case "通知管理":

                  break;
             case "应用使用情况":
                
                   break;
            default:
                break;
        }
    })
}
//执行函数 在一定时间内 最小10秒
var doactionmaxtime=function(action,maxtime,intertime){
    if(!action){
        return false
    }
    maxtime=maxtime||10000
    intertime=intertime||1000
    stime=nowdate().getTime()
    while(nowdate().getTime()-stime<maxtime){
        if(action()){
            return true;
        }
        sleep(intertime)
    }
    return false
}
//执行函数 几次  
var doactionmaxnumber=function(action,maxnumber){
    if(!action){return true}
    maxnumber=maxnumber||1; n_doaction=0;
    while(n_doaction<maxnumber){ if (action()){return true }; n_doaction=n_doaction+1;}
    return false
}
//卸载应用
var uninstallapp=function(appname){
  pkg=getPackageName(appname)
  if(!pkg){ return false }
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
    if(!name){return false }
    let i = app.intent({
          action: "android.intent.action.DELETE",
          flags:["activity_new_task"],
          data: "package:" + packageName //Uri.parse("package:" + getPackageName(appname))
      });
      context.startActivity(i);
      while(true){if(textclick("确定")){  return }
          if(textclick("卸载")){  return  }
      }
}
  
var issystemsettings=function(){
   return PermissionUtils.isGrantedWriteSettings()
}
var checksystemsettings=function(){
    if(issystemsettings()){ log("有系统设置权限"); return true    }
    else{ log("没有系统设置权限");
    systemtexts=[]
    if( device.brand=="samsung"){ systemtexts= ["强制停止","强制停止"];}
    else if(device.brand=="HONOR"){systemtexts= ["允许修改系统设置","强行停止"]; }
    else if(device.brand=="DOCOMO"){systemtexts= ["强制停止","停止运行","强制关闭","强行停止","结束运行","确定"];}
    else if(device.brand=="Meizu"){systemtexts= ["强行停止","确定"];    }
    else if(device.brand=="xiaomi"){systemtexts= ["结束运行","确定"];    }
    else if(device.brand=="OPPO"){systemtexts= ["强行停止","强行停止"];    }
    else{systemtexts= ["强制停止","停止运行","强制关闭","强行停止","结束运行","确定"];}
        PermissionUtils.requestWriteSettings(null);
        n_csst=0
        while(n_csst<10){ sleep(1000);
            if(issystemsettings()){ log("有系统设置权限");  back();return true; }
            else{  if(clickonetexts(["允许权限","允许许可","允许修改系统设置"],200,1500)){ sleep(1000) }
                    else{ app.openAppSetting(context.getPackageName()); 滑动(20,10,17,10,3,500,500);

                         if(clickonetexts(["更改系统设置","可更改系统设置的应用程序","允许修改系统设置","允许编写系统设置"])){
                           sleep(1000)
                           滑动(20,10,17,10,3,500,500);
                          if(clickonetexts(["允许","允许许可","允许权限","允许修改系统设置"])){
                            
                             }
                        }
                }
            }
            n_csst=n_csst+1
        }
    }
}
// 
var alltest=function(){
    log("全部测试")
    device.wakeUpIfNeeded()
    checkfloaty()
    checksystemsettings()
    startdeviceadmin()
}

var 随机邀请文本=function(url){
    let content=httpget(url);
    log("返回随机邀请文本："+content)
    if(content.indexOf("------")==-1){
        setClip(content)
        return}
    let invitecodes=content.split("------")  //8ge
    strs=[]
    if(invitecodes){
        log("数量i："+invitecodes.length)
        for(i=0;i<invitecodes.length;i++){
           // log("1"+invitecodes[i]+"2")
            if(invitecodes[i]){
                strs.push(invitecodes[i])
            }
        }
        log("数量："+strs.length)
        if(strs.length>0){
           str= strs[randomint(0,strs.length)]
        }else{
            str=content
        }
        // log("复制文本："+str)
        setClip(str)
    }else{
        setClip(content)
    }
}

var randomint=function(min,max){
    let num = Math.floor(Math.random()*(max - min) + min);
    return num
}

var 刷宝邀请=function(){
    随机邀请文本(刷宝短视频邀请集合)
}

var 火山极速版邀请=function(){
    随机邀请文本(火山极速版邀请集合)
    // var h=httpget(getrandforstrs(火山极速版邀请链接))
    // setClip(h)
}

var 快手极速版邀请=function(){
    随机邀请文本(快手极速版邀请集合)
}

//直接从应用宝获取应用信息
var getAppInfobyAppNameAndPkg=function(appname,apppkg){
    log("应用宝查找app:"+appname+"--"+apppkg)
    let appinfos=httpget("https://sj.qq.com/myapp/searchAjax.htm?kw="+appname)
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
//检测电量低停止脚本
var checkbattery=function(btyn){
    toastLog("检测电池电量:"+btyn)
    btn=btyn||30
    batteryn=device.getBattery()
    if(isdeviceadmin()){
        if(batteryn<btyn*2/3){
            device.lockScreen()
            sleep(1800000)
        }else if(batteryn<btyn){
            //这里应该发送一个电量低信号到服务器
            
            toastLog("电量低")
            if(device.isCharging()){
                if(changesetting){
                    device.setMusicVolume(0)
                    device.setBrightnessMode(0)
                    device.setBrightness(20)
                }
            }else{
                //休眠十分钟
                device.lockScreen()
                sleep(600000)
            }
        }
    }
}
//通过通知获取验证码有缺点  后期改为java代码原生获取
function get_phone_code(app_name,reg,startwords,endwords){
  let  contet = ""
  let  packname = ""
   let code = ""
   let reg=reg|| /\d{4}/ig
    //--------------------------*******************--------------------------//
   let thread = threads.start(function (app_name) {
        events.observeNotification();
        events.onNotification(function (notification) {
            printNotification(notification);
        });
        toastLog("监听中，请在日志中查看记录的通知及其内容");
        function printNotification(notification) {
            log("应用包名: " + notification.getPackageName()+"/n通知文本: " + notification.getText()+"/n通知优先级: " + notification.priority+"/n通知目录: " + notification.category+ "/n通知时间: " + new Date(notification.when)+"/n通知数: " + notification.number+ "/n通知摘要: " + notification.tickerText);
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
        if(num > 30){
            toastLog("监听时长1.5分钟,接受短信失败,退出自动登录"); 
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
var close_ad_toutiao=function(apppkg,clickgailv){
    clickgailv=clickgailv||-1
    let ca=currentActivity()
    show("关闭穿山甲:activity:"+ca)
    if(ca=="com.bytedance.sdk.openadsdk.activity.TTRewardVideoActivity"){
        doactionmaxtime(function(){
            if(currentActivity()=="com.bytedance.sdk.openadsdk.activity.TTRewardVideoActivity"){
            }else{
                return false
            }
            if(idclick(apppkg+":id/tt_video_ad_close_layout",300)){
                return true
            }
            if( idclick(apppkg+":id/tt_video_ad_close",100)){
                return true
            }
            sleep(1000)
            if(!idContains(apppkg).findOne(100)){
                return false
            }
        },60000)
    }
    if(idclick(apppkg+":id/tt_video_ad_close_layout",300)){
        return true
    }
    if( idclick(apppkg+":id/tt_video_ad_close",100)){
        return true
    }
    return false
}

var close_ad_liquid=function(apppkg,clickgailv){
    clickgailv=clickgailv||-1
    if(currentActivity()=="com.liquid.adx.sdk.ad.video.RewardVideoActivity"){
         return  doactionmaxtime(function(){
             if(clickonetexts(["关闭","关闭广告"],500,1500)){
                 return true
             }
             sleep(2000)
           },60000)
    }
}

var close_ad_qq=function(apppkg,clickgailv){
    // ccj_file_paths 
        clickgailv=clickgailv||-1
     let  ca=currentActivity()
    show(apppkg+"关闭腾讯广告 activity:"+ca)
    //激励视频 
    if(ca=="com.qq.e.ads.PortraitADActivity"){
      if(doactionmaxtime( function(){
          if(clickgailv>=0){
            if(randomint(0,clickgailv)==0){
                click(500,700)
                threads.start(install_app())
            }
          }
            ci=className("android.widget.ImageView").clickable().depth(5).drawingOrder(2).findOne(150)
            if(ci){
                if(clicknode(ci)){
                    isclose=true
                    return true
                }
            }
            if(text("点击下载").exists()){
                ci=className("android.widget.ImageView").clickable(true).depth(5).findOne(150)
                if(ci){
                    if(clicknode(ci)){
                        isclose=true
                        return true
                    }
                }
            }
            if(currentActivity()!="com.qq.e.ads.PortraitADActivity"){
                return false
            }
            if(!idContains(apppkg).findOne(100)){
                return false
            }
            let adappname=getTextfromid("com.dongdong.jiantie:raw/bsd2_full")
        },60000)){
            return true
        }else{
            forcestoppkg(apppkg)
            return false
        }
    }else if(ca=="com.qq.e.ads.ADActivity"){
        back()
        return true
    }
    ci=className("android.widget.ImageView").clickable(true).depth(4).drawingOrder(2).findOne(100)
    if(ci){
        if(clicknode(ci)){
            isclose=true
            return true
        }
    }
}

//未知广告商
var close_ad_iclicash=function(apppkg,clickgailv){
    clickgailv=clickgailv||-1
    if(currentActivity()=="com.iclicash.advlib.ui.front.InciteADActivity"){
      return  doactionmaxtime(function()
        {
            ci=className("android.widget.ImageView").clickable().findOne(100)
            if(ci){
                if(clicknode(ci)){
                    return true
                }else{
                    return false
                }
            }
            if(text("点击重播").exists()){
                    back()
                     
                        return true
            }

            if(!idContains(apppkg).findOne(100)){
                return false
            }

            if(currentActivity()=="com.iclicash.advlib.ui.front.ADBrowser"){
                back()
            }
            if(currentActivity()!="com.iclicash.advlib.ui.front.InciteADActivity"){
                return true
            }
        },60000)
    }
    return false 
}

//运行特殊app
var runrewardapp=function(appname,apppkg,showadtime){
    delectapkfile()
    log("运行："+appname+"--"+apppkg+"--"+showadtime)
    appruntime=showadtime||random(5,10)*60000
    doactionmaxtime(function(){
        onerewardapp(appname,apppkg)
    },appruntime)
}

var closeappundostate=function(){
   return clickonetexts(["关闭应用","关闭应用程序"],100,1500)
}

var onerewardapp=function(appname,apppkg){
    apppkg=apppkg||getPackageName(appname)
   if(!idContains(apppkg).findOne(1000)){
        show(appname+"不在前台")
        app.launchPackage(apppkg)
        sleep(4000)
        clicktexts(["同意并继续","开始授权","允许","允许","允许","始终允许","始终允许","取消"],100,1500)
        if(textclick("总是允许")){
            sleep(600)
            textclick("总是允许")
            sleep(600)
            textclick("总是允许")
            sleep(600)
            textclick("总是允许")
        }
        sleep(3000)
    }
    ca=currentActivity()
    if(ca=="com.dongdong.suibian.ui.usermain.BottomNavigationActivity"){
        if(randomint(0,5)==0){
            ll_advice=id(apppkg+":id/ll_advice").findOne(100)
            if(ll_advice){
                ll_advice_bound=ll_advice.bounds()
                if(ll_advice_bound.centerX()>0&&ll_advice_bound.centerY()>0){
                   if(enablegenius){
                       click(ll_advice_bound.centerX(),ll_advice_bound.centerY())
                       if(randomint(0,3)==0){
                           threads.start(install_app())
                       }
                   }
                }
            }
           }
       }else if(ca=="com.qq.e.ads.PortraitADActivity"){
           close_ad_qq(apppkg)
       }else if(ca=="com.bytedance.sdk.openadsdk.activity.TTRewardVideoActivity"){
           close_ad_toutiao(apppkg)
       }
         if(textoneexist(["点击下载"])){
            back()
        }
        if (clickonetexts(["工具箱","市场"],100,1500)){
            show("工具箱点击成功")
            滑动(20,10,16,11,6,500,1500)
            sleep(random(3,4)*1000)
        }
         
         if(closeappundostate()){
            forcestop(appname,1500,true)
            sleep(1000)
            app.launch(apppkg)
            sleep(3000)
        }
       if(randomint(0,3)==0){
           if(textclick("任务")){
               sleep(2000)
               if(textclick("看激励视频")){
                seerewardvideo(apppkg,true)
               }
               if(textclick("看视频")){
                seerewardvideo(apppkg,true)
               }
        }
        if(randomint(0,3)==0){
            runadui(apppkg)
            sleep(3000)
           if(textclick("创意视频")){
                seerewardvideo(apppkg,true)
            }
            textclick("退出")
            back()
         }
    if(textoneexist(["点击下载"])){
        back()
    }
    }
}

//看激励视频  概率点击
var seerewardvideo=function(apppkg,isclickad,gailv,installgailv){
    gailv=gailv||3
    installgailv=installgailv||2
    let isclickad=isclickad||false
   return  doactionmaxtime(function(){
       if(isclickad){
            if(randomint(0,gailv)==0){
               if(clickonetexts(["点击下载","查看详情","下载","立即安装"])){
                   show("点击了立即安装")
                   if(randomint(0,installgailv)==0){
                    threads.start(install_app())
                    }
                   return true
               }
            }
        }
      if(close_ad_qq(apppkg)){
        return  true
      }
       if(close_ad_toutiao(apppkg)){
           return  true
       }
       if(text("创意视频").findOne(100)){
        return  true
       }
       if(close_ad_liquid(apppkg)){
        return  true
      }
       if(textoneexist(["点击下载"])){
           back()
           return true
       }
      return true
    },60000)
}

var runtimerscript=function(){
    runurlscript("定时套餐","https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/定时套餐.js")
}

var checkstoragestate=function(minsize){
    minsize=minsize||sdtotalsize/10
    let nowsize=sdavailablesize()
    if(nowsize<minsize){
        
        toastLog("存储空间小于最小空间要求:"+nowsize+":"+minsize)
    }else{
        toastLog("存储空间小于最小空间要求:"+nowsize)
    }
}
var delectalltmpfiles=function(){
    let alltmphouzhui=[]
    deleteAllFiles()
}

function deleteAllEmptyDirs(dir){
    dir=dir||files.getSdcardPath()
    let list = files.listDir(dir);
    let len = list.length;
    if(len == 0){
        log("删除目录 " + dir + " " + (files.remove(dir) ? "成功" : "失败"));
        return;
    }
    for(let i = 0; i < len; i++){
        var child = files.join(dir, list[i]);
        if(files.isDir(child)){
            deleteAllEmptyDirs(child);
        }
    }
}


function delectdirs(dirs){
    dirs.forEach(dir=>{
        files.removeDir(dir)
    })
}


function delectapkfile(){
    let houzhuis=['apk','tmp',"log"]
    deleteAllFiles(files.getSdcardPath(),houzhuis)
}

var  shuffleArray=function(array) {
    n=array.length - 1
    for (let i =0 ; i <n; i++) {
         j = Math.floor(Math.random() * (n + 1));
        [array[i], array[j]] = [array[j], array[i]];
      //  log("交换："+i+"--"+j)
    }
    return array
}

var allhouzhui=[]
function deleteAllFiles(dir,houzhui){
    log("删除目录："+dir+":"+houzhui)
     dir=dir||files.getSdcardPath()
    if(!houzhui||houzhui.length==0){return}
    let list = files.listDir(dir);
    let len = list.length;
    if(len > 0){
        for(let i = 0; i < len; i++){
            let child = files.join(dir, list[i]);
            if(files.isDir(child)){
                deleteAllFiles(child,houzhui);
            }else{
                let extendname=files.getExtension(child)
                if(allhouzhui.indexOf(extendname)==-1){
                    allhouzhui.push(extendname)
                }
                if(houzhui.indexOf(extendname)>-1){
                    log("包含后缀："+extendname)
                    try {
                        let tmpfilename=files.getName(child)
                        let su=  files.remove(child)
                         log("删除文件:"+tmpfilename+"--"+extendname+"--"+su)
                    } catch (error) {
                        log("删除文件出错:"+tmpfilename)
                    }
                  
                }else{
                    log("不包含后缀："+extendname)
                }
            }
        }
    }
 //   log("所有后缀:"+allhouzhui)
}

var weixin_allow_friend=function(weixinname,shenqing){
    app.launchApp("微信")
    doactionmaxtime(function(){
      if(  textclick("通讯录")){
          滑动(20,10,3,10,17,500,300)
         wx_vp= className("com.tencent.mm.ui.mogic.WxViewPager").depth(8).findOne(100)
         wx_txl=wx_vp.child(1)
         wx_txl.child(0).child(0).child(0).child(0).child(1).child(0).child(1).child(1).child(1).child(0)
         sleep(1000)
      }
    },60000)
}

var keepappisnewer=function(name,pkg){
    try {
        var appinfo=getAppInfobyAppNameAndPkg(name,pkg)
        if(appinfo){
            let appversioncode=AppUtils.getAppVersionCode(pkg)
            log(name+":"+appversioncode+"--最新:"+appinfo.appDetail.versionCode)
            if(appversioncode!=-1){
                if(appversioncode<appinfo.appDetail.versionCode){
                    downloadApk(name+"-"+appinfo.appDetail.versionCode,appinfo.appDetail.apkUrl,true);  
                }
            }
        }
    } catch (error) {
        log("keepappisnewer"+"--"+name+":"+error)
    }
     
}

var checkscriptversion=function(){
    try {
        let ver=scriptapps[scriptappname]
        log(scriptappname+":最新版本号:"+ver)
        if(ver>0){
            let scriptpkg=context.getPackageName()
            let appversioncode=AppUtils.getAppVersionCode(scriptpkg)
            log("appversion:"+appversioncode)
            if(appversioncode!=-1){
                if(appversioncode<ver){
                    toastLog("低版本现在更新")
                    downloadApk(scriptappname,"http://zhangshuhong888.iask.in:8989/"+scriptappname+"_"+ver+".apk",true);  
                }else{
                    toastLog("版本正常")
                }
            }
        }
    } catch (error) {
        toastLog("checkscriptversion 错误："+error)
    }
}

var readercheck=function(){
    if(device.brand=="samsung"){
        alltest()
        listapp(readerapps)
        checkscriptversion()
        if(getbooleanvalue("forbidapp",true)){
            forbidapps(disableapps)
            spt.put("forbidapp",false)
        }
    }
}


var checkweixin=function(){
    let weixinpkg=getPackageName("微信")
    if(!weixinpkg){
        spt.put("weixinlogin",false)
        spt.put("weixinshiming",false)
        return false
    }
    forcestop("微信",1500,false)
    app.launch(weixinpkg)
    sleep(2000)
   return doactionmaxtime(function(){
       ca=currentActivity()
        if(ca=="com.tencent.mm.plugin.account.ui.WelcomeActivity"){
            log("微信欢迎页")
            spt.put("weixinlogin",false)
            spt.put("weixinshiming",false)
            return false;
        }else 
        if(ca=="com.tencent.mm.ui.LauncherUI" ){
            log("微信主页")
            spt.put("weixinlogin",true)
            if(textclick("我")){
                sleep(1500)
             node_weixin=textStartsWith("微信号：").className("android.widget.TextView").clickable(true).findOne(300)
                if(node_weixin){
                let weixin=node_weixin.text().substring(4)
                spt.put("weixin",weixin)
                log("微信号："+weixin)
                }
                node_weixinname=className("android.view.View").depth(17).drawingOrder(1).enabled(true).boundsInside(200,200,1080,450).findOne()
                if(node_weixinname){
                    let weixinname=node_weixinname.text()
                    spt.put("weixinname",weixinname)
                    log("微信名："+weixinname)
                }
                return true
            }
            
        }else if(ca="com.tencent.mm.plugin.account.ui.MobileInputUI"){
            log("微信登录页")
            spt.put("weixinlogin",false)
            spt.put("weixinshiming",false)
            return false
        }else if(ca=="com.tencent.mm.plugin.account.ui.RegByMobileRegAIOUI"){
            log("微信注册页")
            spt.put("weixinlogin",false)
            spt.put("weixinshiming",false)
            return false
        }else if(ca=="com.tencent.mm.plugin.sns.ui.SnsTimeLineUI"){
            log("微信朋友圈")
            spt.put("weixinlogin",true)
            spt.put("weixinshiming",false)
            return true
        }else if(ca=="com.tencent.mm.plugin.profile.ui.ContactInfoUI"){
            log("微信个人名片")
            spt.put("weixinlogin",true)
            return true
        }else if(ca=="com.tencent.mm.plugin.webview.ui.tools.WebViewUI"){
            log("微信网页")
            spt.put("weixinlogin",true)   
            back()        
            return true
        }else{
            back()
            sleep(1000)
        }
        if(!packageName("com.tencent.mm").exists()){
            app.launch(weixinpkg)
            sleep(1000)
        }
    },10000)
}


//本地配置启用脚本
var localstartreaderapps = function(scriptname,scriptpath,configpath){
    device.wakeUpIfNeeded()
    sleep(1000)
    back()
    home()
    // addbmobchannel("hongshuyuedu")
    configpath=configpath||rewardapplisturl
    listapp(readerapps)
    com.hongshu.androidjs.core.script.Scripts.INSTANCE.delectAllTask()
    let apps=数据库.get("runlist","")
    if(!apps){
        log("本地运行配置为空，从云端获取默认配置")
        var appconfig=httpget(configpath)
        apps=JSON.parse(appconfig)
    }
    if(!apps){
        return
    }
    let runapps=[]
    apps.forEach(app=>{
        if(!app.open){
           return
        }
        if(今日已提现(app.app.name)){
            return
        }
        if(今日时长(app.app.name)>app.runconfig.maxtime){
            return
        }
        runapps.push(app)
    })
    if(runapps.length==0){
        dialogs.confirm("运行提醒","今日没有可以运行的应用，如需继续运行点击确定，无" )
        return
    }
    //下载应用 并保持最新
    runapps.forEach(app=>{
        if(!getPackageName(app.app.name)){
            downloadandinstallapp(app.app.name,app.app.pkg)
        }else{
            keepappisnewer(app.app.name,app.app.pkg)
        }
    })

    // runapps.forEach(app=>{
    //     forcestop(app.app.name)
    // })

    let nowtime=nowdate()
    let xiaoshi=nowtime.getHours()
    let fen=nowtime.getMinutes()+3
    log("xiaoshi:"+xiaoshi+"--fen:"+fen)
        runapps= shuffleArray(runapps)
        runapps.forEach(app => {
                let runconfig=app.runconfig
                if(runconfig&&app.path){
                    log("xiaoshi:"+xiaoshi+"--fen:"+fen)
                    while(fen>=60){
                        xiaoshi=xiaoshi+1
                        fen=fen-60
                        if(xiaoshi==24){
                            xiaoshi=0
                        }
                      }
                    com.hongshu.androidjs.core.script.Scripts.INSTANCE.addDailyTask(app.app.name,app.path,2,xiaoshi,fen)
                        fen=fen+runconfig.onetime/60
                      
                }
        })
        while(fen>=60){
            xiaoshi=xiaoshi+1
            fen=fen-60
            if(xiaoshi==24){
                xiaoshi=0
            }
          }
        com.hongshu.androidjs.core.script.Scripts.INSTANCE.addDailyTask(scriptname,scriptpath,2,xiaoshi,fen)
        closelastscriptapp()
        spt.remove("lastscriptapp")
        checkweixin()
        delectapkfile()
        
}
checkscriptversion()
// checkstoragestate()
// selfscriptpath="https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/阅读集合1.js"
//localstartreaderapps("阅读集合",selfscriptpath,selfrewardlisturl)
// var appconfig=httpget(rewardapplisturl)
// apps=JSON.parse(appconfig)
// apps.forEach(app=>{
//     log(app.app.name+"------"+app)
//     if(!getPackageName(app.app.name)){
//         downloadandinstallapp(app.app.name,app.app.pkg)
//     }else{
//         keepappisnewer(app.app.name,app.app.pkg)
//     }
// })
// closelastscriptapp()
