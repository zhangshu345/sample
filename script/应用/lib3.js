importClass(android.widget.Toast);  //以下两行Toast使用
importClass(java.io.File);  //以下五行下载更新使用
importClass(java.io.IOException);
importClass(java.io.InputStream);
importClass(java.io.FileOutputStream);
importClass(java.security.MessageDigest);
importClass(com.hongshu.utils.FastSPUtils)
importClass("java.security.SecureRandom");
importClass("javax.crypto.spec.DESKeySpec");
importClass("javax.crypto.SecretKeyFactory");
importClass("javax.crypto.Cipher");
importClass("java.security.NoSuchAlgorithmException");
importClass("javax.crypto.KeyGenerator");
importClass("javax.crypto.SecretKey");
importClass("javax.crypto.spec.SecretKeySpec");
importClass("javax.crypto.KeyGenerator");
importClass("javax.crypto.spec.IvParameterSpec");
log(device)
var nowdate=function(){return new Date()};
var scriptstarttime=nowdate().getTime()
var isshowfloaty=false  //是否显示提醒
var scriptruntime=function(){return parseInt((nowdate().getTime()-scriptstarttime)/1000)}
var glodespt=FastSPUtils.getInstance()
var enablegenius=device.sdkInt>=24
var func = {};
var gfw
var rl = parseInt(device.release.split('.')[0]);
func.DOMAIN = "dev.xiequbo.cn"
func.release = rl
func.isAndroid7 = (rl >= 7);
func.is2GMemory = (device.getTotalMem() <= 2147483648);
isinstalling=false

var spt=com.hongshu.utils.FastSPUtils.getInstance(appname)

spt.getBoolean("automoney")
log(spt.getBoolean("autoupdate"))
log(spt.getBoolean("showfloaty"))
var classModule = {};
var minstr=spt.getString("timemin")
if(minstr!=null){
    classModule.minMinutes = parseInt(minstr);
}else{
    classModule.maxMinutes =20
}
var maxstr=spt.getString("timemax")
if(maxstr!=null){
    classModule.maxMinutes = parseInt(maxstr);
}else{
    classModule.maxMinutes = 30;
}
var minswstr=spt.getString("swipemin")
if(minswstr!=null){
    classModule.minSwipe = parseInt(minswstr)
}else{
    classModule.minSwipe = 8;
}
var maxswstr=spt.getString("swipemax")
if(maxswstr!=null){
    classModule.maxSwipe = parseInt(maxswstr);
}else{
    classModule.maxSwipe = 12;
}
var minvideo=spt.getString("videomin");
if(minvideo!=null){
    classModule.minVideoSec  = parseInt(minvideo)
}else{
    classModule.minVideoSec = 8;
}
var maxvideo=spt.getString("videomax");
if(maxvideo!=null){
    classModule.maxVideoSec = parseInt(maxvideo)
}else{
    classModule.maxVideoSec = 12;
}

//是否允许shizuke
var enableshizuku=function(){
    try {
        if(!app.getPackageName("shizuku")){
            return false
        }
        apppkg=app.getPackageName("相册")
        if(apppkg){
            var result=   shell("am force-stop "+apppkg,{adb:true,root:false})
            console.log("result:"+JSON.stringify(result))
            return result.code==0
        }
    } catch (error) {
        log("shizuku 无法使用")
        return false
    }
}

var shizukuforcestopPkg=function(apppkg){
    shell("am force-stop "+apppkg,{adb:true,root:false})
}
var shizukuforcestopApp=function(appname){
    apppkg=app.getPackageName(appname)
    if(apppkg){
       shizukuforcestopPkg(apppkg)
    }
}

func.isLog = function(){
    var l = Number(func.loadConfigText("islog")) || 0;
    return l == 1;
}
func.isAutoUpdate = function(){
    var l = Number(func.loadConfigText("autoUpdate")) || 0;
    return l == 1;
}

//点击一个object对象（可以是链接、app图标等)
func.clickObject = function(obj,xoffset,yoffset){ 
    var o = true,ii = 3;
    if (obj){
        while(ii-- > 0){
            try{
                var itm = obj.bounds();
                var x = Number(xoffset) || 0;
                var y = Number(yoffset) || 0;
                if (this.isAndroid7)
                    o = click(itm.centerX() + x, itm.centerY() + y);  
                else
                    o = Tap(itm.centerX() + x, itm.centerY() + y);     //root下
            }
            catch(e){
                log('click failure=' + e.message);
                log(e.stack);
                o = false;
            }
    
            if (o)
                break;
        }
    }
    else
        o = false;
    return o;
}

