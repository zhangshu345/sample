auto.waitFor()
auto.setMode("normal")
importClass('java.io.FileOutputStream');
importClass('java.io.IOException');
importClass('java.io.InputStream');
importClass('java.net.MalformedURLException');
importClass('java.net.URL');
importClass('java.net.URLConnection');
importClass('java.util.ArrayList');

function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}


var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
log("公共函数实例化成功")
}else {
log("公共函数实例化失败,程序重启")
//这里应该是重新启动脚本 todo
}

function boboshipin(package) {
    appname = getAppName(package)

    var o = id(package + ':id/axs').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName(package).textMatches('我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName(package).textMatches('提现').visibleToUser().findOnce();
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }

    var o = packageName(package).text('点击登录').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = id(package + ':id/b0b').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = id(package + ':id/yr').visibleToUser().findOnce();
    if (o) {
        console.log(appname + "已经登录")
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

}
function caidanshipin(package) {
    appname = getAppName(package)
    var o = packageName(package).textMatches('登录|我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/login_person_name').visibleToUser().exists()
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }
    var o = packageName(package).textMatches('微信一键登录|微信登录|微信账号登录|登录领.*|登录最高.*|立即登录|同意并登录|微信登录|微信|微信一键登录').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

}
function dianshijia(package) {
    appname = getAppName(package)

    var o = packageName(package).textMatches('选好了').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }


    var o = packageName(package).textMatches('我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }

    o = id(package + ':id/user_name').visibleToUser().findOnce()
    if (o) {
        if (o.text() != "未登录") {
            console.log(appname + "已经登录")
            thread.interrupt();
            return true;
        }
    }
    var o = packageName(package).text('未登录').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
}
function dongfangtoutiao(package) {
    appname = getAppName(package)
    var o = packageName(package).textMatches('我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/anm').visibleToUser().exists()
    if (o) {
        console.log(appname + "已经登录")
        thread.interrupt();
        return true;
    }
    var o = packageName(package).textMatches('.*登录.*').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName(package).textMatches('.*阅读并同意.*').visibleToUser().findOnce();
    if (o) {
        click(o.bounds().left - 5, o.bounds().top)
        sleep(2000)
        click(o.bounds().left, o.bounds().top - 50)
        sleep(2000)
    }

    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/ty').visibleToUser().exists()
    if (o) {
        console.log(appname + "已经登录")
        thread.interrupt();
        return true;
    }
}
function huohuoshipinjisuban(package) {
    appname = getAppName(package)
    var o = packageName(package).textMatches('任务|登录|我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName(package).textMatches('今日金币.*').visibleToUser().findOnce();
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }
    var o = packageName(package).textMatches('.*登录领.*').visibleToUser().findOnce();
    if (o) {
        // click(o.bounds().left-5,o.bounds().top)
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName(package).textMatches('微信一键登录').visibleToUser().findOnce();

    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/jw').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
}
function huoshanjisuban(package) {
    appname = getAppName(package)
    var o = packageName(package).textMatches('.*登录|我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = id(package + ':id/gr').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName(package).textMatches('去领钱.*').visibleToUser().findOnce();
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }


    var o = packageName(package).textMatches('登录领.*|登录最高.*|立即登录|同意并登录|微信登录|微信|微信一键登录').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
}
function kandiankuaibao(package) {
    appname = getAppName(package)
    var o = packageName(package).textMatches('未登录|我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/mine_tab_better_header_user_name').visibleToUser().exists()
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }
    var o = packageName(package).textMatches('微信登录|微信|微信一键登录').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
}
function kugoudaziban(package) {
    appname = getAppName(package)
    var o = packageName(package).textMatches('赚钱|我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = id(package + ':id/exu').textMatches('提现').visibleToUser().exists()
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }
    var o = packageName(package).textMatches('.*登录.*').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName(package).textMatches('.*微信登录.*').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/ezk').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
}
function kuai7liulanqi(package) {
    appname = getAppName(package)
    var o = packageName(package).textMatches('我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/img_head').visibleToUser().exists()
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }

    var o = id(package + ':id/open_red_packet').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName(package).text('登录领现金').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName(package).text('已存入账户，微信提现').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = id(package + ':id/btn_back').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
}
function kuaikandian(package) {
    appname = getAppName(package)
    var o = packageName(package).textMatches('福利|任务|我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/invite_code').textMatches('.*邀请码.*').visibleToUser().exists()
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }
    var o = packageName(package).textMatches('微信登录|微信|微信一键登录').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
}
function kuaiyin(package) {
    appname = getAppName(package)

    var o = id(package + ':id/tv_item').textMatches('我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/inviteTitle').visibleToUser().exists()
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }
    var o = packageName(package).text('微信登录').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/w_v_back').visibleToUser().exists()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

}
function midujisuban(package) {
    appname = getAppName(package)
    var o = packageName(package).textMatches('我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }
    // var o = packageName(package).textMatches('提现').visibleToUser().findOnce();
    var o = id(package + ':id/aq5').textMatches('.*今日.*').visibleToUser().exists()
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }
    var o = id(package + ':id/a08').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/gk').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName(package).textMatches('.*登录.*').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName(package).textMatches('微信|微信一键登录').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
}
function qutoutiao(package) {
    appname = getAppName(package)
    var o = packageName(package).textMatches('登录|我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/bun').visibleToUser().exists()
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }
    var o = packageName(package).textMatches('微信一键登录|微信登录|微信账号登录|登录领.*|登录最高.*|立即登录|同意并登录|微信登录|微信|微信一键登录').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
}
function shuabaoduanshipin(package) {
    appname = getAppName(package)
    var o = packageName(package).textMatches('登录|我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/iv_head').visibleToUser().exists()
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }
    var o = packageName(package).textMatches('微信账号登录|登录领.*|登录最高.*|立即登录|同意并登录|微信登录|微信|微信一键登录').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/imgClose').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
}
function tiantianaiqingli(package) {
    appname = getAppName(package)

    var o = packageName(package).textMatches('我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName(package).textMatches('.*邀请码.*').visibleToUser().findOnce();
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }
    var o = packageName(package).textMatches('登录最高.*|立即登录|同意并登录|微信登录|微信|微信一键登录').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(1000)
    }
    var o = id(package + ':id/tv_account_name').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName(package).text('确定').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName(package).text('微信').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/iv_close').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
}
function weilikankan(package) {
    appname = getAppName(package)
    var o = id(package + ':id/redFloat').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/rl_bottom_4').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = id(package + ':id/tv_user_center').visibleToUser().exists()
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }

    var o = id(package + ':id/tv_wechat').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
}
function xiangkan(package) {
    appname = getAppName(package)

    var o = packageName(package).textMatches('登录|我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName(package).textMatches('.*邀请码.*').visibleToUser().findOnce();
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }
    var o = id(package + ':id/tv_wechat').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName(package).textMatches('微信一键登录|微信登录|微信账号登录|登录领.*|登录最高.*|立即登录|同意并登录|微信登录|微信|微信一键登录').visibleToUser().findOnce();
    if (o) {
        log("准备授权")
        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
}
function xiaogaotang(package) {
    appname = getAppName(package)

    var o = packageName(package).textMatches('我|我的').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }

    var o = packageName(package).textMatches('提现').visibleToUser().findOnce();
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }

    var o = id(package + ':id/tvLogin').textMatches('.*注册.*').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
        back()
        sleep(500)
    }

    var o = packageName(package).text('微信一键登录').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }


    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
}
function youliaokankan(package) {
    appname = getAppName(package)

    var o = packageName(package).textMatches('我|我的|资产').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName(package).textMatches('我的金币').visibleToUser().findOnce();
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }
    var o = packageName(package).textMatches('微信一键登录|微信登录|微信账号登录|登录领.*|登录最高.*|立即登录|同意并登录|微信登录|微信|微信一键登录').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(2000)
    }

}
function huluwa(package) {
    appname = getAppName(package)

    var o = packageName(package).textMatches('我|我的|资产').visibleToUser().findOnce();
    if (o) {

        fun_lofin.clickObject(o);
        sleep(2000)
    }
    var o = packageName(package).textMatches('编辑资料').visibleToUser().findOnce();
    if (o) {
        console.log(appname + "已经登录")
        return true;
    }
    var o = packageName(package).textMatches('游客.*').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(1000)
    }

    var o = packageName(package).textMatches('微信登录并领取|微信登录|微信账号登录|登录领.*|登录最高.*|立即登录|同意并登录|微信登录|微信|微信一键登录').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(1000)
    }
    var o = packageName(package).text('切换账号').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(1000);
    }
    var o = packageName(package).text('好的').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(1000);
    }
    var o = id(package + ':id/tv_user_nick').visibleToUser().findOnce();
    if (o) {
        fun_lofin.clickObject(o);
        sleep(1000);
    }

    var o = packageName('com.tencent.mm').textMatches('同意|确认登录').visibleToUser().findOnce()
    if (o) {
        fun_lofin.clickObject(o);
        sleep(1000)
    }
}


