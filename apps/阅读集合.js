/*我的阅读集合  使用 配置直接从码云获取 配置文件
 */
//快手极速版自动刷金币  签到 和 滑块验证 引流 自动私信 评论 
auto.waitFor()
auto.setMode("normal")
/*---------------------------------lib-------------------------------*/
/*明明标准为 作者昵称 简称+app全拼 */
var apppackage="阅读集合"

var 数据库= storages.create("hongshuyuedujihe");


//下载app
function downloadApk(name,url) {
   // console.log('下载的名字是'+name);

    // 获取APP的名字
    // 在每个空格字符处进行分解。
    file_name_url = url
    file_name = name+".apk"
    console.log('要下载的APP的：' + file_name);
    // 设置APP的路径
    file_path_root = files.getSdcardPath()

    filePath = file_path_root + "/" + file_name

    importClass('java.io.FileOutputStream');
    importClass('java.io.IOException');
    importClass('java.io.InputStream');
    importClass('java.net.MalformedURLException');
    importClass('java.net.URL');
    importClass('java.net.URLConnection');
    importClass('java.util.ArrayList');

    var url = new URL(url);
    var conn = url.openConnection(); //URLConnection
    var inStream = conn.getInputStream(); //InputStream
    var fs = new FileOutputStream(filePath); //FileOutputStream
    var connLength = conn.getContentLength(); //int
    var buffer = util.java.array('byte', 1024); //byte[]
    var byteSum = 0; //总共读取的文件大小
    var byteRead; //每次读取的byte数
    // log('要下载的文件大小=');
    // log(connLength);
    var threadId = threads.start(function () {
        while (1) {
            var 当前写入的文件大小 = byteSum;
            var progress = (当前写入的文件大小 / connLength) * 100;
            if (progress > 0.1) {
                var progress = parseInt(progress).toString() + '%';
                ui.run(function () {
                    // console.log(name + "下载进度", progress);
                    toast(name + "下载进度" + progress)
                    // w.progressNum.setText(progress);
                });
                if (当前写入的文件大小 >= connLength) {
                    break;
                }
            }
            sleep(1000);
        }
    });
    while ((byteRead = inStream.read(buffer)) != -1) {
        byteSum += byteRead;
        //当前时间
        currentTime = java.lang.System.currentTimeMillis();
        fs.write(buffer, 0, byteRead); //读取
    }
    threadId && threadId.isAlive() && threadId.interrupt();
    toastLog(name+'下载完成');
    install_app(filePath,name)

}
function install_app(filePath, name) {
    ////--------------安装--------------////
    //  读取 apk
    installapp(filePath)
    clickarray=["继续","始终允许","允许","安装","完成","继续安装","下一步"]
   // installappwithfilepath(filePath)
    for (let i = 0; i < 100; i++) {
        // is_first = textMatches(/(始.*|.*终.*|.*允.*|.*许)/).findOne(1000);
        toast("检测中....")
          clicktexts(clickarray)
         //这里是佳佳的那个hd1的 特殊设置
        if (textclick("安全保护")) {
            toast("安全保护安全保护安全保护")
            sleep(500)
            // var 坐标 = is_button.bounds()
            // click(坐标.left + 5, 坐标.bottom - 2)
            while (true) {
                idclick("security_install_protection_switch")
             
                sleep(500)
                is_first = id("security_install_protection_switch").findOne(500)
                if (!is_first.checked()) {
                    console.log("已取消保护");
                    toast("已取消保护")
                    sleep(1000)
                    break;
                }
            }
            back()
           
        }
        if (textclick("完成")){
            return
        }
        if (textclick("打开")){
            return
        }
    }
    back()
    sleep(1000)
}
var apps
var checkinstallapp=function(){
    var configurl="https://gitee.com/zhangshu345012/sample/raw/v1/config/%E9%98%85%E8%AF%BB%E9%9B%86%E5%90%88%E9%85%8D%E7%BD%AE.json"
    var appconfig=httpget(configurl)
    alter(appconfig)
     apps=JSON.parse(appconfig)
    /*
    [{"name":"快手极速版","package":"com.kuaishou.nebula","bmobid":"q7B36667","onetime":1800,"maxtime":10800,"version":100,"downloadurl":"https://95c955397282082ce6a6f5ea1f576c4b.dd.cdntips.com/imtt.dd.qq.com/16891/apk/4CE630CC2B9657E4523492FDDDA98C24.apk?mkey=5e43f056764dc5cf&f=0c59&fsname=com.kuaishou.nebula_2.0.3.177_177.apk&csr=1bbd&proto=https"},
    {"name":"刷宝短视频","package":"com.jm.video","bmobid":"waVs777U","onetime":1800,"maxtime":10800,"version":100,"downloadurl":"https://213d4f42b3957cb9ebeb02ad91be865d.dd.cdntips.com/imtt.dd.qq.com/16891/apk/73BDFF685D5E50F887C4972A73D6AD74.apk?mkey=5e43f1d1764dc5cf&f=24c5&fsname=com.jm.video_1.950_1950.apk&csr=1bbd&proto=https"}
    ]*/
    
    apps.forEach(app => {
        alter("name:"+app.name+"package:"+app.package)
       
        stopOtherScript()
        if(getPackageName(app.name)){
    
        }else{
            downloadApk(app.name,app.downloadurl)
        }
        
        engines.execBmobScriptWithName(app.name,app.bmobid,{})
        fw.setSize(1,0)
        sleep(app.onetime*1000)
    })
    
}
var stopOtherScript=function(){
    var thisengs=engines.myEngine()
    var allengs=engines.all()
    allengs.forEach(e =>{
        if(e.getId()!=thisengs.getId()){
            engines.stop(e.getId())
        }
    })
}
while(true){
    checkinstallapp()
}


