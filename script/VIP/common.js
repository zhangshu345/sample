module.exports = function(){
importClass(android.content.ComponentName)
importClass(com.hongshu.receiver.DeviceReceiver)
importClass(com.hongshu.utils.IntentUtils)
importClass(android.net.Uri)
importClass(android.graphics.Bitmap)
importClass(java.io.File)
importClass(com.hongshu.advice.AdviceManager)
importClass(android.provider.Settings);  
importClass(android.icu.text.SimpleDateFormat);
importClass(java.util.HashSet);
importClass(com.hongshu.utils.AppUtils)
importClass(com.blankj.utilcode.util.SDCardUtils)
importClass(com.hongshu.utils.PermissionUtils)
//仅涉及函数 不涉及数据 数据和函数分离
var checkbatterythread=null //电池电量检测线程

var scriptappname=app.getAppName(context.getPackageName())
this.aduiscripturl="https://gitee.com/zhangshu345012/sample/raw/v2/script/快捷方式/系统快捷设置.js"
this.whiteapps=["微信","京东","淘宝","冰箱","开发者助手","云闪付","QQ浏览器","支付宝","多开分身","哪吒","Shizuku",
"快手","抖音","微视","QQ","拼多多","应用宝","酷安","搜狗输入法","讯飞输入法","一个就够","随便粘","手机营业厅"
]
this.readerapps=["微信","京东","冰箱","开发者助手","云闪付","支付宝","多开分身","手机营业厅","哪吒","Shizuku","QQ浏览器",
"快手","微视","QQ","拼多多","酷安","搜狗输入法","讯飞输入法","随便粘"]

//shizuku 的下载地址
this.shizukuweburl="http://zhangshuhong888.iask.in:8989/shizuku5.0.apk"
this.sdtotalsize=function(){
    return SDCardUtils.getExternalTotalSize()
}
log("内存总大小:"+sdtotalsize)
this.sdavailablesize=function(){
    return SDCardUtils.getExternalAvailableSize()
}

this.sdavailablesizeratio=function(){
 let ratio=sdavailablesize()/sdtotalsize
 log("可用:"+sdavailablesize()+"\n比例:"+ratio)
 return ratio;
}


this.disableapps=["AT&T ProTech","Caller Name ID","游戏中心","Google Play 商店","Samsung Gear","简报","Lookout",
"AT&T Remote Support","ANT + DUT","Gmail","YP","Google Play 音乐","myAT&T","游戏工具","云端硬盘","地图",
"Call Log Backup/Restore","Google 备份传输","环聊","YouTube","Google","DIRECTV","游戏中心","Smart Limits","Remote"
]

this.admanager=AdviceManager.getInstance();
this.nowdate=function(){return new Date()};
this.scriptstarttime=nowdate().getTime()
this.scriptruntime=function(){return parseInt((nowdate().getTime()-scriptstarttime)/1000)}
this.rewardapplisturl="https://gitee.com/zhangshu345012/sample/raw/v2/config/newrewardapplist.json"  //奖励app 运行的配置文件的路径
this.today=function(){let td=nowdate();return td.getFullYear()+"_"+td.getMonth()+"_"+td.getDate();}
this.enablegenius=device.sdkInt>=24
this.weixinloginactivity="com.tencent.mm.plugin.webview.ui.tools.SDKOAuthUI"  //微信登录界面
this.dpm
this.deviceadmincomponent
this.changesetting=false //是否改变亮度和音量的标识
this.debugip="zhangshuhong888.iask.in"

this.记录=function(name,key,n){   
if(name){
    com.hongshu.utils.FastSPUtils.getInstance(name).put(key,""+n)
}else{
    com.hongshu.utils.FastSPUtils.getInstance().put(key,""+n)
}

}
this.获取记录=function(name,key,defaultvalue){ if(name){
    return com.hongshu.utils.FastSPUtils.getInstance(name).getString(key,""+defaultvalue)
}else{
    return com.hongshu.utils.FastSPUtils.getInstance().getString(key,""+defaultvalue)
}}

this.今日记录=function(name,key,n){  记录(name,key+"_"+today(),n)}
this.获取今日记录=function(name,key,defaultvalue){ 
    return 获取记录(name,key+"_"+today(),defaultvalue)}

this.应用登录=function(name){return 获取今日记录(name,"login",false)=="true"}
this.应用已登录=function(name){ 今日记录(name,"login",true)}

this.今日签到=function(name){return 获取今日记录(name,"sign",false)=="true"  }
this.今日已签到=function(name){今日记录(name,"sign",true)}

this.今日时长=function(name){return parseInt(获取今日记录(name,"time",0));}
this.记录今日时长=function(name,t){ 
    今日记录(name,"time",t)
}

this.今日滑动次数=function(name){return parseInt(获取今日记录(name,"swipe",0));}
this.记录今日滑动次数=function(name,i){今日记录(name,"swipe",i);}

this.今日提现=function(name){      return  获取今日记录(name,"cashout",false)=="true";}
this.今日已提现=function(name){   今日记录(name,"cashout",true); }

this.记录今日金币=function(name,coinnumber){    今日记录(name,"coin",coinnumber);}
this.上次今日金币=function(name){ return 获取今日记录(name,"coin",0); } 

this.记录金币=function(name,coinnumber){    记录(name,"coin",coinnumber);}
this.上次金币=function(name){ return 获取记录(name,"coin",0); } 

 //可以通过上次的金币来判断是否 还可以获取金币
 this.记录现在余额=function(name,f){记录(name,"money",f);} 
 this.上次余额=function(name){ return 获取记录(name,"money");} 

 this.记录现在滑动次数=function(name,f){  今日记录(name,"swipe",n);} //可以通过上次的金币来判断是否 还可以获取金币
 this.上次滑动次数=function(name){return 获取今日记录(name,"swipe",0);} 

 this.记录现在观看视频数=function(name,f){ 今日记录(name,"video",f)} //可以通过上次的金币来判断是否 还可以获取金币
 this.上次观看视频数=function(name){ return 获取今日记录(name,"video",0); } 

 this.记录现在观看文章数=function(name,f){ 今日记录(name,"article",f)} //可以通过上次的金币来判断是否 还可以获取金币
 this.上次观看文章数=function(name){ return 获取今日记录(name,"article",0); } 

 this.lastscriptapp=function(){return spt.getString("lastscriptapp")}
 this.closelastscriptapp=function(){ let app=lastscriptapp();toastLog("关闭最近运行应用+"+app); forcestop(app)}
 this.getrandforstrs=function(strs){    if(strs==null||strs.length==0){ return ""    };    let r=Math.floor(random()*strs.length);    return strs[r];}

 this.agourl=function(url){
    app.startActivity({
        extras: {
            "url": url
          },
          packageName: context.packageName,
          className: "com.hongshu.ui.scheme.SchemeFilterActivity"
    });
}

//开启调试
this.startdebug=function(ip){
  ip=ip||debugip
  DevPluginService.getInstance().debugtoip(debugip);
}

//判断是否是设备管理者
this.isdeviceadmin=function(){
    deviceadmincomponent=new ComponentName(context.getPackageName(),"com.hongshu.receiver.DeviceReceiver");
    dpm=context.getSystemService("device_policy");    return dpm.isAdminActive( deviceadmincomponent);
}

this.微信扫一扫=function(){
    this.intent = com.hongshu.utils.IntentUtils.getComponentIntent("com.tencent.mm","com.tencent.mm.ui.LauncherUI",true)
    intent.putExtra("LauncherUI.From.Scaner.Shortcut", true);
    intent.setFlags(335544320);
    intent.setAction("android.intent.action.VIEW");
    context.startActivity(intent);
}

this.微信打开链接=function(weburl){
    //.plugin.webview.ui.tools.WebViewUI
    this.intent = com.hongshu.utils.IntentUtils.getComponentIntent("com.tencent.mm","com.tencent.mm.plugin.base.stub.WXCustomSchemeEntryActivity",true)
    intent.putExtra("data", "weixin://"+weburl);
    intent.setFlags(335544320);
    intent.setAction("android.intent.action.VIEW");
    context.startActivity(intent);
}

this.微信浏览=function(url){
  let  weixinpkg=getPackageName("微信")
 if(weixinpkg){
     app.launch(weixinpkg)
     sleep(3000)
     ca=currentActivity()
     log("当前activity："+ca)
     if(ca=="com.tencent.mm.plugin.account.ui.WelcomeActivity"){
        log("微信欢迎页")
    }else if(ca=="com.tencent.mm.ui.LauncherUI" ){
        log("微信主页")
        if(textclick("微信")){
            sleep(1500)
           node_img= className("android.widget.ImageView").visibleToUser().depth(14).findOne(300)
            if(node_img){
                clicknode(node_img)
                sleep(2000)
              node_edit= className("android.widget.EditText").visibleToUser().editable(true).depth(15).findOne(300)
              if(node_edit){
                  node_edit.setText(url)
                  sleep(1000)
                  textclick("发送")
                  sleep(1000)
                node_icons=  descContains("头像").visibleToUser().find()
                  if(node_icons){
                      node_icon=node_icons[node_icons.length-1]
                      if(node_icon){
                       bd= node_icon.bounds()
                       x=bd.centerX()-200
                       y=bd.centerY()
                       click(x,y)
                      }
                  }
              }
            }
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
  }
}

this.微信加好友=function(weixinhao,phone){
    if(微信回到首页()){
        if(textclick("通讯录")){
            while(!textclick("新的朋友")){
                滑动(20,10,5,10,15,500,500)
            }
            text("添加朋友").waitFor()
            textclick("添加朋友")
            text("微信号/手机号").waitFor()
            textclick("微信号/手机号")
            sleep(1500)
            setText(weixinhao)
            sleep(1000)
            maytextclick("搜索")
            doactionmaxtime(function(){
                if(textclick("添加到通讯录")){
                    return true
                }
                if(text("发消息").exists()){
                    return true
                }
            },20000,1000)
        }
    }
}

//返回 Bitmap 对象
this.生成二维码=function(content,width){
  return  com.king.zxing.util.CodeUtils.createQRCode(content,width)
}

this.生成二维码保存到=function(content,width,savepath,format){
    let coder=生成二维码(content,width)
    saveimg(coder,savepath,format)
}

this.解析二维码=function(imgpath){
  return com.king.zxing.util.CodeUtils.parseQRCode("/sdcard/"+imgpath)
}
//
this.saveimg=function(bitmap,imgpath,format){
    imgformat=android.graphics.Bitmap.CompressFormat.JPEG
    if(format==1){
        imgformat=android.graphics.Bitmap.CompressFormat.JPEG
    }else if(format==2){
        imgformat=android.graphics.Bitmap.CompressFormat.PNG
    }else if(format==3){
        imgformat=android.graphics.Bitmap.CompressFormat.WEBP
    }
    if(com.blankj.utilcode.util.ImageUtils.save(bitmap,"/sdcard/"+imgpath,imgformat,false)){
        //        toastLog("保存成功")
        context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.fromFile(new File(imgpath))));
     }
}
this.微信聊天页发送消息=function(friend,message,isclick){
    if(friend=="微信团队"){
        doactionmaxtime(function(){
            clicknode(desc("消息").findOne(500))
            if(className("android.widget.EditText").visibleToUser().editable(true).findOne(1000)){
                return true
            }
        },10000)
    }else{
        className("android.widget.EditText").visibleToUser().editable(true).waitFor()
    }
    node_edit= className("android.widget.EditText").visibleToUser().editable(true).findOne(300)
    if(node_edit){
        node_edit.setText(message)
        sleep(1000)
        textclick("发送")
        if(isclick){
            sleep(1000)
            node_icons=  descContains("头像").visibleToUser().find()
              if(node_icons){
                  node_icon=node_icons[node_icons.length-1]
                  if(node_icon){
                   bd= node_icon.bounds()
                   x=bd.centerX()-200
                   y=bd.centerY()
                   click(x,y)
                   return true
                  }
              }
        }
    }
}

this.微信到聊天界面=function(friend){
  if(微信回到首页()){
    if(textclick("通讯录")){
        sleep(1500)
        while(!textclick(friend)){
         滑动(20,10,17,10,5,500,500)
         }
    text("发消息").waitFor()
    textclick("发消息")
    sleep(1500)
     return true
    }
  }else{
      return false
  }
}

this.微信回到首页=function(){
    let  weixinpkg=getPackageName("微信")
    if(weixinpkg){
       if(doactionmaxtime(function(){
            if(currentPackage()!=weixinpkg){
                app.launch(weixinpkg)
                sleep(3000)
            }
        ca=currentActivity()
        log("当前activity："+ca)
        if(ca=="com.tencent.mm.plugin.account.ui.WelcomeActivity"){
           log("微信欢迎页")
           return true
       }else if(ca=="com.tencent.mm.ui.LauncherUI" ){
           log("微信主页")
           return true
       }else if(ca="com.tencent.mm.plugin.account.ui.MobileInputUI"){
           log("微信登录页")
           spt.put("weixinlogin",false)
           spt.put("weixinshiming",false)
            back()
       }else if(ca=="com.tencent.mm.plugin.account.ui.RegByMobileRegAIOUI"){
           log("微信注册页")
           spt.put("weixinlogin",false)
           spt.put("weixinshiming",false)
           return false
       }else if(ca=="com.tencent.mm.plugin.sns.ui.SnsTimeLineUI"){
           log("微信朋友圈")
            back()
       }else if(ca=="com.tencent.mm.plugin.profile.ui.ContactInfoUI"){
           log("微信个人名片")
           spt.put("weixinlogin",true)
           back()
       }else if(ca=="com.tencent.mm.plugin.webview.ui.tools.WebViewUI"){
           log("微信网页")
           back()
       }else{
           back()
           sleep(1000)
        }
    },30000)){
        return  true
         }else{
        return false
        }
     }else{
         return false
     }
}

this.微信发消息=function(friend,message,isclick){
    if(微信到聊天界面(friend)){
           微信聊天页发送消息(friend,message,isclick)
    }
}
this.微信搜索打开链接=function(searchword){
    if(微信回到首页()){
        if(textclick("微信")){
            sleep(1500)
           node_img= className("android.widget.ImageView").visibleToUser().drawingOrder(1).depth(17).findOne(300)
            if(node_img){
                clicknode(node_img)
                sleep(2000)
              node_edit= className("android.widget.EditText").visibleToUser().editable(true).depth(11).findOne(300)
              if(node_edit){
                  node_edit.setText(searchword)
                  sleep(1000)
                  maytextclick("搜一")
                  sleep(1000)
                 textContains("访问网页").waitFor()
                 maytextclick("访问网页")
              }
            }
        }
    }
}

this.视频重复次数=2
this.ratio=1
this.gfw=null
this.gsfw=null
this.isshowfloaty=false  //是否显示提醒
this.spt=com.hongshu.utils.FastSPUtils.getInstance()  //保证和APP交互 使用同一个
this.getstrvalue=function(key,defaultvalue){ defaultvalue=defaultvalue||"";   return spt.getString(key,defaultvalue)}
this.getintvalue=function(key,defaultvalue){  defaultvalue=defaultvalue||-1;  return spt.getInt(key,defaultvalue)}
this.getlongvalue=function(key,defaultvalue){  defaultvalue=defaultvalue||-1;  return spt.getLong(key,defaultvalue)}
this.getfloatvalue=function(key,defaultvalue){  defaultvalue=defaultvalue||-1;  return spt.getLong(key,defaultvalue)}
this.getbooleanvalue=function(key,defaultvalue){  defaultvalue=defaultvalue||false;   return spt.getBoolean(key,defaultvalue)}
this.getstrsetvalue=function(key){   return spt.getStringSet(key)}

this.creatgfloatywindow=function(){
    log("createdfloaty")
    gfw=floaty.rawWindow(
        <horizontal>
            <text  id="text" w="*" h="*" gravity="center" textSize="18sp" background="#22ffff00">提醒</text>
        </horizontal>
    );
    gfw.setSize(device.width, 120)
    gfw.setTouchable(false)
    gfw.setPosition(0,80)
    isshowfloaty=true
 }

 this.creatsetfloatywindow=function(){
    gsfw=floaty.rawWindow(
        <horizontal clickable="false"  >
              <vertical  w="90" h="65" >
              <text id="stop" w="auto" h="40"  textSize="16sp" textColor="#000000"  background="#1C86EE" >设置</text>
              <text id="coll" w="auto" h="40"  textSize="16sp"  textColor="#000000" background="#1C86EE"  >收缩</text>
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
this.listapp=function(keepapps,isforcestop,delectapp){
    let allapps=[]
    let  appnames=whiteapps
    if(keepapps){
        appnames=keepapps
    }
    //列出app
    this.packageManager=context.getPackageManager()
    this.packageInfos = packageManager.getInstalledPackages(0);
    for(this.i = 0; i < packageInfos.size(); i++) {
        this.packageInfo = packageInfos.get(i);
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
                show(app.name+"不是白名单app")
                if(isforcestop){
                    forcestop(app.name)
                }
                if(delectapp){
                    uninstallapp(app.name)
                }
                // log("第三方应用"+GsonUtils.toJson(app))
          }else{
                show(app.name+"是白名单app")
          }
            m=m+1
      }
  })
    return allapps
}


