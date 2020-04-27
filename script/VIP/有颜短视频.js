function instantiation() {
  
    yunurl = "https://gitee.com/zhangshu345012/sample/raw/v1/apps/jiajia/fucation_lib1.js"
    var r = http.get(yunurl);
    if (r.statusCode == 200) {
            return r.body.string()

    } else {
            return ""
    }
}

subapp = instantiation()
if (subapp != "") {
    eval(subapp)
    log("加载葫芦娃系列APP成功")
}
else {
    log("公共函数实例化失败,程序返回")
}


function 启动线程(type, sign) {
    // app_name = "快逗短视频"
    app_name = "有颜短视频"
	liuti(type, sign ,app_name)
}