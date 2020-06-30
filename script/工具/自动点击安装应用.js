auto.waitFor()
auto.setMode("normal")
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

var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/yuedulib.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
log("公共函数实例化成功")
}else {
log("公共函数实例化失败,程序返回")
}



show("开始辅助点击应用安装 自动完成后关闭")
creatsetfloatywindow()  //创建设置悬浮窗

install_app()
