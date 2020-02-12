auto.waitFor()
auto.setMode("normal")

//循环模式下，记录循环到的次数，便于控制签到
var loopnum = 0


//注册APP列表
var mylist = []
var newslist = []
var videolist = []
var tjrlist = []
//设备信息
var dev_w = device.width;
var dev_h = device.height;
//本地及远程代码标识
var yun = 1

//其中，1表示文章，2表示视频
addnewapp("快手极速版", 2, 30)
addnewapp("刷宝短视频", 2, 30)
addnewapp("彩蛋视频", 2, 15)
addnewapp("抖音极速版", 2, 10)
addnewapp("火山极速版", 2, 20)
addnewapp("牛角免费小说", 1,50)
addnewapp("想看", 1, 15)
// addnewapp("中青看点", 1,5)
addnewapp("闪电盒子", 1,15)
addnewapp("欢乐盒子", 1,15)
// addnewapp("小猪帮帮", 1)
addnewapp("快逗短视频",2,30)
addnewapp("快看点", 2, 10)
addnewapp("追看视频", 2, 10)
addnewapp("快看点", 1, 10)
// addnewapp("抖呱呱极速版", 1)
// addnewapp("聚看点", 2)
addnewapp("聚看点", 1, 15)
addnewapp("趣看视频", 2, 15)
addnewapp("微鲤看看", 1,10)
// addnewapp("趣看天下", 2,10)




sysinit()


//获取机器信息
var brand = device.brand
var product = device.product
var serial = device.serial
var sdklnt = device.sdkInt
var release = device.release
var imei = device.getIMEI()
var code = md5(imei);


var userflag = checkuser()

// var yhr = addtjr("123")

var IMEI = md5(device.getIMEI())
var mcode = "机器码为：" + IMEI

