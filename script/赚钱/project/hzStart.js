"ui";
 
function view() {
    ui.layout(
        <drawer id="drawer">
            <vertical>
                <appbar>
                    <toolbar id="toolbar" title="{{TITLE}}" />
                    <tabs id="tabs" />5
                </appbar>

                <viewpager id="viewpager">
                    <frame>
                        <ScrollView>
                            <vertical margin="10 10 10 10">
                                <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" />

                                <card w="*" h="auto" margin="5 5" cardCornerRadius="2dp"
                                    cardElevation="1dp" foreground="?selectableItemBackground">
                                    <horizontal gravity="center_vertical">
                                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                            <linear>
 
                                                <checkbox id="doDyFocus" checked="{{config.doDyFocus == true}}" text="斗士关注" />
                                                <checkbox id="doDyLike" checked="{{config.doDyLike == true}}" text="斗士点赞" />
                                                <checkbox id="DyAutoChange" checked="{{config.DyAutoChange == true}}" text="斗士自动换号" /> 
                                            </linear>
                                            <linear>
                                                <checkbox id="doQDyFocus" checked="{{config.doQDyFocus == true}}" text="斗士极速版关注" />
                                                <checkbox id="doQDyLike" checked="{{config.doQDyLike == true}}" text="斗士极速版点赞" />

                                            </linear>
                                            <linear>
                                                <checkbox id="doHsFocus" checked="{{config.doHsFocus == true}}" text="伙士关注" />
                                                <checkbox id="doHsLike" checked="{{config.doHsLike == true}}" text="伙士点赞" />
                                                <checkbox id="HsAutoChange" checked="{{config.HsAutoChange == true}}" text="伙士自动换号" /> 
                                            </linear>
                                            <linear>
                                                <checkbox id="doKsFocus" checked="{{config.doKsFocus == true}}" text="筷子关注" />
                                                <checkbox id="doKsLike" checked="{{config.doKsLike == true}}" text="筷子点赞" />
                                            </linear>
                                        </vertical>
                                    </horizontal>
                                </card>
                                <card w="*" h="auto" margin="5 5" cardCornerRadius="2dp"
                                    cardElevation="1dp" foreground="?selectableItemBackground">
                                    <linear gravity="center">
                                        <button id="showTaskSetting" text="显示任务设置" style="Widget.AppCompat.Button.Colored" />
                                        <button id="course" text="脚本视频教程" style="Widget.AppCompat.Button.Colored" textColor="#FF0000" />
                                    </linear>
                                </card>
                                <card id="taskSetting" w="*" h="auto" margin="5 5" cardCornerRadius="2dp"
                                    cardElevation="1dp" foreground="?selectableItemBackground">
                                    <horizontal gravity="center_vertical">
                                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                           
                                            <RadioGroup id="taskMode" >
                                                
                                                <RadioButton id="stableMode" checked="{{config.quickTask == 0}}" text="稳定模式"  />
                                                <RadioButton id="midmode" checked="{{config.quickTask == 1}}" text="中速模式"   />
                                                <RadioButton id="quickMod" checked="{{config.quickTask == 2}}" text="快速模式"   />
                                                <RadioButton id="searchMod" checked="{{config.quickTask == 3}}" text="搜索模式"  />
                                             </RadioGroup>

                                             <linear>
                                                <checkbox id="bringBefore" checked="{{config.bringBefore == true}}" text="开始前养号" />
                                                <checkbox id="bringOngoing" checked="{{config.bringOngoing == true}}" text="任务中养号" />
                                                <checkbox id="debug" checked="{{config.debug == true}}" text="调试日志" />
                                            </linear>
                                            <horizontal>
                                                <text textSize="{{TEXT_SIZE}}" textColor="{{TEXT_COLOR}}" text="任务前:视频" />
                                                <input id="beforeVideoNum1" w="auto" minWidth="40" textColor="{{INPUT_TEXT_COLOR}}" text="{{config.beforeVideoNum1}}" hint="{{default_conf.beforeVideoNum1}}" />
                                                <text textSize="{{TEXT_SIZE}}" textColor="{{TEXT_COLOR}}" text="到" />
                                                <input id="beforeVideoNum2" w="auto" minWidth="40" textColor="{{INPUT_TEXT_COLOR}}" text="{{config.beforeVideoNum2}}" hint="{{default_conf.beforeVideoNum2}}" />
                                                <text textSize="{{TEXT_SIZE}}" textColor="{{TEXT_COLOR}}" text="个" />

                                                <text textSize="{{TEXT_SIZE}}" textColor="{{TEXT_COLOR}}" text=" 观看" />
                                                <input id="beforeVideoTime1" w="auto" minWidth="40" textColor="{{INPUT_TEXT_COLOR}}" text="{{config.beforeVideoTime1}}" hint="{{default_conf.beforeVideoTime1}}" />
                                                <text textSize="{{TEXT_SIZE}}" textColor="{{TEXT_COLOR}}" text="到" />
                                                <input id="beforeVideoTime2" w="auto" minWidth="40" textColor="{{INPUT_TEXT_COLOR}}" text="{{config.beforeVideoTime2}}" hint="{{default_conf.beforeVideoTime2}}" />
                                                <text textSize="{{TEXT_SIZE}}" textColor="{{TEXT_COLOR}}" text="秒" />
                                            </horizontal>

                                            <horizontal>
                                                <text textSize="{{TEXT_SIZE}}" textColor="{{TEXT_COLOR}}" text="任务中:视频" />
                                                <input id="ongoingVideoNum1" w="auto" minWidth="40" textColor="{{INPUT_TEXT_COLOR}}" text="{{config.ongoingVideoNum1}}" hint="{{default_conf.ongoingVideoNum1}}" />
                                                <text textSize="{{TEXT_SIZE}}" textColor="{{TEXT_COLOR}}" text="到" />
                                                <input id="ongoingVideoNum2" w="auto" minWidth="40" textColor="{{INPUT_TEXT_COLOR}}" text="{{config.ongoingVideoNum2}}" hint="{{default_conf.ongoingVideoNum2}}" />
                                                <text textSize="{{TEXT_SIZE}}" textColor="{{TEXT_COLOR}}" text="个" />

                                                <text textSize="{{TEXT_SIZE}}" textColor="{{TEXT_COLOR}}" text=" 观看" />
                                                <input id="ongoingVideoTime1" w="auto" minWidth="40" textColor="{{INPUT_TEXT_COLOR}}" text="{{config.ongoingVideoTime1}}" hint="{{default_conf.ongoingVideoTime1}}" />
                                                <text textSize="{{TEXT_SIZE}}" textColor="{{TEXT_COLOR}}" text="到" />
                                                <input id="ongoingVideoTime2" w="auto" minWidth="40" textColor="{{INPUT_TEXT_COLOR}}" text="{{config.ongoingVideoTime2}}" hint="{{default_conf.ongoingVideoTime2}}" />
                                                <text textSize="{{TEXT_SIZE}}" textColor="{{TEXT_COLOR}}" text="秒" />
                                            </horizontal>

                                  
                                            <horizontal>
                                                <text textSize="{{TEXT_SIZE}}" w="auto" textColor="{{TEXT_COLOR}}" text="任务页停留时间" />
                                                <input id="taskInterval" w="auto" minWidth="50" textColor="{{INPUT_TEXT_COLOR}}" text="{{config.taskInterval}}" hint="{{default_conf.taskInterval}}" />
                                                <text textSize="{{TEXT_SIZE}}" w="auto" textColor="{{TEXT_COLOR}}" text="秒" />
                                            </horizontal>
                                            <horizontal>
                                                <text textSize="{{TEXT_SIZE}}" w="auto" textColor="{{TEXT_COLOR}}" text="连续失败" />
                                                <input id="stopByFailNum" w="auto" minWidth="50" textColor="{{INPUT_TEXT_COLOR}}" text="{{config.stopByFailNum}}" hint="{{default_conf.stopByFailNum}}" />
                                                <text textSize="{{TEXT_SIZE}}" w="auto" textColor="{{TEXT_COLOR}}" text="个任务后切下一种任务或停止运行" />
                                            </horizontal>
                                            <horizontal>
                                                <text textSize="{{TEXT_SIZE}}" w="auto" textColor="{{TEXT_COLOR}}" text="点赞完成" />
                                                <input id="stopByFinishLikeNum" w="auto" minWidth="50" textColor="{{INPUT_TEXT_COLOR}}" text="{{config.stopByFinishLikeNum}}" hint="{{default_conf.stopByFinishLikeNum}}" />
                                                <text textSize="{{TEXT_SIZE}}" w="auto" textColor="{{TEXT_COLOR}}" text="个任务后切下一种任务或停止运行" />
                                            </horizontal>
                                            <horizontal>
                                                <text textSize="{{TEXT_SIZE}}" w="auto" textColor="{{TEXT_COLOR}}" text="关注完成" />
                                                <input id="stopByFinishFocusNum" w="auto" minWidth="50" textColor="{{INPUT_TEXT_COLOR}}" text="{{config.stopByFinishFocusNum}}" hint="{{default_conf.stopByFinishFocusNum}}" />
                                                <text textSize="{{TEXT_SIZE}}" w="auto" textColor="{{TEXT_COLOR}}" text="个任务后切下一种任务或停止运行" />
                                            </horizontal>
                                        </vertical>
                                    </horizontal>
                                </card>

                                <horizontal w="*" >
                                    <button id="start" text="运行 音量上／下键停止脚本" w="*" style="Widget.AppCompat.Button.Colored" />
                                </horizontal>
                                
                            </vertical>
                        </ScrollView>
                    </frame>
                    <frame>
                        <ScrollView>
                            <vertical>
                                <horizontal>
                                    <webview id="web" margin="10 10 10 10" />
                                </horizontal>
                            </vertical>
                        </ScrollView>
                    </frame>
                </viewpager>
            </vertical>
        </drawer>
    );
} 