//获取
this.getapp=function(){
    let allapps=[]
    //列出app
    this.packageManager=context.getPackageManager()
    this.packageInfos = packageManager.getInstalledPackages(1);
    for(this.i = 0; i < packageInfos.size(); i++) {
        this.packageInfo = packageInfos.get(i);
            //todo 压缩只对保存有效果bitmap还是原来的大小
        //第一次安装时间
        dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        appDate = packageInfo.firstInstallTime;
        app_name=packageInfo.applicationInfo.loadLabel(packageManager),
        app_version= packageInfo.versionName,
        app_versioncode= packageInfo.versionCode;
        app_packageName= packageInfo.packageName;
        app_firstInstall=  dateFormat.format(appDate);
        let ai=packageManager.getApplicationInfo(app_packageName,0)
        app_issystem= ai != null && (ai.flags & 1) != 0;
        app_isselect=false
        allapps.push({
            name: app_name,
            version:  app_version,
            versioncode:app_versioncode,
            packageName: app_packageName,
            firstInstall: app_firstInstall,
            isselect:app_isselect,
            issystem:app_issystem
        });
    };
    log("应用数量:"+allapps.length)
    return allapps
}
//获取禁用的应用
this.getstopedapps=function(){
    let allapps=[]
    //列出app
    this.packageManager=context.getPackageManager()
    this.packageInfos = packageManager.getInstalledPackages(1);
    for(this.i = 0; i < packageInfos.size(); i++) {
        this.packageInfo = packageInfos.get(i);
            //todo 压缩只对保存有效果bitmap还是原来的大小
        //第一次安装时间
        dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        appDate = packageInfo.firstInstallTime;
        app_name=packageInfo.applicationInfo.loadLabel(packageManager),
        app_version= packageInfo.versionName,
        app_versioncode= packageInfo.versionCode;
        app_packageName= packageInfo.packageName;
        app_firstInstall=  dateFormat.format(appDate);
        let ai=packageManager.getApplicationInfo(app_packageName,0)
        app_issystem= ai != null && (ai.flags & 1) != 0 ;
        app_isstoped= ai != null && (ai.flags & 1) != 0 && (ai.flags &2097152) != 0;
        app_isselect=false
        if(app_isrunning){
            allapps.push({
                name: app_name,
                version:  app_version,
                versioncode:app_versioncode,
                packageName: app_packageName,
                firstInstall: app_firstInstall,
                isselect:app_isselect,
                issystem:app_issystem,
                isstoped:app_isstoped
            });
        }
    };
    log("应用数量:"+allapps.length)
    return allapps
}

//获取
this.getrunningapp=function(){
    let allapps=[]
    this.am=context.getSystemService("activity")
    let appprocesses=am.getRunningAppProcesses()
    log("运行的线程数:"+appprocesses.size())
    //列出app
    this.packageManager=context.getPackageManager()
    this.packageInfos = packageManager.getInstalledPackages(1);
    for(this.n=0;n<appprocesses.size();n++){
         let pkglist=appprocesses.get(n)
        for(let c=0;c<pkglist.length;c++){
            log(pkglist[c])
        }
    }
    log("应用数量:"+allapps.length)
    return allapps
}



