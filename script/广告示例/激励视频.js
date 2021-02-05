"ui";
importClass(com.hongshu.advice.AdviceManager)
importClass(android.content.ComponentName)
var window=activity.getWindow();
window.getDecorView().setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT))
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

var admanager=AdviceManager.getInstance();
admanager.showRewardVideoAd(activity,rewardListener)

