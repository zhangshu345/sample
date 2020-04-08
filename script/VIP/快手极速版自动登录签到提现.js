//快手极速版自动刷金币  签到 和 滑块验证 引流 自动私信 评论 
auto.waitFor()
auto.setMode("normal")


function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
log("公共函数实例化成功")
}
else {
log("公共函数实例化失败,程序返回")
}

/*---------------------------------lib-------------------------------*/
/*明明标准为 作者昵称 简称+app全拼 */
var 快手极速版包名="com.kuaishou.nebula"
var 快手极速版="快手极速版"
var 强制关闭按钮文本集合=["强制停止","停止运行","强制关闭","强行停止","结束运行","确定"]
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
    
}
/*将当前截屏重置尺寸为1080
*/ 
function imgBy1080(){
    var img=captureScreen()
    return images.resize(img,[1080,device.height*1080/device.width])
}
var hk=0
var hkc=0
function 滑块验证尝试(){
        w=device.width
             hk=hk+1
            var c=0
            while(text("拖动滑块").exists()){
              clicktexts(["允许","确定"])
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
              if(idoneexist[快手极速首页奖励悬浮,快手极速摄像头图标id]){
                  hkc=hkc+1
                  log("滑块验证成功:"+hk+":"+hkc)
                  return
              }
            }
}

function 滑块验证精确() {
    log("当前宽 ："+device.width+":"+device.height)
      var y = 650
    while (true) {
        img = images.captureScreen();
        if (img) {
            log("截图成功。进行识别滑块！");
            break;
        } else {
            log('截图失败,重新截图');
        }
        clicktexts(["确定","允许"])
    }
    var x
    if(device.width<=720){
        x = discernSlidingblock(img,720)
    }else if(device.width==1080){
        x = discernSlidingblock(img,1080)
    }else if(device.width>1080){
        x = discernSlidingblock(imgBy1080,1080)
    }
     log("识别结果滑块X坐标：" + x);
    if (x > -1) {
        if(device.width<=720){
            randomSwipe(80, 650, x-10, 650)
        }else if(device.width==1080){
            randomSwipe(135, 980, x, 980)
        }else if(device.width>1080){
            randomSwipe(140,980,x,980)
        }
        //滑动完成
    } else {
       log("识别有误，请确认是否在滑块界面");
    }
    
}

var 滑块验证=function(){
    while(text("拖动滑块").exists()){
        
       checkscreencapture()
         i=0
         sleep(1000)
        滑块验证精确()
        if(i%3==0){
            滑块验证尝试()
        }
    sleep(3000)
    i=i+1
    }
}
 //显示控制台
//  console.show()
//  console.setPosition(100, 1200)
  //请求权限

 //启动


var 快手极速首次协议同意并继续id ="com.kuaishou.nebula:id/positive" //  text 同意并继续 点击 
var 快手极速首次立即领取id="com.kuaishou.nebula:id/negative"   //text 立即领取  点击之后 选择登陆 选择 微信登录吧 
var 快手极速登录微信登录按钮id="com.kuaishou.nebula:id/wechat_login_view" //
var 快手极速一键登录按钮id="com.kuaishou.nebula:id/btn_onekey_login" //本机一键登录
var 快手极速协议勾选框id="com.kuaishou.nebula:id/cb_verify_service_line"  // 勾选上就是同意
var 快手极速微信登录显示标题id="com.kuaishou.nebula:id/qm"   //显示登录app 的名称 这里是快手极速版   当前活动 com.tencent.mm.plugin.webview.ui.tools.SDKOAuthUI
var 快手极速微信确认登录按钮id="com.tencent.mm:id/d17"  //确认登录  包名是com.tencent.mm  "com.kuaishou.nebula:id/wechat_login_view"
var 快手极速微信关闭按钮id="android:id/text1"  //关闭 
var 快手极速弹窗文本集合=["同意并继续","立即领取","我知道了","点击重播"]
var 快手极速弹窗id集合=["btn_privacy_action","close"]
var 快手极速首次登录点击id集合=[快手极速首次立即领取id,快手极速登录微信登录按钮id,快手极速微信确认登录按钮id]
var 快手极速摄像头图标id="com.kuaishou.nebula:id/home_shot_view"
var 快手极速左边框按钮id="com.kuaishou.nebula:id/left_btn"
var 快手极速左边作者名称id="com.kuaishou.nebula:id/tab_name"  //text 是作者的昵称
var 快手极速左边设置按钮id="com.kuaishou.nebula:id/tab_settings" //设置
var 快手极速首页="com.yxcorp.gifshow.HomeActivity" 
var 快手极速首页奖励悬浮="com.kuaishou.nebula:id/red_packet"   //悬浮按钮
var 快手极速版首页标志=[快手极速首页奖励悬浮,快手极速摄像头图标id]
var 快手极速设置密码=function(){
    if(打开快手极速左边框()){
        while(!idclick(快手极速左边设置按钮id)){}
        
    }

}