// 94app地址
var  URL = "http://47.115.18.248/";

var cookieManager = android.webkit.CookieManager.getInstance();

var objj = JSON.parse(files.read("./project.json"))

// 界面常量
const STORAGES_FILE_NAME = "hzConfigData",
    PACKAGE_NAME = "com.haozhuan.script",
    VERSION = "v"+objj.versionName, // 更新版本，此处和project.json的版本一起改了
    TITLE = "94 " + VERSION,
    COLOR = "#009688",
    TEXT_SIZE = "12sp",
    TEXT_COLOR = "black",
    INPUT_TEXT_COLOR = "#0000FF";

// 默认配置
var default_conf = {
    packageName: PACKAGE_NAME,
    version: VERSION,
    debug:false,
    dyUrl: "",
    token:"",
    doDyLike: true,
    doDyFocus: true,
    doQDyLike: false,
    doQDyFocus: false,
    doHsLike: true,
    doHsFocus: true,
    doKsLike: false,
     doKsFocus: true,
     doNewsFocus:false,
    bringBefore: false,
    HsAutoChange:false,
    DyAutoChange:false,
    bringOngoing: false,
    beforeVideoNum1: "1",
    beforeVideoNum2: "3",
    beforeVideoTime1: "2",
    beforeVideoTime2: "15",
    quickTask:1,
    ongoingVideoNum1: "1",
    ongoingVideoNum2: "2",
    ongoingVideoTime1: "2",
    ongoingVideoTime2: "15",
    restartByFinishNum1: "20",
    restartByFinishNum2: "30",
    taskInterval: "3",
    stopByFailNum: "20",
    stopByFinishLikeNum: "600",
    stopByFinishFocusNum: "225",
};