var win = floaty.window(
    <vertical background="#ffffff">
        <text id="toolbar" background="#009687" h="30sp" text="悦读九州(1.3.2)" gravity="center|bottom" textSize="18sp" textColor="white" />

        <horizontal layout_width="match_parent" background="#009687" >
            <text id="home" layout_weight="1" margin="10dp" gravity="center|bottom">首页</text>
            <text id="news" layout_weight="1" margin="10dp" gravity="center|bottom">新闻</text>
            <text id="video" layout_weight="1" margin="10dp" gravity="center|bottom">视频</text>
            <text id="invite" layout_weight="1" margin="10dp" gravity="center|bottom">邀请</text>
        </horizontal>

        <horizontal>
            <button id="selectAll" text="开始" />
            <button id="exit" text="退出" />
            <button id="hj" text="环境设置" />
            <button id="cksq" text="机器码" />
            {/* <button id="saveconfig" text="保存配置" /> */}
        </horizontal>
        <viewpager id="viewpager">
            <frame>
                <ScrollView>
                    <vertical>
                        <text text="本版本为内测版本" textColor="red" maxLines="1" marginLeft="10" textSize="25sp" />
                        <text text="如遇问题请及时反馈" textColor="red" maxLines="1" marginLeft="10" textSize="25sp" />
                        <checkbox id="isfor" marginLeft="3" marginRight="3" checked="true" text="循环模式【执行10次】" />
                        <checkbox id="onekey" marginLeft="3" marginRight="3" checked="false" text="自动配置【单次15分钟】" />
                        <checkbox id="autosign" marginLeft="3" marginRight="3" checked="false" text="自动签到【当前不稳定】" />
                        <text text="授权信息(点击上方机器码按钮自动复制机器码)" textColor="#7CCD7C" maxLines="1" gravity="center" marginLeft="10" textSize="13sp" />
                        <text id="machinecode" textColor="#222222" maxLines="1" margin="10" textSize="14sp" />
                        <text id="usetime" text="可用时间：永久有效" textColor="#222222" maxLines="1" margin="10" textSize="14sp" />



                    </vertical>
                </ScrollView>

            </frame>
            <frame>
                <ScrollView>
                    <list id="newsList">
                        <card w="*" h="50" margin="10 5" cardCornerRadius="2dp"
                            cardElevation="1dp" foreground="?selectableItemBackground">
                            <horizontal gravity="center_vertical">
                                <checkbox id="{{this.chid}}" marginLeft="3" marginRight="3" checked="{{this.done}}" />
                                <text id="title" text="{{this.title}}" textColor="#222222" maxLines="1" marginLeft="4" marginRight="6" />
                                <text text="下载" textColor="blue" maxLines="1" marginLeft="3" marginRight="3" />
                                <text text="今日已读:" textColor="green" maxLines="1" />
                                <input id="abd" maxLines="1" text="0" textColor="green" />
                                <text text="总时长:" textColor="blue" maxLines="1" />
                                <input id="{{this.tid}}" maxLines="1" text="{{this.allsum}}" inputType="number" />
                                <text text="分钟" textColor="blue" maxLines="1" />
                            </horizontal>
                        </card>
                    </list>
                </ScrollView>
            </frame>
            <frame>
                <ScrollView>
                    <list id="videoList">
                        <card w="*" h="50" margin="10 5" cardCornerRadius="2dp"
                            cardElevation="1dp" foreground="?selectableItemBackground">
                            <horizontal gravity="center_vertical">
                                <checkbox id="{{this.chid}}" marginLeft="3" marginRight="3" checked="{{this.done}}" />
                                <text id="title" text="{{this.title}}" textColor="#222222" maxLines="1" marginLeft="4" marginRight="6" />
                                <text text="下载" textColor="blue" maxLines="1" marginLeft="3" marginRight="3" />
                                <text text="今日已读:" textColor="green" maxLines="1" />
                                <input id="abd" maxLines="1" text="0" textColor="green" />
                                <text text="总时长:" textColor="blue" maxLines="1" />
                                <input id="{{this.tid}}" maxLines="1" text="{{this.allsum}}" inputType="number" />
                                <text text="分钟" textColor="blue" maxLines="1" />
                            </horizontal>
                        </card>
                    </list>
                </ScrollView>
            </frame>
            <frame>
                <ScrollView>
                    <vertical>

                        <text text="邀请信息(请准确填写您的推荐人信息)" textColor="#7CCD7C" maxLines="1" gravity="center" marginLeft="10" textSize="13sp" />

                        <horizontal gravity="center_vertical">
                            <text text="推荐人:" textColor="#222222" maxLines="1" margin="10" textSize="18sp" />
                            <input id="myinvite" maxLines="1" hint="请输入推荐人机器码" />
                            <button id="btjr" text="提交" />
                        </horizontal>
                        <text text="您邀请的用户" textColor="#7CCD7C" maxLines="1" gravity="center" marginLeft="10" textSize="13sp" />
                        {/* <text text="您暂时还没有邀请到小伙伴，加油哦~" textColor="#222222" maxLines="1" gravity="center" marginLeft="10" textSize="13sp" /> */}
                        <card w="*" h="50" margin="10 5" cardCornerRadius="2dp"
                            cardElevation="1dp" foreground="?selectableItemBackground">
                            <horizontal gravity="center_vertical">

                                <text text="机器码" textColor="blue" maxLines="1" marginLeft="3" marginRight="3" layout_weight="1" gravity="center|bottom" />
                                <text text="时间" textColor="blue" maxLines="1" layout_weight="1" gravity="center|bottom" />
                                <text text="级别" textColor="blue" maxLines="1" layout_weight="1" gravity="center|bottom" />

                            </horizontal>
                        </card>

                        <list id="tjrList">
                            <card w="*" h="50" margin="10 5" cardCornerRadius="2dp"
                                cardElevation="1dp" foreground="?selectableItemBackground">
                                <horizontal gravity="center_vertical">

                                    <text text="{{this.jqcode}}" textColor="blue" maxLines="1" marginLeft="3" marginRight="3" layout_weight="1" gravity="center|bottom" />
                                    <text text="{{this.ctime}}" textColor="blue" maxLines="1" layout_weight="1" gravity="center|bottom" />
                                    <text text="{{this.level}}" textColor="blue" maxLines="1" layout_weight="1" gravity="center|bottom" />

                                </horizontal>
                            </card>
                        </list>

                    </vertical>
                </ScrollView>

            </frame>

        </viewpager>

    </vertical>

);



win.setPosition(0, 0);
win.setSize(dev_w * 1.07, dev_h);
// setInterval(()=>{}, 1000);
win.requestFocus();



var running = false

win.viewpager.setOffscreenPageLimit(4)

win.home.on("click", function () {
    win.viewpager.setCurrentItem(0)
})
win.news.on("click", function () {
    win.viewpager.setCurrentItem(1)
})

