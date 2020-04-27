auto.waitFor()
auto.setMode("normal")
importClass(com.hongshu.utils.AppUtils);
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

log("屏幕宽度"+device)
log("imei"+device.getIMEI())

var starttime=date.getTime()
var 滑动次数=0
var fwshow=false
var fw=floaty.rawWindow(
    <frame gravity="center">
    <text id="text" w="*" h="*" gravity="center" textSize="18sp" background="#55ffff00">悬浮文字</text>
    </frame>
);
fw.setSize(device.width, 120)
fw.setTouchable(false);
fw.setPosition(0,100)

var alter=sync(function(txt,t,left,top,width,height){
   console.log(txt)
   fw.text.setText(txt)

     ui.run(function(){
     })
  
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
function idclick(id,left,top,right,bottom){
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=id(id).boundsInside(left, top, right, bottom).findOne(1500);
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
function textclick(txt,t,left,top,right,bottom){
    t=t || 500
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=text(txt).boundsInside(left, top, right, bottom).findOne(t);
    if(f){
         if(!f.click()){
             alter("text："+txt+":点位开始成功")
                b=f.bounds()
              r=click(b.centerX(),b.centerY())
           return r
        }else{
            alter("text:"+txt+"----控件点击成功")
            return true
        }
    }
    return false
}
function textclickwithtime(i,t,left,top,right,bottom){
    t= t||500
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=text(i).boundsInside(left, top, right, bottom).findOne(t);
    if(f){
         if(!f.click()){
               b=f.bounds()
                x=b.centerX()
                y=b.centerY()
              r=click(x,y)
              alter("text："+i+":点位x:"+x+", y："+y)
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

var clicktexts=function(texts,t,st){
  
    st=st || 500
    t=t || 500

    for(i=0;i<texts.length;i++){
        if(textclick(texts[i],t)){
            sleep(st)
        }
    }

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
    alter("单位宽度："+w+"--"+h)
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
    if(texts.length>0){
        for(i=0;i<texts.length;i++){
            if(id(texts[i]).exists()){
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
//----------------------------------刷宝子程序--------------------------------------------//
function 刷宝上滑() {
    滑动次数=滑动次数+1
    alter("第 "+滑动次数+" 次上滑")
     if(!id(刷宝视频页搜索按钮id).exists()){
       gotoappvideo()
    }
    滑动(20,12,16,9,3,500,200)
    sleepr(6*1000,13*1000)
}
var 刷宝搜索用户=function(author){
    app.launch("刷宝短视频") 
}



function appgetcoinnumber(){
    show("刷宝获取金币数")
    i=0
    while(i<10){
    if (textclick("我")){
        sleep(2000)
        n=0
        while(n<10){
            coin=id(刷宝金币id).findOne(1000)
            if(coin){
                n=parseInt(coin.text())
                今日记录(appname,"coin",n)
              show("当前金币数:"+n)
               return n
             }else{
                滑动(20,10,4,11,17,500,300)
                sleep(3000)
             }
             n=n+1
        }
    }else{
        back()
        sleep(1500)
    }
     i=i+1
    }

 }
var appgetmoneyinfo=function(){
    i=i+1
   while(i<10){
       if( textclick("我")){
        sleep(3000)
        n=0
        while(n<10){
            money=id(刷宝余额id).findOne(500)
            if(money){
                f=parseFloat(money.text())
                今日记录(appname,"money",f)
                return f
            }else{
                滑动(20,10,4,11,17,500,300)
                sleep(3000)
            }
        }
       }else{
           back()
           sleep(1500)
       }

       i=i+1
}
  
}
var cantomoney=function(){
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
var apptomoney=function(){
    show("刷宝提现")
     f=appgetcoinnumber()
     if(f>6800){
        while(i<10){
           if(idclick(刷宝余额id)){
            show("点击刷宝余额成功")
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
           i=i+1
           
        }
        if(cantomoney()){
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
                     gotoappvideo()
                     return true
                 }
                 if(text("去邀请好友").exists()){
                     back()
                     back()
                     今日已提现()
                     gotoappvideo()
                     return true
                 }
                 i=i+1
             }
             back()
             sleep(1000)
             back()
             gotoappvideo()
             return false
        }else{
            back()
            sleep(1000)
            back()
         gotoappvideo()
         return false
        }
     }else{
         gotoappvideo()
         return false
     }
  }

function 弹窗() {
    alter("弹窗开始")
    sleep(50)
    clicktexts(["立即领取","点击领取","继续看视频领取","关闭应用","去授权"])
  
    idclick(刷宝视频恭喜获取关闭按钮id)
  
    // 
    if (id("cancel").exists()) {
        //id("commit").findOne(1000).click()
        back()
        sleep(1000)
    }
  
     
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

var 刷宝签到=function(){
    alter("刷宝签到")
    回到刷宝首页()
    clicktexts(["任务",'立即签到',"看视频签到"],1000,2000)
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
        clicktexts(["任务",'立即签到',"看视频签到"],1000,2000)
    }
}
var gotoappvideo=function(){
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
        return  gotoappvideo()
    }
}
function 刷宝视频操作(){
    gotoappvideo()
    while(滑动次数<1000){
        刷宝上滑()
        if(滑动次数%100==0){
           if(!今日提现())(
            apptomoney()
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
var 刷宝视频页没有视频文本集合=["空空如也","点击刷新"]

function 启动线程(){
    alter("刷宝自动刷视频")
    firstrunapppackage(刷宝包名)
   todaytime=今日时长()
   alter("刷宝今日时长:"+todaytime)
   sleep(1000)
   if(!今日签到()){
       刷宝签到()
   }
   log("接下来就是刷视频操作")
   刷宝视频操作()
}

var downloadandinstallapp=function(name){
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
        if(app.name==name){
        if(getPackageName(app.name)){
    
        }else{
            downloadApk(app.name,app.downloadurl)
        }
        }
    })
}
if(!getPackageName("快手极速版")){
    downloadandinstallapp("快手极速版")
    islogin=false
}



app.launchApp("看点快报")
 var ii=0
while(ii<30){
       alter("第"+ii)
    ii=ii+1
    log("l-"+ii)
    sleep(1000)

     clicktexts(["允许"])
    log("sss-"+ii)
}