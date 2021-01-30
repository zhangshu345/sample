"ui";
importClass(com.hongshu.advice.AdviceManager)
importClass(android.content.ComponentName)
ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" title="系统快速设置"/>
        </appbar>
        <scroll ><vertical >
        <vertical id="bannerll" />
     
        <horizontal >  
            <button id="devicemanger" w="auto" h="auto" text="设备管理" />
            <button id="floaty" w="auto" h="auto" text="悬浮窗" />
            <button id="accessibility" w="auto" h="auto" text="无障碍" />
            <button id="usagestate" w="auto" h="auto" text="使用情况" />
            
         </horizontal>
        <horizontal >
            <button id="developer" w="auto" h="auto" text="开发者" />
            <button id="input" w="auto" h="auto" text="输入法" />
            <button id="wifi" w="auto" h="auto" text="WIFI" />
            <button id="vpn" w="auto" h="auto" text="VPN" />
        </horizontal>
        <horizontal > 
             <button id="appmanager" w="auto" h="auto" text="应用管理" />
             <button id="systemsetting" w="auto" h="auto" text="写系统配置" />
             <button id="screen" w="auto" h="auto" text="显示" />
            <button id="lang" w="auto" h="auto" text="显示语音" />
        </horizontal>
        <horizontal > 
             <button id="notificationlistener" w="auto" h="auto" text="通知管理" />
             <button id="float" w="auto" h="auto" text="开启开发悬浮" />
        </horizontal>
        <horizontal >
            <button id="exit" w="auto" h="auto" text="退出" />  
            <button id="rewardad" w="auto" h="auto" text="激励视频" />
            <button id="fullvideo" w="auto" h="auto" text="全屏视频" />
            <button id="refreshad" w="auto" h="auto" text="刷新" />
        </horizontal>
        <horizontal >
            <button id="banner" w="auto" h="auto" text="横幅" />  
            <button id="splash" w="auto" h="auto" text="开屏" />
            <button id="chaping" w="auto" h="auto" text="插屏" />
        </horizontal>
        <vertical id="advice" />
        </vertical>
       
        </scroll>
        
      
   </vertical>
);

function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}
var toComponentpage=function(pkg,className){
    var  cm = new ComponentName("com.android.settings",
    "com.android.settings.RadioInfo");
    intent.setComponent(cm);
    intent.setAction("android.intent.action.VIEW");
    startActivity(intent);
}

//横幅的监听器
var bannerListener = new com.hongshu.advice.base.BannerListener({
    onAdType:function(adtype){
        log("横幅:"+adtype)
    },
     onClicked:function(){
        log("横幅点击")
    },
    onShowed:function(){
            log("横幅展现")
    },
     onClosed:function(){
            log("横幅关闭")
     },
    onExposure:function(){
            log("横幅渲染")
    },
    onReceive:function(){
            log("横幅接收到广告")
    },
    onNoAd:function(s){
        log("横幅没有广告返回:"+s)
    },
    onAdReady:function(ad){
        log("横幅接收到广告")
    },
    onAdFailed:function(s){
        log("横幅失败:"+s)
    }
})

//原生广告监听者
var nativeListener =new com.hongshu.advice.base.NativeListener({
    onAdType:function(adtype){
        log("原生：onAdtype:"+adtype)
    },
    onNoAd:function(s){
        log("原生：没有返回广告:"+s)
    },
    onClosed:function(adview){
        // 返回是广告组件本身
        log("原生：closed")
    },
    onRenderSuccess:function(adview){
        log("原生：rendersuccess")
    },
    onRenderFail:function(adview){
        log("原生：renderfail")
    },
    onExposure:function(adview){
        log("原生：exposure")
    },
    onClicked:function(adview){
            log("原生：clicked")
    },
    onLoaded:function(adview){
        log("原生：loaded")
    }
})

// 激励视频的监听状态
var rewardListener=new  com.hongshu.advice.base.RewardListener({
    onAdType:function(adtype){
        log("激励视频 onadtype："+adtype)
    },
    onReward:function(rewardcoin){
        log("激励视频reward:"+rewardcoin)
    }
    ,onShow:function(s){
        log("激励视频show:"+s)
    }
    ,onLoadSuccee:function(adview){
        log("激励视频loadsuccee")
    },
    onLoadFail:function(adview){
        log("激励视频loadfail:")
    }
    ,onRewardClose:function(){
        log("激励视频奖励关闭")
    }
    ,onExposure:function(){
        log("激励视频expose")
    },onComplete:function(){
        log("激励视频complete")
    },onRewardFail:function(){
        log("激励视频rewardfail")
    },
    onVideoCached:function(){
        log("激励视频:onvideocached")
    }
})

