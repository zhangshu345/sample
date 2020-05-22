function run(apppkg){
    app.launch(apppkg)
    sleep(3000)
    n_i=0
    while(true){
        sleep(2000)
        log("循环次数："+n_i)
        ca=currentActivity()
        if(ca!=apphomeactivity){
            app_home_video()
        }else{
            //这里是视频上滑操作
            滑动(20,10,16,11,4,500,500)
            doactionmaxtime(actionother,10000,2000)

        }
        if(maytextclick("看视频奖励最高")){
            seerewardvideo(apppkg)
        }
        if(!todaysign){
            app_sign()
        }
        close_ad_qq(apppkg)
        close_ad_toutiao(apppkg)
        close_ad_iclicash(apppkg)
        n_i=n_i+1
    }
}

var actionother=function(){
    if(maytextclick("看视频奖励最高")){
        seerewardvideo(apppkg)
    }
    if(textclick("重试")){
        sleep(2000)
    }
}
var  app_home_video=function(){
    n_home_video=0
    while(n_home_video<20){
        clicktexts(["同意并继续","允许","允许","允许","始终允许","始终允许","始终允许","首页","推荐"])
        ca=currentActivity()
        if(ca==apphomeactivity){
            return true
        }
        if(maytextclick("看视频奖励最高")){
            seerewardvideo(apppkg)
        }
        if(!idContains(apppkg).findOne(100)){
            app.launch(apppkg)
            sleep(3800)
             
          }
        n_home_video=n_home_video+1
        sleep(1000)
    }
}
//app 登录
var app_login=function(){

}

//app 微信登录
var app_login_weixin=function(){

}

//app_手机号登录
var app_login_phone=function(){
    pn=phonenumber();
    if(!pn){
        toastLog("暂停300秒用于手动登录")
        sleep(300000) 
        return true
    }
    if(textclick("手机号登录并领取",1000)){
       id("com.video.yy:id/account_edit").findOne(100).setText(pn)
       sleep(500)
       idclick("com.video.yy:id/btn_get_validate")
       sleep(1000)
      let pcode= get_phone_code()
      if(pcode){

      }

    }
}
//app 签到
var app_sign=function(){
    if(currentActivity()==apphomeactivity){
       if( textclick("我的")){

       }

    }
}

//app提现
var app_tomoney=function(){

}

