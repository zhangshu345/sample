"ui";
importClass(com.hongshu.advice.AdviceManager)
importClass(android.content.ComponentName)
ui.layout(
    <vertical  >
        <text id="closenative" text="关闭原生" gravity="center" w="*" h="auto"/>
        <vertical id="advice" />
        </vertical>
);

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
//
ui.closenative.on("click",function(){
   activity.finish()
})
var admanager=AdviceManager.getInstance();
admanager.showNative(activity,ui.advice,nativeListener)