/** ----------------------------------------------------------------- **/





var install_func = {};
install_func.textclick =function (i, t, left, top, right, bottom) {
    t = t || 500
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f = text(i).boundsInside(left, top, right, bottom).findOne(t);
    if (f) {
        if (!f.click()) {
            b = f.bounds()
            r = click(b.centerX(), b.centerY())
            return r
        } else {
            return true
        }
    }
    return false
}
install_func.clicktexts =function (texts, t, st) {
    st = st || 200
    t = t || 200
    for (i = 0; i < texts.length; i++) {
        if (install_func.textclick(texts[i], t)) {
            sleep(st)
        }
    }
}
install_func.download_app = function (donw_app_name) {

    var url = "http://y.xiequbo.cn/api/jiuzhou/appurl";
    var res = http.post(url, {
        "appname": donw_app_name,
    });
    if (res.statusCode != 200) {
        toastLog("下载" + donw_app_name + "失败，请您稍后再试")
        return
    }
    else {
        downurl = res.body.json()['data']["downurl"]
    }
    local_file_name = donw_app_name + ".apk"
    phone_root_path = files.getSdcardPath()
    phone_down_dir = phone_root_path + "/"
    local_file_path = phone_down_dir + local_file_name
    var url = new URL(downurl);
    try {
        var conn = url.openConnection(); //URLConnection
        conn.setConnectTimeout(10000);
        conn.setReadTimeout(180000);
        var inStream = conn.getInputStream(); //InputStream
        var connLength = conn.getContentLength(); //int
    } catch (err) {
        toast("下载异常0:" + app_name)
        console.error("下载异常0:" + app_name)
        return false
    }
    var fs = new FileOutputStream(local_file_path); //FileOutputStream

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
                    // console.log(name + "下载进度", progress);
                    // toastLog(donw_app_name + "下载进度:" + progress)
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


install_func.install_app = function (app_name, local_file_path) {
    lock_intall_num = 0
    while(true){
        lock_intall_num +=1
        if(lock_intall_num>5){
            console.error("安装异常0:" + app_name)
            return
        }
        app.viewFile(local_file_path)
        sleep(2000)
        var app_install_info = textContains(app_name).findOne(1500)
        if(app_install_info){
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



    clickarray = ["继续", "始终允许", "允许", "安装", "继续安装", "下一步", "确定", "我已充分了解该风险，继续安装"]

    num_install = 0
    while (true) {
        num_install += 1
        // toastLog(app_name+"检测安装倒计时:"+(50-num_install))
        toast(app_name + "检测安装倒计时:" + (50 - num_install))
        stat_install1 = textContains("扫描").findOne(200)
        stat_install2 = textContains("检测").findOne(200)
        if (stat_install1 || stat_install2) {
            // toastLog("安装检测中...")
            toast("安装检测中...")
            sleep(3000)
        }

        if (num_install > 50) {
            return
        }
        install_func.clicktexts(clickarray)


        over_install1 = text("完成").findOne(200)
        over_install2 = text("打开").findOne(200)
        if (over_install1 || over_install2) {
            error_install_cion = text("完成").findOne(500)
            if (error_install_cion) {
                click(error_install_cion.bounds().centerX(), error_install_cion.bounds().centerY())

                return 1
            }
            sleep(1000)
            back()
            return 1
        }
        if (currentPackage() == getPackageName(app_name)) {
            // close_app(app_name)
            return 1

        }
    }
}
install_func.donw_insall_name = function (app_name) {
    if (getPackageName(app_name)) {
        toastLog("APP已经存在,跳过下载:" + app_name)
        return
    }
    toastLog("准备下载:" + app_name)
    donw_num_11 = 0
    while(true){
        donw_num_11 +=1
        if(donw_num_11>5){
            console.error("下载失败:" + app_name)
            return false
            // break
        }
        local_file_path = install_func.download_app(app_name)
        if(local_file_path){
            break
        }
    }
    
    toastLog("开始安装:" + app_name)
    insatll_num_11 = 0
    while(true){
        insatll_num_11 +=1
        if(insatll_num_11 >5){
            console.error("安装失败:" + app_name)
            return false
            break
        }
        install_result = install_func.install_app(app_name, local_file_path)
        if(install_result){
            // break
            return true
        }
    }

    

}


/** ----------------------------------------------------------------- **/
var fun_lofin = {};
function isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
            // log("存在")
            return true
        }
    }
    return false;
}