func.execApp = function(packname,package,millsec,condition){
    func.toast('开始执行' + packname,2)

    let lastscriptapp=glodespt.getString("lastscriptapp")
    if(lastscriptapp){
        forcestop(lastscriptapp)
    }
    if(!app.getPackageName(appname)){
        func.toast("未找到指定应用:"+appname+"将自动查找应用并下载安装")
          downloadandinstallapp(packname,package)
      }
      engines.stopOther()
      glodespt.put("lastscriptapp",packname)
        var execTrys2 = 3 ;

        while(true){
            execTrys2 -=1
            if(execTrys2<0){
                func.toast('没有找到' + packname + '，该任务终止，继续下一任务',2);
                break
            }
            try{
                launchApp(packname);
                this.sleep(3000);
        
                var o1 = text('允许').findOnce(200);
                var o2 = text('拒绝').findOnce(200);
                if(o1 && o2)
                    func.clickObject(o1);
            }
            catch(e){
                this.log(packname,'使用launchApp运行app',e.message + '\n\r' + e.stack);
                return false;
            }

            var pk1 = currentPackage();
         
            if (pk1 == package){    //有启动成功
                func.toast('请等待',2);
                this.sleep(13000);    //再等13秒
                return true;
            }
            if(idContains(package).exists()){
                return true;
            }
        }

    var execTrys = 3;
    while(execTrys-- > 0){
        try{
            this.home();
            var ttls = ',';
            var isrepeat = false;
            var appicon = null;
            while(appicon == null && !isrepeat){
                var ttl = '';
                // 所有的APP图标
                var tt = className("TextView").visibleToUser().find();
                func.sleep(100);
                tt = className("TextView").visibleToUser().find();
                for(var i = 0; i < tt.length; i++){
                    var child = tt[i];
                    var b = child.bounds();
                    if (b.width() > 0 && appicon == null){
                        let txt = child.text();
                        if (txt == '' && child.desc())
                        txt = child.desc().toString().split(' ')[0].trim();

                        if (txt == packname){
                            appicon = child;
                            break;
                        }
                        else{
                            ttl += txt;
                        }
                    }
                }
                if (!appicon){   //这屏没有找到，判断是否有重复
                    if (ttls.indexOf(ttl) >= 0){
                        isrepeat = true;
                    }
                    else{
                        ttls += ttl + ',';  //把本屏的内容加入，用来判断是否重复屏了

                        setScreenMetrics(1080,1920);
                        if (func.isAndroid7)
                            swipe(800, 500, 110, 510,100);
                        else
                            Swipe(800, 500, 110, 510,100);
                        setScreenMetrics(device.width,device.height);
                        this.sleep(1500);        
                    }
                }
            } 

            if (appicon){
                this.clickObject(appicon, 0, device.height * -0.052);
                //this.toast(packname + "打开等待中")
                millsec = Number(millsec) || 15000;
                var sec = parseInt(millsec / 1000);
                this.sleepWithTip(packname + '启动中',sec,condition)
                //this.sleep(millsec);    //打开等待
                //if (package) waitForPackage(package);
                execTrys = 0;
                return true;
            }
            else{
                if (execTrys <= 0){    //重试了三次
                    func.toast('没有找到' + packname + '，再试一次',2);
                    // return false;
                    break
                }
                else{
                    func.toast('没有找到' + packname + '，再试一次',2);
                }
            }
        }
        catch(e){
           log(e.message + e.stack)
            if (execTrys <= 0){    //重试了三次
                func.toast('没有找到' + packname + '，再试一次',2);
                // return false; 
                break
            }
            else{
                func.toast('没有找到' + packname + '，再试一次',2);
            }
        }
    }
    //}
}

var forcestop=function(appname,st,isclearcache){
   toastLog("强制关闭应用:"+appname); 
    if(!appname){ return false}
    if(!getPackageName(appname)){ toastLog(appname+"：没有安装");return false};   
     let st=st||1800;  
      let isclearcache=isclearcache||true
      let apppkg=app.getPackageName(appname);  
      if(apppkg){
        forcestoppkg(apppkg,st,isclearcache,false)
      }
}

