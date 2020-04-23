auto.waitFor()
auto.setMode("normal")

toastLog(device.brand)
//指定为夏普手机才开始安装 其他手机未测试
if(device.brand!="DOCOMO"){
    toastLog("不是夏普手机退出脚本")
    exit()
}
/*---------------------------------lib-------------------------------*/
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}

滑动次数=0
floaty.closeAll()
engines.stopOther()
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
log("公共函数实例化成功")
}else {
log("公共函数实例化失败,程序返回")
}

uninstallappbyname("唐诗宋词集合")