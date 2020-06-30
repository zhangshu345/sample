auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        toastLog("五秒后重试")
        sleep(5000)
        return httpget(url)
    }
}

var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/yuedulib.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
}else {
toastLog("公共函数实例化失败,程序返回")
}

kouling="请帮帮我，谢谢你\n复制口令，打开pin多多C7qSc4rz0PUkuPZ1"
setClip(kouling)
appname="拼多多"
if(!getPackageName("拼多多")){
    downloadandinstallapp("拼多多","com.xunmeng.pinduoduo")
}
sleep(2000)
setClip("复制口令，打开pin多多406xqp0uPZ4RCaD6")
app.launch("com.xunmeng.pinduoduo")

sleep(5000)
clicktexts(["允许"])