//获取
this.getrunningapp2=function(){
    let allapps=[]
    //列出app
    this.am=context.getSystemService("activity")
    if(am){
        this.taskinfos=am.getRunningTasks(2147483647)
        if(taskinfos){
            for(let i=0;i<taskinfos.size();i++){
               let taskinfo=taskinfos.get(i)
                if(taskinfo.baseActivity!=null){
                    let aapp={
                        packageName:taskinfo.baseActivity.getPackageName()
                      }
                      log(aapp)
                      allapps.push(aapp)
                }
            }
        }
    }
    log("应用数量:"+allapps.length)
    return allapps
}

//
this.keepappclear=function(url){
    this.appconfig=httpget(url)
    this.allapps=[]
    appnames=whiteapps
    apps=JSON.parse(appconfig)
    apps.forEach(app =>{
     if(app.install){
        appnames.push(app.name)
     }
    }) 
    this.packageManager=context.getPackageManager()
    this.packageInfos = packageManager.getInstalledPackages(0);
    for(this.i = 0; i < packageInfos.size(); i++) {
        this.packageInfo = packageInfos.get(i);
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
              //  log("第三方应用"+GsonUtils.toJson(app))
          }else{
            toastLog(app.name+"是白名单app")
          }
            m=m+1
      }
  })
    log("一共第三方应用："+m)
    return allapps
}


this.appstophander=function(){
    if( device.brand=="samsung"){clicktexts(["关闭应用","关闭应用程序"]) }
    else if(device.brand=="HONOR"){ clicktexts(["关闭应用","关闭应用程序"])}
    else if(device.brand=="DOCOMO"){clicktexts(["关闭应用","关闭应用程序"])}
    else if(device.brand=="Meizu"){clicktexts(["关闭应用","关闭应用程序"])}
    else if(device.brand=="xiaomi"){clicktexts(["关闭应用","关闭应用程序"])}
    else if(device.brand=="OPPO"){clicktexts(["关闭应用","关闭应用程序"])}
    else{if(textoneexist(["关闭应用","关闭应用程序"])){clickonetexts(["确定","关闭应用","关闭应用程序"])}}
}