//加载本地配置
var sto = storages.create(STORAGES_FILE_NAME);
var  hzServer = require("./hzServer.js");
var  hz94 = require("./hz94.js");
var  global = require("./Global.js");
var config = sto.get("config", default_conf);
config.version = VERSION;
log = function (base) {
    return function () 
    {
        
        if(config.debug|| !global||global.taskBegin)
        {
            base.apply(this, arguments);
            global.saveLog(arguments[0]);
        }   
        else 
        {
            global.consolelog(arguments[0]);
        }
            
    }
}(log); 
for (var key in default_conf) {
    if (config[key] == undefined) {
        config[key] = default_conf[key];
    }
}
//log(config);
//config.ip="http://baidu.com";
if(config.ip)
{
    URL=config.ip;
}
else
{
    config.ip=URL;
}

hz94.host=URL;
//config.debug=1;
//log("当前域名:"+URL);

// 更新配置
function updateConfig() {

    config.cookieStr = cookieManager.getCookie(URL);
    config.androidVersion = parseFloat(device.release);
    config.doQDyLike = ui.doQDyLike.checked;
    config.doQDyFocus = ui.doQDyFocus.checked;
    config.doDyLike = ui.doDyLike.checked;
    config.doDyFocus = ui.doDyFocus.checked;
    config.doHsLike = ui.doHsLike.checked;
    config.doHsFocus = ui.doHsFocus.checked;
    config.doKsFocus=ui.doKsFocus.checked;
    config.debug=ui.debug.checked;
    config.doKsLike=ui.doKsLike.checked;
   config.doNewsFocus = false
    config.bringBefore = ui.bringBefore.checked;
    config.HsAutoChange = ui.HsAutoChange.checked;
    config.DyAutoChange=ui.DyAutoChange.checked;
    config.bringOngoing = ui.bringOngoing.checked;
    config.quickTask = ui.stableMode.checked?0:(ui.midmode.checked?1:ui.quickMod.checked?2:3);
    config.beforeVideoNum1 = ui.beforeVideoNum1.getText().toString();
    config.beforeVideoNum2 = ui.beforeVideoNum2.getText().toString();
    config.beforeVideoTime1 = ui.beforeVideoTime1.getText().toString();
    config.beforeVideoTime2 = ui.beforeVideoTime2.getText().toString();
    config.ongoingVideoNum1 = ui.ongoingVideoNum1.getText().toString();
    config.ongoingVideoNum2 = ui.ongoingVideoNum2.getText().toString();
    config.ongoingVideoTime1 = ui.ongoingVideoTime1.getText().toString();
    config.ongoingVideoTime2 = ui.ongoingVideoTime2.getText().toString();
    // config.restartByFinishNum1 = ui.restartByFinishNum1.getText().toString();
    // config.restartByFinishNum2 = ui.restartByFinishNum2.getText().toString();
    config.taskInterval = ui.taskInterval.getText().toString();
    config.stopByFailNum = ui.stopByFailNum.getText().toString();
    config.stopByFinishLikeNum = ui.stopByFinishLikeNum.getText().toString();
    config.stopByFinishFocusNum = ui.stopByFinishFocusNum.getText().toString();
    for (var key in config) {
        if (typeof (config[key]) == "string" && config[key] == "") {
            config[key] = default_conf[key];
        }
    }
    sto.put("config", config);
}
function saveConfig()
{
    //log("保存cofig");
    //log(config);
    sto.put("config", config); 
}
// 加载视图
view();


