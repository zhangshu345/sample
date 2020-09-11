"ui";
importClass(android.content.pm.PackageManager)

activity.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);
if (device.release == 7)
    activity.getWindow().setFlags(android.view.WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED, android.view.WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED);
var pm = context.getPackageManager();
var installedPackages = pm.getInstalledPackages(PackageManager.GET_SHARED_LIBRARY_FILES | PackageManager.GET_META_DATA | PackageManager.GET_UNINSTALLED_PACKAGES)
installedPackages = installedPackages.toString().replace(/PackageInfo[^ ]+ /g, "")
installedPackages = installedPackages.replace(/[\}|\[|\]| ]/g, "")

cfg = {}
var selectApps = cfg.selectApps || [];
observeKey = 1
var datas = [
   
    {
        "appindex": "016",
        "appname": "浮浮雷达",
        "tip": "",
        "package": "com.kugou.shiqutouch",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/0f3da94ed3fc9456213a73f42936f36f7bc88d4ed/com.kugou.shiqutouch.apk"
    },
    {
        "appindex": "016",
        "appname": "快手极速版",
        "tip": "",
        "package": "com.kuaishou.nebula",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/0dae94c2d29598f2241b1668aa13cd440ab40284a/com.kuaishou.nebula.apk"
    },
    {
        "appindex": "003",
        "appname": "刷宝短视频",
        "tip": "",
        "package": "com.jm.video",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/086d05171b925ff2baa6f8c5a1cc89943ee404221/com.jm.video.apk"
    },

    {
        "appindex": "015",
        "appname": "酷狗音乐大字版",
        "tip": "",
        "package": "com.kugou.android.elder",
        "hastext": false,
        "hasvideo": false,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/09ad8a56801db4b213e5ec6217f74cb9e9437b1f5/com.kugou.android.elder.apk",
        "noad": "0"
    },
    {
        "appindex": "014",
        "appname": "酷狗儿歌",
        "tip": "",
        "package": "com.kugou.android.child",
        "hastext": true,
        "hasvideo": false,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/0e5754458c1754db81d22b0ac918f6f2e9b57a766/com.kugou.android.child.apk",
        "noad": "1"
    },
    {
        "appindex": "053",
        "appname": "映客极速版",
        "tip": "",
        "package": "com.ingkee.lite",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/0dfb98441b0904417331e4410a3a4256ee5a38fe7/com.ingkee.lite.apk"
    },
    {
        "appindex": "051",
        "appname": "微博",
        "tip": "",
        "package": "com.sina.weibo",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/0809c513d51c2430f0d8d28d58d0618645e416f24/com.sina.weibo.apk"
    },
    {
        "appindex": "052",
        "appname": "抖音极速版",
        "tip": "",
        "package": "com.ss.android.ugc.aweme.lite",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/0d76746c8952786b487378471368a41675643c6c5/com.ss.android.ugc.aweme.lite.apk"
    },
    {
        "appindex": "001",
        "appname": "红包盒子",
        "tip": "",
        "package": "com.bang.redbox",
        "hastext": true,
        "hasvideo": false,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/0dd01437443aab1e3cfbcd1253983e70889426483/com.bang.redbox.apk"
    },
    {
        "appindex": "011",
        "appname": "趣看天下",
        "tip": "",
        "package": "com.yanhui.qktx",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/0b3945a46c9851d42e04743165866c3509042cbe4/com.yanhui.qktx.apk",
        "noad": "0"
    },
    {
        "appindex": "036",
        "appname": "快音",
        "tip": "",
        "package": "com.kuaiyin.player",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/073ca5b0ac29756ec661d63c3a8232a9fea42696b/com.kuaiyin.player.apk",
        "noad": "0"
    },
    {
        "appindex": "035",
        "appname": "趣来电",
        "tip": "",
        "package": "com.maiya.qulaidian",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/0beefe4b6733743413fb98b2c8c86dac695c0419e/com.maiya.qulaidian.apk"
    },
    {
        "appindex": "042",
        "appname": "彩蛋视频",
        "tip": "",
        "package": "com.jifen.dandan",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/0e39f53559cf2ff00883cd8c8e36873c81240408d/com.jifen.dandan.apk"
    },
    {
        "appindex": "032",
        "appname": "趣看视频",
        "tip": "",
        "package": "com.baomihua.qukan",
        "hastext": true,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/0ae09494827a1ed4df6950b41361a2564d44209a8/com.baomihua.qukan.apk"
    },
    {
        "appindex": "047",
        "appname": "火山极速版",
        "tip": " ",
        "package": "com.ss.android.ugc.livelite",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/09291948b5ccf4ba31281b035837af6466f8b1b39/com.ss.android.ugc.livelite.apk"
    },
    {
        "appindex": "031",
        "appname": "有料看看",
        "tip": "",
        "package": "com.youliao.topic",
        "hastext": true,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/0a8eb95f767a841b627d99d2e2e3d2c72f0ab35af/com.youliao.topic.apk"
    },
    {
        "appindex": "009",
        "appname": "微视",
        "tip": "",
        "package": "com.tencent.weishi",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/04fc142914482a9dd26b4d1c1088acff0f3403402/com.tencent.weishi.apk",
        "noad": "0"
    },
    {
        "appindex": "041",
        "appname": "玩赚魔盒",
        "tip": "",
        "package": "com.lucky.magicbox",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/036395c1168e0986f219150af1b98a8f22f417b43/com.lucky.magicbox.apk"
    },
    {
        "appindex": "048",
        "appname": "赚钱小视频",
        "tip": "",
        "package": "com.sljh.zqxsp",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://ip2341096666.out.azhimalayanvh.com/fs08/2020/08/27/6/110_1cb0a9c70363af6fa5ac590867dffdc0.apk"
    },
    {
        "appindex": "013",
        "appname": "蚂蚁看点",
        "tip": "",
        "package": "com.ldzs.zhangxin",
        "hastext": true,
        "hasvideo": false,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/0dfe4c46f6f4243672a969a31117f07b0b1448214/com.ldzs.zhangxin.apk",
        "noad": "1"
    },
    {
        "appindex": "006",
        "appname": "快7浏览器",
        "tip": "",
        "package": "com.jifen.browserq",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://imtt.dd.qq.com/16891/apk/7FF8B643FBDD941A015FC77FF31EA91C.apk",
        "noad": "1",
        "stable": "2",
        "autoredraw": "1"
    },
    {
        "appindex": "045",
        "appname": "火火视频极速版",
        "tip": "",
        "package": "com.jt.hanhan.video",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/06b4085cb58c34d013c7f2980e7276ba73191b706/com.jt.hanhan.video.apk"
    },
    {
        "appindex": "008",
        "appname": "糖豆",
        "tip": "",
        "package": "com.bokecc.dance",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/0faad5ad64998ceca00e13ce49314371eb842cfdd/com.bokecc.dance.apk",
        "noad": "0"
    },
    {
        "appindex": "033",
        "appname": "好爸爸清理大师",
        "tip": "",
        "package": "com.preface.clean",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": ""
    },
    {
        "appindex": "034",
        "appname": "荔枝铃声",
        "tip": "",
        "package": "com.preface.megatron",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/0964948eaa1953b9d9637efbf302f5cd7b9401b97/com.preface.megatron.apk"
    },
    {
        "appindex": "037",
        "appname": "集好视频",
        "tip": "",
        "package": "com.ztzj.jhsp",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/0b77855aa6fc064e3bca7cbfb90c63cc4c8409a07/com.ztzj.jhsp.apk",
        "noad": "0"
    },
    {
        "appindex": "002",
        "appname": "想看",
        "tip": "",
        "package": "com.xiangkan.android",
        "hastext": true,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/01bb34e456e02f7b5b1739cbdbea0aa8d0041c88d/com.xiangkan.android.apk"
    },
    {
        "appindex": "004",
        "appname": "趣铃声",
        "tip": "",
        "package": "com.zheyun.bumblebee",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/01ab9f4ef14464feb0941e2df6e1ade3be4befcc1/com.zheyun.bumblebee.apk"
    },
    {
        "appindex": "005",
        "appname": "酷铃声",
        "tip": "",
        "package": "com.zheyun.bumblebee.kls",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "http://dx13.awdudes.com/kuls101.apk"
    },
    {
        "appindex": "012",
        "appname": "趣头条",
        "tip": "",
        "package": "com.jifen.qukan",
        "hastext": true,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/06d3b400344cc514543f3483b153fd348a541afd6/com.jifen.qukan.apk"
    },
    {
        "appindex": "044",
        "appname": "天天爱清理",
        "tip": "",
        "package": "com.xiaoqiao.qclean",
        "hastext": false,
        "hasvideo": true,
        "downloadurl": "https://fga1.market.xiaomi.com/download/AppStore/06c354609f422fbd131066af9496b72359d40fec2/com.xiaoqiao.qclean.apk"
    },
]
// cfg.datas = datas;
// saveConfig();
layout1();

