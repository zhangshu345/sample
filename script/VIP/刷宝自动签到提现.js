auto.waitFor()
auto.setMode("normal")
/*---------------------------------lib-------------------------------*/
/*明明标准为 作者昵称 简称+app全拼 */
var scriptname="刷宝自动签到提现"
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



log("屏幕宽度"+device)
log("imei"+device.getIMEI())
var 滑动次数=0
var islogin=false;


//----------------------------------刷宝子程序--------------------------------------------//
function 刷宝上滑() {
    滑动次数=滑动次数+1
    alter("第 "+滑动次数+" 次上滑")
     if(!id(刷宝视频页搜索按钮id).exists()){
       回到刷宝视频页()
    }
    滑动(20,12,16,9,3,500,200)
    sleepr(6*1000,13*1000)
}
function 刷宝下滑() {
    滑动次数=滑动次数+1
    alter("第 "+滑动次数/3+" 次下滑")
     if(!id(刷宝视频页搜索按钮id).exists()){
       回到刷宝视频页()
    }
    滑动(20,12,3,9,17,500,400)
    sleepr(6*1000,13*1000)
}

var 刷宝搜索用户=function(author){
    app.launch("刷宝短视频") 
}

function firststartapp(){
    log("第一次登录刷宝去 进行登录操作")
    clicktexts(["去授权","允许","允许","允许","取消","我","微信账号登录","同意"],1500,10000)
    sleep(1000)
  
   
}


function 回到刷宝首页(){
    alter("回到刷宝首页")
    i=0
    while(i<20){
        cp=currentPackage()
        if(cp!=刷宝包名){
            alter("刷宝:检测当前包名："+cp)
            app.launchPackage(刷宝包名)
            sleep(1000)
         }
         if(textclick("去授权")){
            islogin=false
            firststartapp()
         }
         closedialog()

        if(textclick("首页")){
            return true
        }
        if(text("我的钱包").exists()){
            back()
        }
         if(id(刷宝视频页搜索按钮id).exists){
              textclick("推荐",0,0,device.width,300)
             return true
        }else{
            back()
        }
        i=i+1
        if(i>=10){
            强制关闭("刷宝短视频")
            return 回到刷宝首页()
        }
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
        记录现在金币("shuabao",n)
       // 数据库.put(today+"_lastcoin",n)
       return n
     }
    }
    }else{
        强制关闭("刷宝短视频")
        return 刷宝获取金币数()
    }
}
var 检测绑定邀请=function(){
    i=0
    while(i<5){
        滑动(20,12,16,9,3,500,300)
        sleep(1000)
        if(text("我要借钱").exists()){
            if(textclick("补填邀请码")){
                sleep(1500)
                v= className("EditText").findOne()
                if(v){
                     v.setText(getrandforstrs(刷宝邀请码))
                     sleep(100)
                    if( textclick("提交领奖励")){
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
                return false
            }
        }
      i=i+1
   
    }
    
}


var 刷宝获取当前余额=function(){
 if(回到刷宝首页()){
   while(true){
    if (textclick("我")){
        刷宝下滑()
        sleep(1500)
    }
    
    sleep(500)
    money=id(刷宝余额id).findOne(1000)
    if(money){
        f=parseFloat(money.text())
        数据库.put("lastmoney",f)
        
        sleep(1000)
        检测绑定邀请()
        return f
    }
    clicktexts(["微信账号登录","同意"])
    closedialog()
    if(currentPackage!=刷宝包名){
        回到刷宝首页()
    }
   }
    }else{
       强制关闭("刷宝短视频")
       return 刷宝获取当前余额()
   }
}


var 刷宝可以提现=function(){
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
        if(刷宝可以提现()){
            i=0
             while(i<10){
                 sleep(1000)
                 textclick("立即提现")
                             
                 if(textclick("同意")){
                     alter("微信同意")
                     sleep(2000)
                     今日已提现("shuabao")
                     forcestop("刷宝短视频")
                     return true
                 }
                 if(text("提现详情").exists()){
                      今日已提现("shuabao")
                     forcestop("刷宝短视频")
                     回到刷宝视频页()
                     return true
                 }
                 if(text("去邀请好友").exists()){
                    back()
                     今日已提现("shuabao")
                     forcestop("刷宝短视频")
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
            forcestop("刷宝短视频")
         回到刷宝视频页()
         return false
        }
     }else{
         回到刷宝视频页()
         return false
     }
  }

function closedialog() {
    alter("关闭弹窗开始")
    sleep(50)
    clicktexts(["立即领取","点击领取","继续看视频领取","关闭应用","允许","取消"])
    idclick(刷宝视频恭喜获取关闭按钮id)
      // 
    if (id("cancel").exists()) {
        back()
        sleep(1000)
    }
  
     
}

var 刷宝签到=function(){
    alter("刷宝签到")
    回到刷宝首页()
    while(true){
        clicktexts(["任务"],1000,2000)
        close=text("继续赚元宝").findOne(1000)
        if(close){
            今日已签到()
           return true
        }
        if(textclick("立即签到")){
            sleep(1000)
            if(textclick("看视频签到")){
                i=0
                while(i<20){
                    alter("等待视频广告3秒")
                    sleep(3000)
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
                    i=i+1
                }
            }


        }
        closedialog()

        clicktexts(["任务",'立即签到',"看视频签到"],1000,2000)
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
        if(滑动次数%3==0){
            刷宝下滑()
        }
        if(滑动次数%2000==0){
           if(!今日提现("shuabao"))(
            刷宝提现()
           ) 
        }
     }
}

var 刷宝视频页没有视频文本集合=["空空如也","点击刷新"]

function 启动线程(){
    device.wakeUpIfNeeded()
    device.setMusicVolume(0)
    alter("刷宝自动刷视频")
    if(!app.getPackageName("刷宝短视频")){
        log("刷宝没有安装 进行安装")
        downloadandinstallapp("刷宝短视频")
    }
    刷宝获取当前余额()
    log("完毕")
    todaytime=今日时长("shuabao")
    alter("刷宝今日时长:"+todaytime)
//    sleep(1000)
   if(!今日签到("shuabao")){
       刷宝签到()
   }
    刷宝视频操作()
}
// runurl:https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/%E5%88%B7%E5%AE%9D%E8%87%AA%E5%8A%A8%E7%AD%BE%E5%88%B0%E6%8F%90%E7%8E%B0.js

启动线程()