var intertitialListener =new com.hongshu.advice.base.InterstialListener({
    onAdType:function(adtype){
                log("插屏：onAdType:"+adtype)
    },
    onVideoCached:function(){
        log("插屏：onVideoCached")
},
onClicked:function(){
    log("插屏：onClicked")
},
onClosed:function(){
    log("插屏：onClosed")
},
onNoAd:function(err){
    log("插屏：onNoAd",err)
},
onExposure:function(){
    log("插屏：onExposure")
},
onReceive:function(iad){
    log("插屏：onReceive",iad)
},
onShow:function(){
    log("插屏：onShow")
},
onRenderFail:function(s){
    log("插屏：onRenderFail"+s)
},
onRenderSuccee:function(s){
    log("onRenderSuccee"+s)
}
})

var fullvideoListener=new com.hongshu.advice.base.FullVideoListener({
onAdType:function(adtype){
        log("全屏视频：onAdType"+adtype)
},
onLoad:function(){
    log("全屏视频 onLoad")
},
onEnd:function(){
    log("全屏视频 onEnd")
},
onStart:function(){
log("全屏视频 onStart")
},

onVideoCached:function(){
log("全屏视频：onVideoCached")
},
onClicked:function(){
log("全屏视频：onClicked")
},
onClosed:function(){
log("全屏视频：onClosed")
},
onNoAd:function(err){
log("全屏视频：onNoAd",err)
},
onExposure:function(){
log("全屏视频：onExposure")
},
onReceive:function(iad){
log("全屏视频：onReceive",iad)
},
onVideoInit:function(){
log("全屏视频：onVideoInit")
},
onVideoInit:function(){
    log("全屏视频：onVideoInit")
    },
onVideoLoading:function(){
        log("全屏视频：onVideoLoading")
},
onVideoReady:function(l){
            log("全屏视频：onVideoReady",l)
 },
 onVideoStart:function(){
                log("全屏视频：onVideoStart")
 },
 onVideoPause:function(){
                    log("全屏视频：onVideoPause")
                    },
 onVideoComplete:function(){
         log("全屏视频：onVideoComplete")
   },
onVideoError:function(){
       log("全屏视频：onVideoError")
   },

   onVideoPageOpen:function(){
    log("全屏视频：onVideoPageOpen")
},
onVideoPageClose:function(){
    log("全屏视频：onVideoPageClose")
}
}
)
//
ui.float.on("click",function(){
    com.hongshu.autotools.core.floatmenu.FloatyWindowManger.showDevelopCircularMenu()
})

var admanager=AdviceManager.getInstance();
admanager.showNative(ui.rewardad.getContext(),ui.advice,nativeListener)
ui.splash.on("click",function(){
    admanager.showOneSplash(ui.splash.getContext())
})
ui.refreshad.on("click",function(){
    admanager.showNative(ui.rewardad.getContext(),ui.advice,nativeListener)
})
ui.banner.on("click",function(){
    admanager.showBanner(ui.banner.getContext(),ui.bannerll,bannerListener)
})

ui.fullvideo.on("click",function(){
   admanager.showFullVideo(ui.rewardad.getContext(),fullvideoListener)
})

ui.chaping.on("click",function(){
    admanager.showInterstial(activity,intertitialListener)
})

ui.rewardad.on("click",function(){
    admanager.showRewardVideoAd(ui.rewardad.getContext(),rewardListener)
 })

ui.notificationlistener.on("click",function(){
    totificationlistenersetting()
 })

ui.systemsetting.on("click",function(){
    tomangerwritesetting()
})

ui.screen.on("click",function(){
    todisplaysetting()
})

ui.emitter.on("resume",function(){
   admanager.showNative(ui.rewardad.getContext(),ui.advice,nativeListener)
})



ui.lang.on("click",function(){
    tolanguagesetting()
})

ui.exit.on("click",function(){
    ui.finish()
    exit()
})
 ui.appmanager.on("click",function(){
    toappmanagesetting()
}) 

ui.devicemanger.on("click",function(){
    todeviceadmin()
})

ui.floaty.on("click",function(){
    tofloatysetting()

})
ui.vpn.on("click",function(){
    tovpnsetting()

})
ui.developer.on("click",function(){
    todevelopersetting()

})
ui.wifi.on("click",function(){
    towifisetting()

})

ui.accessibility.on("click",function(){
    toaccessibilitysetting()
})