function layout1() {
    var aa = '<drawer id="drawer">\
    <vertical>\
        <appbar bg="#FF0033">\
            <toolbar id="toolbar" title="APP安装 支持小米/天语"/>\
            <tabs id="tabs"/>\
        </appbar>\
        <viewpager id="viewpager">\
            <frame>\
                <ScrollView marginBottom="70" paddingTop="5">\
                    <vertical id="datav">\
                    </vertical>\
                </ScrollView>\
                <LinearLayout gravity="bottom">\
                    <button  id="selinstallall" w="auto" text="全选未装" textSize="20sp" bg="#dbce8f" textColor="#000000" padding="0 20"/>\
                    <button  id="selnull" w="auto" text="不选" textSize="20sp" bg="#B0E0E6" textColor="#000000" padding="0 20"/>\
                    <button textColor="blue" w="*" id="openfloat" textSize="20sp" bg="#FF0033" textColor="#ffffff" padding="0 20">开始下载</button>\
                </LinearLayout>\
            </frame>\
            <frame>\
                <ScrollView marginBottom="70" paddingTop="20">\
                    <vertical gravity="top">\
                        <Switch id="autoService" text="无障碍服务（必选）" textColor="black" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp"/>\
                        <frame gravity="center" id="autoServiceTip">\
                            <text text="无障碍服务是平台运行的前提，请务必勾选，在打开的无障碍列表中，选择快刷V4并选中。" gravity="left" padding="15 0 15 0" />\
                        </frame>\
                        <Switch id="observeKey" text="音量下键停止任务" padding="8 8 8 8" textColor="black" checked="{{observeKey == 1}}" textSize="15sp" visibility="gone"/>\
                    </vertical>\
                </ScrollView>\
                <vertical gravity="bottom">\
                    <button textColor="blue" id="btnSave" textSize="20sp" bg="#FF0033" textColor="#ffffff" padding="0 20">保存设置</button>\
                </vertical>\
            </frame>\
        </viewpager>\
    </vertical>\
</drawer>'
    ui.layout(aa);

    function saveSel() {
        selectApps = [];
        for (var i = 0; i < datas.length; i++) {
            var v = ui.datav.findViewById(i);
            if (v.checked)
                selectApps.push(datas[i].appname);
        }
        cfg.selectApps = selectApps;
        // saveConfig();
    }
    ui.selinstallall.on('click', function () {
        for (var i = 0; i < datas.length; i++) {
            var v = ui.datav.findViewById(i);
            // v.checked = (installedPackages.indexOf(datas[i].package) >= 0);
            v.checked = (installedPackages.indexOf(datas[i].package) == -1);
        }
        saveSel()
    })
    // ui.selall.on('click', function () {
    //     for (var i = 0; i < datas.length; i++) {
    //         var v = ui.datav.findViewById(i);
    //         v.checked = !0;
    //     }
    //     saveSel()
    // })
    ui.selnull.on('click', function () {
        for (var i = 0; i < datas.length; i++) {
            var v = ui.datav.findViewById(i);
            v.checked = !1;
        }
        saveSel()
    })
    for (var i = 0; i < datas.length; i += 1) {
        var lin = new android.widget.LinearLayout(context)
        lin.setMargin = "8"
        var child = new android.widget.CheckBox(context);
        child.setId(i);
        child.setChecked(selectApps.indexOf(datas[i].appname) >= 0);
        child.setTextColor(colors.parseColor(installedPackages.indexOf(datas[i].package) >= 0 ? '#008800' : '#333333'))
        child.setText(datas[i].appindex + '.' + datas[i].appname + (datas[i].tip ? ' ' + datas[i].tip : ''));
        child.on("check", function (checked, a) {
            var tmpapp = datas[a.id].appname;
            if (checked) {
                selectApps.push(tmpapp);
            } else {
                var jk = selectApps.indexOf(tmpapp);
                if (jk >= 0)
                    selectApps.splice(jk, 1);
            }
            cfg.selectApps = selectApps;
            // saveConfig();
        });
        lin.addView(child);
        var child = new android.widget.TextView(context);
        child.setId(i);
        child.setTextSize(15);
        child.setGravity(1);
        // child.setText(' 设置');
        child.on("click", function (a) {
            saveSel();
            posidx = a.id;
            layout2();
            ui.appname.setTitle(datas[a.id].appname + '自定义设置');
            for (var kkk = 0; kkk < selectAppDefines.length; kkk++) {
                if (selectAppDefines[kkk].appname == datas[a.id].appname) {
                    var ccc = selectAppDefines[kkk];
                    ui.myminminutes.setText(String(ccc.minminutes || ''));
                    ui.mymaxminutes.setText(String(ccc.maxminutes || ''));
                    ui.mymaxtimes.setText(String(ccc.maxtimes || ''));
                    ui.myminswipe.setText(String(ccc.minswipe || ''));
                    ui.mymaxswipe.setText(String(ccc.maxswipe || ''));
                    ui.mymintextsec.setText(String(ccc.mintextsec || ''));
                    ui.mymaxtextsec.setText(String(ccc.maxtextsec || ''));
                    ui.myminvideosec.setText(String(ccc.minvideosec || ''));
                    ui.mymaxvideosec.setText(String(ccc.maxvideosec || ''));
                    ui.time1.checked = ((Number(ccc.time1) || 0) == 1);
                    ui.time1From.setText(ccc.time1From == undefined ? '' : String(ccc.time1From));
                    ui.time1To.setText(ccc.time1To == undefined ? '' : String(ccc.time1To));
                    ui.time2.checked = ((Number(ccc.time2) || 0) == 1);
                    ui.time2From.setText(ccc.time2From == undefined ? '' : String(ccc.time2From));
                    ui.time2To.setText(ccc.time2To == undefined ? '' : String(ccc.time2To));
                    ui.time3.checked = ((Number(ccc.time3) || 0) == 1);
                    ui.time3From.setText(ccc.time3From == undefined ? '' : String(ccc.time3From));
                    ui.time3To.setText(ccc.time3To == undefined ? '' : String(ccc.time3To));
                    break;
                }
            }
        });
        lin.addView(child);
        if ((datas[i].appindex < 988 || datas[i].appindex == 989) && installedPackages.indexOf(datas[i].package) == -1) {
            child = new android.widget.TextView(context);
            child.setId(i)
            child.setTextColor(colors.parseColor('#999999'))
            child.setTextSize(15);
            child.setText(' 缺失');
            child.on("click", function (a) {
                threads.start(function () {
                    down_work(datas[a.id].appname)       
                })
            });
            lin.addView(child);
        }
        ui.datav.addView(lin);
    }

    activity.setSupportActionBar(ui.toolbar);
    ui.viewpager.setTitles(["阅读设置", "全局设置", "机器激活"]);
    // ui.viewpager.setTitles(["阅读设置"]);
    ui.tabs.setupWithViewPager(ui.viewpager);
    ui.observeKey.on('check', function (checked) {
        if (checked) {
            // func.saveConfig("observeKey", 1);
            // func.toast('开通后，悬浮窗启动任务时生效', 2);
            events.observeKey();
        } else {
            // func.saveConfig("observeKey", 0);
            // func.toast('关闭音量下键停止脚本运行', 2);
            events.removeAllListeners();
        }
    });



    ui.btnSave.on("click", function () {
        saveSel();
        var s2 = Number(ui.minminutes.text()) || 0;
        var b2 = Number(ui.maxminutes.text()) || 0;
        if (s2 <= 0) {
            alert('请输入时间范围有效的起始随机数！');
            return;
        }
        if (b2 <= 0) {
            alert('请输入时间范围有效的终止随机数！');
            return;
        }
        if (b2 < s2) {
            alert('时间范围终止随机数不能小于起始随机数');
            return;
        }
        var s1 = Number(ui.minswipe.text()) || 0;
        var b1 = Number(ui.maxswipe.text()) || 0;
        if (s1 <= 0) {
            alert('请输入上拉次数有效的起始随机数！');
            return;
        }
        if (b1 <= 0) {
            alert('请输入上次次数有效的终止随机数！');
            return;
        }
        if (b1 < s1) {
            alert('上次次数终止随机数不能小于起始随机数');
            return;
        }
        var s3 = Number(ui.mintextsec.text()) || 0;
        var b3 = Number(ui.maxtextsec.text()) || 0;
        if (s3 <= 0) {
            alert('请输入上拉次数有效的起始随机数！');
            return;
        }
        if (b3 <= 0) {
            alert('请输入上次次数有效的终止随机数！');
            return;
        }
        if (b3 < s3) {
            alert('上次次数终止随机数不能小于起始随机数');
            return;
        }
        var s4 = Number(ui.minvideosec.text()) || 0;
        var b4 = Number(ui.maxvideosec.text()) || 0;
        if (s4 <= 0) {
            alert('请输入上拉次数有效的起始随机数！');
            return;
        }
        if (b4 <= 0) {
            alert('请输入上次次数有效的终止随机数！');
            return;
        }
        if (b4 < s4) {
            alert('上次次数终止随机数不能小于起始随机数');
            return;
        }
        cfg.time0 = 0;
        cfg.time0From = cfg.time0To = '';
        cfg.clearGarbarge = ui.clearGarbarge.checked ? 1 : 0;
        // saveConfig();
        minminutes = s2;
        maxminutes = b2;
        minswipe = s1;
        maxswipe = b1;
        mintextsec = s3;
        maxtextsec = b3;
        minvideosec = s4;
        maxvideosec = b4;
        scrollUp();
    });
    ui.openfloat.on('click', function () {
        saveSel();
         if (selectApps.length <= 0) {
            alert('您没有选择待运行的APP，请在列表勾选');
            return;
        }
            threads.start(function () {
                            // ui.finish();
                for (var ii = 0; ii < selectApps.length; ii++) {
                    let down_app_name = selectApps[ii];
                    // down_work(down_app_name)
                    try {
                        down_work(down_app_name)
                    }
                    catch (e) {
                        log(down_app_name, '下载出错', e.message + '\n\r' + e.stack)
                    }
                }
        })
    })
}


