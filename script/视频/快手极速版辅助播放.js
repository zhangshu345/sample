
auto.waitFor()
var apppkg="com.kuaishou.nebula"
var appname="快手极速版"
var apphomeactivity="com.yxcorp.gifshow.HomeActivity"
var appsignactivity="com.yxcorp.gifshow.webview.KwaiWebViewActivity" //金币展示页
var appliveactivity="com.yxcorp.gifshow.detail.PhotoDetailActivity"  //直播页

function 检测视频进度(){
    nowdesc=gettextFromid("com.kuaishou.nebula:id/label")
         if(nowdesc){
            log("标题:"+nowdesc)
         }else{
            比例滑动(20,10,17,10,3,500,300)
            return  
         }

         if(text("点击进入直播间").visibleToUser().findOne(300)){
            比例滑动(20,10,17,10,3,500,300)
            return  
         }

    click(device.width/2,device.height/2)
   let delaytime=获取当前视频总时长()-获取当前视频播放进度()
    if(delaytime>0){
        sleep(delaytime*1000-100)
        比例滑动(20,10,17,10,3,500,300) 
    }else{
        比例滑动(20,10,17,10,3,500,300)
    }
}

function 获取当前视频总时长(){
ttxet=gettextFromid("com.kuaishou.nebula:id/player_duration")
if(ttxet){
    tt=ttxet.split(":")
    if(tt.length==2){
        zt=parseInt(tt[0])*60+parseInt(tt[1])
      return zt
    }
}
return 0;
}

function 获取当前视频播放进度(){
    ttxet=gettextFromid("com.kuaishou.nebula:id/player_current_position")
    if(ttxet){
        //分割文本为两部分
       let  tt=ttxet.split(":")
        if(tt.length==2){
            // 解析文本为整数 
            zt=parseInt(tt[0])*60+parseInt(tt[1])
          return zt
        }
    }
    return 0;
}

while(true){
            // 检测是否是 目标页面
            node_tab= packageName(apppkg).className("android.view.View").depth(9).drawingOrder(3).clickable().findOne(300)
            if(node_tab){
                if(node_tab.selected()){
                 
                    检测视频进度()
            }
    }else{
        log("快手极速版未在前台")
        sleep(15000)
    }
}