win.video.on("click", function () {
    win.viewpager.setCurrentItem(2)
})
win.invite.on("click", function () {
    win.viewpager.setCurrentItem(3)
})
win.exit.on("click", function () {
    exit();
    win.close();
    // win.setSize(1, 1);
});
win.cksq.on("click", function () {
    log(IMEI)
    setClip(IMEI)
    exit();
    win.close();
    alert("已复制您的机器码:" + IMEI);
});

win.btjr.on("click", function () {
    log("填写推荐人")
    var tjr = win.myinvite.getText()
    var jqcode = IMEI
    // exit();
    win.close();
    threads.start(
        function () {
            // win.setSize(1,1)
            var msg = addtjr(jqcode, tjr)
            log(msg)
            alert(msg);
            exit()
        }
    )


});

win.hj.on("click", function () {
    log("环境设置")
    // home()
    // win.setSize(1, 1)
    // win.close();
    // var name = rawInput("请输入邀请码")
    // log(name)
    // win.setSize(dev_w * 1.07, dev_h)
    // threads.start(
    //     function () {
    //         // ui.finish();s

    //         var window = floaty.window(
    //             <frame>
    //                 <button id="action" text="开始运行" w="90" h="40" bg="#77ffffff" />
    //             </frame>
    //         )
    //         setInterval(() => { }, 1000);
    //     }
    // )

});

// ui.todoList.setDataSource(mylist);
win.newsList.setDataSource(newslist);
win.videoList.setDataSource(videolist);



ui.run(function () {
    win.machinecode.setText(mcode);
    if (userflag["tjr"]) {
        win.myinvite.setText(userflag["tjr"]);
        win.btjr.setVisibility(8);
    }
    gettjr()
    win.tjrList.setDataSource(tjrlist)

});

var storage = storages.create("myList");
var arr = []
var newsarr = []
var videoarr = []
var logflag = 0

win.selectAll.on("click", function () {
    //没有授权
    if (userflag["flag"] == 0) {

        log(IMEI)
        setClip(IMEI)
        exit();
        win.close();

        log("您的机器码为：" + code)
        alert("机器码没有授权，请联系客服");
        return
    }
    if (userflag["flag"] == 2) {
        exit();
        win.close();
        alert("无法连接服务器，请重试或联系客服");

    }
    if (userflag["flag"] == 4) {
        exit();
        win.close();
        alert("您的授权已到期，请充值");

    }
    win.setSize(1, 1)
    var c = "";
    arr = []
    var isfor = win.isfor.checked
    var onekey = win.onekey.checked
    var autosign = win.autosign.checked
    storage.put("isfor", isfor)
    storage.put("onekey", onekey)
    storage.put("autosign", autosign)
    mylist.forEach(item => {
        var id = item.chid
        var m = "win." + String(id) + ".checked";
        if (eval(m)) {
            var t = "win." + String(item.tid) + ".getText()";
            var d = [item.title, eval(t)]
            c = c + item.title
            // log(item.title, eval(t))
            arr.push(d)
        }
    });

    newslist.forEach(item => {
        var id = item.chid
        var m = "win." + String(id) + ".checked";
        if (eval(m)) {
            var t = "win." + String(item.tid) + ".getText()";
            var d = [item.title, eval(t)]
            c = c + item.title
            // log(item.title, eval(t))
            newsarr.push(d)
        }
    });
    videolist.forEach(item => {
        var id = item.chid
        var m = "win." + String(id) + ".checked";
        if (eval(m)) {
            var t = "win." + String(item.tid) + ".getText()";
            var d = [item.title, eval(t)]
            c = c + item.title
            // log(item.title, eval(t))
            videoarr.push(d)
        }
    });

    running = true

    home()
    threads.start(
        function () {
            var window_stop = floaty.window(
                <vertical id="swindow">
                    <button id="action" textSize="16" margin="0" padding="0" text='停止' />
                    <button id="stop" textSize="16" margin="0" padding="0" text='隐藏' />
                    {/* <button id="log" textSize="16" margin="0" padding="0" text='日志' /> */}
                </vertical>
            );
            window_stop.setPosition(0, device.height / 2)

            window_stop.exitOnClose()

            // console.show()

            window_stop.action.on("click", function () {
                toast("已停止脚本运行")
                exit();
                window_stop.close();
            });

            window_stop.stop.on("click", function () {
                window_stop.setSize(1, 1);
            });

            window_stop.swindow.on("long_click", () => {
                window_stop.setAdjustEnabled(!window_stop.isAdjustEnabled());
            });
            setInterval(() => { }, 1000);
            window_stop.setSize(1, 1);
        }
    )

});