ui.emitter.on("resume", function () {
    if (ui.autoService)
        ui.autoService.checked = auto.service != null;
});
ui.emitter.on("create_options_menu", function (menu) {
    menu.add("退出");
});
ui.emitter.on("options_item_selected", function (e, item) {
    switch (item.getTitle()) {
        case "退出":
            threads.shutDownAll();
            ui.finish();
            break;
    }
    e.consumed = true;
});
ui.emitter.on("back_pressed", function (e) {
    e.consumed = true;
    dialogs.confirm("确定要退出程序？").then(function (exit) {
        if (exit) {
            ui.finish();
        }
    });
});

function download_app(donw_app_name, downurl) {
    importClass('java.net.MalformedURLException');
    importClass('java.net.URL');
    importClass('java.net.URLConnection');
    importClass('java.util.ArrayList');
    importClass('java.io.FileOutputStream');
    importClass('java.io.IOException');
    importClass('java.io.InputStream');
    console.log(donw_app_name);
    console.log(downurl);
    
    
    local_file_name = donw_app_name + ".apk"
    phone_root_path = files.getSdcardPath()
    phone_down_dir = phone_root_path + "/"
    local_file_path = phone_down_dir + local_file_name
    var url = new URL(downurl);
    try {
        var conn = url.openConnection(); //URLConnection
        // var conn = url.URLConnection(); //URLConnection
    } catch (err) {

        return false
    }
    var inStream = conn.getInputStream(); //InputStream
    var fs = new FileOutputStream(local_file_path); //FileOutputStream
    var connLength = conn.getContentLength(); //int
    var buffer = util.java.array('byte', 1024); //byte[]
    var byteSum = 0; //总共读取的文件大小
    var byteRead; //每次读取的byte数
    var threadId = threads.start(function () {
        donw_num = 0
        while (1) {
            donw_num += 1
            if (donw_num > 120) {
                toastLog(donw_app_name + ":下载失败")
                return false
            }
            var 当前写入的文件大小 = byteSum;
            var progress = (当前写入的文件大小 / connLength) * 100;
            if (progress > 0.1) {
                var progress = parseInt(progress).toString() + '%';
                ui.run(function () {
                    toast(donw_app_name + "下载进度:" + progress)
                });
                if (当前写入的文件大小 >= connLength) {
                    files.rename(local_file_name_lock, local_file_path);
                    break;
                }
            }
            sleep(1000);
        }
    });
    try {
        while ((byteRead = inStream.read(buffer)) != -1) {
            byteSum += byteRead;
            //当前时间
            currentTime = java.lang.System.currentTimeMillis();
            fs.write(buffer, 0, byteRead); //读取
        }
        threadId && threadId.isAlive() && threadId.interrupt();
        return local_file_path
    } catch (err) {
        return false
    }
}

