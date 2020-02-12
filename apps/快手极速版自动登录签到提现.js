//快手极速版自动刷金币  签到 和 滑块验证 引流 自动私信 评论 
auto.waitFor()
auto.setMode("normal")
/*---------------------------------lib-------------------------------*/
/*明明标准为 作者昵称 简称+app全拼 */
var 数据库= storages.create("hongshuyuedujihe");
var apppackage="com.kuaishou.nebula"
var appname="快手极速版"
var date=new Date()
var today=function(){
    return date.getFullYear()+"_"+date.getMonth()+"_"+date.getDate()
}
var starttime=date.getTime()
var 强制关闭按钮文本集合=["强制停止","停止运行","强制关闭","强行停止","结束运行","确定"]

var fw=floaty.window(
    <frame gravity="center">
    <text id="text" w="*" h="*" gravity="center" textSize="18sp" background="#55ffff00">悬浮文字</text>
    </frame>

);
fw.setAdjustEnabled(false)
fw.setSize(1, 1)
fw.setPosition(50,device.height/15)
var fwshow=false
var alter=sync(function(txt){
      ui.run(function(){
          console.log(txt)
        fw.text.setText(txt)
        fw.setSize(device.width-100, device.height/15)
        fwshow=true
    })
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
var 今日滑动次数=function(){
    cs=数据库.get(apppackage+"_"+today()+"_move", 0)
    alter("今日签到:"+cs)
    return cs
}
var 设置今日滑动次数=function(i){
    cs=数据库.put(apppackage+"_"+today()+"_move", i)
    alter("今日签到:"+cs)
    return cs
}


var 今日时长=function(){
    return 数据库.get(apppackage+"_"+today()+"_time", 0)
}
var 记录今日时长=function(t){
    数据库.put(apppackage+"_"+today()+"_time",t)
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
    alter("点击文本集合控件:"+texts)
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

/** 
 * 识别滑块位置
 * 
 * 传入值img，ratio
 * img为要识别的图片
 * ratio为识别图片的分辨率（暂时只可选择720或1080）
 * 
 * 返回值x
 * 识别出方块位置的左端横坐标
 */
function discernSlidingblock(img, ratio) {
    //创建识别变量
    var temp, temp2, x, y, num, color, p, temp3, arr1;
    //分析设备分辨率
    if (ratio == 720) {
        var tb = [348, 253, 691, 638, 81]
        log("您的设备分辨率为：720p");
    } else if (ratio == 1080) {
        var tb = [463, 387, 912, 831, 125]
        log("您的设备分辨率为：1080p");
    } else if (ratio==1440){
        log("分辨率2k")
        checknumber()

    }else{
        log("当前设备分辨率不符合规范")
        return -2
    }
    num = Math.ceil(tb[4] / 3.3 - 4);
    
    //计算滑块位置
    for (var k = 29; k <= 40; k++) {
        temp2 = "";
        color = "#" + k + "" + k + "" + k + "";
        for (var i = 1; i <= num; i++) {
            temp2 = temp2 + "0|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|0|" + color + ",";
            temp2 = temp2 + "1|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|1|" + color + ",";
            temp2 = temp2 + "2|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|2|" + color + ",";
        }
        x = 0;
        while (x > -2) {
            y = 0;
            while (y > -2) {
                temp = "";
                for (var i = 1; i <= num; i += 2) {
                    temp = temp + "0|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|0|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + "1|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|1|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y - 1) + "|" + color + ",";
                }
                temp = temp + temp2 + "0|0|" + color;
                arr1 = temp.split(",");
                var arr2 = new Array();
                for (var i = 0; i < arr1.length - 1; i++) {
                    arr2[i] = new Array();
                    temp3 = arr1[i].split("|");
                    arr2[i] = [Number(temp3[0]), Number(temp3[1]), temp3[2]];
                }
                try {
                    p = images.findMultiColors(img, color, arr2, {
                        region: [tb[0], tb[1], tb[2] - tb[0], tb[3] - tb[1]],
                        threshold: (Math.floor(k / 10) * 16 + k % 10)
                    });
                    if (p) {
                        img.recycle();
                        return p.x+65
                    }
                } catch (error) {
                    //出错
                    console.log("识别失败，错误原因：" + error);
                    return -1;
                }
                y = --y;
            }
            x = --x;
        }
    }
    try {
        img.recycle();
    } catch (error) {
        console.log("识别失败，错误原因：" + error);
    }
    return -1;
}

/*返回*/
function findMultiColorss(img,first,arr,option){
    var temp_img
    if (option.region) {
        temp_img = images.clip(img,option.region.x,option.region.y,option.region.width,option.region.height)
        for (let  img_height= 0; img_height < temp_img.getHeight()-165; img_height+=5) {
            for (let img_width = 0; img_width < temp_img.getWidth()-165; img_width+=5) {
                if (colors.equals(temp_img.pixel(img_width,img_height), first)) {
                    var flag=true
                    for (let index = 0; index < arr.length; index++) {
                        if ( ! colors.equals(temp_img.pixel(img_width+arr[index][0],img_height+arr[index][1]),arr[index][2])) {
                            flag=false
                        } 
                    }
                    if (flag) {
                        return {x:img_width+option.region.x,y:img_height+option.region.y}
                    }
                }
            }
        }    
    }
}

function checknumber() {
    var  ime = captureScreen();
    ime=images.cvtColor(ime,"BGR2GRAY",3)
    ff = images.threshold(ime,110,255,"BINARY")
    
    var dd= findMultiColorss(ff,"#000000",_G_arr0,{region:{x:820,y:550,width:550,height:650}})
    randomSwipe(300,1400,dd.x+85,1400)
    var err=text("请控制拼图块对齐缺口").findOne(3000)
    if (err) {
        
        var dd = idContains("reload").depth(24).findOne(1000)
        if (dd) {
            log("刷新滑块验证")
            dd.click()
            sleep(3000)
            
        }
    }
    return 
}

function bezierCreate(x1,y1,x2,y2,x3,y3,x4,y4){
    //构建参数
    var h=100;
    var cp=[{x:x1,y:y1+h},{x:x2,y:y2+h},{x:x3,y:y3+h},{x:x4,y:y4+h}];
    var numberOfPoints = 100;
    var curve = [];
    var dt = 1.0 / (numberOfPoints - 1);
    
    //计算轨迹
    for (var i = 0; i < numberOfPoints; i++){
        var ax, bx, cx;
        var ay, by, cy;
        var tSquared, tCubed;
        var result_x, result_y;
    
        cx = 3.0 * (cp[1].x - cp[0].x);
        bx = 3.0 * (cp[2].x - cp[1].x) - cx;
        ax = cp[3].x - cp[0].x - cx - bx;
        cy = 3.0 * (cp[1].y - cp[0].y);
        by = 3.0 * (cp[2].y - cp[1].y) - cy;
        ay = cp[3].y - cp[0].y - cy - by;
    
        var t=dt*i
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
    var array=[];
    for (var i = 0;i<curve.length; i++) {
        try {
            var j = (i < 100) ? i : (199 - i);
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
function randomSwipe(sx,sy,ex,ey){
    //设置随机滑动时长范围
    var timeMin=500
    var timeMax=1500
    //设置控制点极限距离
    var leaveHeightLength=500
    
    //根据偏差距离，应用不同的随机方式
    if(Math.abs(ex-sx)>Math.abs(ey-sy)){
        var my=(sy+ey)/2
        var y2=my+random(0,leaveHeightLength)
        var y3=my-random(0,leaveHeightLength)
    
        var lx=(sx-ex)/3
        if(lx<0){lx=-lx}
        var x2=sx+lx/2+random(0,lx)
        var x3=sx+lx+lx/2+random(0,lx)
    }else{
        var mx=(sx+ex)/2
        var y2=mx+random(0,leaveHeightLength)
        var y3=mx-random(0,leaveHeightLength)

        var ly=(sy-ey)/3
        if(ly<0){ly=-ly}
        var y2=sy+ly/2+random(0,ly)
        var y3=sy+ly+ly/2+random(0,ly)
    }

    //获取运行轨迹，及参数
    var time=[0,random(timeMin,timeMax)]
    var track=bezierCreate(sx,sy,x2,y2,x3,y3,ex,ey)
    
    log("随机控制点A坐标："+x2+","+y2)
    log("随机控制点B坐标："+x3+","+y3)
    log("随机滑动时长："+time[1])
    
    //滑动
    gestures(time.concat(track))
    console.hide()
}
/*将当前截屏重置尺寸为1080
*/ 
function imgBy1080(){
    var img=captureScreen()
    return images.resize(img,[1080,device.height*1080/device.width])
}

function 滑块验证尝试(){
 
        if(text("拖动滑块").exists()){
            hk=hk+1
            var c=0
            while(true){
              log("快手滑块验证")
              c=c+1
              if(device.width<=720){
                  swipe(720, 645, w * 0.63, 650, random(1220, 1505)) 
              }else if(device.width<=1080){
                  swipe(125, 980, w * 0.62, 980, random(1220, 1505))
              }else{
                  swipe(135, 980, w * 0.63, 980, random(1220, 1505))
              }
          
              sleep(1000)
              if(text("发现").exists()||text("关注").exists()){
                  hkc=hkc+1
                  log("滑块验证成功:"+hk+":"+hkc)
                  return
              }
            }
        }
  
}

function 滑块验证精确() {
      var y = 650
    auto.waitFor()
    for(var i=0;i<0;i++){sleep(1000);log(i);}
    while (true) {
        img = images.captureScreen();
        if (img) {
            log("截图成功。进行识别滑块！");
            break;
        } else {
            log('截图失败,重新截图');
        }
    }
    var x
    if(device.width<=720){
        x = discernSlidingblock(img,720)
    }else if(device.width==1080){
        x = discernSlidingblock(img,1080)
    }else if(device.width>1080){
        x = discernSlidingblock(imgBy1080,1080)
    }
     console.info("识别结果滑块X坐标：" + x);
    if (x > -1) {
        if(device.width<=720){
            randomSwipe(80, 650, x, 650)
        }else if(device.width==1080){
            randomSwipe(135, 980, x, 980)
        }else if(device.width>1080){
            randomSwipe(140,980,x,980)
        }
        //滑动完成
        
    } else {
        console.log("识别有误，请确认是否在滑块界面");
    }
    
}

var 滑块验证=function(){
    i=0
    while(text("拖动滑块").exists()){

    if (requestScreenCapture()) {
        alert("请求截图权限失败！");
        滑块验证精确()
    }else{
        滑块验证尝试()
    }
    sleep(1000)
    i=i+1
    }
}
 //显示控制台
//  console.show()
//  console.setPosition(100, 1200)
  //请求权限

 //启动

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
 
 



var 快手极速首次协议同意并继续id ="com.kuaishou.nebula:id/positive" //  text 同意并继续 点击 
var 快手极速首次立即领取id="com.kuaishou.nebula:id/negative"   //text 立即领取  点击之后 选择登陆 选择 微信登录吧 
var 快手极速登录微信登录按钮id="com.kuaishou.nebula:id/wechat_login_view" //
var 快手极速一键登录按钮id="com.kuaishou.nebula:id/btn_onekey_login" //本机一键登录
var 快手极速协议勾选框id="com.kuaishou.nebula:id/cb_verify_service_line"  // 勾选上就是同意
var 快手极速微信登录显示标题id="com.kuaishou.nebula:id/qm"   //显示登录app 的名称 这里是快手极速版   当前活动 com.tencent.mm.plugin.webview.ui.tools.SDKOAuthUI
var 快手极速微信确认登录按钮id="com.tencent.mm:id/d17"  //确认登录  包名是com.tencent.mm  
var 快手极速微信关闭按钮id="android:id/text1"  //关闭 
var 快手极速弹窗文本集合=["同意并继续","立即领取","我知道了"]
var 快手极速弹窗id集合=["btn_privacy_action","close"]
var 快手极速首次登录点击id集合=[快手极速首次立即领取id,快手极速登录微信登录按钮id,快手极速微信确认登录按钮id]
var 快手极速摄像头图标id="com.kuaishou.nebula:id/home_shot_view"
var 快手极速左边框按钮id="com.kuaishou.nebula:id/left_btn"
var 快手极速左边作者名称id="com.kuaishou.nebula:id/tab_name"  //text 是作者的昵称
var 快手极速左边设置按钮id="com.kuaishou.nebula:id/tab_settings" //设置
var 快手极速首页="com.yxcorp.gifshow.HomeActivity" 
var 快手极速首页奖励悬浮="com.kuaishou.nebula:id/red_packet"   //悬浮按钮
var 快手极速设置密码=function(){
    if(打开快手极速左边框()){
        while(!idclick(快手极速左边设置按钮id)){}
        
    }

}

var 打开快手极速左边框=function(){
    if(回到快手极速首页()){
       while(!idclick(快手极速左边框按钮id))
       return true
    }
    return false
}
var 回到快手极速首页=function(){
    alter("回到快手极速首页")
    while(true){
        快手极速弹窗()
        if(currentPackage()!=apppackage){
            app.launchPackage(apppackage)
            sleep(2000)
        }
        if(currentActivity()==快手极速首页){
            return true
        }
        if(id(快手极速摄像头图标id).exists()){
            return true
        }
        back()
    }
}


var 快手极速判断登录=function(){
 if(回到快手极速首页()){
    while(id(快手极速左边作者名称id).exists()){
        
    }
    if(id(快手极速左边作者名称id).findOne(500).text()){

    }
 }else{
     强制关闭(appname)
     app.launchApp(appname)
     sleep(1000)
     return 快手极速判断登录()
 }
}
var 快手极速弹窗=function(){
     clickids(快手极速弹窗id集合)
    clicktexts(快手极速弹窗文本集合)
    if(text("立即邀请").exists){
        back()
        sleep(500)
    }
    if(text("点击重播").exists()){
        快手极速视频上滑()
    }
}

var 快手极速登录=function(){
    while(!快手极速判断登录()){
        
        clickids(快手极速首次登录点击id集合)
        sleep(1000)
    }

}
var 快手极速提现=function(){

}
var 快手极速签到=function(){
    if(回到快手极速首页()){
        while(true){

        }
    }
}

var 快手极速视频上滑=function(){
  
 滑动(20,13,16,10,3,500,500)
 }

var 快手极速视频滑动操作=function(){
    
    i=今日滑动次数()
    while(i<1000){
        if(i%5==0){
            设置今日滑动次数(i)
            回到快手极速首页()
        }
       滑块验证()
        if(currentPackage()!=apppackage){
            回到快手极速首页()
        }
        快手极速视频上滑()
        i=i+1
        if(i%300==0){
           快手极速提现()
        }
        sleepr(8000,15000)
    }
}

var islogin=true

if(!getPackageName("com.kuaishou.nebula")){
    checkinstallapp()
    islogin=false
}

firstrunapp("快手极速版")

if(今日签到()){
    快手极速签到()
}
快手极速视频滑动操作()



