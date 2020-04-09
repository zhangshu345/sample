var 数据库= storages.create("hongshuyuedu");
var date=new Date();
var starttime=date.getTime()
var rewardapplisturl="https://gitee.com/zhangshu345012/sample/raw/v1/config/rewardapplist.json"  //奖励app 运行的配置文件的路径
var today=function(){
    return date.getFullYear()+"_"+date.getMonth()+"_"+date.getDate()
}
importClass(com.hongshu.utils.PermissionUtils)
importClass(android.content.ComponentName)
importClass(com.hongshu.receiver.DeviceReceiver)
importClass(com.hongshu.utils.FileUtils)
var scriptappname=app.getAppName(context.getPackageName())
log("脚本app名："+scriptappname)
var 刷宝邀请码=["96ZWEN","Q4FVDZ","APV3EA3"]  //我的 9X4T2X
var 快手极速版邀请码=["xps8bz"]
var  dpm
var  deviceadmincomponent
var isdeviceadmin=function(){
      deviceadmincomponent=new ComponentName(context.getPackageName(),"com.hongshu.receiver.DeviceReceiver")
     dpm=context.getSystemService("device_policy")
    return dpm.isAdminActive( deviceadmincomponent)
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
        engines.stopAllAndToast()
    })
    gfw.jiasu.on("click",function(){
        ratio=ratio*0.9
        toastLog("加速 1.1倍 当前速度："+ratio)
    })
    gfw.jiansu.on("click",function(){
        
        ratio=ratio*1.1
        toastLog("减速 0.1倍 当前速度："+ratio)
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
    alter(name+"今日签到:"+cs)
    return cs
}

var 今日已签到=function(name){
     数据库.put(name+"_sign_"+today(), true)
}

var 今日时长=function(name){
   s=数据库.get(name+"_time_"+today(), 0)
   alter(name+"今日时长:"+s)
   return s
}

var 今日滑动次数=function(name){
    name= name||"glode"
    cs=数据库.get(name+"_"+today()+"_move", 0)
    alter("今日签到:"+cs)
    return cs
}
var 设置今日滑动次数=function(name,i){
    name=name||"glode"
    i=i||0
    cs=数据库.put(name+"_"+today()+"_move", i)
    alter("今日签到:"+cs)
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
    alter(name+"今日已提现")
}
var 记录现在金币=function(name,i){
    数据库.put(name+"_lastcoin_"+today(),i)
}
var 上次金币=function(name){ 
       s= 数据库.get(name+"_lastcoin_"+today(), 0)
       alter(name+"上次金币："+s)
       return s
 } 
 //可以通过上次的金币来判断是否 还可以获取金币
 var 记录现在余额=function(name,f){ 
   数据库.put(name+"_lastmoney_"+today(),f)
 } //可以通过上次的金币来判断是否 还可以获取金币

 var 上次余额=function(name){ 
    s=   数据库.get(name+"_lastmoney_"+today(), 0.0)
    alter(name+"上次余额"+s)
    return s
 } //可以通过上次的金币来判断是否 还可以获取金币

 var 记录现在滑动次数=function(name,f){ 
    数据库.put(name+"_lastswipetime_"+today(),f)
} //可以通过上次的金币来判断是否 还可以获取金币
 
var 上次滑动次数=function(name){ 
     s=   数据库.get(name+"_lastswipetime_"+today(), 0)
     alter(name+"上次滑动次数"+s)
     return s
} 

var getrandforstrs=function(strs){
    if(strs==null||strs.length==0){
        return ""
    }
    let r=Math.floor(random()*strs.length)
    return strs[r]
}

var 记录现在观看视频数=function(name,f){ 
    数据库.put(name+"_lastvideonumber_"+today(),f)
} //可以通过上次的金币来判断是否 还可以获取金币
 

var 上次观看视频数=function(name){ 
     s=   数据库.get(name+"_lastvideonumber_"+today(), 0)
     alter(name+"上次观看视频个数"+s)
     return s
} 

var 记录现在观看文章数=function(name,f){ 
    数据库.put(name+"_lastwenzhangnumber_"+today(),f)
} //可以通过上次的金币来判断是否 还可以获取金币
 
var 上次观看文章数=function(name){ 
     s=   数据库.get(name+"_lastwenzhangnumber_"+today(), 0)
     alter(name+"上次观看视频个数"+s)
     return s
} 
 
var 记录=function(name,key,n){
      数据库.put(name+"_"+key,n)
}

 var 获取记录=function(name,key){
    数据库.get(name+"_"+key,0)
}

var 今日记录=function(name,key,n){
    数据库.put(name+"_"+key+"_"+today(),n)
}

var 获取今日记录=function(name,key){
  数据库.get(name+"_"+key+"_"+today(),0)
}

//
function httpget(url) {
        var r = http.get(url);
        // log("code = " + r.statusCode);
        if (r.statusCode == 200) {
            return r.body.string()
        } else {
            return ""
        }
  }

  
var forcestop=function(appname,st){
    if(!getPackageName(appname)){
        show(appname+"：没有安装")
        return 
    }
    show("强制关闭应用:"+appname)
  st=st||10000
   packagename=app.getPackageName(appname)
  app.openAppSetting(packagename)
  closetexts= ["强制停止","停止运行","强制关闭","强行停止","结束运行","确定"]
  i=0
  while(i<2){
    closetexts.forEach(t=>{
        if(textclick(t)){
            i=i+1
          sleep(2000)
        }
    })
  }
}


var  tofloatysetting=function(){
   let i = app.intent({
        action: "android.settings.action.MANAGE_OVERLAY_PERMISSION",
        flags:["activity_new_task"]
        // data: "file:///sdcard/1.png"
    });
    context.startActivity(i);
}

var  todevelopersetting=function(){
    let i = app.intent({
         action: "android.settings.APPLICATION_DEVELOPMENT_SETTINGS",
         flags:["activity_new_task"]
         // data: "file:///sdcard/1.png"
     });
     context.startActivity(i);
 }

 
var toPkgandClass=function(pkg,classname){
        let i = app.intent({
             packageName: pkg,
             className:classname
             // data: "file:///sdcard/1.png"
         });
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
 var  toandroidsetting=function(classname){
     toPkgandClass("com.android.settings",classname)
 }


 //到用户使用情况页面
var tousagestate=function(){
    tosettingsbyaction("android.settings.USAGE_ACCESS_SETTINGS")
}

var toaccessibilitysetting=function(){
    tosettingsbyaction("android.settings.ACCESSIBILITY_SETTINGS")
}

var tosystemsetting=function(){
    tosettingsbyaction("android.settings.SETTINGS")
}
var towifisetting=function(){
    tosettingsbyaction("android.settings.WIFI_SETTINGS")
}

var toapnsetting=function(){
    tosettingsbyaction("android.settings.APN_SETTINGS")
}
var todatesetting=function(){
    tosettingsbyaction("android.settings.DATE_SETTINGS")
}

var towifiipsetting=function(){
    tosettingsbyaction("android.settings.WIFI_IP_SETTINGS")
}

var tovpnsetting=function(){
    tosettingsbyaction("android.settings.VPN_SETTINGS")
}

var tophonenetsetting=function(){
    tosettingsbyaction("android.settings.DATA_ROAMING_SETTINGS")
}

var tosecuritysetting=function(){
    tosettingsbyaction("android.settings.SECURITY_SETTINGS")
}

var todisplaysetting=function(){
    tosettingsbyaction("android.settings.DISPLAY_SETTINGS")
}
var toappmanagesetting=function(){
    tosettingsbyaction("android.settings.MANAGE_APPLICATIONS_SETTINGS")
}
var toallappmanagesetting=function(){
    tosettingsbyaction("android.settings.MANAGE_ALL_APPLICATIONS_SETTINGS")
}


var tomangerwritesetting=function(){
    tosettingsbyaction("android.settings.action.MANAGE_WRITE_SETTINGS")
}


var toignorebatteryoptintizationsetting=function(){
   tosettingsbyaction("android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS")
}

var isfloaty=function(){
    importClass(android.provider.Settings);
    return Settings.canDrawOverlays(context)
}

var checkfloaty=function(appname){
     appname=appname||app.getAppName(context.getPackageName())
     log("appname:"+appname)
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
    rt=random(short,long)
    show("等待:"+rt +" 毫秒")
    sleep(rt)
}


function idclick(idstr,t,left,top,right,bottom){
    t= t|| 500
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=id(idstr).boundsInside(left, top, right, bottom).findOne(t);
    if(f){
        if(!f.click()){
            b=f.bounds()
            bc=click(b.centerX(),b.centerY())
            if(bc){
                alter("id："+idstr+"----点位成功点击")
                return true
            }else{
                alter("id："+idstr+"----点位失败点击")
                return false
            }
           
        }else{
            alter("id："+idstr+"----控件点击成功")
            return true
        }
    }
    return false
}
//文本点击
function textclick(i,t,left,top,right,bottom){
    t=t || 500
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=text(i).boundsInside(left, top, right, bottom).findOne(t);
    if(f){
         if(!f.click()){
             show("text："+i+":点位开始成功")
             b=f.bounds()
             if(b.centerX()>0&&b.centerY()>0){
                r=click(b.centerX(),b.centerY())
             }
             
           return r
        }else{
            show("text:"+i+"----控件点击成功")
            return true
        }
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
    date=new Date()
    st=date.getTime()
    while(true){
       clicktexts(clicktexts)
       if(textoneexist(stoptexts)){
           return true
       }
       if(date.getTime()-st>t){
           return false
       }
    }
 }

//在文本标志出现之前一直点击id的 t 是最长等待时间
var whileclickidsbeforeids=function(ids,stopids,t){
    t=t||10000
    date=new Date()
    st=date.getTime()
    while(true){
       clickids(ids)
       if(idoneexist(stopids)){
           return true
       }
       if(date.getTime()-st>t){
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



function 滑动(z,x1,y1,x2,y2,t,r) {
    var w = device.width/z;
    var h = device.height/z;
    r=r||1000
   // show("滑动"+x1+","+y1+"->"+x2+","+y2)
    swipe(w * x1, h * y1 , w *x2 , h * y2, t+random(0, r))
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
        for(i=0;i<texts.length;i++){
            if(text(texts[i]).exists()){
               return true
            }
        }
    }
    return false
}

/**只要存在一个id就返回真 */
var idoneexist=function(ids){
     if(ids.length>0){
        for(i=0;i<ids.length;i++){
            if(id(ids[i]).exists()){
               return true
            }
        }
    }
    return false
}
//只能判断自身app
var isAppForground=function(){
    importClass(com.hongshu.utils.AppUtils);
    a =AppUtils.isAppForeground()
    if(a){
        show("apputils 判断正确")
        return true
    }else{
        show("apputils 判断错误")
        return false 
        
    }
}

var firstrunapp=function(appname){
    importClass(com.hongshu.utils.AppUtils);
    packagename=app.getPackageName(appname)
    app.launchPackage(packagename)
    允许启动文字=['允许',"确定","始终允许","打开"]
    cfirsti=0
    while(cfirsti<5){
        if(currentPackage()==packagename){
            show(packagename+" 在前台："+currentPackage())
      
            return true
        }else{
            show(packagename+" 不在在前台："+currentPackage())
            app.launchPackage(packagename)
        }
        sleep(2000)
        clicktexts(允许启动文字)
        cfirsti=cfirsti+1
    }
  
    return true
}

var firstrunapppackage=function(packagename){
    importClass(com.hongshu.utils.AppUtils);
    允许启动文字=['允许',"始终允许","打开","确定"]
    i=0
    while(i<3){
        if(currentPackage()==packagename){
            alter(packagename+" 在前台：")
            return true
        }else{
            alter(packagename+" 不在在前台：")
            app.launchPackage(packagename)
        }
        sleep(2000)
        clicktexts(允许启动文字)
        i=i+1
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

     var threadId = threads.start(function () {
         while (1) {
             var 当前写入的文件大小 = byteSum;
             var progress = (当前写入的文件大小 / connLength) * 100;
             if (progress > 0.1) {
                 var progress = parseInt(progress).toString() + '%';
                 ui.run(function () {
                     // console.log(name + "下载进度", progress);
                     toast(name + "下载进度" + progress)
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
     toastLog(name+'下载完成');
     if(isinstall){
        install_app(filePath,name)
     }
     
     
 }
 function install_app(filePath, name) {
     ////--------------安装--------------////
     //  读取 apk
     app.viewFile(filePath)
     clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]
    // installappwithfilepath(filePath)
     for (let i = 0; i < 100; i++) {
         // is_first = textMatches(/(始.*|.*终.*|.*允.*|.*许)/).findOne(1000);
            toast("检测中....")
        
           clicktexts(clickarray)
           if(text("允许此来源").exists()){
              if(idclick("android:id/switch_widget")){
                  control_click(3,"向上导航")
              }
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
                     console.log("已取消保护");
                     toast("已取消保护")
                     sleep(1000)
                     break;
                 }
             }
             back()
            
         }
         if (textclick("完成")){
             return
         }
         if (textclick("打开")){
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
            downloadApk(app.name+"_"+app.appversion,app.downloadurl,true)
         }
     })
  }

  
 //根据app名下载并安装应用
 var downloadandinstallapp=function(name){
    var appconfiglist=httpget(rewardapplisturl)
    var apps=JSON.parse(appconfiglist)
    var isok=false
       apps.forEach(app => {
          show("name:"+app.name+"package:"+app.package)
             if(app.name==name){
                isok=true
                  if(!getPackageName(app.name)){
                    downloadApk(app.name+"_"+app.appversion,app.downloadurl,true)
                 }
             }
        }
 
    )
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


var startallapp=function(){
    var appconfig=httpget(rewardapplisturl)
     apps=JSON.parse(appconfig)
    var last
    apps.forEach(app => {
           if(last){
                记录今日时长(last.name,last.onetime)
               forcestop(last.name)
           }
            stopOtherScript()
        if(!getPackageName(app.name)){
            if(app.downloadurl){
                downloadApk(app.name,app.downloadurl,true)
            }
        }
        if(app.bmobid && getPackageName(app.name)){
            engines.execBmobScriptWithName(app.name,app.bmobid,{})
            last=app
            sleep(app.onetime*1000)
            forcestop(last.name)
        }else if(app.scripturl && getPackageName(app.name)){
            engines.run
        }
    })
}


var phone=function(){
    runtime.requestPermissions(["READ_PHONE_STATE"])
    var telephoneservice = context.getSystemService("phone")
     pnumber = telephoneservice.getLine1Number()
    return pnumber
}
//本地配置启用脚本
var localstartallapp = function(){
    addbmobchannel("hongshuyuedu")
    let apps=数据库.get("runlist","")
    var last
    if(!apps){
        log("本地运行配置为空，从云端获取默认配置")
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
            if(app.downloadurl){
                log("配置App "+app.name+"下载链接存在")
                //下载并安装
                downloadApk(app.name+"_"+app.appversion,app.downloadurl,true)
            }else{
               log("配置App"+app.name+" 下载链接不存在存在")
            }
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
    while(true){
        if(clicktexts(["不再提醒","不在显示"])){
        }
       if(textclick("立即开始")){
            break
       }
        sleep(2000)
    }
}

var checkscreencapture=function(){
    engines.execScript("requestscreencapture",httpget("https://gitee.com/zhangshu345012/sample/raw/v1/base/requestscreencapture.js"),{})
   while(! requestScreenCapture()){
       sleep(1000)
       log("等待截屏")
   }
}

var isNotificationManager=function(){
    importClass(com.hongshu.utils.PermissionUtils);
    return PermissionUtils.isnotificationListenerEnable()
}


var toNotificationManager=function(){
    // importClass(com.hongshu.utils.IntentUtils);
    // IntentUtils.toNotificationAccessSetting()
    tosettingsbyaction("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS")
}

var addbmobchannel=function(channels){
    importClass(com.hongshu.bmob.push.BmobPushUtils)
    BmobPushUtils.addchannel(channels)
}

var removebmobchannel=function(channels){
    importClass(com.hongshu.bmob.push.BmobPushUtils)
    BmobPushUtils.removechannel(channels)
}

var bmobpushmessage=function(channels,message){
    importClass(com.hongshu.bmob.push.BmobPushUtils)
    BmobPushUtils.pushmessage(channels,message)
}

//启动deviceadmin
var startdeviceadmin=function(){
    if(isdeviceadmin()){
        log("设备管理器激活了")
        return
    }
    ui函数=httpget("https://gitee.com/zhangshu345012/sample/raw/v1/base/ces.js");
    app.launch(context.getPackageName())
    sleep(1000)
    var eeee= engines.execScript("uiname",ui函数,{})
    sleep(1000)
    let ss=true
    while(ss)
    {
        if(isdeviceadmin()){
            log("设备管理 ok")
            if(eeee.getId()){
                log("getid："+eeee.getId())
                engines.stop(eeee.getId())
            }
            return
        }else{
            log("设备管理 no")
        }
        
        clicktexts(["设备管理",scriptappname,"启动","启用此设备管理应用"],500,3000)
        滑动(20,10,17,10,5,500,300)
        sleepr(500,1000)
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
   
var uninstallalluserlessapp=function(){
  
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
            if(clickonetexts(["允许权限","允许许可","允许修改系统设置"])){
               break
            }
        }
        if(issystemsettings()){
            log("有系统设置权限")
            return true
        }
        back()
        sleep(100)
        back()
        sleep(100)
        home()
        sleep(1000)
        app.openAppSetting(context.getPackageName())
        while(true){
          滑动(20,10,17,10,3,500,500)
          sleep(1000)
          if(clickonetexts(["更改系统设置","可更改系统设置的应用程序","允许修改系统设置"])){
                sleep(1000)
                if(clickonetexts(["允许","允许许可","允许权限","允许修改系统设置"])){
                    return 
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
    toastLog("自动获取刷宝首次奖励,请勿中断")
}


