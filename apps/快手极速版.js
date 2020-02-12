//快手极速版自动刷金币  签到 和 滑块验证 引流 自动私信 评论 

auto.waitFor()
auto.setMode("normal")
/*---------------------------------lib-------------------------------*/
/*明明标准为 作者昵称 简称+app全拼 */
var appname="快手极速版"
var 快手极速版="com.kuaishou.nebula"
var 快手极速首页="com.yxcorp.gifshow.detail.PhotoDetailActivity" 
var 快手极速左边框打开按钮id="com.kuaishou.nebula:id/left_btn" //首页左边看按钮点击打开 左边框  从左往右滑动也可以打开左边框
var 快手极速首页头像id="com.kuaishou.nebula:id/tab_avatar"  // 打开左边框之后的头像的id
var 快手极速首页奖励悬浮id="com.kuaishou.nebula:id/redFloat"
var 快手极速首页奖励进度id="com.kuaishou.nebula:id/cycle_progress"  //文字是 是金蛋大奖 时
var 快手极速首页摄像按钮id="com.kuaishou.nebula:id/home_shot_view"
var 快手极速首页喜欢按钮id="com.kuaishou.nebula:id/like_button"
var 快手极速首页评论按钮id="com.kuaishou.nebula:id/comment_button"
var 快手极速首页分享按钮id="com.kuaishou.nebula:id/forward_button"
var 快手极速滑块验证页标题id="com.kuaishou.nebula:id/title_tv" //文字是 拖动滑块
var 快手极速首页作者名称id="com.kuaishou.nebula:id/user_name_text_view_new" //文本是作者的 名称 点击可以进入作者 如何在直播直接进入直播页
var 快手极速作者头像id="com.kuaishou.nebula:id/user_bottom_avatar_view_new"
var 快手极速作者头像直播id="com.kuaishou.nebula:/slide_play_living_tip_new"  //显示是否正在直播
var 快手极速首页视频标签id="com.kuaishou.nebula:id/label"   //文字是 那个标题
var 快手极速首页音乐标签id="com.kuaishou.nebula:id/music_text" //文字是 可以点开这个音乐
var 强制关闭按钮文本集合= ["强制停止","停止运行","强制关闭","强行停止","结束运行","确定"]
var 快手极速签到页面="com.yxcorp.gifshow.webview.KwaiWebViewActivity"             // 立即签到  点击签到之后可以直接 back 返回到首页
var 快手极速给个好评关闭id="com.kuaishou.nebula:id/close"  //back就可以关闭

var 数据库= storages.create("hskuaishou");
var 余额id="com.jm.video:id/tv_mine_money"
var 刷宝金币id="com.jm.video:id/tv_gold_num"
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
    // if(fwshow){
    //     setTimeout(() =>{
    //         alter(txt)
    //     },1501)
    // }else{
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
    cs=数据库.get(appname+"_"+today()+"_sign", false)
    alter("今日签到:"+cs)
    return cs
}
var 今日已签到=function(){
    
     数据库.put(appname+"_"+today()+"_sign", true)
     alter("今日已签到")
}
var 今日时长=function(){
    return 数据库.get(appname+"_"+today()+"_time", 0)
}
var 记录今日时长=function(t){
    数据库.put(appname+"_"+today()+"_time",今日时长()+t)
}

var 今日提现=function(){
    return 数据库.get(appname+"_"+today()+"_cashout",false)
}
var 今日已提现=function(){
    数据库.put(appname+"_"+today()+"_cashout",true)
    alter("今日已提现")
}
var 上次金币=function(){ 
    return    数据库.get(appname+"_"+today()+"_lastcoin", 0)
 } //可以通过上次的金币来判断是否 还可以获取金币
 var 上次余额=function(){ 
    return   数据库.get(appname+"_"+"lastmoney", 0.0)
 } //可以通过上次的金币来判断是否 还可以获取金币
