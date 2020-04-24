// var arr = []
// var d = ["快手极速版", 2, 2]
// arr.push(d)
// d = ["彩蛋视频", 2, 2]
// arr.push(d)
// d = ["抖音极速版", 2, 2]
// arr.push(d)
// d = ["火山极速版", 2, 2]
// arr.push(d)


var storage = storages.create("applist@20200212");
var arr = storage.get("runlist")


var yun = 1
var loopnum = 0

sysinit()

run()

function run() {
    toast("系统初始化")
    log("系统初始化")
    //设置屏幕常亮，防止异常熄屏，为了安全，传入时间参数
    var alltimes = 0
    for (let i = 0; i < arr.length; i++) {
        alltimes = parseInt(arr[i].maxtime) + parseInt(alltimes)

    }
    if (alltimes == 0) {
        toast("没有选择APP，请重新选择后开始")
        return
    }
    device.keepScreenOn(60000 * alltimes * 10)
    // toast(arr)
    log("总运行时间为：" + alltimes + "分钟")

    // storage.put("items", arr);

    log("开始执行")

    // win.close()
    startnow()

}
//定义一个执行列表
function startnow() {

    var fornum = 100
    loopnum = 0

    for (let j = 0; j < fornum; j++) {

        for (let i = 0; i < arr.length; i++) {
            tempapp=arr[i]
            const 调度名字 = arr[i].name
            const 调度时长 = arr[i].maxtime
            log("调度名字",调度名字)

            loopnum = loopnum + 1
            // log("调度时长", 调度时长)
            if (调度时长 > 0) {
                //检测是要要启动该APP，主要查看时间参数
                // var tempapp = storage.get(调度名字)
            
                toastLog("tempapp", tempapp.name)
                
                toastLog(gettodaytime())
                if (gettodaytime() != tempapp.day) {
                    tempapp.onetime = 0
                    tempapp.day = gettodaytime()
                    storage.put(调度名字, tempapp)
                }
                if (tempapp.onetime >= tempapp.runtime) {
                    continue
                }
                // var allrunnum = parseInt(tempapp["allrunnum"])
                // var todayrunnum = parseInt(tempapp["todayrunnum"])
                var oneyuntime = 0
                var temptime = parseInt(tempapp.runtime)
                if(temptime <= 15)
                {
                    oneyuntime = temptime
                }
                else if(temptime <= 30)
                {
                    oneyuntime = parseInt(temptime/2) + 1
                }
                else if(temptime <= 60)
                {
                    oneyuntime = parseInt(temptime/3) + 1
                }
                else
                {
                    oneyuntime = parseInt(temptime/4) + 1
                }
                // var type = parseInt(tempapp["type"])
                // log(allrunnum,todayrunnum)
                // if (allrunnum == 0) {
                //     总调度(调度名字, arr[i][1], 1);
                //     sleep(1000)
                // }
                // if (type == 1) {
                //     if (todayrunnum == 0) {
                //         //执行容错逻辑
                //         if (allrunnum == 0)
                //         {
                //             break
                //         }
                //         总调度(调度名字, arr[i][1], 1);
                //         sleep(1000)
                //     }
                // }
                log("要启动的APP是:" + 调度名字 + "，时长是：" + oneyuntime)
                toast("开始执行" + 调度名字)
                // 总调度(调度名字, arr[i][1], oneyuntime);
                总调度(调度名字,2, oneyuntime);
                log("退出总调度")
                sleep(1000)
            }
        }

    }
    log("所有任务已执行完")
    log("关闭手机常亮设置")
    log("感谢您的使用，系统退出")
    device.cancelKeepingAwake()
}

// 调度程序
function 总调度(调度APP, 类型, 时长) {
    let tempapp = JSON.parse(storage.get(调度APP))//为啥不直接传过来还要保存在读取呢？
    // tempapp["allrunnum"] = parseInt(tempapp["allrunnum"]) + 1
    // tempapp["todayrunnum"] = parseInt(tempapp["todayrunnum"]) + 1
   // storage.put(调度APP, tempapp)
    let url = "apps/" + tempapp.name
    try {

        var subapp = instantiation(url)
        if (subapp != "") {
            eval(subapp)
            log(调度APP + "实例化成功")
        }
        else {
            log(调度APP + "实例化失败,程序返回")
            return
        }

        subapp = instantiation("app_lib")
        if (subapp != "") {
            eval(subapp)
            log("公共函数实例化成功")
        }
        else {
            log("公共函数实例化失败,程序返回")
            return
        }

        是否启动成功 = start_app(调度APP)
        if (!是否启动成功) {
            log("启动失败退出")
            return
        }
    }
    catch (err) {
        log("错误信息：" + err);
        sleep(2000)
        return
    }

    var lock = threads.lock();
    var complete = lock.newCondition();
    var 子线程 = null

    // 子线程 = threads.start(function () {
    //     启动线程(类型, 0)
    // });

    //默认开启自动签到,签到2次，防止出现意外，2次之后不再签到
    if (loopnum > 1) {
        子线程 = threads.start(function () {
            启动线程(类型, 0)
        });
    }
    else {
        子线程 = threads.start(function () {
            启动线程(类型, 1)
        });
    }

    threads.start(function () {
        log("开始监测APP运行-------")
        toast("开始监测APP运行-------")
        sleep(60000 * 时长);
        log("时间监控结束//////////////")
        toast("时间监控结束//////////////")
        lock.lock();
        complete.signal();
        lock.unlock();
    });
    子线程.waitFor();
    lock.lock();
    complete.await();
    lock.unlock();
    子线程.interrupt();
    //此处更新运行的时间

    //修改运行时间
    var tempdic = storage.get(调度APP)
    tempdic["runtime"] = parseInt(tempdic["runtime"]) + parseInt(时长)
    storage.put(调度APP, tempdic)


    toast(调度APP + "：准备结束子线程")
    log(调度APP + "：准备结束子线程")
    sleep(2000)
    // var 是否启动成功 = APP公用函数.close_app(调度APP)
    close_app(调度APP)
    toast('已完成结束子线程')
    log('已完成结束子线程')
}