var  快手极速微信登录按钮id="com.kuaishou.nebula:id/wechat_login_view"

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
         if(idoneexist(快手极速版首页标志)){
            return true
        }else{
            back()
        }
        快手极速弹窗()
        滑块验证()
        sleep(1000)
    }
}


var 快手极速弹窗=function(){
     clickids(快手极速弹窗id集合)
    clicktexts(快手极速弹窗文本集合)
    if(text("立即邀请").exists){
        back()
        sleep(500)
    }
    if (textclick("立即重播")){
            快手极速视频上滑()
    }
    
}
var 快手悬浮球之后页面操作=function(){
    log("快手悬浮球之后页面操作")
    s=0
    while(s<5){
        if(text("填写邀请码").exists()){
            log("找到填写邀请码，是新用户")
            if(textclick("去填写")){
               if (快手极速填写邀请码()){
                   back()
                   break
               }
            }
        }else{
           log("没有找到填写邀请码，不是新用户")
           滑动(20,10,18,10,3,500,500)
        }
       if(idclick(快手极速微信登录按钮id)){
           log("微信登录id存在点击")
           sleep(2000)

       }
        
       if(textclick("立即签到")){
           sleep(1000)
           back()
           return true
       }
        sleep(1000)
        if(text("签到领金币").exists()){
            if(textclick("去签到")){
                log("去签到 ")
            }
            if(text("去查看").exists()){
                log("去查看 ")
                return true
            }
        }
        
       s=s+1
    }
}

var 快手极速签到=function(){
    log("快手极速签到")
    n=0
         while(n<10){
            if(回到快手极速首页()){
                log("签到  已经回到首页")
                if(clickids([快手极速首页奖励悬浮])){
                    sleep(1500)
                    快手悬浮球之后页面操作()
                  
                }
                 if(textclick("立即签到")){
                     return true
                 }
            }
            快手极速弹窗()
            滑块验证()
        }
 
}

var 快手极速填写邀请码=function(){
    i=0
    while(i<10){
        if(text("填邀请码领现金").exists()){
            v= className("EditText").findOne()
            if(v){
                 v.setText(getrandforstrs(快手极速版邀请码))
                 sleep(100)
                if( textclick("提交领现金")){
                    sleep(1000)
                }
            }
             sleep(100)
             if(textContains("填写邀请码成功").exists()){
                 back()
                 sleep(1000)
                 back()
                 
                 return true
              }
        }else{
            sleep(1500)
        }
       i=i+1
       
    }
   return false
}
var 快手极速视频上滑=function(){
   滑动(20,13,16,10,3,400,300)
 }

 var 快手极速视频下滑=function(){
    滑动(20,13,3,10,17,400,200)
  }

  var 滑动次数=今日滑动次数()