this.closerecentapp=function(){
    return 
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
this.runscriptIntent=function(apppkg,scriptsurl){
    let i = app.intent({
        packageName:apppkg,
        className:"com.hongshu.autojs.external.open.RunIntentActivity",
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
// 发送强制关闭所有脚本给其他脚本APP
this.sendforcestopIntent=function(apppkg){
    let i = app.intent({
        packageName:apppkg,
        className:"com.hongshu.autojs.external.open.RunIntentActivity",
           flags:["activity_new_task"],
        extras:{
            "action":"forcestop",
            "tast_source":2,
            "source":2
            }
        }
    );
    context.startActivity(i);
}

this.runadui=function(pkg){ runscriptIntent(pkg,aduiscripturl)}

this.show=function(txt,txtcolor){ 
    try {
        txtcolor= textColor||android.graphics.Color.GRAY 
       txt= scriptruntime()+"秒："+txt
        log(txt);
         if(!isshowfloaty){ toast(txt); return  };
        if(!gfw){ 
            creatgfloatywindow(); 
        }else{
            ui.run(function(){ 
                gfw.text.setText(txt);
            })
        }
    } catch (error) {
        log(error)
    }
}


this.上滑=function(){滑动(20,13,17,10,4,500,500);}
this.下滑=function(){滑动(20,10,3,13,17,500,500);}
this.alter=sync(function(txt,t,left,top,width,height){
    this.issleep=false
    t=t||5000
    left= left ||0
    top =top || device.height/15
    width =width|| device.height
    height =height || device.height/15
    this.fw=floaty.rawWindow(
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

//
function httpget(url) {this.r = http.get(url);if (r.statusCode == 200) { return r.body.string();  } else { toastLog("五秒后重试");sleep(5000);  return "";}  }

this.shizukuforstopAllApp=function(){

}



this.forcestop=function(appname,st,isclearcache){
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

this.forcestoppkg=function(apppkg,st,isclearcache,isnewtask){
    if(enableshizuku()){
        return shizukuforcestopPkg(apppkg)
    }
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

this.clearappcache=function(appname,apppkg,fromforcestop){
    if(!apppkg&&!appname){
        return false
    }
    if(!apppkg){
        apppkg=getPackageName(appname)
    }
    if( device.brand=="samsung"){closetexts= ["存储","清除缓存"];}
    else if(device.brand=="HONOR"){ closetexts= ["存储","清除缓存","清空缓存"]; }
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

this.tofloatysetting=function(){
   let i = app.intent({
        action: "android.settings.action.MANAGE_OVERLAY_PERMISSION",
        flags:["activity_new_task"]
    });
    context.startActivity(i);
}

this.todevelopersetting=function(){
    let i = app.intent({ action: "android.settings.APPLICATION_DEVELOPMENT_SETTINGS", flags:["activity_new_task"] // data: "file:///sdcard/1.png"  
});
  context.startActivity(i);
}

 
this.toPkgandClass=function(pkg,classname){
        let i = app.intent({  packageName: pkg, className:classname ,flags:["activity_new_task"]});
         context.startActivity(i);
}
this.toPkgandClassWithData=function(pkg,classname,putdate){
    let i = app.intent({packageName: pkg, className:classname ,flags:["activity_new_task"],data:putdate});
     context.startActivity(i);
}
//到设置管理者设置
this.todeviceadmin=function(){
       toandroidsetting("com.android.settings.DeviceAdminSettings")
}

this.toinputsettings=function(){
    let i = app.intent({
        action: "android.settings.INPUT_METHOD_SETTINGS",
        flags:["activity_new_task"]
        // data: "file:///sdcard/1.png"
    });
    context.startActivity(i);
}

this.toinputmethodsubtypesetting=function(){
    tosettingsbyaction("android.settings.INPUT_METHOD_SUBTYPE_SETTINGS")
}
this.tolanguagesetting=function(){
    let i = app.intent({
        action: "android.settings.LOCALE_SETTINGS",
        flags:["activity_new_task"]
        // data: "file:///sdcard/1.png"
    });
    context.startActivity(i);
}

this.tosettingsbyaction=function(actionname){
    let i = app.intent({
        action: actionname,
        flags:["activity_new_task"]
        // data: "file:///sdcard/1.png"
    });
    context.startActivity(i);
}

this.toairpalnemodesetting=function(){
    tosettingsbyaction("android.settings.AIRPLANE_MODE_SETTINGS")
}

this.tosearchsetting=function(){
    tosettingsbyaction("android.search.action.SEARCH_SETTINGS")
}
 //到android设置页面
 this.toandroidsetting=function(classname){     toPkgandClass("com.android.settings",classname) }
 //到用户使用情况页面
 this.tousagestate=function(){    tosettingsbyaction("android.settings.USAGE_ACCESS_SETTINGS")}
 this.toaccessibilitysetting=function(){    tosettingsbyaction("android.settings.ACCESSIBILITY_SETTINGS")}
 this.tosystemsetting=function(){    tosettingsbyaction("android.settings.SETTINGS")}
 this.towifisetting=function(){    tosettingsbyaction("android.settings.WIFI_SETTINGS")}
 this.toapnsetting=function(){    tosettingsbyaction("android.settings.APN_SETTINGS")}
 this.todatesetting=function(){    tosettingsbyaction("android.settings.DATE_SETTINGS")}
 this.towifiipsetting=function(){    tosettingsbyaction("android.settings.WIFI_IP_SETTINGS")}
 this.tovpnsetting=function(){    tosettingsbyaction("android.settings.VPN_SETTINGS")}
 this.tophonenetsetting=function(){    tosettingsbyaction("android.settings.DATA_ROAMING_SETTINGS")}
 this.tosecuritysetting=function(){    tosettingsbyaction("android.settings.SECURITY_SETTINGS")}
 this.todisplaysetting=function(){    tosettingsbyaction("android.settings.DISPLAY_SETTINGS")}
 this.toappmanagesetting=function(){    tosettingsbyaction("android.settings.MANAGE_APPLICATIONS_SETTINGS")}
 this.toallappmanagesetting=function(){    tosettingsbyaction("android.settings.MANAGE_ALL_APPLICATIONS_SETTINGS")}
 this.tomangerwritesetting=function(){    tosettingsbyaction("android.settings.action.MANAGE_WRITE_SETTINGS")}
 this.toignorebatteryoptintizationsetting=function(){   tosettingsbyaction("android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS")}
 this.isfloaty=function(){  return Settings.canDrawOverlays(context)}
 this.checkfloaty=function(appname){
    toastLog("自动开启悬浮权限")
     appname=appname||app.getAppName(context.getPackageName())
     log("当前应用名:"+appname)
   if(!isfloaty()){
       tofloatysetting()
       sleep(1000)
      if(doactionmaxtime(function(){ 
        log("悬浮查找点击")
        if(isfloaty()){
            return true
        }else{
            if(clickonetexts(["允许许可","在其他应用上层显示"])){ 
                back()
               return true
            }
            if (textclick(appname)){  toastLog("悬浮查找点击应用名"); sleep(1000);};
              滑动(20,10,15,10,5,500,300)
              sleep(1000)
        }
       },30000)){
           toastLog("悬浮窗权限开启成功")
           return true
       }
   }
   toastLog("悬浮开启结束")
}

function sleepr(short,long){
    long=long||short+1000
  let  rt=random(short,long)
    log("等待:"+rt +" 毫秒")
    sleep(rt)
}

function getTextfromid(idstr,defaulttext,findtime){
    if(!idstr){ return ""}
    defaulttext=defaulttext||""
    findtime=findtime||500
    node_id=id(idstr).visibleToUser().findOne(findtime)
    if(node_id){ return node_id.text(); }else{ return defaulttext;}
}

function idclick(idstr,t,left,top,right,bottom){
    t= t|| 200;
    left = left || 0;
    top = top || 0;
    right = right || device.width;
    bottom = bottom || device.height;
  //  log("l ,t,r,b"+left+","+top+","+right+","+bottom)
    let f=id(idstr).boundsInside(left, top, right, bottom).visibleToUser().findOne(t);
    if(f){
        if(clicknode(f)){  return true        }  
    }
    return false
}

function descclick(desctext,t,left,top,right,bottom){
    t= t|| 200;
    left = left || 0;
    top = top || 0;
    right = right || device.width;
    bottom = bottom || device.height;
    this.f=desc(desctext).boundsInside(left, top, right, bottom).visibleToUser().findOne(t); //.visibleToUser()
    if(!f){ 
        f=text(desctext).boundsInside(left, top, right, bottom).visibleToUser().findOne(t); //.visibleToUser()
        if(!f){ return f}  
    }
    return clicknode(f)
}

//文本点击
this.textclick=function(txt,t,left,top,right,bottom){
    t=t || 200
    left = left || 0;
    top = top || 0;
    right = right|| device.width;
    bottom = bottom || device.height;
    this.f=text(txt).boundsInside(left, top, right, bottom).visibleToUser().findOne(t);
    if(!f){
        log("text："+txt+":没找到了")
        f=desc(txt).boundsInside(left, top, right, bottom).visibleToUser().findOne(t);
        if(!f){
            return false
        }
    }
    return clicknode(f)
}

function maytextclick(maytext,t,left,top,right,bottom){
    if(!maytext){  return  false; }
    t=t || 200
    left = left || 0;
    top = top || 0;
    right = right || device.width;
    bottom = bottom || device.height;
    this.f=text(maytext).boundsInside(left, top, right, bottom).visibleToUser().findOne(t);
    if(!f){
         f=textContains(maytext).boundsInside(left, top, right, bottom).visibleToUser().findOne(t)
         if(!f){
             return false
         }
    }
   // log("text："+i+":控件找到了")
    return clicknode(f)
}

//node 执行点击 
function clicknode(v,dx,dy,time,clicknumber,intervaltime){
    dx=dx||0
    dy=dy||0
    clicknumber=clicknumber||1
    intervaltime=intervaltime||300
    if(!v){return false; }
    time=time||200
    if(enablegenius){
        b=v.bounds()
        if(b.centerX()>0&&b.centerY()>0){
            log("点击中心位置"+b.centerX()+"--"+b.centerY())
            for(let n=0;n<clicknumber;n++){
                press(b.centerX()+dx,b.centerY()+dy,time)
                sleep(intervaltime)
            }
            return true
          
        }else{
           if(b.top>0&& b.left>0){
            // log("点击控件左上角")
            for(let n=0;n<clicknumber;n++){
                press(b.left+dx,b.top+dy+dy,time)
                sleep(intervaltime)
            }
            return true
           }
           if(b.right<device.width&&b.bottom<device.height&&b.bottom>0&&b.right>0){
            // log("点击控件右下角"+(b.right)+","+(b.bottom))
            for(let n=0;n<clicknumber;n++){
                press(b.right+dx,b.bottom+dy,time)
                sleep(intervaltime)
            }
            return true

            
           }
           return false
        }
     }
         r=v.bounds()
          this.w = boundsInside(r.left, r.top, r.right, r.bottom).clickable().findOne(time)
          if(w&&w.click()){ return true;}
          if(clickparents(v)){ return true }
          if(clickchilds(v)){  return true}
}

//一直找到可以点击控件向上查找
function clickparents(v,n){
    if(!v){
        return false
    }
    let i=0
   let  n=n||15
    while(i<n){  
        if(v){
            p=v.parent();
            if(p&&p.clickable()){log("找到可点击控件"+toString(p));  return p.click(); }
            else{ i=i+1; log("向上查找层数："+i); v=p }   
        }else{
            return false
        }
    }
    return false
}

//找到子类 点击下去
function clickchilds(v){
   if(v.childCount()>0){
       for(i=0;i<v.childCount();i++){
           c=v.child(i)
           if(c){
            if(c.clickable()){
                return c.click()
            }else{
              if(clickchilds(v.child(i))){
                 return true
              }
            }
           }
        
       }
   }else{
       return false
   }
   return false 
}

//ids id集合 t 查找id的时间 st 每次点击完成休息时间  
function clickids(ids,t,st){
    t=t||100
    st=st||500
    ids.forEach(idstr => {
       if (idclick(idstr,t)){
            sleep(st)
       }
    });
}

function clickalls(allids,alltexts,alldescs){
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
function clicktexts(texts,t,st,left,top,right,bottom){
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

function clickdescs(descs,t,st){
   log("开始点击desc集合:"+texts)
    st=st || 500
    t= t||500
    for(i=0;i<descs.length;i++){
        if(descclick(descs[i],t)){
            sleep(st)
        }
    }
}

function clickalltexts(texts,t,st){
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
function clickoneids(ids,t,st){
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

function clickonetexts(texts,t,st){
  log("开始点击文本集合:"+texts)
    st=st || 500
    t=t || 200
    for(i=0;i<texts.length;i++){
        if(textclick(texts[i],t)){
            sleep(st)
            return true
        }
    }
    return false
}

function clickonemaytexts(texts,t,st){
    log("开始点击文本集合:"+texts)
      st=st || 500
      t=t || 500
      for(i=0;i<texts.length;i++){
          if(maytextclick(texts[i],t)){
              sleep(st)
              return true
          }
      }
      return false
  }


//在文本标志出现之前一直点击文本的 t 是最长等待时间 默认一分钟无点击效果就退出 发现stop 文本出现就退出
this.whileclicktextsbeforetexts=function(clicktexts,stoptexts,maxtime,isclickshowtext){
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
this.whileclickidsbeforeids=function(ids,stopids,t){
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

 this.control_click=function(button, vlause, left, top, right, bottom) {
    // 功能---点击控件
    // 输入---参数1:元素[id、text 、desc、className],参数2:元素值,剩余参数:left, top, right, buttom
    // 默认后四位为当前屏幕
    // 返回---真假
    this.result
    this.button_info
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
        this.xy_info = button_info.bounds()
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
this.滑动=function(z,x1,y1,x2,y2,t,r) {
    t=t||500
    r=r||500
    if(z>0){
        this.w = device.width/z;
        this.h = device.height/z;
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
        swipe(startx, starty , endx , endy, t+randomint(0, r))
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
        this.w = boundsInside(left, top, right,bottom).scrollable().findOne(100);
        if(w){
            if(startx<endx){
                w.scrollBackward()
            }else{
                w.scrollForward()
            }
        }
    }
}

this.bezierCreate=function(x1,y1,x2,y2,x3,y3,x4,y4){
    if(!x2){
        x2=x1
    }
    if(!x3){
        x3=x1
    }
    //构建参数
    this.h=100;
    this.cp=[{x:x1,y:y1+h},{x:x2,y:y2+h},{x:x3,y:y3+h},{x:x4,y:y4+h}];
    this.numberOfPoints = 100;
    this.curve = [];
    this.dt = 1.0 / (numberOfPoints - 1);
    //计算轨迹
    for (this.i = 0; i < numberOfPoints; i++){
        this.ax, bx, cx;
        this.ay, by, cy;
        this.tSquared, tCubed;
        this.result_x, result_y;
    
        cx = 3.0 * (cp[1].x - cp[0].x);
        bx = 3.0 * (cp[2].x - cp[1].x) - cx;
        ax = cp[3].x - cp[0].x - cx - bx;
        cy = 3.0 * (cp[1].y - cp[0].y);
        by = 3.0 * (cp[2].y - cp[1].y) - cy;
        ay = cp[3].y - cp[0].y - cy - by;
    
        this.t=dt*i
        tSquared = t * t;
        tCubed = tSquared * t;
        result_x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
        result_y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
        curve[i] = {
            x: result_x,
            y: result_y
        };
    }
    //轨迹转路数组
    this.array=[];
    for (this.i = 0;i<curve.length; i++) {
        try {
            this.j = (i < 100) ? i : (199 - i);
            xx = parseInt(curve[j].x)
            yy = parseInt(Math.abs(100 - curve[j].y))
        } catch (e) {
            break
        }
        array.push([xx, yy])
    }
    return array
}

/**
 * 真人模拟滑动函数
 * 
 * 传入值：起点终点坐标
 * 效果：模拟真人滑动
 */
this.randomSwipe=function(sx,sy,ex,ey,t,r){
    log(sx+","+sy+","+ex+","+ey+","+t+","+r)
    //设置随机滑动时长范围
    this.timeMin=t||500
    this.timeMax=timeMin+randomint(0,r)||1500
    log(sx+","+sy+","+ex+","+ey+","+timeMin+","+timeMax)
    //设置控制点极限距离
    this.leaveHeightLength=500
    //根据偏差距离，应用不同的随机方式
    if(Math.abs(ex-sx)>Math.abs(ey-sy)){
        this.my=(sy+ey)/2
        this.y2=my+random(0,leaveHeightLength)
        this.y3=my-random(0,leaveHeightLength)
    
        this.lx=(sx-ex)/3
        if(lx<0){lx=-lx}
        this.x2=sx+lx/2+random(0,lx)
        this.x3=sx+lx+lx/2+random(0,lx)
    }else{
        this.mx=(sx+ex)/2
        this.y2=mx+random(0,leaveHeightLength)
        this.y3=mx-random(0,leaveHeightLength)

        this.ly=(sy-ey)/3
        if(ly<0){ly=-ly}
        this.y2=sy+ly/2+random(0,ly)
        this.y3=sy+ly+ly/2+random(0,ly)
    }
    //获取运行轨迹，及参数
    this.time=[0,random(timeMin,timeMax)] 
    this.track=bezierCreate(sx,sy,x2,y2,x3,y3,ex,ey)
   log("随机控制点A坐标："+x2+","+y2+"\n"+"随机控制点B坐标："+x3+","+y3+"\n"+"随机滑动时长："+time[1]+"最小:"+timeMin+"::最长:"+timeMax)
    //滑动
    gestures(time.concat(track))
    
}

/*所有文本存在才返回真 */
this.textallexist=function(texts){
    if(!texts){
        return false
    }
    s=0
    if(texts.length>0){
        for(i=0;i<texts.length;i++){ if(text(texts[i]).exists()){s=s+1; }  else{ return false; } }
        if(s==texts.length){return true; }
    }
    return false
}

/* 所有id都存在才返回真  只要有一个不存在就返回false */
this.idallexist=function(ids){
    if(!ids){
        return false
    }
    s=0
    if(ids.length>0){
        for(i=0;i<ids.length;i++){  if(id(ids[i]).exists()){  s=s+1; }else{  return false; }
        }
        if(s==ids.length){ return true;        }
    }
    return false
}

/* 所有id都存在才返回真  只要有一个不存在就返回false */
this.descallexist=function(descs){
    if(!descs){
        return false
    }
    s=0
    if(descs.length>0){
        for(i=0;i<descs.length;i++){  if(desc(descs[i]).exists()){  s=s+1; }else{  return false; }
        }
        if(s==descs.length){ return true; }
    }
    return false
}

/*文本只要存在一个就返回真 */
this.textoneexist=function(texts){
     if(texts.length>0){for(i=0;i<texts.length;i++){ if(text(texts[i]).visibleToUser().exists()){  return true }  } }
    return false
}
/**只要存在一个id就返回真 */
this.idoneexist=function(ids){
     if(ids.length>0){for(i=0;i<ids.length;i++){  if(id(ids[i]).exists()){ return true;  }  }    }
    return false
}

this.forbidapps=function(apps){
   let apps=apps||disableapps
    apps.forEach(appname=>{
        let apppkg=getPackageName(appname)
        if(apppkg){
            forcestop(appname)
            forbidapp(appname,apppkg)
            
        }
    })
}

this.forbidapp=function(appname,apppkg){
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


this.firstrunapp=function(appname){
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

this.systemdownloadApk=function(filename,fileuri,isinstall){
    systemdownload(filename,fileuri,isinstall,"application/vnd.android.package-archive")
}

this.systemdownload=function(filename,fileuri,isinstall,MimeType){
    let isinstall = isinstall || true
    importClass(android.os.Environment);
    importClass(android.net.Uri);
    importClass(android.app.DownloadManager);
let uri = fileuri;
let request = new DownloadManager.Request(Uri.parse(uri));
//指定下载目录与文件名
request.setDestinationInExternalPublicDir("/download/", filename);
//指定在WIFI状态下，执行下载操作。
request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI);
//指定在MOBILE状态下，执行下载操作
//request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_MOBILE);
//是否允许漫游状态下，执行下载操作
request.setAllowedOverRoaming(false);
//是否允许“计量式的网络连接”执行下载操作
request.setAllowedOverMetered(true); //默认是允许的。
//设置Notification的标题和描述
request.setTitle(filename);  
request.setDescription(filename+"正在下载"); 
//设置Notification的显示，和隐藏。
request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
//设置下载文件类型
MimeType=MimeType||"application/vnd.android.package-archive"
request.setMimeType(MimeType);//apk类型
//设置网络请求头
//request.addRequestHeader(header, value)；
let downloadManager = context.getSystemService(context.DOWNLOAD_SERVICE);
let id = downloadManager.enqueue(request);
let query = new DownloadManager.Query();
//删除下载任务，会同时删除文件
//downloadManager.remove(id);
let st = setInterval(() => {
    let cursor = downloadManager.query(query.setFilterById(id));
    if (!(cursor != null && cursor.moveToFirst())) return toastLog("下载任务不存在");
    let bytes_downloaded = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR));//已下载字节
    let totalSize = cursor.getLong(cursor.getColumnIndex(DownloadManager.COLUMN_TOTAL_SIZE_BYTES));
    show("下载进度:"+Math.ceil(bytes_downloaded/totalSize*100)+"%");
    //下载状态
    let status = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS));
    if (status == DownloadManager.STATUS_SUCCESSFUL){
        if(isinstall){
            show("下载已完成开始安装");
            install_app(files.getSdcardPath()+"/download/"+filename,filename,120000,false,true)
        }else{
            show("下载已完成");
        }
        clearInterval(st);//取消定时器
     }
}, 1500);
}



//下载app
this.downloadApk=function(name,downloadurl,isinstall) {
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
                this.当前写入的文件大小 = byteSum;
                this.progress = (当前写入的文件大小 / connLength) * 100;
                if (progress > 0.1) {
                    this.progress = parseInt(progress).toString() + '%';
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
          
     } catch (error) {
         log("下载失败:"+error)
     }
     if(isinstall){
        install_app(filePath,name)
     } 
 }
 
 this.install_app=function(filePath, name,maxtime,isopen,delect) {
     maxtime=maxtime||180000
     isopen=isopen||false
     delect=delect||true
     ////--------------安装--------------////
     if(filePath){
        app.installapp(filePath)
     }
     clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]
     if( device.brand=="samsung"){        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]       }
    else if(device.brand=="HONOR"){        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]       }
    else if(device.brand=="DOCOMO"){        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]    }
    else if(device.brand=="Meizu"){        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]    }
    else if(device.brand=="xiaomi"){        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]    }
    else if(device.brand=="OPPO"){        clickarray=["继续","以后都允许","始终允许","允许","安装","继续安装","下一步","设置"]    }
    else{  clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"] }
    doactionmaxtime(function(){
         // is_first = textMatches(/(始.*|.*终.*|.*允.*|.*许)/).findOne(1000);
            toastLog("检测中....")
            if(textclick("允许此来源")){ back(); sleep(300) ; }
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
             // this.坐标 = is_button.bounds()
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
             if(delect){
                 files.remove(filePath)
             }
             if(isopen){
                textclick("打开")
                sleep(5000)
                return true
             }else{
                return true  
             }
            }
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
 //检测运行APP是否是新版版本
 this.checkinstallapp=function(){
    runtime.requestPermissions(["WRITE_EXTERNAL_STORAGE","READ_EXTERNAL_STORAGE"])
     this.appconfigs=httpget(rewardapplisturl)
     this.apps=JSON.parse(appconfigs)
     apps.forEach(app => {
         show("name:"+app.name+"package:"+app.package)
         if(!getPackageName(app.name)&&app.install){
            show("检测到本机没有安装应用："+app.name+"即将自动下载并安装")
            downloadandinstallapp(app.name,app.package)
         }
     })
  }

 //根据app名下载并安装应用
 this.downloadandinstallapp=function(appname,apppkg){
   let appinfo=getAppInfobyAppNameAndPkg(appname,apppkg)
    if(appinfo){log("应用详情：获取成功");
        systemdownloadApk(appname+"-"+appinfo.appDetail.versionCode,appinfo.appDetail.apkUrl,true);   
 }
}
//关闭其他应用
this.stopOtherScript=function(){
    this.thisengs=engines.myEngine()
    this.allengs=engines.all()
    allengs.forEach(e =>{        if(e.getId()!=thisengs.getId()){engines.stop(e.getId());  }
    })
}
this.runurlscript=function(name,url){
    try {
        show("运行:"+name+"--"+url)
        content=httpget(url)
        if(content){
            toastLog("内容不为空")
            engines.execScript(name,content, {"useFeatures":["continuation"]});    
        }
    } catch (error) {
        log("run脚本出错:"+name+"--"+url)
    }
 
}


this.evalscript=function(name,url){
    try {
        show("运行:"+name+"--"+url)
        content=httpget(url)
        if(content){
            toastLog("内容不为空")
            eval(content);    
        }
    } catch (error) {
        log("eval脚本出错:"+name+"--"+url)
    }
 
}

this.phonenumber=function(){
    runtime.requestPermissions(["READ_PHONE_STATE"])
    this.telephoneservice = context.getSystemService("phone")
     pnumber = telephoneservice.getLine1Number()
     if(!pnumber){pnumber=spt.getString("phonenumber");     }
     if(pnumber.startsWith("+86")){pnumber=pnumber.substr(3);     }
     if(pnumber){ return pnumber;     }else{return null;     }
}
//本地配置启用脚本
this.startallapp = function(){
    addbmobchannel("hongshuyuedu")
    let apps=数据库.get("runlist","")
    this.last
    if(!apps){
        show("本地运行配置为空，从云端获取默认配置")
        this.appconfig=httpget(rewardapplisturl)
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
this.clickscreencapture=function(){
    while(true){  if(clicktexts(["不再提醒","不在显示"])){  } ; if(textclick("立即开始")){break  };  sleep(2000); }
}
this.checkscreencapture=function(){
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

while(!requestScreenCapture()){
    sleep(2000)
}
if (!requestScreenCapture()) {
    show("请求截图权限失败！");
}else{
    show("请求截图权限成功！");
   
}
}

this.isNotificationManager=function(){    
    importClass(com.hongshu.utils.PermissionUtils);  
      return PermissionUtils.isnotificationListenerEnable()
    }
this.toNotificationManager=function(){ 
       tosettingsbyaction("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS")
    }

//启动deviceadmin
this.startdeviceadmin=function(){
    toastLog("检测设备管理器是否激活")
    if(isdeviceadmin()){
        show("设备管理器激活了")
        return
    }
    let ncsbgl=0
    ui函数=httpget("https://gitee.com/zhangshu345012/sample/raw/v2/script/快捷方式/系统快捷设置.js");
   return doactionmaxtime(function(){
        if(isdeviceadmin()){
            return true
        }
        if(currentPackage()==context.getPackageName()){
            return true
        }else{
            app.launch(context.getPackageName())
            sleep(5000)
            engines.execScript("uiname",ui函数,{})
            sleep(2000)
            if(textclick("设备管理")){
                ncsbgl=ncsbgl+1
                while(!isdeviceadmin()){
                    if(ncsbgl>0){
                        clicktexts(["激活",scriptappname,"启动","启用此设备管理应用","激活此设备管理员"],500,2000)
                        sleepr(500,1000)
                        滑动(20,10,17,10,5,500,300)
                    }
                }
            }
        }
    },60000)
}

//检测权限
this.checkpermission=function(permissions){
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
this.doactionmaxtime=function(action,maxtime,intertime){
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
this.doactionmaxnumber=function(action,maxnumber){
    if(!action){return false}
    maxnumber=maxnumber||1; n_doaction=0;
    while(n_doaction<maxnumber){ if (action(n_doaction)){return true }; n_doaction=n_doaction+1; }
    return false
}

//执行函数 
this.doactionnumberontime=function(action,maxnumber,maxtime,intertime){
    if(!action){return false}
    maxnumber=maxnumber||1; n_doaction=0;
    maxtime=maxtime||10000
    intertime=intertime||1000
    stime=nowdate().getTime()
    while(n_doaction<maxnumber){ if(action(n_doaction)){return true }; n_doaction=n_doaction+1;if(nowdate().getTime()-stime>maxtime){return true}; sleep(intertime);}
    return false
}

//卸载应用
this.uninstallapp=function(appname){
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

this.uninstallpackage=function(packageName){
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
  //判断是否可以写入系统设置
this.issystemsettings=function(){
   return PermissionUtils.isGrantedWriteSettings()
}
//检测系统设置
this.checksystemsettings=function(){
    if(issystemsettings()){ log("有系统设置权限"); 
    return true    }
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
// 不同机型手机进行的不同的检测配置
this.alltest=function(){
    log("全部测试")
    device.wakeUpIfNeeded()
    if( device.brand=="samsung"){
        checkfloaty()
    checksystemsettings()
        startdeviceadmin()}
    else if(device.brand=="HONOR"){
        checkfloaty()
        checksystemsettings()
        startdeviceadmin() }
    else if(device.brand=="DOCOMO"){
        checkfloaty()
        checksystemsettings()
        startdeviceadmin()}
    else if(device.brand=="Meizu"){ }
    else if(device.brand=="xiaomi"){  }
    else if(device.brand=="OPPO"){   }
}
//检测是否开启了设备管理者权限
this.checkdevicemanager=function(){
    if( device.brand=="samsung"){startdeviceadmin()}
    else if(device.brand=="HONOR"){startdeviceadmin() }
    else if(device.brand=="DOCOMO"){startdeviceadmin()}
    else if(device.brand=="Meizu"){ }
    else if(device.brand=="xiaomi"){  }
    else if(device.brand=="OPPO"){   }
}
this.随机邀请文本=function(url){
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



this.刷宝邀请=function(){
    随机邀请文本(刷宝短视频邀请集合)
}

this.火山极速版邀请=function(){
    随机邀请文本(火山极速版邀请集合)
    // this.h=httpget(getrandforstrs(火山极速版邀请链接))
    // setClip(h)
}

this.快手极速版邀请=function(){
    随机邀请文本(快手极速版邀请集合)
}

//直接从应用宝获取应用信息
this.getAppInfobyAppNameAndPkg=function(appname,apppkg){
    log("应用宝查找app:"+appname+"--"+apppkg)
    let appinfos=httpget("https://sj.qq.com/myapp/searchAjax.htm?kw="+appname)
    if(appinfos){
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
            }
        }       
    }
    return null
}

//检测电量低停止脚本
this.checkbattery=function(btyn,bigbatterysleeptime,lowerbatterysleeptime){
    toastLog("检测电池电量:"+btyn)
    btn=btyn||30
    bigbatterysleeptime=bigbatterysleeptime||600000
    lowerbatterysleeptime=lowerbatterysleeptime||1800000
    batteryn=device.getBattery()
    if(isdeviceadmin()){
        if(batteryn<btyn*2/3){
            device.lockScreen()
            sleep(lowerbatterysleeptime)
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
                sleep(bigbatterysleeptime)
            }
        }
    }
}

this.startcheckbattery= function(){
    if(checkbatterythread!=null){
        return 
    }
    checkbatterythread = threads.start(function(){
        while(true){
            sleep(60000)
            checkbattery(30)
        }
    });
}

this.stopcheckbattery=function(){
    if(checkbatterythread!=null ){
         checkbatterythread.interrupt()
         checkbatterythread=null
    }
}



this.isadviceactivity=function(ca){
    ca=ca||currentActivity()
    this.  adviceActivitys=[
    "com.bytedance.sdk.openadsdk.activity.TTRewardVideoActivity",
    "com.bytedance.sdk.openadsdk.activity.TTRewardExpressVideoActivity",
    "com.bytedance.sdk.openadsdk.activity.TTLandingPageActivity",
    "com.yxcorp.gifshow.ad.award.AwardVideoPlayActivity",
    "com.liquid.adx.sdk.ad.video.RewardVideoActivity",  
    "com.yxcorp.gifshow.ad.award.AwardVideoPlayActivity",
    "com.qq.e.ads.PortraitADActivity",
    "com.qq.e.ads.ADActivity",
    "com.iclicash.advlib.ui.front.ADBrowser",
    "com.iclicash.advlib.ui.front.InciteADActivity"
    ]
    return adviceActivitys.indexOf(ca)
}

//关闭穿山甲激励视频广告
this.close_ad_toutiao=function(apppkg,clickgailv){
    clickgailv=clickgailv||-1
    let ca=currentActivity()
  //  show("关闭穿山甲:activity:"+ca)
    if(ca=="com.bytedance.sdk.openadsdk.activity.TTRewardVideoActivity"||ca=="com.bytedance.sdk.openadsdk.activity.TTRewardExpressVideoActivity"){
        doactionmaxtime(function(){
            ca=currentActivity()
            if(ca=="com.bytedance.sdk.openadsdk.activity.TTRewardVideoActivity"){
                
            }else if(ca=="com.bytedance.sdk.openadsdk.activity.TTRewardExpressVideoActivity"){

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
                return true
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

this.close_ad_kk=function(apppkg){
    if(currentActivity()=="com.yxcorp.gifshow.ad.award.AwardVideoPlayActivity"){
        doactionmaxtime(function(){
            show("关闭快手广告")
            if(getTextfromid(apppkg+":id/video_countdown")=="关闭广告"){
                textclick("关闭广告")
            }
            if(textoneexist(["点击重播","关闭广告"])){
                back()
                sleep(1000)
            }
            clickonemaytexts(["刷新","继续观看"])
            if(maytextclick("网络异常")){
                log(apppkg+":运行时 网络异常")
            }
            if(currentActivity()!="com.yxcorp.gifshow.ad.award.AwardVideoPlayActivity"){
                return true
            }
            if(idclick("com.kuaishou.nebula:id/empty_btn")){
                return true
            }
            sleep(1000)
        },30000)
    }
}

this.close_ad_liquid=function(apppkg,clickgailv){
    clickgailv=clickgailv||-1
    if(currentActivity()=="com.liquid.adx.sdk.ad.video.RewardVideoActivity"){
         return  doactionmaxtime(function(){
             if(clickonetexts(["关闭","关闭广告"],500,1500)){
                 return true
             }
            if(currentActivity()!="com.liquid.adx.sdk.ad.video.RewardVideoActivity"){
                 return true
             }
             sleep(2000)
           },60000)
    }
}

this.close_ad_qq=function(apppkg,clickgailv){
    // ccj_file_paths 
        clickgailv=clickgailv||-1
     let  ca=currentActivity()
 //   show(apppkg+"关闭腾讯广告 activity:"+ca)
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
            }else{
                
            }
            if(!idContains(apppkg).findOne(100)){
                return false
            }
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
this.close_ad_iclicash=function(apppkg,clickgailv){
    clickgailv=clickgailv||-1
    ca=currentActivity()
    if(ca=="com.iclicash.advlib.ui.front.InciteADActivity"||ca=="com.iclicash.advlib.ui.front.ADBrowser"||ca=="com.bytedance.sdk.openadsdk.activity.TTLandingPageActivity"){
      return  doactionmaxtime(function()
        {   
            if(text("点击重播").exists()){
                    back()
                   return true
            }
            if(!idContains(apppkg).findOne(100)){
                return false
            }
         //   clicknode(className("android.view.View").clickable().depth(8).drawingOrder(1).findOne(1000))
            ca=currentActivity()
            if(ca=="com.iclicash.advlib.ui.front.ADBrowser"){
                textclick("关闭")
            }else if(ca=="com.iclicash.advlib.ui.front.InciteADActivity"){
                
            }else if(ca="com.bytedance.sdk.openadsdk.activity.TTLandingPageActivity"){
                back()
                
            }else{
                return true
            }
            if(isadviceactivity()<0){
                return true
            }
        
        },60000,2000)
    }
    return false 
}


this.closeappundostate=function(){
  return  clickonemaytexts(["关闭","关闭应用","重新打开"],200,1500)
}


//看激励视频  概率点击
this.seerewardvideo=function(apppkg,isclickad,gailv,installgailv){
    gailv=gailv||2
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
      if(close_ad_qq(apppkg,-1)){
        return  true
      }
       if(close_ad_toutiao(apppkg,-1)){
           return  true
       }
       if(text("创意视频").findOne(100)){
         return  true
       }
       if(close_ad_liquid(apppkg,-1)){
        return  true
      }
       if(textoneexist(["点击下载"])){
           back()
           return true
       }
      return true
    },60000)
}

this.runtimerscript=function(){
    runurlscript("定时套餐","https://gitee.com/zhangshu345012/sample/raw/v2/script/VIP/定时套餐.js")
}

//检测存储状态 
this.checkstoragestate=function(minsize){
    minsize=minsize||sdtotalsize/10
    let nowsize=sdavailablesize()
    if(nowsize<minsize){
        toastLog("存储空间小于最小空间要求:"+nowsize+":"+minsize)
        delectalltmpfiles()
    }else{
        toastLog("存储空间大于最小空间要求:"+nowsize)
    }
}

this.delectalltmpfiles=function(){
    let alltmphouzhui=["txt","log","apk","dat","inf","zip","rar","qlog","info","dump"]
    deleteAllFiles(files.getSdcardPath(),alltmphouzhui)
}

//判断屏幕是否有字
this.textexists=function(t){
    if(text(t).visibleToUser().exists()){
        return true
    }else{
        if(desc(t).visibleToUser().exists()){
            return true
        }
    }
    return false
}

//删除目录下的所有
this.deleteAllEmptyDirs=function(dir){
    dir=dir||files.getSdcardPath()
    let list = files.listDir(dir);
    let len = list.length;
    if(len == 0){
        log("删除目录 " + dir + " " + (files.remove(dir) ? "成功" : "失败"));
        return;
    }
    for(let i = 0; i < len; i++){
        this.child = files.join(dir, list[i]);
        if(files.isDir(child)){
            deleteAllEmptyDirs(child);
        }
    }
}
//删除目录
this.delectdirs=function(dirs){
    dirs.forEach(dir=>{
        files.removeDir(dir)
    })
}
//删除存储的垃圾文件
this.delectapkfile=function(){
    let houzhuis=['apk','tmp',"log"]
    deleteAllFiles(files.getSdcardPath(),houzhuis)
}
// 随机打乱数组
this.shuffleArray=function(array) {
    n=array.length - 1
    for (let i =0 ; i <n; i++) {
         j = Math.floor(Math.random() * (n + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

//删除所有文件
this.allhouzhui=[]
this.deleteAllFiles=function(dir,houzhui){
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
                  //  log("包含后缀："+extendname)
                    try {
                        let tmpfilename=files.getName(child)
                        let su=  files.remove(child)
                         log("删除文件:"+tmpfilename+"--"+extendname+"--"+su)
                    } catch (error) {
                        log("删除文件出错:"+tmpfilename)
                    }
                }else{
                   // log("不包含后缀："+extendname)
                }
            }
        }
    }

}

//微信同意加好友
this.weixin_allow_friend=function(weixinname,shenqing){
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

//保持应用是最新的
this.keepappisnewer=function(name,pkg){
    try {
        this.appinfo=getAppInfobyAppNameAndPkg(name,pkg)
        if(appinfo){
            let appversioncode=AppUtils.getAppVersionCode(pkg)
            log(name+":"+appversioncode+"--最新:"+appinfo.appDetail.versionCode)
            if(appversioncode!=-1){
                if(appversioncode<appinfo.appDetail.versionCode){
                    systemdownloadApk(name+"-"+appinfo.appDetail.versionCode,appinfo.appDetail.apkUrl,true);  
                }
            }
        }
    } catch (error) {
        log("keepappisnewer"+"--"+name+":"+error)
    }
}
//检测app是否为最新app
this.checkscriptversion=function(){
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
                    systemdownloadApk(scriptappname,"http://zhangshuhong888.iask.in:8989/"+scriptappname+"_"+ver+".apk",true);  
                }else{
                    toastLog("版本正常")
                }
            }
        }
    } catch (error) {
        toastLog("checkscriptversion 错误："+error)
    }
}

this.readercheck=function(){
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

this.findwebImgPoint=function(imgurl,trytime,isclick){
    try {
        if(!requestScreenCapture()){
            checkscreencapture()
        }
        trytime=trytime||1
        log("1")
        let urlimg=images.load(imgurl)
        log("2")
        let i=0
        let pp
        while(i<trytime){
            i=i+1;
            log("3")
            pp=images.findImage(captureScreen(),urlimg)
            log("4")
            log("查找次数:"+i)
            if(pp){
                log("pp:"+pp.x+","+pp.y)
                if(isclick){
                    click(pp.x,pp.y)
                }
                return pp
            }
           sleep(1000)
        }
       
    } catch (error) {
        
    }
}

this.checkweixin=function(){
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
            app.launch("com.tencent.mm")
            sleep(3000)
        }
    },10000)
}

//本地配置启用脚本
this.localstartreaderapps = function(scriptname,scriptpath,enabletomoney,enableappnew,configpath,issyncwebconfig){
    device.wakeUpIfNeeded()
    issyncwebconfig=issyncwebconfig||true
    sleep(1000)
    // addbmobchannel("hongshuyuedu")
    configpath=configpath||rewardapplisturl
    listapp(readerapps)
    let nowtime=nowdate()
    let xiaoshi=nowtime.getHours()
    let fen=nowtime.getMinutes()+3
    this.runapps=[]
    let localapps=数据库.get("runlist","")
    if(!localapps){
        log("本地运行配置为空，从云端获取默认配置")
        this.appconfig=httpget(configpath)
        webapps=JSON.parse(appconfig)
        if(webapps){
            runapps=webapps
        }
    }else{
        if(issyncwebconfig){
            this.appconfig=httpget(configpath)
            webapps=JSON.parse(appconfig)
                 webappnames=[]
                if(webapps){
                    webapps.forEach(app=>{
                        webappnames.push(app.app.name)
                    })
                }
                localapps.forEach(app=>{
                    if(webappnames.indexOf(app.app.name)!=-1){
                        runapps.push(app)
                    }
                })
        }
    }
    if(!runapps){
        //10分钟重启
        Scripts.INSTANCE.addDailyTask(scriptname,scriptpath,2,xiaoshi,fen+10)
        return true
    }else{
        数据库.put("runlist",runapps)
    }
    Scripts.INSTANCE.delectAllTask()
    runapps.filter(function(app){
        if(!app.open){
           return false
        }
        if(今日已提现(app.app.name)){
            return false
        }
        if(今日时长(app.app.name)>app.runconfig.maxtime){
            return false
        }
        return true
    })
    toastLog("runapp："+runapps.length)
    if(runapps.length==0){
        dialogs.confirm("运行提醒","今日没有可以运行的应用，如需继续运行点击确定，无" )
        return
    }
    //下载应用 并保持最新
    runapps.forEach(app=>{
        if(!getPackageName(app.app.name)){
            downloadandinstallapp(app.app.name,app.app.pkg)
        }else{
            if(enableappnew){
                keepappisnewer(app.app.name,app.app.pkg)
            }
        }
    })
    if(enabletomoney){
        记录("all","switch_tomoney",true)
    }else{
        记录("all","switch_tomoney",false)
    }
    if(enableappnew){
        记录("all","switch_appnew",true)
    }else{
        记录("all","switch_tomoney",false)
    }
    log("xiaoshi:"+xiaoshi+"--fen:"+fen)
        runapps= shuffleArray(runapps)
        runapps.forEach(app => {
                let runconfig=app.runconfig
                if(runconfig&&app.path){
                    log("xiaoshi:"+xiaoshi+"--fen:"+fen)
                    while(fen>=60){
                        fen=fen-60
                        xiaoshi=xiaoshi+1
                        if(xiaoshi==24){
                            xiaoshi=0
                        }
                      }
                      if(app.source==7){
                        Scripts.INSTANCE.addDailyTask(app.name,JSON.stringify(app),app.source,xiaoshi,fen)
                      }else{
                        Scripts.INSTANCE.addDailyTask(app.name,app.path,app.source,xiaoshi,fen)
                      }
                    
                     fen=fen+ Math.ceil(runconfig.onetime/60)
                }
        })
        while(fen>=60){
            xiaoshi=xiaoshi+1
            fen=fen-60
            if(xiaoshi==24){
                xiaoshi=0
            }
          }
        Scripts.INSTANCE.addDailyTask(scriptname,scriptpath,2,xiaoshi,fen)
        closerecentapp()
        closelastscriptapp()
        spt.remove("lastscriptapp")
        spt.remove("hongshuyuedu_run_app")
        spt.put("hongshuyuedu_running",true)
        threads.start(function(){
            delectapkfile()
        }
        )
        oneapp=runapps[0]
        runurlscript(oneapp.app.name,oneapp.path)
}

//佳佳的脚本
this.startjiajiareaderapps = function(scriptname,scriptpath,enabletomoney,enableappnew,configpath,issyncwebconfig){
    device.wakeUpIfNeeded()
    issyncwebconfig=issyncwebconfig||true
    sleep(1000)
    configpath=configpath||rewardapplisturl
    listapp(readerapps)
    let nowtime=nowdate()
    let xiaoshi=nowtime.getHours()
    let fen=nowtime.getMinutes()+3
    this.runapps=[]
    let localapps=数据库.get("runlist","")
    if(!localapps){
        log("本地运行配置为空，从云端获取默认配置")
        this.appconfig=httpget(configpath)
        webapps=JSON.parse(appconfig)
        if(webapps){
            runapps=webapps
        }
    }else{
        if(issyncwebconfig){
            this.appconfig=httpget(configpath)
            webapps=JSON.parse(appconfig)
                 webappnames=[]
                if(webapps){
                    webapps.forEach(app=>{
                        webappnames.push(app.app.name)
                    })
                }
                localapps.forEach(app=>{
                    if(webappnames.indexOf(app.app.name)!=-1){
                        runapps.push(app)
                    }
                })
        }
    }
    if(!runapps){
        //10分钟重启
        Scripts.INSTANCE.addDailyTask(scriptname,scriptpath,2,xiaoshi,fen+10)
        return true
    }else{
        数据库.put("runlist",runapps)
    }
    Scripts.INSTANCE.delectAllTask()
    runapps.filter(function(app){
        if(!app.open){
           return false
        }
        if(今日已提现(app.name)){
            return false
        }
        if(今日时长(app.name)>app.runconfig.maxtime){
            return false
        }
        return true
    })
    toastLog("runapp："+runapps.length)
    if(runapps.length==0){
        dialogs.confirm("运行提醒","今日没有可以运行的应用，如需继续运行点击确定，无" )
        return
    }
    //下载应用 并保持最新
    runapps.forEach(app=>{
        if(!getPackageName(app.name)){
            downloadandinstallapp(app.name,app.app.pkg)
        }else{
            if(enableappnew){
                keepappisnewer(app.name,app.app.pkg)
            }
        }
    })
    if(enabletomoney){
        记录("all","switch_tomoney",true)
    }else{
        记录("all","switch_tomoney",false)
    }
    if(enableappnew){
        记录("all","switch_appnew",true)
    }else{
        记录("all","switch_tomoney",false)
    }
    log("xiaoshi:"+xiaoshi+"--fen:"+fen)
        runapps= shuffleArray(runapps)
        runapps.forEach(app => {
                let runconfig=app.runconfig
                if(runconfig&&app.path){
                    log("xiaoshi:"+xiaoshi+"--fen:"+fen)
                    while(fen>=60){
                        fen=fen-60
                        xiaoshi=xiaoshi+1
                        if(xiaoshi==24){
                            xiaoshi=0
                        }
                      }
                      if(app.source==7){
                        Scripts.INSTANCE.addDailyTask(app.name,JSON.stringify(app),app.source,xiaoshi,fen)
                      }else{
                        Scripts.INSTANCE.addDailyTask(app.name,app.path,app.source,xiaoshi,fen)
                      }
                    
                     fen=fen+ Math.ceil(runconfig.onetime/60)
                }
        })
        while(fen>=60){
            xiaoshi=xiaoshi+1
            fen=fen-60
            if(xiaoshi==24){
                xiaoshi=0
            }
          }
        Scripts.INSTANCE.addDailyTask(scriptname,scriptpath,2,xiaoshi,fen)
        closerecentapp()
        closelastscriptapp()
        spt.remove("lastscriptapp")
        spt.remove("hongshuyuedu_run_app")
        spt.put("hongshuyuedu_running",true)
        threads.start(function(){
            delectapkfile()
        }
        )
        oneapp=runapps[0]
        runurlscript(oneapp.app.name,oneapp.path)
}

//云端配置启用脚本
this.startreaderapps = function(scriptname,scriptpath,configpath,pushchannel,enabletomoney,enableappnew,invitecodeconfigurl){
    device.wakeUpIfNeeded()
    if(pushchannel){
        addbmobchannel(pushchannel)
    }
    configpath=configpath||rewardapplisturl
    this.runapps=[]
    this.appconfig=httpget(configpath)
    webapps=JSON.parse(appconfig)
    if(webapps){
        runapps=webapps
    }else{
        let localapps=数据库.get("runlist","")
        if(!localapps){
            log("本地运行配置为空，从云端获取默认配置")
        }else{
           runapps=localapps
        }
    }
    if(!runapps){
        //10分钟重启
        Scripts.INSTANCE.addDailyTask(scriptname,scriptpath,2,xiaoshi,fen+10)
        return true
    }else{
        数据库.put("runlist",runapps)
    }
    if(enabletomoney){
        记录("all","switch_tomoney",true)
    }else{
        记录("all","switch_tomoney",false)
    }
    if(enableappnew){
        记录("all","switch_appnew",true)
    }else{
        记录("all","switch_tomoney",false)
    }
    
    function filterapp(app){
                if(!app.open){
                    log("没有开启")
                   return false
                }
                if(今日已提现(app.app.name)=="true"){
                    return false
                }
                if(今日时长(app.app.name)>app.runconfig.maxtime){
                    return false
                }
                return true
    }

    Scripts.INSTANCE.delectAllTask()
    toastLog("runapp：之前"+runapps.length)
    let  tmpapps=[]
    runapps.forEach(app=>{
       if(filterapp(app)){
           tmpapps.push(app)
       }
    })
    runapps=tmpapps
    toastLog("runapp：之后"+runapps.length)
    if(runapps.length==0){
        dialogs.confirm("运行提醒","今日没有可以运行的应用，如需继续运行点击确定，无" )
        return
    }
    let appwhiteapps=readerapps
    runapps.forEach(app=>{
        appwhiteapps.push(app.app.name)
    })
    //清空非阅读 app
    listapp(appwhiteapps,true)
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
                        fen=fen-60
                        xiaoshi=xiaoshi+1
                        if(xiaoshi==24){
                            xiaoshi=0
                        }
                      }
                    Scripts.INSTANCE.addDailyTask(app.app.name,app.path,2,xiaoshi,fen)
                     fen=fen+ Math.ceil(runconfig.onetime/60)
                }
        })
        while(fen>=60){
            xiaoshi=xiaoshi+1
            fen=fen-60
            if(xiaoshi==24){
                xiaoshi=0
            }
          }
        Scripts.INSTANCE.addDailyTask(scriptname,scriptpath,2,xiaoshi,fen)
        closerecentapp()
        closelastscriptapp()
        spt.remove("lastscriptapp")
        spt.remove("hongshuyuedu_run_app")
        spt.put("hongshuyuedu_running",true)
        threads.start(function(){
            delectapkfile()
        }
        )
        oneapp=runapps[0]
        runurlscript(oneapp.app.name,oneapp.path)
}

//云端配置启用脚本
this.runreaderapps = function(scriptname,scriptpath,configpath,pushchannel,enabletomoney,enableappnew,invitecodeconfigurl){
    device.wakeUpIfNeeded()
    if(pushchannel){
        addbmobchannel(pushchannel)
    }
    configpath=configpath||rewardapplisturl
    this.runapps=[]
    this.appconfig=httpget(configpath)
    webapps=JSON.parse(appconfig)
    if(webapps){
        runapps=webapps
    }else{
        let localapps=数据库.get("runlist","")
        if(!localapps){
            log("本地运行配置为空，从云端获取默认配置")
        }else{
           runapps=localapps
        }
    }
    if(!runapps){
        //10分钟重启
        Scripts.INSTANCE.addDailyTask(scriptname,scriptpath,2,xiaoshi,fen+10)
        return true
    }else{
        数据库.put("runlist",runapps)
    }
    if(enabletomoney){
        记录("all","switch_tomoney",true)
    }else{
        记录("all","switch_tomoney",false)
    }
    if(enableappnew){
        记录("all","switch_appnew",true)
    }else{
        记录("all","switch_tomoney",false)
    }
    function filterapp(app){
                if(!app.open){
                    log("没有开启")
                   return false
                }
                if(今日已提现(app.app.name)=="true"){
                    return false
                }
                if(今日时长(app.app.name)>app.runconfig.maxtime){
                    return false
                }
                return true
    }

    Scripts.INSTANCE.delectAllTask()
    toastLog("runapp：之前"+runapps.length)
    let  tmpapps=[]
    runapps.forEach(app=>{
       if(filterapp(app)){
           tmpapps.push(app)
       }
    })
    runapps=tmpapps
    toastLog("runapp：之后"+runapps.length)
    if(runapps.length==0){
        dialogs.confirm("运行提醒","今日没有可以运行的应用，如需继续运行点击确定，无" )
        return
    }
    let appwhiteapps=readerapps
    runapps.forEach(app=>{
        appwhiteapps.push(app.app.name)
    })
    listapp(appwhiteapps,true)
    runapps= shuffleArray(runapps)
    runapps.forEach(ap=>{
        try {
            closerecentapp()
            closelastscriptapp()
            spt.remove("lastscriptapp")
            spt.put("hongshuyuedu_run_app",ap.app.name)
            spt.put("hongshuyuedu_running",true)
            evalscript(ap.app.name,ap.path)
        } catch (error) {
            console.log(error);
        }
    })
    //清空非阅读 app
    runurlscript(scriptname,scriptpath)
}

//开始运行单个应用
this.startapp=function(appname,apppkg,floatyx,floatyy,isshowsettingfloaty,isdevicemanager,iskeepappnewer,isonlyscript,appdownloadurl){
    let runscriptapp=spt.getString("hongshuyuedu_run_app",null)
    let isreaderunning=spt.getBoolean("hongshuyuedu_running",false)
    // 集合运行
    if(runscriptapp==appname && isreaderunning){
        toastLog("总调度运行："+appname)
        if(!app.getPackageName(appname)){
            show("未找到指定应用:"+appname+"将自动查找应用并下载安装")
            if(appdownloadurl){
                systemdownloadApk(appname,appdownloadurl,true)
            }else{
              downloadandinstallapp(appname,apppkg)
            }
          }else{
            if(iskeepappnewer&&获取记录("all","switch_appnew",false)){
                keepappisnewer(appname,apppkg)
            }
             show(appname+"已经安装")
         }
        app_run()
    }else{
        if(isonlyscript){
            engines.stopOther()
        }
        checksystemsettings()
        if(isdevicemanager){
            checkdevicemanager()
        }
        if(floatyx!=0||floatyy!=0){
          checkfloaty()
          floaty.closeAll()
          creatgfloatywindow()
          gfw.setPosition(floatyx,floatyy)
         }
        if(isshowsettingfloaty){
             creatsetfloatywindow()  //创建设置悬浮窗
        }
         if(!app.getPackageName(appname)){
              show("未找到指定应用:"+appname+"将自动查找应用并下载安装")
              if(appdownloadurl){
                systemdownloadApk(appname,appdownloadurl,true)
              }else{
                downloadandinstallapp(appname,apppkg)
              }
            }else{
         if(iskeepappnewer&&获取记录("all","switch_appnew",false)){
               keepappisnewer(appname,apppkg)
         }
         show(appname+"已经安装")
        }
    closelastscriptapp()
    closerecentapp()
    spt.put("lastscriptapp",appname)
    spt.put("hongshuyuedu_running",false)
    try {
        app_run()
    }catch (error) {

    }
    }
}

this.nodesexists=function(nodes){
        if(nodes){
            if(textallexist(nodes["texts"])){
                return true
            }
             if(  idallexist(nodes["ids"])){

              return true
            }
             if(descallexist(node["descs"])){
            return true
            }
        }else{
            return false
        }
     
    return false
}

this.sweep_up_pkg_activity_content=function(pkg,biaozhis,sweepaction,goactivityaction,onetime,chixutime){
    doactionmaxtime(function(){
       if(currentPackage()==pkg){
            if(nodesexists(biaozhis)){
                sweepaction()
                sleepr(onetime-2000,onetime+2000)
            }else{
                goactivityaction()
            }
       }else{
            app.launch(pkg)
            sleep(3000)
        }
    },chixutime)
}

//执行应用邀请
this.doappinvite=function(person,appname,gailv){

}

this.installshizuku=function(){
    systemdownloadApk("Shizuku",shizukuweburl,true)
}

//无效
this.shizukuuninstallPkg=function(apppkg){
    shell("adb uninstall "+apppkg,{adb:true,root:false})
}

this.shizukuuninstallApp=function(appname){
    apppkg=app.getPackageName(appname)
    if(apppkg){
       shizukuuninstallPkg(apppkg)
    }
}

this.shizukuforcestopPkg=function(apppkg){
    log("shizuku停止运行"+apppkg)
    if(apppkg==context.getPackageName()){
        log("shizuku停止运行当前APP ")
        return
    }
    shell("am force-stop "+apppkg,{adb:true,root:false})
}

this.shizukuclearappcache=function(appname){
    let apppkg=app.getPackageName(appname)
    if(apppkg){
        shizukuclearpkgcache(apppkg)
    }
   
}


this.shizukuclearpkgcache=function(apppkg){
    
   shell("rm /data/data/"+apppkg+"/cache/",{adb:true,root:false})
   shell("rm /data/data/"+apppkg+"/app_baidu_ad_sdk/",{adb:true,root:false})
}


this.shizukuforcestopApp=function(appname){
    apppkg=app.getPackageName(appname)
    if(apppkg){
       shizukuforcestopPkg(apppkg)
    }
}

this.shizukudisableappuntilused=function(appname){
    apppkg=app.getPackageName(appname)
    if(apppkg){
        shizukudisablepkguntilused(apppkg)
    }
}

shizukudisablepkguntilused=function(apppkg){
    shell("am force-stop "+apppkg,{adb:true,root:false})
    shell("pm disable-until-used "+apppkg,{adb:true,root:false}) 
}

shellcmd=function(cmd){
    try {
        let re= shell(cmd,{adb:true,root:false})
        log(JSON.stringify(re))
        return re.code==0
    } catch (error) {
        return false
    }
}

enableshizuku=function(){
    try {
        let shizukupkg=app.getPackageName("Shizuku");
        if(!shizukupkg){
            log("shizuku 未安装")
            return false
        }
        log("shizuku 包名:"+shizukupkg)
       let apppkg=app.getPackageName("相册")
        console.log("相册包名:"+apppkg);
        if(apppkg){
            this.result= shell("am force-stop "+apppkg,{adb:true,root:false})
            console.log("result:"+JSON.stringify(result))
            return result.code==0
        }
    } catch (error) {
        log("shizuku 无法使用")
        return false
    }
}

}

