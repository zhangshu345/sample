auto.waitFor()
auto.setMode("normal")
/*---------------------------------lib-------------------------------*/
/*明明标准为 作者昵称 简称+app全拼 */
var 刷宝包名="com.jm.video"
var 刷宝首页="com.jm.video.ui.main.MainActivity"
var 刷宝发布页="com.jm.video.ui.live.Publish"
var 刷宝选择本地视频页="com.jm.txvideorecord.videoediter.TCVideoEditChooseActivity"
var 刷宝视频剪切页="com.jm.txvideorecord.videoediter.TCVideoCutterActivity"
var 刷宝视频剪切下一步按钮id="com.jm.video:id/btn_next"
var 刷宝视频编辑视频页="com.jm.txvideorecord.videoediter.TCVideoEditerActivity"
var 刷宝视频编辑视频页完成按钮id="com.jm.video:id/editer_tv_done"
var 刷宝视频发布页2="com.jm.component.shortvideo.activities.PublishVideoActivity"
var 刷宝视频发布按钮="com.jm.video:id/social_pubish_submit" //发布
var 刷宝发布作品申请权限id="com.jm.video:id/commit" //继续
var 刷宝视频页搜索按钮id="com.jm.video:id/iv_home_search"
var 刷宝视频广告跳过按钮id="com.jm.video:id/tt_top_skip"
var 刷宝视频广告关闭按钮1id="com.jm.video:id/tt_video_ad_close_layout"
var 刷宝视频广告关闭按钮2id="com.jm.video:id/iv_close"
var 刷宝视频恭喜获取关闭按钮id ="com.jm.video:id/imgClose"

var bt_sign_id=""
var bt_sign_text="立即签到" 

var tv_tab_title_id="com.jm.video:id/tv_tab_title"  // 不是唯一的id  改用text 区分
var tv_tab_任务_text="任务"
var tv_tab_我_text="我"
var tv_tab_首页_text="首页"
var tv_tab_直播_text="直播"
var im_rewardvideo_close_id="com.jm.video:id/iv_close"
var 数据库= storages.create("hsshuabao");
var 刷宝余额id="com.jm.video:id/tv_mine_money"
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
        fw.setSize(device.width-100, device.height/15)
        fwshow=true
    //     setTimeout(()=>{
    //         fwshow=false
    //         fw.setSize(1,1)
    //     },1500)
    })
// }

});
var 今日签到=function(){
    cs=数据库.get(today()+"_sign", false)
    alter("今日签到:"+cs)
    return cs
}
var 今日已签到=function(){
    
     数据库.put(today()+"_sign", true)
     alter("今日已签到")
}
var 今日时长=function(){
    return 数据库.get(today()+"_time", 0)
}
var 记录今日时长=function(t){
    数据库.put(today()+"_time",今日时长()+t)
}

