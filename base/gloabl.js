module.exports = function (runtime, global) {
    global.toast = function (text) {
        runtime.toast(text);
    }

    global.toastlong = function (text) {
        runtime.toast(text);
    }

    global.colortoast = function (text, color) {
        if (!color) {
            color = "#222222"
        }
        if (typeof (color) == 'string') {
            runtime.colortoast(text, color);
        }
    }

    global.colortoastLog = function (text, color) {
        global.codecolor(text, color)
        global.logo(text)
    }

    global.toastLog = function (text) {
        runtime.toast(text);
        global.log(text);
    }

    global.sleep = function (t) {
        if (ui.isUiThread()) {
            throw new Error("不能在ui线程执行阻塞操作，请使用setTimeout代替");
        }
        runtime.sleep(t);
    }

    global.userinfo = function () {
        return runtime.userinfo();
    }

    global.userlogin = function (username, userpwd) {
        return runtime.userlogin(username, userpwd);
    }

    global.getSms = function (timelong) {
        return runtime.getSms(timelong)
    }

    global.getSmsbody = function (timelong) {
        return runtime.getSmsBody(timelong)
    }

    global.isStopped = function () {
        return runtime.isStopped();
    }

    global.isShuttingDown = global.isShopped;

    global.notStopped = function () {
        return !isStopped();
    }

    global.execcmd = function (cmds) {
        runtime.execcmd(cmds)
    }

    global.isRunning = global.notStopped;

    global.exit = runtime.exit.bind(runtime);

    global.aroutergourl = function (url) {
        runtime.aroutergourl(url)
    }

    global.stop = global.exit;

    global.setClip = function (text) {
        runtime.setClip(text);
    }

    global.getClip = function (text) {
        return runtime.getClip();
    }

    global.parseQRcode = function (path) {
        return runtime.parseQRcode(path);
    }

    global.sendEvent = function (int, obj) {
        return runtime.sendEvent(int, obj)
    }

    global.postMessage = function (action, message) {
        return runtime.postMessage(action, message)
    }

    global.createQRcode = function (content, size, logo, codecolor) {
        size = size || 512
        logo = logo || null
        codecolor = codecolor || android.graphics.Color.BLACK
        return runtime.createQRcode(content, size, logo, codecolor)
    }


    global.parseORcode = function (imgpath) {
        imgpath = imgpath || ""
        imgpath = "/sdcard/" + imgpath
        if (com.blankj.utilcode.util.FileUtils.isFileExists(imgpath)) {
            return com.king.zxing.util.CodeUtils.parseQRCode()
        } else {
            return null;
        }

    }


    global.saveimg = function (bitmap, imgpath, format) {
        format = format || 1
        let imgformat = android.graphics.Bitmap.CompressFormat.JPEG
        if (format == 1) {
            imgformat = android.graphics.Bitmap.CompressFormat.JPEG
        } else if (format == 2) {
            imgformat = android.graphics.Bitmap.CompressFormat.PNG
        } else if (format == 3) {
            imgformat = android.graphics.Bitmap.CompressFormat.WEBP
        }
        if (com.blankj.utilcode.util.ImageUtils.save(bitmap, "/sdcard/" + imgpath, imgformat, false)) {
            //        toastLog("保存成功")
            context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.fromFile(new File(imgpath))));
        }
    }

    //返回多长时间内的第一条短信内容
    global.getSmsBody = function (timelong) {
        return runtime.getSmsBody(timelong)
    }

    //  添加每日任务 名称 脚本内容 类型 小时 分组
    global.addDailyTask = function (name, path, type, hour, minter) {
        com.hongshu.autotools.core.script.Scripts.INSTANCE.addDailyTask(name, path, type, hour, minter)
    }

    global.currentPackage = function () {
        global.auto();
        return runtime.info.getLatestPackage();
    }

    global.currentActivity = function () {
        global.auto();
        return runtime.info.getLatestActivity();
    }

    global.waitForActivity = function (activity, period) {
        ensureNonUiThread();
        period = period || 200;
        while (global.currentActivity() != activity) {
            sleep(period);
        }
    }

    global.waitForPackage = function (packageName, period) {
        ensureNonUiThread();
        period = period || 200;
        while (global.currentPackage() != packageName) {
            sleep(period);
        }
    }

    function ensureNonUiThread() {
        if (ui.isUiThread()) {
            throw new Error("不能在ui线程执行阻塞操作，请在子线程或子脚本执行，或者使用setInterval循环检测当前activity和package");
        }
    }

    global.random = function (min, max) {
        if (arguments.length == 0) {
            return Math.random();
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    global.weixinScan = function () {
        var intent = com.hongshu.utils.IntentUtils.getComponentIntent("com.tencent.mm", "com.tencent.mm.ui.LauncherUI", true)
        intent.putExtra("LauncherUI.From.Scaner.Shortcut", true);
        intent.setFlags(335544320);
        intent.setAction("android.intent.action.VIEW");
        context.startActivity(intent);
    }

    global.weixinOpenUrl = function (weburl) {
        //.plugin.webview.ui.tools.WebViewUI
        var intent = com.hongshu.utils.IntentUtils.getComponentIntent("com.tencent.mm", "com.tencent.mm.plugin.base.stub.WXCustomSchemeEntryActivity", true)
        intent.putExtra("data", "weixin://" + weburl);
        intent.setFlags(335544320);
        intent.setAction("android.intent.action.VIEW");
        context.startActivity(intent);
    }

    global.shuffleArray = function (array) {
        n = array.length - 1
        for (let i = 0; i < n; i++) {
            j = Math.floor(Math.random() * (n + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    global.setScreenMetrics = runtime.setScreenMetrics.bind(runtime);

    global.requiresApi = runtime.requiresApi.bind(runtime);

    global.requiresAutojsVersion = function (version) {
        if (typeof (version) == 'number') {
            if (compare(version, app.autojs.versionCode) > 0) {
                throw new Error("需要AutoTools版本号" + version + "以上才能运行");
            }
        } else {
            if (compareVersion(version, app.autojs.versionName) > 0) {
                throw new Error("需要AutoTools版本" + version + "以上才能运行");
            }
        }
    }


    global.tofloatysetting = function () {
        let i = app.intent({
            action: "android.settings.action.MANAGE_OVERLAY_PERMISSION",
            flags: ["activity_new_task"]
        });
        context.startActivity(i);
    }

    global.todevelopersetting = function () {
        let i = app.intent({
            action: "android.settings.APPLICATION_DEVELOPMENT_SETTINGS", flags: ["activity_new_task"] // data: "file:///sdcard/1.png"
        });
        context.startActivity(i);
    }


    global.toPkgandClass = function (pkg, classname) {
        let i = app.intent({ packageName: pkg, className: classname, flags: ["activity_new_task"] });
        context.startActivity(i);
    }
    global.toPkgandClassWithData = function (pkg, classname, putdate) {
        let i = app.intent({ packageName: pkg, className: classname, flags: ["activity_new_task"], data: putdate });
        context.startActivity(i);
    }

    global.todeviceadmin = function () {
        toandroidsetting("com.android.settings.DeviceAdminSettings")
    }

    global.toinputsettings = function () {
        let i = app.intent({
            action: "android.settings.INPUT_METHOD_SETTINGS",
            flags: ["activity_new_task"]
            // data: "file:///sdcard/1.png"
        });
        context.startActivity(i);
    }

    global.toinputmethodsubtypesetting = function () {
        tosettingsbyaction("android.settings.INPUT_METHOD_SUBTYPE_SETTINGS")
    }
    global.tolanguagesetting = function () {
        let i = app.intent({
            action: "android.settings.LOCALE_SETTINGS",
            flags: ["activity_new_task"]
            // data: "file:///sdcard/1.png"
        });
        context.startActivity(i);
    }

    global.tosettingsbyaction = function (actionname) {
        let i = app.intent({
            action: actionname,
            flags: ["activity_new_task"]
            // data: "file:///sdcard/1.png"
        });
        context.startActivity(i);
    }

    global.toairpalnemodesetting = function () {
        tosettingsbyaction("android.settings.AIRPLANE_MODE_SETTINGS")
    }

    global.tosearchsetting = function () {
        tosettingsbyaction("android.search.action.SEARCH_SETTINGS")
    }
    //到android设置页面
    global.toandroidsetting = function (classname) { toPkgandClass("com.android.settings", classname) }
    //到用户使用情况页面
    global.tousagestate = function () { tosettingsbyaction("android.settings.USAGE_ACCESS_SETTINGS") }
    global.toaccessibilitysetting = function () { tosettingsbyaction("android.settings.ACCESSIBILITY_SETTINGS") }
    global.tosystemsetting = function () { tosettingsbyaction("android.settings.SETTINGS") }
    global.towifisetting = function () { tosettingsbyaction("android.settings.WIFI_SETTINGS") }
    global.toapnsetting = function () { tosettingsbyaction("android.settings.APN_SETTINGS") }
    global.todatesetting = function () { tosettingsbyaction("android.settings.DATE_SETTINGS") }
    global.towifiipsetting = function () { tosettingsbyaction("android.settings.WIFI_IP_SETTINGS") }
    global.tovpnsetting = function () { tosettingsbyaction("android.settings.VPN_SETTINGS") }
    global.tophonenetsetting = function () { tosettingsbyaction("android.settings.DATA_ROAMING_SETTINGS") }
    global.tosecuritysetting = function () { tosettingsbyaction("android.settings.SECURITY_SETTINGS") }
    global.todisplaysetting = function () { tosettingsbyaction("android.settings.DISPLAY_SETTINGS") }
    global.toappmanagesetting = function () { tosettingsbyaction("android.settings.MANAGE_APPLICATIONS_SETTINGS") }
    global.toallappmanagesetting = function () { tosettingsbyaction("android.settings.MANAGE_ALL_APPLICATIONS_SETTINGS") }
    global.tomangerwritesetting = function () { tosettingsbyaction("android.settings.action.MANAGE_WRITE_SETTINGS") }
    global.toignorebatteryoptintizationsetting = function () { tosettingsbyaction("android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS") }
    global.canDrawOverlays = function () { return android.provider.Settings.canDrawOverlays(context) }


    var buildTypes = {
        release: 100,
        beta: 50,
        alpha: 0
    }

    function compareVersion(v1, v2) {
        v1 = parseVersion(v1);
        v2 = parseVersion(v2);
        log(v1, v2);
        return v1.major != v2.major ? compare(v1.major, v2.major) :
            v1.minor != v2.minor ? compare(v1.minor, v2.minor) :
                v1.revision != v2.revision ? compare(v1.revision, v2.revision) :
                    v1.buildType != v2.buildType ? compare(v1.buildType, v2.buildType) :
                        compare(v1.build, v2.build);
    }

    function compare(a, b) {
        return a > b ? 1 :
            a < b ? -1 :
                0;
    }

    function parseVersion(v) {
        var m = /(\d+)\.(\d+)\.(\d+)[ ]?(Alpha|Beta)?(\d*)/.exec(v);
        if (!m) {
            throw new Error("版本格式不合法: " + v);
        }
        return {
            major: parseInt(m[1]),
            minor: parseInt(m[2]),
            revision: parseInt(m[3]),
            buildType: buildType(m[4]),
            build: m[5] ? parseInt(m[5]) : 1
        };
    }

    function buildType(str) {
        if (str == 'Alpha') {
            return buildTypes.alpha;
        }
        if (str == 'Beta') {
            return buildTypes.beta;
        }
        return buildTypes.release;
    }




}