fun_lofin.clickObject = function (obj, xoffset, yoffset) {
    var o = true, ii = 3;
    if (obj) {
        while (ii-- > 0) {
            try {
                var itm = obj.bounds();
                var x = Number(xoffset) || 0;
                var y = Number(yoffset) || 0;
                o = click(itm.centerX() + x, itm.centerY() + y);
            }
            catch (e) {
                log('click failure=' + e.message);
                log(e.stack);
                o = false;
            }
            if (o)
                break;
        }
    }
    else
        o = false;
    return o;
}
fun_lofin.w_hasDialog = function () {

    if (text('等待').exists() && text('确定').exists()) {
        var o = text('确定').findOnce();
        this.clickObject(o);
    }

    var o = textMatches('允许|始终允许|总是允许').visibleToUser().findOnce()
    if (o) {
        this.clickObject(o);
    }
}
function hasDialog(package) {
    appname = getAppName(package);

    // var fun_lofin = classModule.fun_lofin;
    setInterval(() => {
        toast(appname+"登录中....")
        fun_lofin.w_hasDialog();
        if(appname != "趣宠短视频" && appname != "音浪短视频" && appname != "高手短视频" &&  appname != "变身记短视频" && appname != "小吃货短视频" && appname != "有颜短视频" && appname != "快逗短视频" ){
            var o = idMatches(package + ':id/.*close.*').visibleToUser().findOnce();
            if (o) {
                // console.log(0);
                fun_lofin.clickObject(o);
            }
        }else{
            var o = packageName(package).textMatches('取消').visibleToUser().findOnce()
            if (o) {
                // console.log(00);
                back()
            }
        }

        // 每个的特殊需求   想看
        var o = id(package + ':id/tv_upgrade_cancel').visibleToUser().findOnce();
        // var o = packageName(package).textMatches('去授权').visibleToUser().findOnce()
        if (o) {
            // console.log(1);
            fun_lofin.clickObject(o);
        }

        var o = packageName(package).textMatches('先去逛逛|去授权|同意，继续使用|同意并继续|同意|确定|我知道了|知道了|完成|暂不领取|忽略此版本').visibleToUser().findOnce()
        if (o) {
            // console.log(2);
            fun_lofin.clickObject(o);
        }


        o = className('ImageView').filter(function (w) { return w.id() == '' && (w.desc() == null || w.desc() == '') && (w.text() == null || w.text() == ''); }).visibleToUser().find()
        if (o.length == 1) {
            // console.log(3);
            fun_lofin.clickObject(o[0])
        }
    }, 3000);
}
fun_lofin.openWaiting = function (activities) {
    var activities = activities || ['.FrameLayout', '.SplashActivity'];
    if (activities.length <= 0) {
        return;
    }
    var lops = 6;
    while (lops-- > 0) {
        var condition = false;
        for (var i = 0; i < activities.length; i++) {
            condition = condition || currentActivity().indexOf(activities[i]) > 0;
        }
        if (condition) {
            sleep(3000);
        }
        else {
            break;
        }

    }
}
fun_lofin.execApp = function (packname, package, millsec, condition) {
    toast('开始执行登录:' + packname, 2)
    jj = 5
    while (jj-- > 0) {
        try {
            launchApp(packname);
            sleep(2000);
            if (currentPackage() == package) {
                return true
            }
        }
        catch (e) {
            log(packname, '使用launchApp运行app', e.message + '\n\r' + e.stack);
        }
        sleep(1000);

    }
    sleep(10000);
    return
}
fun_lofin.clear = function () {
    try {
        recents();
        sleep(2000);
        var o = id('clear_all_button').findOnce() || id('clearAnimView').findOnce() || id('recents_close_all_button').findOnce() || id('memoryAndClearContainer').findOnce() || id('clear_all_recents_image_button').findOnce() || id('cover_image_linear').findOnce(); //小米、华为、联想
        if (o) {
            this.clickObject(o);
            sleep(1000)
        } else {
            back()
        }
    }
    catch (e) {
        log("函数", '清理', e.message + '\n\r' + e.stack);
    }
}
fun_lofin.start = function (appname) {
    var package = getPackageName(appname)
    log(appname + '开始登录')
    if(!package){
        console.error("检测APP:" + appname+"不存在")
        return
    }
    // var thread = threads.start(hasDialog);  //启动新的线程来检测是否有弹出窗口

    thread = threads.start(function () {
        hasDialog(package)
    })



    var ii = 5
    while (ii-- > 0) {
        toast(appname+"登录初始化中...")
        sleep(1000);
    }


    if (currentPackage() != package) {
        var o = fun_lofin.execApp(appname, package)
    }

    fun_lofin.openWaiting(['.FrameLayout', '.SplashActivity'])



    if (appname != "有料看看" && appname != "酷狗音乐大字版"&& appname != "微鲤看看") {
        var ii = 3
        // while (ii-- > 0 && !id(package + ':id/aid').visibleToUser().exists()) {
        while (ii-- > 0 && !packageName(package).textMatches('任务|推荐|我|我的').visibleToUser().exists()) {
            toast("初始化中...")
            back();
            sleep(2200);
        }
    }

    have_login = false
    var jj = 10
    while (jj-- > 0) {
        if (appname == "波波视频") {
            login_result = boboshipin(package)
        } else if (appname == "彩蛋视频") {
            login_result = caidanshipin(package)
        } else if (appname == "电视家") {
            login_result = dianshijia(package)
        } else if (appname == "东方头条") {
            login_result = dongfangtoutiao(package)
        } else if (appname == "火火视频极速版") {
            login_result = huohuoshipinjisuban(package)
        } else if (appname == "火山极速版") {
            login_result = huoshanjisuban(package)
        } else if (appname == "看点快报") {
            login_result = kandiankuaibao(package)
        } else if (appname == "酷狗音乐大字版") {
            login_result = kugoudaziban(package)
        } else if (appname == "快7浏览器") {
            login_result = kuai7liulanqi(package)
        } else if (appname == "快看点") {
            login_result = kuaikandian(package)
        } else if (appname == "快音") {
            login_result = kuaiyin(package)
        } else if (appname == "米读极速版") {
            login_result = midujisuban(package)
        } else if (appname == "刷宝短视频") {
            login_result = shuabaoduanshipin(package)
        } else if (appname == "天天爱清理") {
            login_result = tiantianaiqingli(package)
        } else if (appname == "微鲤看看") {
            login_result = weilikankan(package)
        } else if (appname == "想看") {
            login_result = xiangkan(package)
        } else if (appname == "小糖糕") {
            login_result = xiaogaotang(package)
        } else if (appname == "有料看看") {
            login_result = youliaokankan(package)
        } else if (appname == "趣宠短视频") {
            login_result = huluwa(package)
        }else if (appname == "音浪短视频") {
            login_result = huluwa(package)
        }else if (appname == "高手短视频") {
            login_result = huluwa(package)
        }else if (appname == "变身记短视频") {
            login_result = huluwa(package)
        }else if (appname == "小吃货短视频") {
            login_result = huluwa(package)
        }else if (appname == "有颜短视频") {
            login_result = huluwa(package)
        }else if (appname == "快逗短视频") {
            login_result = huluwa(package)
        }

        if (login_result) {
            have_login = true
            break
        }
        sleep(5000)
    }
    thread.interrupt();
    if (!have_login) {
        console.error("登录失败:" + appname)
            fun_lofin.clear()
        return false
    }else{
        fun_lofin.clear()
        return true
    }
    fun_lofin.clear()
}
/** ----------------------------------------------------------------- **/