function httpget(varurl) {
    alter("脚本url:"+varurl)
        var r = http.get(yunurl);
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
     强制关闭(appname)
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

//----------------------------------刷宝子程序--------------------------------------------//
function 快手极速上滑() {
    滑动次数=滑动次数+1
    alter("第 "+滑动次数+" 次上滑")
   
    if(!id(刷宝视频页搜索按钮id).exists()){
       回到快手极速视频页()
    }
    滑动(20,14,16,9,3,500,200)
    sleepr(6*1000,13*1000)
}

var 快手极速搜索用户=function(author){
    app.launch(appname) 
}
function 回到刷宝首页(){
    alter("回到快手极速首页")
    i=0
    while(i<10&&currentActivity()!=快手极速首页){
        
        cp=currentPackage()
        alter("刷宝:检测当前包名："+cp)
        if(cp==刷宝包名){
            if(text("首页").exists()){
                return true
            }
            if(id(刷宝视频页搜索按钮id).exists){
                textclick("推荐",0,0,device.width,300)
                return true
            }
        }else{
            app.launchPackage(刷宝包名)
            sleep(1000)
        }
       
        ca=currentActivity()
        alter("当前activity："+ca)
        if(ca==刷宝首页){
             return true
        }else{
            back()
            sleep(1000)
        }
        弹窗()
        i=i+1
      }
      if(i>10){
          return false
      }
      return true
}
function 快手极速获取金币数(){
    alter("快手极速获取金币数")
    回到快手极速首页()
    while(true){
    textclick("我")
    sleep(1000)
      coin=id(刷宝金币id).findOne(1000)
    if(coin){
        n=parseInt(coin.text())
        数据库.put(today+"_lastcoin",n)
        alter("当前金币数:"+n)
       return n
     }
    }
}
var 快手极速获取当前余额=function(){
  回到快手极速首页()
   while(true){
    textclick("我")
    sleep(300)
    money=id(刷宝余额id).findOne(1000)
    if(money){
        f=parseFloat(money.text())
        数据库.put("lastmoney",f)
        return f
    }
   }
}
var 快手极速可以提现=function(){
    t= textContains("今日已解锁").findOne()
    if(t){
        return true
    }
    t= textContains("今日已使用").findOne()
    if(t){
        return false
    }
  t=  textContains("已得").findOne()
  if(t){
      ss=t.text().split("已得")[1]
      log("已得："+ss)
      cc= parseInt(ss.substr(0,4))
      ms=t.text().substr(t.text().length-7,4)
      log("ms:"+ms)
      if(cc>parseInt(ms)){
          return true
      }else{
          return false
      }
  }
}
var 快手极速提现=function(){
    alter("快手极速提现")
     f=快手极速获取金币数()
     if(f>6800){
        while(true){

           if(idclick(刷宝余额id)){
             alter("点击刷宝余额成功")
                sleep(1000)
            }
            if(textclick("立即提现")){

             }
             if(textclick("每日可提")){
                    alter("点击每日")
                    return false
              }
             if(textclick("仅当日有效")){
                    alter("仅当日有效")
                    break
              }
              if(textclick("已解锁")){
                    alter("点击每日")
                  break
              }
           
           
        }
     }else{
         回到快手极速视频页()
         return false
     }
     if(快手极速可以提现()){
           i=0
            while(i<10){
                if(textclick("立即提现")){

                }
                sleep(1000)
                if(textclick("同意")){
                    alter("微信同意")
                }
                if(text("提现详情").exists()){
                    今日已提现()
                    回到快手极速视频页()
                    return true
                }
                i=i+1
            }
            回到快手极速视频页()
            return false
       }else{
        回到快手极速视频页()
        return false
       }
       
}




function 在指定页面不断上滑(指定页面标识,回到指定页面函数,滑动时间秒){
 
        var 开始时间=new Date().getTime()
        while(new Date().getTime()-开始时间<滑动时间秒*1000){
            刷宝上滑()
            回到指定页面函数()
        }
  }

var 回到快手极速视频页=function(){
    alter("快手极速回到刷视频页")
    回到快手极速首页()
    i=0
    while(i<10){
        textclick("发现")
        if(id(刷宝视频页搜索按钮id).exists()){
           return true
        }
        sleep(500)
        i=i+1
    }
    强制关闭("快手极速版")
    回到快手极速视频页()
}
function 快手极速视频操作(){
    回到快手极速视频页()
    while(滑动次数<1000){
        快手极速上滑()
        if(滑动次数%100==0){
           if(!今日提现())(
            快手极速提现()
           ) 
        }
     }
}
function login(){
    // 进入个人中心
    button = "text"
    vlause = "我"
    result = control_click(2, vlause)  
        // 微信一键登录
    button = "text"
    vlause = "微信账号登录"
    result = control_click(2, vlause)  
    if(!result){
        alter("已经登录")
        return
    }
    // 微信授权 
    wechat_agree()
    button = "text"
    vlause = "首页"
    result = control_click(2, vlause)  
}

function 启动线程(){
    alter("主线程开启")
    firstrunapppackage()
   todaytime=今日时长()
   alter("刷宝今日时长:"+todaytime)
   sleep(2000)
   if(!今日签到()){
       快手极速签到()
   }
   log("接下来就是刷视频操作")
   快手极速视频操作()
}
 //启动线程()
//强制停止("刷宝短视频")
// log("上次金币",上次金币())
// log("上次余额",上次余额())
// var s=刷宝获取金币数()
// console.log("刷宝金币",s)
// var f=刷宝获取当前余额()
// log("刷宝金币",f)

threads.start(function(){
    alter("守护线程开启")
    while(滑动次数<1000){
        sleep(60*1000)
        alter("判断是不是回到刷宝首页")
        回到快手视频页()
    }
});
启动线程()



function 初始化() {
    log("初始化")
    // 首页分享的ID
    while (true) {
        console.log("进入初始化操作");
        sleep(1000)
        var 首页标识控件 = id("circular_progress_bar").exists();
        console.log('首页标识控件' + 首页标识控件);
        if (首页标识控件) {
            console.log("初始化完成");
            break
        }
        back()
        console.log("初始化完成");
        sleep(3000)
    }
}

function 弹窗() {
    sleep(200)
    if (id("btn_privacy_action").exists()) {
        log("其中一个窗口")
        id("btn_privacy_action").findOne(1000).click()
    }
    if (id(快手极速给个好评关闭id).exists()) {
        //要支持的动作
        log('存在关闭按钮')
        idclick("")
        id("close").findOne().click();
    }
    if (text("我知道了").exists()) {
        //要支持的动作
        log('存在我知道了')
        text("我知道了").findOne().click();
    }
}


// 快手极速版 主函数
function 快手极速签到() {
    var 左上菜单是否存在 = id("left_btn").findOne(5000);
    if (!左上菜单是否存在) {
        return
    }
    弹窗()
    //  点击 左上角 菜单

    var 左上菜单是否存在 = id("left_btn").exists();
    log("左上角上菜单" + 左上菜单是否存在)
    if (左上菜单是否存在) {
        id("left_btn").findOne().click();
    }
    sleep(1000)
    //点击 去挣钱
    var 赚钱按钮否存在 = text("去赚钱").exists();
    log("赚钱按钮否存在" + 赚钱按钮否存在)
    if (赚钱按钮否存在) {
        log('去赚钱--------->' + text("去赚钱").findOne().clickable())
        //  去父控件点击
        text("去赚钱").findOne().parent().click();
    }
    num = 0
    while (true) {
        num += 1
        if (num > 5) {
            初始化()
            return
        }
        sleep(3000)
        result = desc("复制链接").exists()
        if (result) {
            break
        }
        result = text("复制链接").exists()
        if (result) {
            break
        }

    }
    sleep(3000)
    弹窗()
    var 立即签到是否存在 = text("立即签到").exists();
    log("立即签到是否存在" + 立即签到是否存在)
    if (立即签到是否存在) {
        // text("立即签到").findOne().clickable();
        text("立即签到").findOne().click();
        sleep(200)
        初始化()
        return
    }
    var 立即签到是否存在 = desc("立即签到").exists();
    log("立即签到是否存在" + 立即签到是否存在)
    if (立即签到是否存在) {
        desc("立即签到").findOne().click();
        sleep(200)
        初始化()
        return
    }
    sleep(200)
    /////////////------去签到 2次判断
    //点击 去签到 
    num = 1
    while (true) {
        console.log("循环检测去签到按钮");
        num += 1
        if (num > 30) {
            初始化()
            return
        }
        sleep(1000)
        var 签到领金币1 = desc("签到领金币").boundsInside(left, top, right, device.height * 0.8).exists();
        var 签到领金币2 = text("签到领金币").boundsInside(left, top, right, device.height * 0.8).exists();
        if (签到领金币1 || 签到领金币2) {
            console.log();
            break
        }
        log("开始上滑")
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))

    }
    var 去签到是否存在 = text("去签到").boundsInside(left, top, right, device.height * 0.8).exists();
    log("立即签到是否存在" + 去签到是否存在)
    if (去签到是否存在) {
        // text("立即签到").findOne().clickable();
        text("去签到").findOne().click();
        sleep(500)
        初始化()
        return
    }
    var 去签到是否存在 = desc("去签到").boundsInside(left, top, right, device.height * 0.8).exists();
    log("立即签到是否存在" + 去签到是否存在)
    if (去签到是否存在) {
        desc("去签到").findOne().click();
        sleep(500)
        初始化()
        return
    }
}
function 验证滑块(){
  if( id("com.kuaishou.nebula:id/title_tv").exists()){
      if(text("拖动滑块").exists()){
          hk=hk+1
          var c=0
          while(true){
            log("快手滑块验证")
            c=c+1
            swipe(70, 645, w * 0.63, 650, random(1220, 1505))
            sleep(1000)
            swipe(70, 645, w * 0.75, 645, random(1220, 1505))
            sleep(2000)
            if(text("发现").exists()||text("关注").exists()){
                hkc=hkc+1
                log("滑块验证成功:"+hk+":"+hkc)
                return
            }
          }
      }
  }
}
app.launch("com.kuaishou.nebula")
    初始化()
    var i=0
    var hk=0
    var hkc=0
    while (true) {
        var c = random(10000, 15000)
        sleep(c)
        弹窗()
        验证滑块()
        log("快手开始上滑："+i+"--出现滑块次数："+hk+"--成功："+hkc)
        快手上滑();
        i=i+1
    }

