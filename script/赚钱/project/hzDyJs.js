
var HzDouyinClass = require("./hzDouyin.js");

var hzDyJs = function () {
    HzDouyinClass.call(this);
    this.dyUrl = "";
    this.dyUid = "";
    this.userName = "";
    this.appVersion = "";
    this.isInitListenDialog = false;
    this.config = {};
    this.shortID = "";
    this.secUid = "";
    this.quickVersion = true;//极速版本
    this.package = "com.ss.android.ugc.aweme.lite";
    this.detail = "snssdk2329://aweme/detail/";
    this.profile = "snssdk2329://user/profile";
    this.appName = "抖音短视频极速版"
    this.mainActivity = "com.ss.android.ugc.aweme.main.MainActivity";

    this.whoami = function(){
        log("i am DyJsClass")
    }
   
}
//查找通迅录 com.ss.android.ugc.aweme.friends.ui.RecommendContactActivity  跳过

module.exports = hzDyJs;