ui.usagestate.on("click",function(){
    tousagestate()
})

ui.input.on("click",function(){
    toinputsettings()
})

var  tofloatysetting=function(){
    let i = app.intent({
         action: "android.settings.action.MANAGE_OVERLAY_PERMISSION",
         flags:["activity_new_task"]
         // data: "file:///sdcard/1.png"
     });
     context.startActivity(i);
 }
 
 var  todevelopersetting=function(){
     let i = app.intent({
          action: "android.settings.APPLICATION_DEVELOPMENT_SETTINGS",
          flags:["activity_new_task"]
          // data: "file:///sdcard/1.png"
      });
      context.startActivity(i);
  }
   
 var toPkgandClass=function(pkg,classname){
         let i = app.intent({
              packageName: pkg,
              className:classname,
              flags:["activity_new_task"]
              // data: "file:///sdcard/1.png"
          });
          context.startActivity(i);
 }
 
 var todeviceadmin=function(){
        toandroidsetting("com.android.settings.DeviceAdminSettings")
 }
 
 var toinputsettings=function(){
     let i = app.intent({
         action: "android.settings.INPUT_METHOD_SETTINGS",
         flags:["activity_new_task"]
         // data: "file:///sdcard/1.png"
     });
     context.startActivity(i);
 }
 
 
 var toinputmethodsubtypesetting=function(){
     tosettingsbyaction("android.settings.INPUT_METHOD_SUBTYPE_SETTINGS")
 }
 
 
 var tolanguagesetting=function(){
     let i = app.intent({
         action: "android.settings.LOCALE_SETTINGS",
         flags:["activity_new_task"]
         // data: "file:///sdcard/1.png"
     });
     context.startActivity(i);
 }
 
 
 var tosettingsbyaction=function(actionname){
     let i = app.intent({
         action: actionname,
         flags:["activity_new_task"]
         // data: "file:///sdcard/1.png"
     });
     context.startActivity(i);
 }
 
 
 var totificationlistenersetting=function(actionname){
    let i = app.intent({
        action: "android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS",
        flags:["activity_new_task"]
        // data: "file:///sdcard/1.png"
    });
    context.startActivity(i);
}


 var toairpalnemodesetting=function(){
     tosettingsbyaction("android.settings.AIRPLANE_MODE_SETTINGS")
 }
 
 var tosearchsetting=function(){
     tosettingsbyaction("android.search.action.SEARCH_SETTINGS")
 }
 
  //到android设置页面
var  toandroidsetting=function(classname){
      toPkgandClass("com.android.settings",classname)
}
 
 
  //到用户使用情况页面
 var tousagestate=function(){
     tosettingsbyaction("android.settings.USAGE_ACCESS_SETTINGS")
 }
 
 var toaccessibilitysetting=function(){
     tosettingsbyaction("android.settings.ACCESSIBILITY_SETTINGS")
 }
 
 var tosystemsetting=function(){
     tosettingsbyaction("android.settings.SETTINGS")
 }
 var towifisetting=function(){
     tosettingsbyaction("android.settings.WIFI_SETTINGS")
 }
 
 var toapnsetting=function(){
     tosettingsbyaction("android.settings.APN_SETTINGS")
 }
 var todatesetting=function(){
     tosettingsbyaction("android.settings.DATE_SETTINGS")
 }
 
 var towifiipsetting=function(){
     tosettingsbyaction("android.settings.WIFI_IP_SETTINGS")
 }
 
 var tovpnsetting=function(){
     tosettingsbyaction("android.settings.VPN_SETTINGS")
 }
 
 var tophonenetsetting=function(){
     tosettingsbyaction("android.settings.DATA_ROAMING_SETTINGS")
 }
 
 var tosecuritysetting=function(){
     tosettingsbyaction("android.settings.SECURITY_SETTINGS")
 }
 
 var todisplaysetting=function(){
     tosettingsbyaction("android.settings.DISPLAY_SETTINGS")
 }
 var toappmanagesetting=function(){
     tosettingsbyaction("android.settings.MANAGE_APPLICATIONS_SETTINGS")
 }
 var toallappmanagesetting=function(){
     tosettingsbyaction("android.settings.MANAGE_ALL_APPLICATIONS_SETTINGS")
 }
 
 
 var tomangerwritesetting=function(){
     tosettingsbyaction("android.settings.action.MANAGE_WRITE_SETTINGS")
 }
 
 
 var toignorebatteryoptintizationsetting=function(){
    tosettingsbyaction("android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS")
 }
