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
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/yuedulib.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
log("公共函数实例化成功")
}else {
log("公共函数实例化失败,程序返回")
}

toastLog("开始自动安装应用")
device.wakeUpIfNeeded()
const installfiles=[]

installfiles.push({    "filename":"MD编辑器_1.1.0.apk",    "appname":"MD编辑器"})
installfiles.push({    "filename":"KeepHealth_1.3.1.apk",    "appname":"KeepHealth"})
installfiles.push({    "filename":"宝宝常识_2.1.4.apk",    "appname":"宝宝常识"})
installfiles.push({    "filename":"东东随便_1.3.1.apk",    "appname":"东东随便"})
installfiles.push({    "filename":"东览_1.1.0.apk",    "appname":"东览"})
installfiles.push({    "filename":"动物的叫声_1.6.0.apk",    "appname":"动物的叫声"})
installfiles.push({    "filename":"儿童绘画板_1.3.0.apk",    "appname":"儿童绘画板"})
installfiles.push({    "filename":"减压声音_1.3.1.apk",    "appname":"减压声音"})
installfiles.push({    "filename":"冥想音乐_1.1.0.apk",    "appname":"冥想音乐"})
installfiles.push({    "filename":"唐诗精选_1.2.1.apk",    "appname":"唐诗精选"})
//installfiles.push({    "filename":"唐诗宋词集合_1.1.1.apk",    "appname":"唐诗宋词集合_1.1.1.apk"})  App赚钱不理想 弹出白屏 未知原因
installfiles.push({    "filename":"小白闹钟天气_1.1.0.apk",    "appname":"小白闹钟天气"})
installfiles.push({    "filename":"小白日历_1.1.0.apk",    "appname":"小白日历"})
installfiles.push({    "filename":"小强助理_1.2.0.apk",    "appname":"小强助理"})
installfiles.push({    "filename":"休息声音_5.8.8.apk",    "appname":"休息声音"})
installfiles.push({    "filename":"英语四级单词汇_1.1.0.apk",    "appname":"英语四级单词汇"})
installfiles.push({    "filename":"一个就够_1.1.0.apk",    "appname":"一个就够"})

file_path_root = files.getSdcardPath()
installfiles.forEach(f=>{
    filePath = file_path_root + "/" + f.filename
    if(files.exists(filePath)){
        toastLog("开始安装应用"+f)
        if(!app.getPackageName(f.appname)){
            install_app(filePath)
        }
    }else{
        toastLog("本地没有找到从网络端下载")
        downloadApk(f.appname,"http://zhangshuhong888.iask.in:8989/"+f.filename,true)
    }
})

while(true){
    r=random(0,installfiles.size() )
    toastLog("随机数"+r)
    iapp=installfiles[r]
    runad(iapp.appname)

}