// 可下载
texts = ["红包视频", "趣宠短视频", "音浪短视频", "高手短视频", "变身记短视频", "小吃货短视频", "有颜短视频", 
"快逗短视频", "快看点", "看点快报", "抖音极速版", "有料看看", "天天爱清理", "追看视频", "火山极速版", "刷宝短视频", 
"快手极速版", "闪电盒子", "欢乐盒子", "红包盒子", "微鲤看看", "想看", "彩蛋视频", "趣头条", "火火视频极速版", 
"酷铃声", "趣铃声", "天天短视频"]
// texts = ["抖音极速版", "趣宠短视频"]


// 可登录
can_login = ['波波视频','彩蛋视频','电视家','东方头条','火火视频极速版','火山极速版','看点快报','酷狗音乐大字版',
'快7浏览器','快看点','快音','米读极速版','刷宝短视频','天天爱清理','微鲤看看','想看',
'小糖糕','有料看看','趣宠短视频','音浪短视频','高手短视频','变身记短视频','小吃货短视频','有颜短视频','快逗短视频']


function main(){
    install_longin_info= []
    for (app_down_install_um = 0; app_down_install_um < texts.length; app_down_install_um++) {
        one_install_longin_info=[]
        console.log("共计" + texts.length + "个,剩余APP个数" + (texts.length - app_down_install_um));
        app_name = texts[app_down_install_um]
    
        if (getPackageName(app_name)) {
            toastLog("APP已经存在,跳过下载+登录:" + app_name)
            install_code = "跳过"
            login_code = "跳过"
    
        }else{
            install_code_info = install_func.donw_insall_name(app_name)
            if(install_code_info){
                install_code = "成功"
            }else{
                install_code = "失败"
            }
            if(isInArray(can_login,app_name)){
                login_code_info = fun_lofin.start(app_name)
                if(login_code_info){
                    login_code = "成功"
                }else{
                    login_code = "失败"
                } 
            }else{
                console.error("不支持自动登录:" + app_name)
            }
            fun_lofin.clear()
        }
        one_install_longin_info.push(app_name)
        one_install_longin_info.push(install_code)
        one_install_longin_info.push(login_code)
        install_longin_info.push(one_install_longin_info)
    }
}

main()
if(!getPackageName("快刷")){
    downloadApk("快刷","http://zhangshuhong888.iask.in:8989/快刷V411.apk",true)
}

app.launchApp("快刷")
console.clear()
console.log(install_longin_info);

for(aa=0;aa<install_longin_info.length;aa++){
    console.log("**********************"+aa)
    if(install_longin_info[aa][1] == "成功"){
            console.info("安装成功>>:"+install_longin_info[aa][0])
    }else if(install_longin_info[aa][1] == "跳过"){
        console.verbose("安装跳过>>:"+install_longin_info[aa][0])
    }else{
          console.error("安装失败>>:"+install_longin_info[aa][0])
    }

    if(install_longin_info[aa][2] == "成功"){
        console.info("登录成功==:"+install_longin_info[aa][0])
    }else if(install_longin_info[aa][2] == "跳过"){
        console.verbose("安装跳过==>:"+install_longin_info[aa][0])
    }else{
          console.error("登录失败==:"+install_longin_info[aa][0])
    }
}
console.show()
console.setPosition(0, 0);
console.setSize(device.width , device.height*0.9);