// var w = floaty.rawWindow(
//     <Button id="stopScrip" text= "  停止脚本  " style="Widget.AppCompat.Button.Colored" />
// );
// w.setPosition(20, 20);
// w.setSize(-2, -2);
// w.setTouchable(true);

// w.stopScrip.click(() => {
//     finish();
// });

// 94app界面加载进来
ui.web.loadUrl(URL);
ui.web.getSettings().setJavaScriptEnabled(true);
var settings = ui.web.getSettings()
settings.setUseWideViewPort(true);
settings.setLoadWithOverviewMode(true);
settings.setDomStorageEnabled(true);
settings.setDefaultTextEncodingName("UTF-8");
settings.setAllowContentAccess(true); // 是否可访问Content Provider的资源，默认值 true
settings.setAllowFileAccess(true);    // 是否可访问本地文件，默认值 true
// 是否允许通过file url加载的Javascript读取本地文件，默认值 false
settings.setAllowFileAccessFromFileURLs(false);
// 是否允许通过file url加载的Javascript读取全部资源(包括文件,http,https)，默认值 false
settings.setAllowUniversalAccessFromFileURLs(false);
//开启JavaScript支持
settings.setJavaScriptEnabled(true);
// 支持缩放
settings.setSupportZoom(true)

//初始化java包
runtime.loadDex("./myutil.dex");
importClass(com.wsk.myjavautil.MyJavaUtil);
MyJavaUtil.setMyWebViewClient(ui.web, activity);

// cookieStr = cookieManager.getCookie(URL);
// log("cookieStr:"+cookieStr);

// 无障碍服务
ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

// 任务加速
ui.midmode.on("check", function (checked) 
{   if(checked)
    {
        ui.bringOngoing.setChecked(false);
        ui.bringBefore.setChecked(false);
    }
});
ui.quickMod.on("check", function (checked) 
{   if(checked)
    {
        ui.bringOngoing.setChecked(false);
        ui.bringBefore.setChecked(false);
    }
});
//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu => {
    menu.add("悬浮窗权限");
    menu.add("查看日志");
});
// 监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item) => {
     
    switch (item.getTitle()) {
        case "悬浮窗权限":
            app.openAppSetting(currentPackage());
            break;
        case "查看日志":
            app.startActivity("console");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["自动", "手动/个人中心"]);

//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