//等待开始的消息，悬浮框与之并行
while (true) {
    sleep(1000)
    if (running) {
        break
    }
}

run()

function run() {
    win.close()
    toast("系统初始化")
    log("系统初始化")
    //设置屏幕常亮，防止异常熄屏，为了安全，传入时间参数
    var alltimes = 0
    for (let i = 0; i < arr.length; i++) {
        alltimes = parseInt(arr[i][1]) + parseInt(alltimes)

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
    var isfor = storage.get("isfor", true)
    var onekey = storage.get("onekey", true)

    var fornum = 1
    loopnum = 0
    if (isfor) {
        fornum = 10
        log("系统开启循环模式")
    }
    if (onekey) {
        log("系统开启自动配置模式")
    }
    for (let j = 0; j < fornum; j++) {
        loopnum = loopnum + 1
        for (let i = 0; i < videoarr.length; i++) {
            var 调度名字 = videoarr[i][0]
            var 调度时长 = videoarr[i][1]
            if (onekey) {
                调度时长 = 2
            }
            // log("调度时长", 调度时长)
            if (调度时长 > 0) {
                log("要启动的APP是:" + 调度名字 + "，时长是：" + 调度时长)
                toast("开始执行" + 调度名字)
                总调度(调度名字, 2, 调度时长);
                log("退出总调度")
                sleep(1000)
            }
        }
        //文章不稳定 采用内循环模式，6次,半个小时
        // for (let ii = 0; ii < 6; ii++)
        // {
        //     for (let i = 0; i < newsarr.length; i++) {
        //         var 调度名字 = newsarr[i][0]
        //         var 调度时长 = newsarr[i][1]
        //         调度时长 = 5
        //         if (onekey) {
        //             调度时长 = 2
        //         }
        //         // log("调度时长", 调度时长)
        //         if (调度时长 > 0) {
        //             log("要启动的APP是:" + 调度名字 + "，时长是：" + 调度时长)
        //             toast("开始执行" + 调度名字)
        //             总调度(调度名字, 1, 调度时长);
        //             log("退出总调度")
        //             sleep(1000)
        //         }
        //     }
        // }

        for (let i = 0; i < newsarr.length; i++) {
            var 调度名字 = newsarr[i][0]
            var 调度时长 = newsarr[i][1]
            // 调度时长 = 5
            if (onekey) {
                调度时长 = 2
            }
            // log("调度时长", 调度时长)
            if (调度时长 > 0) {
                log("要启动的APP是:" + 调度名字 + "，时长是：" + 调度时长)
                toast("开始执行" + 调度名字)
                总调度(调度名字, 1, 调度时长);
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
    var url = "apps/" + 调度APP
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

    var autosign = storage.get("autosign", true)
    var lock = threads.lock();
    var complete = lock.newCondition();
    var 子线程 = null

    // if (autosign) {
    //     log("自动签到模式")
    //     子线程 = threads.start(function () {
    //         // qq.启动线程(类型, 1)
    //         启动线程(类型, 1)
    //     });
    // }
    // else {
    //     log("关闭自动签到")
    //     子线程 = threads.start(function () {
    //         // qq.启动线程(类型, 0)
    //         启动线程(类型, 0)
    //     });
    // }

    //默认开启自动签到,签到2次，防止出现意外，2次之后不再签到
    if (loopnum > 2) {
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
        sleep(60000 * 时长);
        log("时间监控结束//////////////")
        lock.lock();
        complete.signal();
        lock.unlock();
    });
    子线程.waitFor();
    lock.lock();
    complete.await();
    lock.unlock();
    子线程.interrupt();
    //打印结果
    log(调度APP + "：准备结束子线程")
    sleep(2000)
    // var 是否启动成功 = APP公用函数.close_app(调度APP)
    close_app(调度APP)
    log('已完成结束子线程')
}






//新增一个APP的自动操作脚本到系统，
//title:APP名称，必须和安装之后桌面的名称保持一致
//allsum:默认执行时间，可选参数，系统默认30分钟
function addnewapp(title, type, allsum) {
    var dic = new Array();
    var name = mylist.length + 1
    name = "myid" + String(name)
    chid = "checkid" + String(name)
    tid = "timeid" + String(name)
    dic["title"] = title
    dic["num"] = 0
    dic["allsum"] = allsum || 5
    dic["id"] = name
    dic["pro"] = ""
    dic["chid"] = chid
    dic["tid"] = tid
    dic["done"] = false
    dic["type"] = type
    if (type == 1) {
        newslist.push(dic)
    }
    if (type == 2) {
        videolist.push(dic)
    }
    mylist.push(dic)
}

// 关闭脚本
threads.start(function () {
    //在子线程中调用observeKey()从而使按键事件处理在子线程执行
    // events.observeKey();
    events.on("key_down", function (keyCode, events) {
        //音量键关闭脚本
        if (keyCode == keys.volume_up) {
            exit();
        }
    });
});

//获取远程字符串,实现云端代码下发，当前没有做加密处理
//在上生成时，会进行加密处理
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

function md5(string) {
    return java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5")
        .digest(java.lang.String(string).getBytes())).toString(16).substring(0, 10);
}


function checkuser() {
    var url = "http://8yue.xiequbo.cn/api/jiuzhou/checkcode";
    var res = http.post(url, {
        "code": code,
        "brand": brand,
        "product": product,
        "serial": serial,
        "sdklnt": sdklnt,
        "release": release,
        "imei": imei,
    });
    if (res.statusCode != 200) {
        toast("请求失败: " + res.statusCode + " " + res.statusMessage);
        //2表示网络请求识别
        var t = { "flag": 2 }
        return t
    }
    else {
        // log(res.body.string())
        return res.body.json()['data']
    }
}


function addtjr(mycode, mytjr) {
    var url = "http://8yue.xiequbo.cn/api/jiuzhou/addtjr";
    var res = http.post(url, {
        "code": mycode,
        "tjr": mytjr,
    });
    if (res.statusCode != 200) {
        toast("请求失败: " + res.statusCode + " " + res.statusMessage);
        //2表示网络请求识别
        return 2
    }
    else {
        // log(res.body.string())
        // log(res.body.string()['msg'])
        return res.body.json()['msg']
    }
}

function gettjr() {
    var tlist = userflag['tjrlist']
    // log(tjrlist)
    if(!tlist)
    {
        return
    }
    var j = tlist.length
    for (var i = 0; i < j; i++) {
        var xie = tlist[i]
        var date = new Date(xie['createtime'] * 1000)
        var dic = new Array();
        dic["jqcode"] = xie['id']
        dic["ctime"] = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
        dic["level"] = "直推"
        tjrlist.push(dic)
        var chi = xie['childlist']
        for (var k = 0; k < chi.length; k++) {
            var xie = chi[k]
            var date = new Date(xie['createtime'] * 1000)
            var dic = new Array();
            dic["jqcode"] = xie['id']
            dic["ctime"] = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
            dic["level"] = "间推"
            tjrlist.push(dic)
        }
    }

}

function sysinit(){
    log("检测是否安装相应的APP，请稍候")
    mylist.forEach(item => {
        var appname = item.title
        download(appname)
    });
}

function download(name) {
    var app_name2 = name
    // console.log('下载的名字是'+name);
        var url = 'http://apk.fuzhifutech.com/' + app_name2 + ".apk"
    if(getPackageName(app_name2))
    {
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
    toastLog(name+'下载完成');
    install_app(filePath,name)

}
function install_app(filePath, name) {
    ////--------------安装--------------////
    //  读取 apk
    app.viewFile(filePath)
    for (let i = 0; i < 100; i++) {
        // is_first = textMatches(/(始.*|.*终.*|.*允.*|.*许)/).findOne(1000);
        toast("检测中....")
        is_first = text("始终允许").findOne(500)
        if (is_first) {
            toast("首次安装,始终允许")
            is_first.click()
        }

        is_install = text("安装").findOne(500)
        if (is_install) {
            toast("安装初始化已完成2")
            // is_install.click()
            break
        }

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
            break;
        }
    }

    is_install = text("安装").findOne(1000)
    if (is_install) {
        is_install.click()
    }
    is_install = text("继续安装").findOne(10000)
    if (is_install) {
        is_install.click()
    }
    for (let i = 0; i < 20; i++) {
        toast("安装中...")
        is_open = text("打开").findOne(1000)
        if (is_open) {
            toast("安装完成")
            break
        }
    }
    back()
    sleep(1000)
}




