hzServer = {};
hzServer.signKey = "94";

const HZ_SERVER_CHECK_UPDATE = "https://666huluwa.oss-cn-shenzhen.aliyuncs.com/94hzJson/update.json";


hzServer.needUpdate = function (cliVersion, serVersion) {
    if (cliVersion && serVersion) {

        cliVersion = cliVersion.replace("v","");
        serVersion = serVersion.replace("v","");

        var arr1 = serVersion.split('.'),
            arr2 = cliVersion.split('.');

        var minLength = Math.min(arr1.length, arr2.length),
            position = 0,
            diff = 0;

        while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
            position++;
        }
        diff = (diff != 0) ? diff : (arr1.length - arr2.length);
        //若serVersion大于cliVersion，则返回true
        return diff > 0;
    } else {
        return false;
    }
}

hzServer.checkUpdate = function (config) {
    try {

        json = this.getServer(config);
        // log(json)

        if (json.code < 0) {
            toastLog(json.msg);
            sleep(2000);
            threads.shutDownAll();
            exit();
        }

        if (json.code != 200) {
            toastLog(json.msg);
        }

        var resData = json.data;

        if (resData.tips != undefined && resData.tips.length > 0) {
            for (i = 0; i < resData.tips.length; i++) {
                toastLog(resData.tips[i]);
                sleep(1000);
            }
        }

        if (this.needUpdate(config.version, resData.version) == true && resData.updateUrl != "") {
            this.update(resData.updateUrl, resData.forceUpdate, resData.releaseNotes);
        }

        return resData;

    } catch (e) {
        // log("出错啦");
        // log(e);
    }
};

hzServer.update = function (updateUrl, forceUpdate, releaseNotes) {

    var androidVersion = Number(device.release.substring(0, 1));
    if (androidVersion < 7) {
        setClip(updateUrl);
        alert(releaseNotes + "\n已复制更新地址到剪切版，到浏览器粘贴下载");
        if (forceUpdate) {
            toast("旧版本不可用，请更新");
            exit();
        }
    } else {
        dialogs.build({
            title: "发现新版本",
            content: releaseNotes,
            positive: "立即下载",
            negative: "下次再说",
        }).on("cancel", (dialog) => {
            if (forceUpdate) {
                toast("旧版本不可用，请更新");
                exit();
            }
        }).on("positive", () => {
            app.openUrl(updateUrl);
        })
            .show();
    }

};


hzServer.getServer = function () {
    var url = HZ_SERVER_CHECK_UPDATE;

    var r = http.get(url);
    if (r.statusCode != 200) {
       console.error("请求失败");
    }
    var json = r.body.json();
    return json;
};

module.exports = hzServer;
