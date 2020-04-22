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

toastLog("开始自动安装应用")
const installfiles=["KeepHealth_1.3.1.apk"
,"MD编辑器_1.1.0.apk","宝宝常识_2.1.4.apk","东东随便_1.3.1.apk","东览_1.1.0.apk"
,"动物的叫声_1.6.0.apk","儿童绘画板_1.3.0.apk","减压声音_1.3.1.apk","冥想音乐_1.1.0.apk"
,"随便粘_1.3.1.apk","唐诗精选_1.2.1.apk","唐诗宋词集合_1.1.1.apk","小白闹钟天气_1.1.0.apk"
,"小白日历_1.1.0.apk","小强助理_1.2.0.apk","休息声音_5.8.8.apk","一个就够_1.1.0.apk","英语四级单词汇_1.1.0.apk"]
file_path_root = files.getSdcardPath()
installfiles.forEach(f=>{
       
    filePath = file_path_root + "/" + f
    if(files.exists(filePath)){
        toastLog("开始安装应用"+f)
        install_app(filePath)
    }else{
        toastLog("本地没有找到从网络端下载")
    }
})

