var 数据库= storages.create("hongshuyuedu");
var date=new Date()
var starttime=date.getTime()
var rewardapplisturl="https://gitee.com/zhangshu345012/sample/raw/v1/config/rewardapplist.json"  //奖励app 运行的配置文件的路径
var today=function(){
    return date.getFullYear()+"_"+date.getMonth()+"_"+date.getDate()
}
var gfw=floaty.rawWindow(
    <text id="text" w="*" h="*" gravity="center" textSize="18sp" background="#55ffff00">提醒</text>
);
gfw.setSize(device.width0, 120)
gfw.setTouchable(false)
gfw.setSize(1, 1)
gfw.setPosition(0,85)

var show=function(txt){
    ui.run(function(){
       console.log(txt)
       gfw.text.setText(txt)
    })
}
var alter=sync(function(txt,t,left,top,width,height){
    var issleep=false
    t=t||1200
    left= left ||device.width/20
    top =top || device.height/20
    width =width|| device.height/20*19
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
    fw.setAdjustEnabled(true)
    fw.setTouchable(false)
    fw.setSize(1, 1)
    fw.setPosition(50,85)
      ui.run(function(){
         console.log(txt)
        fw.text.setText(txt)
        fw.setSize(device.width-100, 120)
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

function httpget(url) {
        var r = http.get(url);
        // log("code = " + r.statusCode);
        if (r.statusCode == 200) {
            return r.body.string()
        } else {
            return ""
        }
  }

var 强制关闭应用=function(appname,st){
    if(!getPackageName(appname)){
        show(appname+"：没有安装")
        return 
    }
    show("强制关闭应用:"+appname)
  st=st||10000
  var packagename=app.getPackageName(appname)
  app.openAppSetting(packagename)
  var closetexts= ["强制停止","停止运行","强制关闭","强行停止","结束运行","确定"]
  var i=0
  while(i<4){
    closetexts.forEach(t=>{
        if(textclick(t)){
            i=i+1
            alter("成功点击关闭："+i)
        }
    })
  }
}

function idclick(id,t,left,top,right,bottom){
    t= t|| 500
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=id(id).boundsInside(left, top, right, bottom).findOne(t);
    if(f){
        if(!f.click()){
            b=f.bounds()
            bc=click(b.centerX(),b.centerY())
            if(bc){
                alter("id："+id+"----点位成功点击")
                return true
            }else{
                alter("id："+id+"----点位失败点击")
                return false
            }
           
        }else{
            alter("id："+id+"----控件点击成功")
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
              r=click(b.centerX(),b.centerY())
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
    alter(left, top, right, bottom);
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
var sleepr=function(short,long){
    rt=random(short,long)
    alter("等待:"+rt +" 毫秒")
    sleep(rt)
}
function 滑动(z,x1,y1,x2,y2,t,r) {
    var w = device.width/z;
    var h = device.height/z;
    r=r||1000
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
var firstrunapp=function(appname){
    importClass(com.hongshu.utils.AppUtils);
    packagename=app.getPackageName(appname)
    app.launchPackage(packagename)
    允许启动文字=['允许',"确定","始终允许","打开"]
    while(i<5){
        a=AppUtils.isAppForeground(packagename)
        if(a){
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
    if(i>=4){
        return false
    }
    return true
}

var firstrunapppackage=function(packagename){
    importClass(com.hongshu.utils.AppUtils);
    允许启动文字=['允许',"始终允许","打开","确定"]
    i=0
    while(i<5){
        a=AppUtils.isAppForeground(packagename)
        if(a){
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
    if(i>=4){
        return false
    }
    return true
}

//下载app
function downloadApk(name,url) {
    // console.log('下载的名字是'+name);
      // 获取APP的名字
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
     // log(connLength);
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
     install_app(filePath,name)
     
 }
 function install_app(filePath, name) {
     ////--------------安装--------------////
     //  读取 apk
     app.viewFile(filePath)
     clickarray=["继续","始终允许","允许","安装","继续安装","下一步"]
    // installappwithfilepath(filePath)
     for (let i = 0; i < 100; i++) {
         // is_first = textMatches(/(始.*|.*终.*|.*允.*|.*许)/).findOne(1000);
         toast("检测中....")
           clicktexts(clickarray)
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
     var appconfigs=httpget(rewardapplisturl)
       var apps=JSON.parse(appconfigs)
     /*
     [{"name":"快手极速版","open":true,"install":true,"wx":true,"zfb":true,"phone":false,"permoney":0.7,"tag":["赚钱","视频","快手"],"level":0,"coin":100,"root":false,"desc":"脚本描述","package":"com.kuaishou.nebula","bmobid":"q7B36667","scripturl":"","money":1.0,"onetime":1800,"maxtime":10800,"version":100,"appversion":0,"icon":"","downloadurl":"https://95c955397282082ce6a6f5ea1f576c4b.dd.cdntips.com/imtt.dd.qq.com/16891/apk/4CE630CC2B9657E4523492FDDDA98C24.apk?mkey=5e43f056764dc5cf&f=0c59&fsname=com.kuaishou.nebula_2.0.3.177_177.apk&csr=1bbd&proto=https"},
{"name":"刷宝短视频","open":true,"install":true,"wx":true,"zfb":true,"phone":false,"permoney":0.7,"tag":["赚钱","视频","刷宝"],"level":0,"coin":100,"root":false,"desc":"脚本描述","package":"com.jm.video","bmobid":"waVs777U","scripturl":"","money":1.0,"onetime":1800,"maxtime":10800,"version":100,"appversion":0,"icon":"","downloadurl":"https://213d4f42b3957cb9ebeb02ad91be865d.dd.cdntips.com/imtt.dd.qq.com/16891/apk/73BDFF685D5E50F887C4972A73D6AD74.apk?mkey=5e43f1d1764dc5cf&f=24c5&fsname=com.jm.video_1.950_1950.apk&csr=1bbd&proto=https"},
{"name":"微信","open":false,"install":true,"wx":true,"zfb":true,"phone":false,"permoney":0.7,"tag":["养号","营销","微信"],"level":0,"coin":100,"root":false,"desc":"脚本描述","package":"","bmobid":"","scripturl":"","money":1.0,"onetime":0,"maxtime":0,"version":0,"appversion":0,"icon":"","downloadurl":"https://dldir1.qq.com/weixin/android/weixin7010android1580.apk"}
]*/
     
     apps.forEach(app => {
         alter("name:"+app.name+"package:"+app.package)
         if(getPackageName(app.name)){
     
         }else{
             alter("检测到本机没有安装应用："+app.name+"即将自动下载并安装")
             downloadApk(app.name,app.downloadurl)
         }
     })
  }

 //根据app名下载并安装应用
 var downloadandinstallapp=function(name){
    
    var appconfiglist=httpget(rewardapplisturl)
   
    var apps=JSON.parse(appconfiglist)
     /*
     [{"name":"快手极速版","open":true,"install":true,"wx":true,"zfb":true,"phone":false,"permoney":0.7,"tag":["赚钱","视频","快手"],"level":0,"coin":100,"root":false,"desc":"脚本描述","package":"com.kuaishou.nebula","bmobid":"q7B36667","scripturl":"","money":1.0,"onetime":1800,"maxtime":10800,"version":100,"appversion":0,"icon":"","downloadurl":"https://95c955397282082ce6a6f5ea1f576c4b.dd.cdntips.com/imtt.dd.qq.com/16891/apk/4CE630CC2B9657E4523492FDDDA98C24.apk?mkey=5e43f056764dc5cf&f=0c59&fsname=com.kuaishou.nebula_2.0.3.177_177.apk&csr=1bbd&proto=https"},
{"name":"刷宝短视频","open":true,"install":true,"wx":true,"zfb":true,"phone":false,"permoney":0.7,"tag":["赚钱","视频","刷宝"],"level":0,"coin":100,"root":false,"desc":"脚本描述","package":"com.jm.video","bmobid":"waVs777U","scripturl":"","money":1.0,"onetime":1800,"maxtime":10800,"version":100,"appversion":0,"icon":"","downloadurl":"https://213d4f42b3957cb9ebeb02ad91be865d.dd.cdntips.com/imtt.dd.qq.com/16891/apk/73BDFF685D5E50F887C4972A73D6AD74.apk?mkey=5e43f1d1764dc5cf&f=24c5&fsname=com.jm.video_1.950_1950.apk&csr=1bbd&proto=https"},
{"name":"微信","open":false,"install":true,"wx":true,"zfb":true,"phone":false,"permoney":0.7,"tag":["养号","营销","微信"],"level":0,"coin":100,"root":false,"desc":"脚本描述","package":"","bmobid":"","scripturl":"","money":1.0,"onetime":0,"maxtime":0,"version":0,"appversion":0,"icon":"","downloadurl":"https://dldir1.qq.com/weixin/android/weixin7010android1580.apk"}
]*/
    var isok=false
       apps.forEach(app => {
          alter("name:"+app.name+"package:"+app.package)
             if(app.name==name){
                isok=true
                  if(getPackageName(app.name)){
    
                 }else{
            downloadApk(app.name,app.downloadurl)
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
               强制关闭应用(last.name)
           }
        stopOtherScript()
        if(!getPackageName(app.name)){
            if(app.downloadurl){
                downloadApk(app.name,app.downloadurl)
            }
        }
        if(app.bmobid&&getPackageName(app.name)){
            engines.execBmobScriptWithName(app.name,app.bmobid,{})
            last=app
            fw.setSize(1,0)
            sleep(app.onetime*1000)
            强制关闭应用(last.name)
        }
     
    })
}

