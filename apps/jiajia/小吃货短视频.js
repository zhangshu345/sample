function instantiation(varrurl) {
    var yunurl = "http://yuedu.xiequbo.cn/"
    yunurl = yunurl + varrurl + ".js"
    var r = http.get(yunurl);
    if (r.statusCode == 200) {
            return r.body.string()

    } else {
            return ""
    }
}

subapp = instantiation("apps/beijingliuti")
if (subapp != "") {
    eval(subapp)
    log("加载葫芦娃系列APP成功")
}
else {
    log("公共函数实例化失败,程序返回")
}

function 启动线程(type, sign) {
    app_name = "小吃货短视频"
	liuti(type, sign ,app_name)
}