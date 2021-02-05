function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}
var s=httpget("https://gitee.com/zhangshu345012/sample/raw/v2/script/广告示例/激励视频.js");
log(s)
Scripts.runStringScript("激励视频",s,null,null);