var forcestoppkg=function(apppkg,st,isclearcache,isnewtask){
    toastLog("强制停止："+apppkg)
    if(enableshizuku()){
        return shizukuforcestopPkg(apppkg)
    }
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

function maytextclick(maytext,t,left,top,right,bottom){
    if(!maytext){  return  false; }
    t=t || 200
    left = left || 0;
    top = top || 0;
    right = right || device.width;
    bottom = bottom || device.height;
    var f=text(maytext).boundsInside(left, top, right, bottom).visibleToUser().findOne(t);
    if(!f){
         f=textContains(maytext).boundsInside(left, top, right, bottom).visibleToUser().findOne(t)
         if(!f){
             return false
         }
    }
    return clicknode(f)
}
var  clearappcache=function(appname,apppkg,fromforcestop){
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
  
  var clickonemaytexts=function(texts,t,st){
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
  
var keepappisnewer=function(name,pkg){
    try {
        var appinfo=getAppInfobyAppNameAndPkg(name,pkg)
        if(appinfo){
            let appversioncode=AppUtils.getAppVersionCode(pkg)
            log(name+":"+appversioncode+"--最新:"+appinfo.appDetail.versionCode)
            if(appversioncode!=-1){
                if(appversioncode<appinfo.appDetail.versionCode){
                    systemdownload(name+"-"+appinfo.appDetail.versionCode,appinfo.appDetail.apkUrl,true);  
                }
            }
        }
    } catch (error) {
        log("keepappisnewer"+"--"+name+":"+error)
    }
}


var downloadandinstallapp=function(appname,apppkg){
    let appinfo=getAppInfobyAppNameAndPkg(appname,apppkg)
     if(appinfo){log("应用详情：获取成功");
     systemdownload(appname+"-"+appinfo.appDetail.versionCode,appinfo.appDetail.apkUrl,true);   
  }
 }

//
function httpget(url) {var r = http.get(url);
    if (r.statusCode == 200)
     { return r.body.string(); 
    } else { toastLog("五秒后重试");
    sleep(5000);  return "";}  
}

var  creatgfloatywindow=function(){
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

var  floatyshow=function(txt,txtcolor){ 
    try {
       txt= scriptruntime()+"秒："+txt
        log(txt);
         if(!isshowfloaty){ toast(txt); return  };
        if(!gfw){ creatgfloatywindow(); }else{
            ui.run(function(){ 
                gfw.text.setText(txt);
            })
        }
    } catch (error) {
        log(error)
    }
}

function systemdownload(filename,fileuri,isinstall){
    let isinstall = isinstall || true
    importClass(android.os.Environment);
    importClass(android.net.Uri);
    importClass(android.app.DownloadManager);
let uri = fileuri;
let request = new DownloadManager.Request(Uri.parse(uri));
//指定下载目录与文件名
request.setDestinationInExternalPublicDir("/download/", filename);
//指定在WIFI状态下，执行下载操作。
//request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI);
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
request.setMimeType("application/vnd.android.package-archive");//apk类型
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
    log("下载进度:"+Math.ceil(bytes_downloaded/totalSize*100)+"%");
    //下载状态
    let status = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS));
    if (status == DownloadManager.STATUS_SUCCESSFUL){
       
        if(isinstall){
            toastLog("下载已完成开始安装");
            install_app(files.getSdcardPath()+"/download/"+filename,filename)
        }else{
            toastLog("下载已完成");
        }
        clearInterval(st);//取消定时器
    
     }
}, 1500);

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
                      floatyshow(name.substr(0,6) + ":下载进度-"+progress);
                              // w.progressNum.setText(progress);
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
       toastLog(name+'下载完成');
       if(isinstall){
            install_app(filePath,name)
        }
    } catch (error) {
        log("下载失败:"+error)
    }
}


function install_app(filePath, name,maxtime,isopen,delect) {
    isinstalling=true
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
   else if(device.brand=="OPPO"){        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]    }
   else{        clickarray=["继续","始终允许","允许","安装","继续安装","下一步","设置"]    }
   doactionmaxtime(function(){
        // is_first = textMatches(/(始.*|.*终.*|.*允.*|.*许)/).findOne(1000);
           toastLog("检测"+name+"安装中....")
           if(textclick("允许此来源")){ back(); sleep(2000) ; }
           clicktexts(["设置","允许"],300,1500)
            clicktexts(clickarray,300,1200,0,device.height*2/3)
            if(text("允许此来源").exists()){ if(idclick("android:id/switch_widget")){descclick("向上导航"); }
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
            toast("安全保护")
            sleep(500)
            // var 坐标 = is_button.bounds()
            // click(坐标.left + 5, 坐标.bottom - 2)
            while (true) {
                idclick("security_install_protection_switch")
                sleep(500)
                is_first = id("security_install_protection_switch").findOne(500)
                if (!is_first.checked()) {
                  //  show("已取消保护")
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
                isinstalling=false;
               return true  
            }
           
           }
       //系统可以获取到app 的包名的时候就
       if(name){
           if(app.getPackageName(name)){  
               log("系统可以获取到:"+name)
               sleep(1000); 
               isinstalling=false;
            return true
            }
       }
      
    },maxtime)
    back()
    sleep(300)
    back()
    isinstalling=false;
    return false
}


function descclick(desctext,t,left,top,right,bottom){
    t= t|| 200;
    left = left || 0;
    top = top || 0;
    right = right || device.width;
    bottom = bottom || device.height;
    var f=desc(desctext).boundsInside(left, top, right, bottom).visibleToUser().findOne(t); //.visibleToUser()
    if(!f){ 
        f=text(desctext).boundsInside(left, top, right, bottom).visibleToUser().findOne(t); //.visibleToUser()
        if(!f){ return f}  
    }
    return clicknode(f)
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

var nowdate=function(){return new Date()};
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
    if(!action){return false}
    maxnumber=maxnumber||1; n_doaction=0;
    while(n_doaction<maxnumber){ if (action(n_doaction)){return true }; n_doaction=n_doaction+1; }
    return false
}

