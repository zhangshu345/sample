auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        toastLog("请检测网络是否畅通,五秒后再次尝试")
        sleep(5000)
        return httpget(url)
    }
}

//快手极速版自动刷金币  签到 和 滑块验证 引流 自动私信 评论 
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/script/VIP/yuedulib.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
show("公共函数实例化成功")
}
else {
show("公共函数实例化失败,程序返回")
}

const pddpkg="com.xunmeng.pinduoduo"
const pddurl="https://w.url.cn/s/AmkaJOt"
微信浏览(pddurl)
sleep(5000)
click(device.width/2,device.height/2)
sleep(2000)
doactionmaxtime(function(){
    textclick("安全更新")
    log("循环点击安装")
    clicknode(text("下载").clickable(true).findOne(300))

    if(maytextclick("设置")){
        sleep(2000)
        textclick("关")

    }
   clicknode( desc("向上导航").clickable(true).findOne(300))
    if(textclick("安装")){
        text("打开").waitFor()
       if( textclick("打开")){

       }
    }

    textclick("我知道了")
    textclick("允许")
    textclick("開")
    // if(currentPackage()==pddpkg){
    //     log("当前包名为拼多多")
    //     return true
    // }
},60000)