function install_app(app_name, local_file_path) {
    lock_intall_num = 0
    while (true) {
        lock_intall_num += 1
        if (lock_intall_num > 5) {
            console.error("安装异常0:" + app_name)
            return
        }
        app.viewFile(local_file_path)
        sleep(2000)
        var app_install_info = textContains(app_name).findOne(5000)
        if (app_install_info) {
            break
        }
        var error_install = textContains("出现问题").findOne(1500)
        if (error_install) {
            error_install_cion = text("确定").findOne(3000)
            if (!error_install_cion) {
                console.error("安装异常1:" + app_name)
                return
            }
            click(error_install_cion.bounds().centerX(), error_install_cion.bounds().centerY())
        }
    }

    // o = textMatches('微信|微信好友').visibleToUser().findOnce() || descMatches('微信|微信好友').visibleToUser().findOnce()


    var ii = 10;
    while (ii-- > 0 && !textMatches('完成|打开').visibleToUser().exists()) {
        toast(app_name+"  安装中..."+ii)
        sleep(1000)
        o = textMatches('.*扫描.*|.*检测.*').visibleToUser().exists()
        if (o) {
            sleep_ll(15000, '检测中...', "!textMatches('.*扫描.*|.*检测.*').visibleToUser().exists() ");
        }
        // o = textMatches('继续|始终允许|允许|安装|下一步|确定|我已充分了解该风险，继续安装|继续安装').visibleToUser().findOnce()
        // if(o){
        //     click(o.bounds().centerX(), o.bounds().centerY())
        //     sleep(3000)
        // }
        sleep(3000)
        oo = id('cancel_btn').text('取消').findOnce()
        if(oo){
            xy = oo.bounds()
            oo = text('继续安装').boundsInside(xy.left,xy.top,xy.right,xy.bottom).findOnce()
            if(oo){
                o = textMatches('继续|始终允许|允许|安装|下一步|确定|我已充分了解该风险，继续安装').visibleToUser().findOnce()
                if(o){
                toast("特殊情况1")
                    click(o.bounds().centerX(), o.bounds().centerY())
                    sleep(3000)
                }
            }else{
                toast("特殊情况2")
                o = textMatches('继续|始终允许|允许|安装|下一步|确定|我已充分了解该风险，继续安装|继续安装').visibleToUser().findOnce()
                if(o){
                    click(o.bounds().centerX(), o.bounds().centerY())
                    sleep(3000)
                }
        
            }
        }else{
            o = textMatches('继续|始终允许|允许|安装|下一步|确定|我已充分了解该风险，继续安装|继续安装').visibleToUser().findOnce()
            if(o){
                click(o.bounds().centerX(), o.bounds().centerY())
                sleep(3000)
            }
        }
    }
    home()
    sleep(3000)
    clear()
}