//执行函数 
var doactionnumberontime=function(action,maxnumber,maxtime,intertime){
    if(!action){return false}
    maxnumber=maxnumber||1; n_doaction=0;
    maxtime=maxtime||10000
    intertime=intertime||1000
    stime=nowdate().getTime()
    while(n_doaction<maxnumber){ if(action(n_doaction)){return true }; n_doaction=n_doaction+1;if(nowdate().getTime()-stime>maxtime){return true}; sleep(intertime);}
    return false
}


/*文本只要存在一个就返回真 */
var textoneexist=function(texts){
    if(texts.length>0){for(i=0;i<texts.length;i++){ if(text(texts[i]).visibleToUser().exists()){  return true }  } }
   return false
}
//文本点击
function textclick(txt,t,left,top,right,bottom){
    t=t || 200
    left = left || 0;
    top = top || 0;
    right = right|| device.width;
    bottom = bottom || device.height;
    var f=text(txt).boundsInside(left, top, right, bottom).visibleToUser().findOne(t);
    if(!f){
        log("text："+txt+":没找到了")
        f=desc(txt).boundsInside(left, top, right, bottom).visibleToUser().findOne(t);
        if(!f){
            return false
        }
    }
    log("text："+txt+":找到了")
    return clicknode(f)
}

//node 执行点击 
var clicknode=function(v,dx,dy,time,clicknumber,intervaltime){
    dx=dx||0
    dy=dy||0
    clicknumber=clicknumber||1
    intervaltime=intervaltime||500
    if(!v){return false; }
    time=time||200
    if(enablegenius){
        b=v.bounds()
        if(b.centerX()>0&&b.centerY()>0){
            log("点击中心位置"+b.centerX()+"--"+b.centerY())
            for(let n=0;n<clicknumber;n++){
                click(b.centerX()+dx,b.centerY()+dy)
                sleep(intervaltime)
            }
            return true
        }else{
           if(b.top>0&&b.b.left>0){
            log("点击控件左上角")
            for(let n=0;n<clicknumber;n++){
               click(b.left+dx,b.top+dy+dy)
                sleep(intervaltime)
            }
            return true
           }
           if(b.right<device.width&&b.bottom<device.height&&b.bottom>0&&b.right>0){
            log("点击控件右下角"+(b.right)+","+(b.bottom))
            for(let n=0;n<clicknumber;n++){
                click(b.right+dx,b.bottom+dy)
                sleep(intervaltime)
            }
            return true
           }
           return false
        }
     }else{
      //  toastLog("不可以手势点击")
       // v.click()
     }
         r=v.bounds()
          var w = boundsInside(r.left, r.top, r.right, r.bottom).clickable().findOne(time)
          if(w&&w.click()){ return true;}
          if(clickparents(v)){ return true }
          if(clickchilds(v)){  return true}
}