function instantiation(varrurl) {
    var yunurl = "http://yuedu.xiequbo.cn/"
    yunurl = yunurl + varrurl + ".js"
    // log(yunurl)
    if (yun == 1) {
        var r = http.get(yunurl);
        // log("code = " + r.statusCode);
        if (r.statusCode == 200) {
            return r.body.string()

        } else {
            return ""
        }
    }
    if (yun == 0) {
        var c = files.cwd()
        var filepath = files.join(c, varrurl) + ".js"
        var r = files.read(filepath)
        return r
    }
}


function sysinit() {
    log("检测是否安装相应的APP，请稍候")
    // mylist.forEach(item => {
    //     var appname = item.title
    //     download(appname)
    // });
    for (let i = 0; i < arr.length; i++) {
        // alltimes = parseInt(arr[i][2]) + parseInt(alltimes)
        var appname = arr[i].name
        download(appname)
    }
}

function download(name) {

    var app_name2 = name
    // console.log('下载的名字是'+name);

    var url = 'http://apk.fuzhifutech.com/' + app_name2 + ".apk"
    if (getPackageName(app_name2)) {
        return
    }
    // 获取APP的名字
    // 在每个空格字符处进行分解。
    file_name_url = url.split("/");
    file_name = file_name_url[file_name_url.length - 1]
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
    toastLog(name + '下载完成');
    install_app(filePath, name)

}

function textclick(i,t,left,top,right,bottom){
    t=t || 500
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=text(i).boundsInside(left, top, right, bottom).findOne(t);
    if(f){
         if(!f.click()){
           
                b=f.bounds()
              r=click(b.centerX(),b.centerY())
           return r
        }else{
           
            return true
        }
    }
    return false
}

function idclick(id,t,left,top,right,bottom){
        t= t|| 500
        left = left || 0;
        top = top || 0;
        right = bottom || device.width;
        bottom = bottom || device.height;
        var f=id(id).boundsInside(left, top, right, bottom).findOne(t);
        if(f){
            if(!f.click()){
                b=f.bounds()
                bc=click(b.centerX(),b.centerY())
                if(bc){
                    alter("id："+id+"----点位成功点击")
                    return true
                }else{
                    alter("id："+id+"----点位失败点击")
                    return false
                }
               
            }else{
                alter("id："+id+"----控件点击成功")
                return true
            }
        }
        return false
    }


function clicktexts (texts,t,st){
   
    st=st || 500
    t=t || 500

    for(i=0;i<texts.length;i++){
        if(textclick(texts[i],t)){
            sleep(st)
        }
    }

}


function install_app(filePath, name) {
    ////--------------安装--------------////
    //  读取 apk
    app.viewFile(filePath)
    clickarray=["继续","始终允许","允许","安装","继续安装","下一步"]
   // installappwithfilepath(filePath)
    for (let i = 0; i < 100; i++) {
        // is_first = textMatches(/(始.*|.*终.*|.*允.*|.*许)/).findOne(1000);
        toast("检测中....")
        log("检测中....")
          clicktexts(clickarray)
         //这里是佳佳的那个hd1的 特殊设置
         is_button = text("安全保护").findOne(500)
         if (is_button) {
             toast("安全保护安全保护安全保护")
 
             var 坐标 = is_button.bounds()
             click(坐标.left + 5, 坐标.bottom - 2)
             sleep(500)
             toast("安全保护安全保护安全保护2222")
             // var 坐标 = is_button.bounds()
             // click(坐标.left + 5, 坐标.bottom - 2)
             while (true) {
                 is_first = id("security_install_protection_switch").findOne(500)
                 if (is_first) {
                     is_first.click()
                 }
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
            log("888")
            return
        }
        if (textclick("打开")){
            log("777")
            return
        }
    }
    back()
    sleep(1000)
}


function gettodaytime() {
    var nowday = new Date();
    var Y = nowday.getFullYear();
    var m = nowday.getMonth();
    var d = nowday.getDate();
    var now_time = Y + '-' + m + '-' + d;
    return now_time;
}