function down_work(down_app_name) {

    down_app_package = ''
    down_app_url = ''
    for (var ll = 0; ll < datas.length; ll++) {
        let once_app_info = datas[ll];
        if (once_app_info['appname'] == down_app_name) {
            // console.log(once_app_info);
            down_app_package = once_app_info['package']
            down_app_url = once_app_info['downloadurl']
            break
        }
    }
    if (!down_app_package) {
        console.log(down_app_name + "  获取信息异常,请尝试手动下载");
        return
    }
    if (app.getAppName(down_app_package)) {
        console.log(down_app_name + "  存在,跳过下载");
        return
    }

    if (!down_app_url) {
        console.log(down_app_name + "  获取下载地址失败,请尝试手动下载");
        return
    }
    // 开始下载
    console.log("已经获取地址开始已下载");
    
    app_path = download_app(down_app_name, down_app_url)
    if(!app_path){
        console.log(down_app_name + "  下载失败,请尝试手动下载");
        return
    }
    console.log("下载完成开始安装");
    
    //开始安装
    install_app(down_app_name,app_path)
}


function sleepWithTip(txt, waitsec, brk) {
    while (waitsec > 0) {

        if (waitsec % 1 == 0)
            toast(txt + waitsec + '秒', 1);
        sleep(1000);
        waitsec--;

        if (brk != '') {
            if (eval(brk)) {
                break;
            }
        }
    }
}

function sleep_ll(ms, txt, brk) {
    txt = txt || '';
    if (txt) {
        sleepWithTip(txt, parseInt(ms / 1000), brk);
        return;
    }

    for (var i = 0; i < 3; i++) { //重试三次
        try {
            sleep(ms);
            i = 4;
            break;
        }
        catch (e) {
            //this.log("sleep","sleep出错",e.message + '\n\r' + e.stack);
        }
    }
}


 function clear(){
    try{
        recents();
        this.sleep(2000);
        var o = id('clearAnimView').findOnce() || id('memoryAndClearContainer').findOnce() || id('clear_all_recents_image_button').findOnce() || id('cover_image_linear').findOnce() || id('recents_clear_button').findOnce() || id('progress_circle_view').findOnce(); //小米、华为、联想
        if (o){
            click(o.bounds().centerX(), o.bounds().centerY())
            // this.clickObject(o);
            sleep(1000)
        }
    }
    catch(e){
        this.log("函数",'清理',e.message + '\n\r' + e.stack);
    }
}






 
