/*我的阅读集合  使用 配置直接从码云获取 配置文件
 */
//快手极速版自动刷金币  签到 和 滑块验证 引流 自动私信 评论 
auto.waitFor()
auto.setMode("normal")
/*---------------------------------lib-------------------------------*/
/*明明标准为 作者昵称 简称+app全拼 */
var apppackage="阅读集合"

var 数据库= storages.create("hongshuyuedujihe");

var date=new Date()
var today=function(){
    return date.getFullYear()+"_"+date.getMonth()+"_"+date.getDate()
}
var starttime=date.getTime()
var 滑动次数=0
var fw=floaty.window(
    <frame gravity="center">
    <text id="text" w="*" h="*" gravity="center" textSize="18sp" background="#55ffff00">悬浮文字</text>
    </frame>

);
fw.setAdjustEnabled(false)
fw.setSize(1, 1)
fw.setPosition(50,85)
var fwshow=false
var alter=sync(function(txt){

      ui.run(function(){
          console.log(txt)
        fw.text.setText(txt)
        fw.setSize(device.width-100, 120)
        fwshow=true
    //     setTimeout(()=>{
    //         fwshow=false
    //         fw.setSize(1,1)
    //     },1500)
    })
// }

});
var 今日签到=function(){
    cs=数据库.get(apppackage+"_"+today()+"_sign", false)
    alter("今日签到:"+cs)
    return cs
}
var 今日已签到=function(){
    
     数据库.put(apppackage+"_"+today()+"_sign", true)
     alter("今日已签到")
}
var 今日时长=function(){
    return 数据库.get(apppackage+"_"+today()+"_time", 0)
}
var 记录今日时长=function(t){
    数据库.put(apppackage+"_"+today()+"_time",今日时长()+t)
}

var 今日提现=function(){
    return 数据库.get(apppackage+"_"+today()+"_cashout",false)
}
var 今日已提现=function(){
    数据库.put(apppackage+"_"+today()+"_cashout",true)
    alter("今日已提现")
}
var 上次金币=function(){ 
    return    数据库.get(apppackage+"_"+today()+"_lastcoin", 0)
 } //可以通过上次的金币来判断是否 还可以获取金币
 var 上次余额=function(){ 
    return   数据库.get(apppackage+"_"+"lastmoney", 0.0)
 } //可以通过上次的金币来判断是否 还可以获取金币
function httpget(varurl) {
    alter("脚本url:"+varurl)
        var r = http.get(varurl);
        // log("code = " + r.statusCode);
        if (r.statusCode == 200) {
            return r.body.string()
        } else {
            return ""
        }
  }


var 强制关闭=function(appname){
  alter("强制关闭应用:"+appname)
  var packagename=app.getPackageName(appname)
  app.openAppSetting(packagename)
   var i=0
  while(i<4){
    强制关闭按钮文本集合.forEach(t=>{
        if(textclick(t)){
            i=i+1
            alter("成功点击关闭："+i)
        }
    })
  }
  alter("强制关闭停止")
}
var 关闭快手极速=function(){
     强制关闭(apppackage)
}
function idclick(i,left,top,right,bottom){
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=id(i).boundsInside(left, top, right, bottom).findOne(1500);
    if(f){
        if(!f.click()){
            
            b=f.bounds()
            bc=click(b.centerX(),b.centerY())
            if(bc){
                alter("id："+i+"----点位成功点击")
                return true
            }else{
                alter("id："+i+"----点位失败点击")
                return false
            }
           
        }else{
            alter("id："+i+"----控件点击成功")
            return true
        }
    }
    return false
}
function textclick(i,left,top,right,bottom){
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=text(i).boundsInside(left, top, right, bottom).findOne(1500);
    if(f){
         if(!f.click()){
            alter("text："+i+":点位开始成功")
                b=f.bounds()
              r=click(b.centerX(),b.centerY())
           return r
        }else{
           alter("text:"+i+"----控件点击成功")
            return true
        }
    }
    return false
}
var clickids=function(ids,t){
    t=t||500
    ids.forEach(i => {
       if (idclick(i)){
        sleep(t)
       }
    });
}
var clicktexts=function(texts,t){
    alter("开始点击文本集合控件:"+texts)
    t=t||500
    texts.forEach(i => {
        if(textclick(i)){
            sleep(t)
        }
    });
    alter("结束 点击文本集合控件 :"+texts)
}
var clicktextsbefore=function(clicktexts,stoptexts,t){
    t=t||500
    clicktexts.forEach(i => {
        if(textclick(i)){
            sleep(t)
        }
        stoptexts.forEach(s=>{
            if(text(s).exists()){
                return 
            }
        })
    });
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
    // console.log(button);
    // console.log(vlause);
    alter(left, top, right, bottom);
 // 1'id' 2 'text' 3'desc' 4'className' 5 'textContains'
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

var firstrunapp=function(appname){
    packagename=app.getPackageName(appname)
    app.launchPackage(packagename)
    允许启动文字=['允许',"确定","始终允许","打开"]
    while(currentPackage()!=packagename){
        clicktexts(允许启动文字)
    }
    
}
var firstrunapppackage=function(packagename){
      
    允许启动文字=['允许',"始终允许","打开"]
    i=0
    while(currentPackage()!=packagename&& i<10){
        app.launchPackage(packagename)
        sleep(2000)
        clicktexts(允许启动文字)
        i=i+1
    }
    if(i>=10){
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
    installapp(filePath)
    clickarray=["继续","始终允许","允许","安装","完成","继续安装","下一步"]
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
    var configurl="https://gitee.com/zhangshu345012/sample/raw/v1/config/%E9%98%85%E8%AF%BB%E9%9B%86%E5%90%88%E9%85%8D%E7%BD%AE.json"
    var appconfig=httpget(configurl)
    alter(appconfig)
    var apps=JSON.parse(appconfig)
    /*
    [{"name":"快手极速版","package":"com.kuaishou.nebula","bmobid":"q7B36667","onetime":1800,"maxtime":10800,"version":100,"downloadurl":"https://95c955397282082ce6a6f5ea1f576c4b.dd.cdntips.com/imtt.dd.qq.com/16891/apk/4CE630CC2B9657E4523492FDDDA98C24.apk?mkey=5e43f056764dc5cf&f=0c59&fsname=com.kuaishou.nebula_2.0.3.177_177.apk&csr=1bbd&proto=https"},
    {"name":"刷宝短视频","package":"com.jm.video","bmobid":"waVs777U","onetime":1800,"maxtime":10800,"version":100,"downloadurl":"https://213d4f42b3957cb9ebeb02ad91be865d.dd.cdntips.com/imtt.dd.qq.com/16891/apk/73BDFF685D5E50F887C4972A73D6AD74.apk?mkey=5e43f1d1764dc5cf&f=24c5&fsname=com.jm.video_1.950_1950.apk&csr=1bbd&proto=https"}
    ]*/
    
    apps.forEach(app => {
        alter("name:"+app.name+"package:"+app.package)
        if(getPackageName(app.name)){
    
        }else{
            downloadApk(app.name,app.downloadurl)
        }
    })

}

checkinstallapp()
