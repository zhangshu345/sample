"ui";

importClass(com.hongshu.advice.AdviceManager)
importClass(android.content.ComponentName)
// ui.layout(
//     <vertical   w="1" h="1">
//         <text></text>
//    </vertical>
// );



var window=activity.getWindow();
window.getDecorView().setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT))
// window.getDecorView()
// var windowparams=window.getAttributes();
// windowparams.alpha=0.0
// window.setAttributes(windowparams)


function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
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
        activity.finish()
    }
    ,onRewardClose:function(){
        log("激励视频奖励关闭")
        activity.finish()
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


var admanager=AdviceManager.getInstance();
// admanager.showNative(activity,ui.advice,nativeListener)
// ui.splash.on("click",function(){
//     admanager.showOneSplash(ui.splash.getContext())
// })
// ui.refreshad.on("click",function(){
//     admanager.showNative(ui.rewardad.getContext(),ui.advice,nativeListener)
// })
// ui.banner.on("click",function(){
//     admanager.showBanner(ui.banner.getContext(),ui.bannerll,bannerListener)
// })

// ui.fullvideo.on("click",function(){
//    admanager.showFullVideo(ui.rewardad.getContext(),fullvideoListener)
// })

// ui.chaping.on("click",function(){
//     admanager.showInterstial(activity,intertitialListener)
// })

admanager.showRewardVideoAd(activity,rewardListener)