var 今日提现=function(){
    return 数据库.get(today()+"_cashout",false)
}
var 今日已提现=function(){
    数据库.put(today()+"_cashout",true)
    alter("今日已提现")
}
var 上次金币=function(){ 
    return    数据库.get(today()+"_lastcoin", 0)
 } //可以通过上次的金币来判断是否 还可以获取金币
 var 上次余额=function(){ 
    return   数据库.get("lastmoney", 0.0)
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

//----------------------------------刷宝子程序--------------------------------------------//
function 刷宝上滑() {
    滑动次数=滑动次数+1
    alter("第 "+滑动次数+" 次上滑")
   
    if(!id(刷宝视频页搜索按钮id).exists()){
       回到刷宝视频页()
    }
    滑动(20,14,16,9,3,500,200)
    sleepr(6*1000,13*1000)
}

var 刷宝搜索用户=function(author){
    app.launch("刷宝短视频") 
}
function 回到刷宝首页(){
    alter("回到刷宝首页")
    i=0
    while(i<20){
        cp=currentPackage()
        alter("刷宝:检测当前包名："+cp)
        if(cp!=刷宝包名){
           app.launchPackage(刷宝包名)
            sleep(1000)
         }
         if(textclick("首页")){
            return true
        }
         if(id(刷宝视频页搜索按钮id).exists){
                textclick("推荐",0,0,device.width,300)
                return true
        }

        ca=currentActivity()
        alter("当前activity："+ca)
        if(ca==刷宝首页){
             return true
        }else{
            back()
          }
        弹窗()
        sleep(1000)
        i=i+1
      }
      if(i==20){
          强制关闭("刷宝短视频")
          return 回到刷宝首页()
      }
      return true
}
function 刷宝获取金币数(){
    alter("刷宝获取金币数")
    if (回到刷宝首页()){
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
    }else{
        强制关闭("刷宝短视频")
        return 刷宝获取金币数()
    }
}
var 刷宝获取当前余额=function(){
 if(回到刷宝首页()){
   while(true){
    textclick("我")
    sleep(300)
    money=id(刷宝余额id).findOne(1000)
    if(money){
        f=parseFloat(money.text())
        数据库.put("lastmoney",f)
        return f
    }
   }}else{
       强制关闭("刷宝短视频")
       return 刷宝获取当前余额()
   }
}
var 可以提现=function(){
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
var 刷宝提现=function(){
    alter("刷宝提现")
     f=刷宝获取金币数()
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
        if(可以提现()){
            i=0
             while(i<10){
                 sleep(1000)
                 textclick("立即提现")
                             
                 if(textclick("同意")){
                     alter("微信同意")
                 }
                 if(text("提现详情").exists()){
 
                     今日已提现()
                     back()
                     back()
                     回到刷宝视频页()
                     return true
                 }
                 if(text("去邀请好友").exists()){
                     back()
                     back()
                     今日已提现()
                     回到刷宝视频页()
                     return true
                 }
                 i=i+1
             }
             back()
             sleep(1000)
             back()
             回到刷宝视频页()
             return false
        }else{
            back()
            sleep(1000)
            back()
         回到刷宝视频页()
         return false
        }
        




     }else{
         回到刷宝视频页()
         return false
     }

    
}

function 弹窗() {
    alter("弹窗开始")
    sleep(50)
    if(text("立即领取").exists()){
        textclick("立即领取")
    }
    if(text("点击领取").exists()){
        textclick("点击领取")
    }
       idclick(刷宝视频恭喜获取关闭按钮id)
  
    // 
    if (id("cancel").exists()) {
        //id("commit").findOne(1000).click()
        back()
        sleep(1000)
    }
  
    if(text("继续看视频领取").findOne(1000)){
        text("继续看视频领取").findOne(1000).click()
    }
   
    // 去授权 痰喘
    if (text("去授权").exists()) {
        alter("弹窗函数---发现授权弹窗，开始关闭操作...")
        text("去授权").findOne(1000).click()
    }
  
    // APP卡顿提示
    if (text("关闭应用").exists()) {
        if (text("等待").exists()){
            alter('弹窗函数---检测到系统级弹窗，开始关闭操作...')
            text("等待").findOne(3000).click();
        }  
    }
  
    alter("弹窗结束")
}

function is_login(){
    // 进入个人中心
    vlause = "我"
    result = control_click(2, vlause)  
    result = text("微信账号登录").findOne(3000)
    if(result){
        back()
        return false
    }else{
        vlause = "首页"
        result = control_click(2, vlause)  
        return true
    }
}
var wechat_agree=function(){

}
function 在指定页面不断上滑(指定页面标识,回到指定页面函数,滑动时间秒){
 
        var 开始时间=new Date().getTime()
        while(new Date().getTime()-开始时间<滑动时间秒*1000){
            刷宝上滑()
            回到指定页面函数()
        }
  }
var 刷宝签到=function(){
    alter("刷宝签到")
    回到刷宝首页()
    clicktexts(["任务",'立即签到',"看视频签到"])
    while(true){
        弹窗()
        t= idclick(刷宝视频广告关闭按钮1id)
        alter("点击关闭按钮")
       if(t ) {
         alter("成功点击关闭按钮")
         今日已签到()
         return true
        }
        t= idclick(刷宝视频广告关闭按钮2id)
        alter("点击关闭按钮")
       if(t ) {
         alter("成功点击关闭按钮")
         今日已签到()
         return true
        }
        close=text("继续赚元宝").findOne(1000)
        if(close){
            今日已签到()
           return true
        }
        alter("等待视频广告3秒")
        sleep(3000)
        clicktexts(["任务",'立即签到',"看视频签到"])
    }
}
var 回到刷宝视频页=function(){
    alter("刷宝回到刷视频页")
   if(回到刷宝首页()){
    i=0
    while(!textclick("首页")&&!id(刷宝视频页搜索按钮id).exists()){
            sleep(1000)
        }
        return true
    }
    else{
        强制关闭("刷宝短视频")
        return  回到刷宝视频页()
    }
    
   
}
function 刷宝视频操作(){
    回到刷宝视频页()
    while(滑动次数<1000){
        刷宝上滑()
        if(滑动次数%100==0){
           if(!今日提现())(
            刷宝提现()
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
    firstrunapppackage(刷宝包名)
   todaytime=今日时长()
   alter("刷宝今日时长:"+todaytime)
   sleep(2000)
   if(!今日签到()){
       刷宝签到()
   }
   log("接下来就是刷视频操作")
   刷宝视频操作()
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
    if(app.exists())
    alter("守护线程开启")
    while(滑动次数<1000){
        sleep(60*1000)
        alter("判断是不是回到刷宝首页")
        回到刷宝视频页()
    }
});
启动线程()