var 快手极速视频滑动操作=function(){
   
    while(滑动次数<1000){
        if(i%500==0){
            设置今日滑动次数(滑动次数)
        }
       滑块验证尝试()
       if(!idoneexist([快手极速摄像头图标id,快手极速首页奖励悬浮])){
            回到快手极速首页()
        }
        
       
        if(滑动次数%5==0){
            快手极速视频上滑()
        }else if(滑动次数%5==1){
            快手极速视频上滑()
        }else if(滑动次数%5==2){
            快手极速视频下滑()
        }else if(滑动次数%5==3){
            快手极速视频下滑()
        }else{
            快手极速视频上滑() 
        }
        滑动次数=滑动次数+1
        if(滑动次数%1000==0){
           快手极速提现()
        }

        sleepr(6000,12000)
    }
}

var islogin=false

function firstlogin(){
    while(true){
        log("第一次登录")
        clicktexts(["同意并继续","立即领取","立即提现","立即提现","提取","登录领金币"])
        if(idclick("com.kuaishou.nebula:id/protocol_checkbox")){
           if( textclick("微信登录")){
               text("确认登录").waitFor()
              if( textclick("确认登录")){
                  sleep(2000)
              }

           }
        }
        if(text("绑定手机号").exists()){
           ph= text("请输入手机号").findOne()
           if(ph){
               if(phone()){
                ph.setText(phone())
               }else{
                   textclick("跳过")
               }
               
           }
        }

        if(idoneexist(快手极速版首页标志)){
            //快手actionbar "com.kuaishou.nebula:id/action_bar"
            if(id("com.kuaishou.nebula:id/tabs").exists()){
               log("点击首页的发现")
               id("com.kuaishou.nebula:id/tabs").findOne().children(0).children(2).click()
            }
           return true
       }
    }
}

//第一次登陆验证是否登录 和登录操作 和绑定邀请
function firststartapp(){
    log("第一次登录快手极速版 进行登录操作")
    app.launch(快手极速版包名)
    while(true){
        log("第一次开始")
        if(currentPackage()!=快手极速版包名){
            if(!getPackageName(快手极速版)){
                downloadandinstallapp(快手极速版)
                islogin=false
            }
            app.launch(快手极速版包名)
            sleepr(1000,2500)
        }else{
            if(textclick("同意并继续")){
                islogin=true
                firstlogin()
            }
    
            if(textclick("提取")){
                back()
                sleep(1000)
                back()
            }
    
            if(idoneexist(快手极速版首页标志)){
                log("找到快手首页悬浮标记")
                //快手actionbar "com.kuaishou.nebula:id/action_bar"
                if(id("com.kuaishou.nebula:id/tabs").exists()){
                    
                  childs= id("com.kuaishou.nebula:id/tabs").findOne().children()
                    childs.forEach(e => {
                        log(e.className())
                        if(e.className()=="android.widget.LinearLayout"){
                            e.child(2).click()
                        }
                    });
                }
         
                if(idclick(快手极速首页奖励悬浮)){
                    sleep(1000)
                  
                        if ( 快手悬浮球之后页面操作()){
                             return
                        }
                   
                }
             
           }else{
                log("没有找到快手首页悬浮标记")
               back()
               sleep(1000)
            
           }
           clicktexts(["立即领取","立即提现","立即提现","登录领金币"],1500,5000)
            
           clickids(快手极速首次登录点击id集合,1500,10000)


        }

       
        sleep(1000)
    }
  
 log("结束 firststartapp")
}


var 启动=function(){
    device.wakeUpIfNeeded()
    if(!getPackageName(快手极速版)){
        downloadandinstallapp(快手极速版)
        islogin=false
    }
    firststartapp(快手极速版)
    // if(!今日签到("kuaishoujisu")){
    //     log("快手极速版今日未签到")
    //     快手极速签到()
    // }
    快手极速视频滑动操作()
}
//启动()
//  runurl:https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/%E5%BF%AB%E6%89%8B%E6%9E%81%E9%80%9F%E7%89%88%E8%87%AA%E5%8A%A8%E7%99%BB%E5%BD%95%E7%AD%BE%E5%88%B0%E6%8F%90%E7%8E%B0.js
滑块验证()