//一直找到可以点击控件向上查找
var clickparents=function(v,n){
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
var clickchilds=function(v){
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

func.checkapp = function(appname,package){
    //log('currentPackage=' + currentPackage().toLowerCase())
    //log('package=' + package.toLowerCase())
    func.toast('当前Pak=' + currentPackage() + "，目的Pak=" + package);
    if (currentPackage().toLowerCase() != package.toLowerCase() ){
        this.home();
        this.clear();
        this.sleep(2000);

        this.execApp(appname,package);
    }
}


func.restart = function(appname,package){
    try{
        if (!this.isAndroid7){
            this.quit(package); //安卓6以下，做一次强制关闭
        }
        this.home();
        this.clear();
        this.sleep(2000);
        this.execApp(appname,package);
    }
    catch(e){
        this.log("函数",'重启APP',e.message + '\n\r' + e.stack);
    }
}


func.openWaiting = function(activities){
    var activities = activities || ['.FrameLayout','.SplashActivity'];
    if (activities.length  <= 0)    return;
    var lops = 6;
    while(lops-- > 0){
        var condition = false;
        for(var i = 0;i < activities.length; i++){
            condition = condition || currentActivity().indexOf(activities[i]) > 0;
        }
        
        if (condition)
            this.sleep(3000);
        else
            break;
    }
}

func.loadConfig = function(keyname){
    var txt = this.loadConfigText(keyname);
    var cfg = {};
    if (txt){
        try{
            //if (this.isLog()) func.toast('加载的配置文件为：' + txt);
            cfg = JSON.parse(txt);
        }
        catch(e){
            this.log("函数",'加载配置文件',e.message + '\n\r' + e.stack);
        }
    }
    return cfg;
}

func.loadConfigText = function(keyname){
    var storage = storages.create("com.kildare.autor");
    var txt = storage.get(keyname,'');
    return txt;
}

func.saveConfig = function(appname,text){
    var storage = storages.create("com.kildare.autor");
    //console.log(appname + '保存配置：' + text);
    storage.put(appname,text);
    //console.log('保存配置文件');
}

var mytst = null;
function myToast(msg) {
    if (func.isAndroid7){
        ui.run(() => {
            if (mytst)
                mytst.cancel();
            mytst = Toast.makeText(context, msg, Toast.LENGTH_SHORT);
            mytst.show();
        });
    }
    else{
        toast(msg);
    }
}

func.toast = function(text,type){
    try{
        switch(type){
            case 1:
                myToast(text);
                break;
            case 2:
                myToast(text);
                if (this.isLog())  //调试模式，显示console.log
                    log(device.model +':' + text);
                break;
            default:
                if (this.isLog()) 
                    log(device.model +':' + text);
        }
    }
    catch(e){
        this.log("TOAST",'TOAST',e.message + '\n\r' + e.stack);
    }
}

func.quit = function(package){
    try{
        //内存存储
        if (package){
            log('开始删除存储')
            var internalCache = String(context.getCacheDir()).replace(/\/[a-z]*\.[a-z]*[\.a-z]*\//gi,'/' + package + '/');
            this.deleteFilesByDirectory(internalCache)

            if (android.os.Environment.getExternalStorageState().equals(android.os.Environment.MEDIA_MOUNTED)) {
                //外部存储
                var externalCache = String(context.getExternalCacheDir()).replace(/\/[a-z]*\.[a-z]*[\.a-z]*\//gi,'/' + package + '/');
                this.deleteFilesByDirectory(externalCache);
                externalCache = externalCache.replace('/cache','/files');
                this.deleteFilesByDirectory(externalCache);
            }
            
            //其它文件
            var otherFiles = String(context.getFilesDir()).replace(/\/[a-z]*\.[a-z]*[\.a-z]*\//gi,'/' + package + '/');
            this.deleteFilesByDirectory(otherFiles)
            var sharedPreference = "/data/data/" + package + "/shared_prefs";
            this.deleteFilesByDirectory(sharedPreference)
        }
    }
    catch(e){
        this.log("退出",'删除存储',e.message + '\n\r' + e.stack);
    }

    if (this.isAndroid7){
        for (var i =0; i < 6; i++){
            this.back()
            this.sleep(200)
        }
    }
    else{
        if (package){
            shell("am force-stop " + package, true);
            func.sleep(2000);
        }
    }
}

func.sleepWithTip = function(txt,waitsec,brk){
    while(waitsec > 0){
        if (this.isAndroid7){
            if (waitsec > 0)
                func.toast(txt + waitsec + '秒',1);
        }
        else{
            if (waitsec % 3 == 0)
                func.toast(txt + waitsec + '秒',1);
        }
        this.sleep(1000);
        waitsec--;
        if (brk != ''){
            if (eval(brk)){
                break;
            }
        }
    }
}

func.videoSleep = function(waitsec){
    while(waitsec > 0){
        if (this.isAndroid7){
            if (waitsec > 0)
                func.toast('视频播放时间剩余' + waitsec + '秒',1);
        }
        else{
            if (waitsec % 3 == 0)
                func.toast('视频播放时间剩余' + waitsec + '秒',1);
        }
        this.sleep(1000);
        waitsec--;
    }
}

func.show = function(obj){
    try{
        if (obj){
            var b = obj.bounds();
            var r = [];
            r.push(device.model +':Title=' + obj.text())
            r.push('Depth=' + obj.depth());
            r.push('ID=' + obj.id())
            r.push('Classname=' + obj.className())
            r.push('Top=' + b.top);
            r.push('Bottom=' + b.bottom);
            r.push('Width=' + b.width());
            r.push('Height=' + b.height());
            r.push('Right=' + b.right);
            r.push('Left=' + b.left);
            r.push('Desc=' + obj.desc());
            r.push('Center:(' + b.centerX() + ',' + b.centerY() + ')');
            if (obj.parent()) r.push('Children.length=' + obj.parent().childCount());
            log(r.join('\r\n'));
        }
        else
            log('无效对象')
    }
    catch(e){log(e.message)}
}

func.clear = function(){
    try{
        recents();
        this.sleep(2000);
        var o = id('clearAnimView').findOnce() || id('memoryAndClearContainer').findOnce() || id('clear_all_recents_image_button').findOnce() || id('cover_image_linear').findOnce() || id('recents_clear_button').findOnce() || id('progress_circle_view').findOnce(); //小米、华为、联想
        if (o){
            this.clickObject(o);
            this.sleep(1000)
        }
        else{
            var p = func.loadConfig('my_clear_location');
            log(p)
            if (p.x && p.y){
                try{
                    click(p.x,p.y);
                }
                catch(e){
                    this.back();
                    this.sleep(2000);
                }
            }
            else{
                this.back();
                this.sleep(2000);
            }
        }        
    }
    catch(e){
        this.log("函数",'清理',e.message + '\n\r' + e.stack);
    }
}


func.sleep = function(ms,txt,brk){

    txt = txt || '';
    if (txt){
        this.sleepWithTip(txt,parseInt(ms / 1000),brk);
        return;
    }

    for(var i = 0; i < 3; i++){ //重试三次
        try{
            sleep(ms);
            i = 4;
            break;
        }
        catch(e){
            //this.log("sleep","sleep出错",e.message + '\n\r' + e.stack);
        }
    }
}

func.back = function(){
    if (this.isAndroid7)
        back(); //Back
    else
        Back();
}

func.home = function(){
    for(var i = 0; i < 5; i++){
        if (this.isAndroid7)
            home();
        else
            Home()
        this.sleep(500);
    }
}


func.swipe = function(x1,y1,x2,y2,duration){
    //通用上拉代码
    //func.swipe(random(x - 100,x + 100),random(device.height-450,device.height-400), random(x - 100,x + 100), random(50,100),500);
    for(var i = 0; i < 3; i++){ //重试三次
        try{
            if (this.isAndroid7)
                swipe(x1,y1,x2,y2,duration);    
            else
                Swipe(x1,y1,x2,y2,duration);  
            i = 4;
            break;
        }
        catch(e){
            this.log("swipe",'swipe出错：', e.message + '\n\r' + e.stack);
        }
    }
    func.sleep(500);
}

func.swipeUp = function(x0,y0,p){
    try{
        setScreenMetrics(1080,1920);
        if (this.isAndroid7){
            x0 = Number(x0) || random(1080 - 300, 1080 - 150);
            y0 = Number(y0) || random(1920 * 0.7, 1920 * 0.8);
            p = Number(p) || random(500, 1000);
            var points = [p];  //滑屏时间
            var interval = 0.1;
            var a = random(180,250);    //滑屏高度
            for (var t = 0; t < Math.PI / 2; t += interval) {
            var x = x0 - a * (2.7 * Math.cos(t * 0.95) - Math.cos(2 * t * 0.95));
            var y = y0 - a * (5 * Math.sin(t * 0.9) - Math.sin(2 * t * 0.9));
            points.push([parseInt(x), parseInt(y)]);
            }
            gesture.apply(null, points);
        }
        else{
            var x = 1080 / 2;
            var y = 1920 / 2;
            this.swipe(random(x - 100,x + 100),random(1080-250,1080-350), random(x - 100,x + 100), random(250,300),random(500,1000));
        }
        setScreenMetrics(device.width,device.height);
    }
    catch(e){
        this.log('swipeup','swipeup',e.message + e.stack)
    }
    func.sleep(1000);
}

func.log = function(appname,type,text){
    if (!this.isLog()) return;
    var path = files.getSdcardPath() + '/脚本/';
    files.create(path)    
    var txt = appname + '\t' + type + '\t' + (new Date().toLocaleString()) + '\n\r';
    files.append(path + "log.txt",txt);
    files.append(path + "log.txt",text + '\n\r');
}

func.hasDialog = function(){
    if(isinstalling){
        return
    }
    if (currentActivity().toLowerCase().indexOf('installer') >= 0 || currentActivity().indexOf('app.AlertDialog') > 0){ //弹出了安装界面
        var o = text('取消').findOnce();
        if(o){
            console.log("取消 1094")
            this.clickObject(o);
        }
        else
            this.back();
    }
    if (text('等待').exists() && text('确定').exists()){
        var o = text('确定').findOnce();
        this.clickObject(o);
    }
}


func.checkSpace = function(){
    if(textStartsWith('存储空间').exists() && text('取消').exists()){
        var o = text('取消').findOnce();
        if (o){
            console.log("取消 1110")
            this.clickObject(o);
            this.sleep(1000);
        }
        
        if (this.release >= 7){
            var intent = new Intent();
            intent.setAction("android.settings.INTERNAL_STORAGE_SETTINGS"); //MEMORY_CARD_SETTINGS
            app.startActivity(intent);
            this.sleep(3000);
           
            var o = text('缓存数据').findOnce();    //小米
            if(o){
                this.clickObject(o);
                this.sleep(1000);
                if (text('取消').exists() && text('确定').exists()){

                    var o = text('确定').findOnce();
                    func.clickObject(o);
                    this.sleep(10000);
                }
            }  

            this.swipeUp()
            var o = text('垃圾清理').find();    //小米
            if(o.length > 0){
                this.clickObject(o[o.length-1]);
                this.sleep(3000);
                var iii = 10;
                while(iii-- > 0){
                    if (textStartsWith('清理选中垃圾').exists()){
                        var o = textStartsWith('清理选中垃圾').findOnce();
                        this.clickObject(o)
                        this.sleep(5000);
                        this.back();
                        break;
                    }
                    else
                    this.sleep(5000);
                }
            }             
        }
        else{
            app.startActivity({ 
                action: "android.settings.INTERNAL_STORAGE_SETTINGS",
                root:true
            });
            this.sleep(8000);
            var o = text('缓存数据').findOnce();    //小米
            if(o){
                this.clickObject(o);
                this.sleep(1000);
                if (text('取消').exists() && text('确定').exists()){
                    console.log("取消 1163")
                    var o = text('确定').findOnce();
                    func.clickObject(o);
                    this.sleep(10000);
                }
            }               
        }
        this.back();
    }
}


/**
 * 下载器，可监听下载进度
 *
 * @param {*} url 下载链接
 * @param {*} path 保存地址
 * @param {*} listener 下载监听
 */
func.DownloadUtil = function(url, path, listener) {
    const _path = path,
            _listener = listener,
            _client = new OkHttpClient(),
            _request = new Request.Builder().url(url).get().build();

    let _sum = 0;
        _len = -1;
        _file = new File(_path),
        _total_bytes = null,
        _input_stream = null,
        _file_output_stream = new FileOutputStream(_file),
        _buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 2048);

    return {
        download: function() {
            _client.newCall(_request).enqueue(new Callback({
                onFailure: function(call, err) {
                    throw new Error(err);
                },
                onResponse: function(call, res) {
                    try {
                        _input_stream = res.body().byteStream();
                        _total_bytes = res.body().contentLength();
                        while ((_len = _input_stream.read(_buffer)) != -1) {
                            _file_output_stream.write(_buffer, 0, _len);
                            _listener.onDownloading((_sum += _len) / _total_bytes * 100);
                        }
                        _file_output_stream.flush();
                        _listener.onDownloadSuccess(_file);
                    } catch (err) {
                        _listener.onDownloadFailed(err);
                    } finally {
                        try {
                            if (_input_stream != null)
                                _input_stream.close();
                        } catch (err) {
                            throw new Error(err);
                        }
                    }
                }
            }));
        }
    }
}


/*
* 获取指定应用的版本号
* @param {string} packageName 应用包名
*/
func.getPackageVersion = function(packageName) {
    importPackage(android.content);
    var pckMan = context.getPackageManager();
    var packageInfo = pckMan.getPackageInfo(packageName, 0);
    return packageInfo.versionName;
}



func.wechatCfg = function(){
    var app = '微信'
    var cfg = func.loadConfig(app);
    var isFeed = Number(cfg.isFeed) || 0;
    var lastTimelineDate = cfg.lastTimelineDate || '';
    if (lastTimelineDate == ''){
        var sec = random(2 * 60 * 60, 4 * 60 * 60);
        lastTimelineDate = Date.now() + sec * 1000;    //下次发圈时间
        cfg.lastTimelineDate = lastTimelineDate;
        this.toast('预计下次转发朋友圈时间为' + new Date(lastTimelineDate),2);
        this.saveConfig(app,JSON.stringify(cfg));  
    }
    
    return {
        'isFeed':isFeed,
        'lastTimelineDate':lastTimelineDate
    }
}

func.isSendTimeline = function(isFeed,lastTimelineDate){
    if (isFeed == 1){   //设置了要养号
        if (lastTimelineDate < Date.now()){    //发圈时间到了
            var td = new Date();
            if (td.getHours() >= 8 && td.getHours() <= 22){ //发圈只允许在每天的8-22时之间进行   
                func.toast('已到有效发朋友圈时间，要开始发朋友圈');
                return true;
            }
            else{//不是有效的养号时间，修改养号时间
                func.toast('发朋友圈时间在8-22时之间');
                return false;
            }
        }
        else{   //养号时间没到
            return false;
        }
    }
    else
        return false;
}

func.doConcern = function(collector,maxGz,maxDz){
    try{
        //关注
        if (collector && collector.exists()){
            maxGz = Number(maxGz) || 0;
            if (maxGz < 50) maxGz = 50;
            if (random(1,maxGz) == 10){
                var o = collector.findOnce();
                this.clickObject(o);
                func.sleep(500)
            }
        }
        //点赞
        maxDz = Number(maxDz) || 0;
        if (maxDz < 20) maxDz = 20;
        if (random(1,maxDz) == 10){
            click(device.width / 2,device.height / 2 - 100);
            this.sleep(40);
            click(device.width / 2,device.height / 2 - 100);
            func.sleep(200)
        }
    }
    catch(e){}
}

func.networkInfo = function (){
    importClass(android.net.ConnectivityManager);
    var mConnectivityManager = context.getSystemService(context.CONNECTIVITY_SERVICE);
    netInfo = mConnectivityManager.getActiveNetworkInfo();
    if (netInfo != null && netInfo.isAvailable()) {
        /////////////网络连接
        var name = netInfo.getTypeName();
        if (netInfo.getType() == ConnectivityManager.TYPE_WIFI) {
            /////WiFi网络
            return "WIFI"
        } else if (netInfo.getType() == ConnectivityManager.TYPE_ETHERNET) {
            /////有线网络
            return "有线"

        } else if (netInfo.getType() == ConnectivityManager.TYPE_MOBILE) {
            /////////3g网络
            return "移动"

        }
        else{
            return "未知"
        }
    } else {
        ////////网络断开
        return "断开"
    }
  }

func.deleteFilesByDirectory = function(directory) {
    if (directory != null && files.exists(directory) && files.isDir(directory)) {
        var allfiles = files.listDir(directory);
        for(var i = 0; i < allfiles.length; i++){
            log('删除结果：' + files.removeDir(directory + '/' + allfiles[i]));
        }
    }
}

func.md5 = function(str){
    let md5 = java.security.MessageDigest.getInstance("MD5");
    let hex = [];
    md5.update(java.lang.String(str).getBytes());
    md5.digest().forEach((byte) => {
        let temp = (0xFF & byte).toString(16);
        while (temp.length < 2) temp = "0" + temp;
        hex.push(temp);
    });
    return hex.join("");
}

func.encrypt = function(data,base){
    try{
        var ddd = new Date();
        var s = String(ddd.getFullYear());
        var m = String(ddd.getMonth() + 1);
        s += (m.length == 1 ? '0' + m : m);
        var d = String(ddd.getDate());
        s += (d.length == 1 ? '0' + d : d);
        s += '!';
        var key1 = this.md5(base);
        var key2 = this.md5('puMmY' + key1.toUpperCase() + '^()^');
        var iv1 = key1.substring(0,7) + s;
        var iv = new IvParameterSpec(new java.lang.String(iv1).getBytes("UTF-8"))
        var keystr = new java.lang.String(key2);
        var key = new SecretKeySpec(new java.lang.String(keystr).getBytes('UTF-8'), "AES");
        var cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, key, iv);
        var jsbyte = new java.lang.String(data).getBytes("UTF-8")
        var clearbyte = cipher.doFinal(jsbyte);
        return android.util.Base64.encodeToString(clearbyte, 0);    //new java.lang.String(clearbyte);
    }
    catch(e){
        return "";
    }
}

func.decrypt = function(data,base){
    try{
        var ddd = new Date();
        var s = String(ddd.getFullYear());
        var m = String(ddd.getMonth() + 1);
        s += (m.length == 1 ? '0' + m : m);
        var d = String(ddd.getDate());
        s += (d.length == 1 ? '0' + d : d);
        s += '!';
        var key1 = this.md5(base);
        var key2 = this.md5('Happy' + key1.toUpperCase() + '^()^');
        var iv1 = key1.substring(0,7) + s;
        var iv = new IvParameterSpec(new java.lang.String(iv1).getBytes("UTF-8"))
        var keystr = new java.lang.String(key2);
        var key = new SecretKeySpec(new java.lang.String(keystr).getBytes('UTF-8'), "AES");
        var cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, key, iv);
        var jsbyte = android.util.Base64.decode(data, 0)
        var clearbyte = cipher.doFinal(jsbyte);
        return new java.lang.String(clearbyte);
    }
    catch(e){
        return "{}";
    }
}


func.exitOnKeyDown = function(){
    var observeKey = Number(this.loadConfigText('observeKey')) || 0
    if (observeKey == 1){
        log('注册kedown')
        events.observeKey();

        events.onKeyDown("volume_down", ()=>{ 
            //在这里停止任务
            log('keydown')
            if (win.id_start_bg.attr("src") == '#ee534f'){
                return false;
            }
            working = false;
            log('working=' + working)
            taskThread = threads.start(function () {
                device.cancelKeepingAwake();    //消屏幕常亮
                ui.run(function(){
                    device.vibrate(300)
                    win.id_start_bg.attr("src", '#ee534f');
                    win.id_stop_bg.attr("src", '#bfc1c0');
                });
                win_1.logo.attr("alpha", (working ? "1" : "0.6"));//悬浮按钮隐藏
                win_1.logo.setVisibility(android.view.View.VISIBLE);
                win_2.logo.setVisibility(android.view.View.VISIBLE);
                func.toast('结束脚本运行',2)
                threads.shutDownAll();
                img_down();
            });
        });
    }
}


func.getCode = function(username,password,img) {
    http.__okhttp__.setTimeout(3e4);
    var r = images.toBase64(img, format = "png"), i = device.release, c = device.model, s = device.buildId;
    try {
        var n = http.postJson("https://v2-api.jsdama.com/upload", {
            softwareId: 3797,
            softwareSecret: "cp1dIX7DwHuDXkDKWAT0k7Pxx781U0fi8H777TPP",
            username: 'kildare',
            password: 'kildare43,',
            captchaData: r,
            captchaType: 1318,
            captchaMinLength: 0,
            captchaMaxLength: 0,
            workerTipsId: 0
        }, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android " + i + "; " + c + " Build/" + s + "; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 Mobile Safari/537.36",
            }
        });
    } catch (e) {
        return {
            code: "-1",
            msg: "网络链接超时...",
            data: {}
        };
    }
    var d = n.body.json(), p = d.code, m = d.message;
    if ("10079009" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10142006" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10142004" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10142005" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10079006" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("0" == p) {
        return {
            code: p,
            msg: m,
            data: {
                res: d.data.recognition
            }
        };
    }
    return d;
}

// 系统是否ROOT
function isRoot() {
    var r = shell("ls /system/bin", true).result.toString()
    if (r.length > 50) {
        return true
    } else {
        return false
    }
}
// const appname = '集好视频';
// const package = 'com.ztzj.jhsp';
// func.execApp(appname,package)
module.exports = func;