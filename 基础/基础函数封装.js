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

var starttime=date.getTime()
var 滑动次数=0

var today=function(){
    return date.getFullYear()+"_"+date.getMonth()+"_"+date.getDate()
}


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
var 强制停止=function(appname){
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
      app.launchPackage(packagename)
    允许启动文字=['允许',"确定","始终允许","打开"]
    while(currentPackage()!=packagename){
        clicktexts(允许启动文字)
    }
    
}