// 隐藏/显示任务设置
threads.start(function () {
    ui.run(() => {
        ui.taskSetting.visibility = 8;
    });
});
ui.showTaskSetting.click(() => {
    if (ui.showTaskSetting.getText() == "隐藏任务设置") {
        ui.showTaskSetting.setText("显示任务设置");
        ui.taskSetting.visibility = 8;
    } else {
        ui.showTaskSetting.setText("隐藏任务设置");
        ui.taskSetting.visibility = 0;
    }
});
// ui.change_account.click(()=>{
//     ui.web.loadUrl(config.ip+"/h8/pageController.do?changezh");
//     ui.viewpager.setCurrentItem(1);
// //  activity.setSupportActionBar(ui.toolbar);
// //  activity.getSupportActionBar().setDisplayHomeAsUpEnabled(true);//添加默认的返回图标
// //  activity.getSupportActionBar().setHomeButtonEnabled(true); //设置返回键可用
// }
// );
// 视频教程
ui.course.click(() => {
    app.openUrl("https://v.youku.com/v_show/id_XNDg0MzkwMjI3Ng==");
});

// 音量键监听
events.onKeyDown("volume_down", function (event) {//按音量下停止
    finish();
});
events.onKeyDown("volume_up", function (event) {//按音量上停止
    finish();
});
auto.setWindowFilter((info) => {
    return true;
});
// 结束脚本
function finish() {
    toastLog("执行结束");
    threads.shutDownAll();
    engines.stopAll();
    exit();
}

// 检查更新
function checkUpdate() {
    threads.start(function () {
        
        var responce= hzServer.checkUpdate(config);

        if(responce&&responce.ip&&responce.ip!=config.ip)
        {
            config.ip=responce.ip;
            hz94.host=config.ip;
            saveConfig();
            //log("更新IP为:"+config.ip);
            // ui.run(function(){
            //     ui.web.loadUrl(config.ip);
            // });
        }
    });
}
//更新token
function updateToken() 
{
    hz94.cookieStr=config.cookieStr;
    var responce= hz94.getToken();
    if(responce.success == true)
    {
        var token=responce.obj;
        //log("t:"+token);
        if(token.length>0)
        {
             if(config.token==""||config.token!=token)
            {
                config.token=token; 
                saveConfig();
            }
        }
        else
        {
            log("t length 0");
        }
    }
    else
    {
        log("t eror:"+responce.msg);
    }
}
function updateIp()
{
    var thread = threads.start(function(){
        //在子线程执行的定时器
        setInterval(function(){
           // log("子线程:" + threads.currentThread());
            var responce=hzServer.getServer();
            if(responce&&responce.data&&responce.data.ip&&responce.data.ip!=config.ip)
            {
                config.ip=responce.data.ip;
                saveConfig();
                hz94.host=config.ip;
                //log("更新IP为:"+config.ip);
                // ui.run(function(){
                //     ui.web.loadUrl(config.ip);
                // });
            }
           // config.ip="1.1.1.1";
        }, 120000);
    });
    
}

if(config.cookieStr)
{
    threads.start(function () {
        updateToken();
    });
}
checkUpdate();   
updateIp();
// 运行脚本
ui.start.click(function () { 
    start();
});

function start() 
{
    // 登录判断
    var cookieStr = cookieManager.getCookie(URL);
   
    if(!config.token)
    {
        if (!cookieStr || cookieStr.indexOf("JSESSIONID=") == -1) 
        {
                alert("请先在个人中心登录");
                threads.shutDownAll();
                return false;
        }
        if(cookieStr)
        {
            config.cookieStr=cookieStr;
            updateToken();
        }
        if(!config.token)
        {
            alert("登录失效,请重新登录");
            threads.shutDownAll();
            return false;
        }
    }
   

    // 保存配置
    updateConfig();
     
    //程序开始运行之前判断无障碍服务
    if (auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }

    // 新线程监听音量键事件
    threads.start(function () {
        events.observeKey();
    });
    // 这里写脚本的主逻辑
    threads.start(function () {
        if (!(config.doDyFocus || config.doDyLike || config.doHsFocus || config.doHsLike||config.doKsFocus||config.doKsLike||config.doQDyFocus||config.doQDyLike||config.doNewsFocus)) {
            alert("未选任务");
            exit();
        }
        global.showCloseBtn(objj.versionName);
        if(config.debug)
        {
            console.setPosition(0,150);
            console.show();
            log("开始运行");
        }
        else
        {
            global.showLogView();
            global.updateLog();
            // global.info("sldjflsdf");
            // global.error("im am test");
            // sleep(55555);
        }
        // 屏幕常亮
        device.keepScreenOn(5 * 3600 * 1000)
        //hz94.host="http://8.129.210.98/";
        hz94.global=global;
        hz94.run(config);
        
        log("运行结束");
        finish();
    });
}

