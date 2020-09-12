
var 隐藏=function(animationInfo, duration){
  var appGlobalControlCenter=animationInfo.appGlobalControlCenter
  appGlobalControlCenter.动画.渐渐隐藏(animationInfo, duration);
}
var 显示=function(animationInfo, duration){
  var appGlobalControlCenter=animationInfo.appGlobalControlCenter
  appGlobalControlCenter.动画.渐渐显示(animationInfo, duration);
}


var 悬浮菜单动作={
  隐藏:隐藏,
  显示:显示,
}

module.exports=悬浮菜单动作