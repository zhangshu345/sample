// engines.execUrlScript("https://gitee.com/zhangshu345012/sample/blob/v1/script/VIP/月结套餐稳赚.js",{"useFeatures":["continuation"]})
importClass(com.hongshu.androidjs.core.script.Scripts)

 Scripts.INSTANCE.runUrlScript("测试","https://gitee.com/zhangshu345012/sample/raw/v2/script/VIP/月结套餐稳赚.js")
var runurlscript=function(name,url){
    content=httpget(url)
    if(content){
       engines.execScript(name,content, {"useFeatures":["continuation"]})
       last=app
    }
}

function httpget(url) {var r = http.get(url);    if (r.statusCode == 200) {   return r.body.string();  } else { toastLog("五秒后重试");sleep(5000);  return "";}  }
scripturl="https://gitee.com/zhangshu345012/sample/raw/v2/script/%E4%BA%8C%E7%BB%B4%E7%A0%81/%E4%BA%8C%E7%BB%B4%E7%A0%81%E7%94%9F%E6%88%90%E5%99%A8.js"
// engines.execUrlScript(scripturl,{})