module.exports = function (runtime, global) {
    importClass(android.content.Intent);
    var common = Object.create(runtime.app);
    var context = global.context;
    common.textclick = function (txt, t, left, top, right, bottom) {
        t = t || 200
        left = left || 0;
        top = top || 0;
        right = right || device.width;
        bottom = bottom || device.height;
        var f = text(txt).boundsInside(left, top, right, bottom).visibleToUser().findOne(t);
        if (!f) {
            f = desc(txt).boundsInside(left, top, right, bottom).visibleToUser().findOne(t);
        }
        return common.clicknode(f)
    }

    common.maytextclick = function (maytext, t, left, top, right, bottom) {
        if (!maytext) { return false; }
        t = t || 200
        left = left || 0;
        top = top || 0;
        right = right || device.width;
        bottom = bottom || device.height;
        var f = text(maytext).boundsInside(left, top, right, bottom).visibleToUser().findOne(t);
        if (!f) {
            f = textContains(maytext).boundsInside(left, top, right, bottom).visibleToUser().findOne(t)
        }
        return common.clicknode(f)
    }

    //点击文本集合
    common.clicktexts = function (texts, t, st, left, top, right, bottom) {
        log("开始点击文本集合:" + texts)
        st = st || 500
        t = t || 500
        left = left || 0;
        top = top || 0;
        right = bottom || device.width;
        bottom = bottom || device.height;
        texts.forEach(txt => {
            if (common.textclick(txt, t, left, top, right, bottom)) {
                sleep(st)
            }
        });

    }

    common.idclick = function (idstr, t, left, top, right, bottom) {
        t = t || 200;
        left = left || 0;
        top = top || 0;
        right = right || device.width;
        bottom = bottom || device.height;
        let f = id(idstr).boundsInside(left, top, right, bottom).visibleToUser().findOne(t);
        if (f) {
            if (common.clicknode(f)) { return true }
        }
        return false
    }

    //ids id集合 t 查找id的时间 st 每次点击完成休息时间
    common.clickids = function (ids, t, st, left, top, right, bottom) {
        t = t || 100
        st = st || 500
        left = left || 0;
        top = top || 0;
        right = bottom || device.width;
        bottom = bottom || device.height;
        ids.forEach(idstr => {
            if (common.idclick(idstr, t)) {
                sleep(st)
            }
        });
    }

    common.descclick = function (desctext, t, left, top, right, bottom) {
        t = t || 200;
        left = left || 0;
        top = top || 0;
        right = right || device.width;
        bottom = bottom || device.height;
        var f = desc(desctext).boundsInside(left, top, right, bottom).visibleToUser().findOne(t); //.visibleToUser()
        if (!f) {
            f = text(desctext).boundsInside(left, top, right, bottom).visibleToUser().findOne(t); //.visibleToUser()
        }
        return common.clicknode(f)
    }

    common.clickdescs = function (descs, t, st, left, top, right, bottom) {
        t = t || 500
        st = st || 500
        left = left || 0;
        top = top || 0;
        right = right || device.width;
        bottom = bottom || device.height;
        descs.forEach(de => {
            if (common.descclick(de, t, left, top, right, bottom)) {
                sleep(st)
            }
        })
    }



    //node 执行点击
    common.clicknode = function (v, dx, dy, time, clicknumber, intervaltime) {
        if (!v) { return false; }
        dx = dx || 0
        dy = dy || 0
        clicknumber = clicknumber || 1
        intervaltime = intervaltime || 300
        time = time || 50
        b = v.bounds()
        if (b != null && b.centerX() > 0 && b.centerY() > 0) {
            for (let n = 0; n < clicknumber; n++) {
                press(b.centerX() + dx, b.centerY() + dy, time)
                sleep(intervaltime)
            }
            return true
        }
        return false
    }

    common.rswipe = function (z, x1, y1, x2, y2, t, r) {
        t = t || 500
        r = r || 500
        if (z > 0) {
            var w = device.width / z;
            var h = device.height / z;
            startx = w * x1
            endx = w * x2
            starty = h * y1
            endy = h * y2
        } else {
            startx = x1
            endx = x2
            starty = y1
            endy = y2
        }
        if (device.sdkInt >= 24) {
            swipe(startx, starty, endx, endy, t + randomint(0, r))
        } else {
            if (startx >= endx) {
                left = endx
                right = startx
            } else {
                left = startx
                right = endx
            }
            if (starty > endy) {
                top = endy
                bottom = starty
            } else {
                top = starty
                bottom = endy
            }
            var w = boundsInside(left, top, right, bottom).scrollable().findOne(100);
            if (w) {
                if (startx < endx) {
                    w.scrollBackward()
                } else {
                    w.scrollForward()
                }
            }
        }
    }


    common.gettextFromid = function (idstr, defaulttext, findtime) {
        if (!idstr) { return null }
        defaulttext = defaulttext || ""
        findtime = findtime || 500
        node_id = id(idstr).visibleToUser().findOne(findtime)
        if (node_id) {
            return node_id.text();
        } else { return defaulttext; }
    }
    /*文本只要存在一个就返回真 */
    common.textoneexist = function (texts) {
        if (!texts) {
            return false
        }
        if (texts.length > 0) { for (i = 0; i < texts.length; i++) { if (text(texts[i]).visibleToUser().exists()) { return true } } }
        return false
    }
    /**只要存在一个id就返回真 */
    common.idoneexist = function (ids) {
        if (!ids) {
            return false
        }
        if (ids.length > 0) { for (i = 0; i < ids.length; i++) { if (id(ids[i]).visibleToUser().exists()) { return true; } } }
        return false
    }



    /*所有文本存在才返回真 */
    common.textallexist = function (texts) {
        if (!texts) {
            return false
        }
        s = 0
        if (texts.length > 0) {
            for (i = 0; i < texts.length; i++) { if (text(texts[i]).exists()) { s = s + 1; } else { return false; } }
            if (s == texts.length) { return true; }
        }
        return false
    }

    /* 所有id都存在才返回真  只要有一个不存在就返回false */
    common.idallexist = function (ids) {
        if (!ids) {
            return false
        }
        s = 0
        if (ids.length > 0) {
            for (i = 0; i < ids.length; i++) {
                if (id(ids[i]).exists()) { s = s + 1; } else { return false; }
            }
            if (s == ids.length) { return true; }
        }
        return false
    }

    /* 所有id都存在才返回真  只要有一个不存在就返回false */
    common.descallexist = function (descs) {
        if (!descs) {
            return false
        }
        s = 0
        if (descs.length > 0) {
            for (i = 0; i < descs.length; i++) {
                if (desc(descs[i]).exists()) { s = s + 1; } else { return false; }
            }
            if (s == descs.length) { return true; }
        }
        return false
    }

    common.enableshizuku = function () {
        try {
            let shizukupkg = app.getPackageName("Shizuku");
            if (!shizukupkg) {
                //            log("shizuku 未安装")
                return false
            }
            //        log("shizuku 包名:"+shizukupkg)
            let apppkg = app.getPackageName("相册")
            //        console.log("相册包名:"+apppkg);
            if (apppkg) {
                var result = shell("am force-stop " + apppkg, { adb: true, root: false })
                //            console.log("result:"+JSON.stringify(result))
                return result.code == 0
            }
        } catch (error) {
            //        log("shizuku 无法使用")
            return false
        }
    }
    common.shizukuforcestopPkg = function (apppkg) {
        //    log("shizuku停止运行"+apppkg)
        if (apppkg == scriptapppkg) {
            //        log("shizuku停止运行当前APP ")
            return
        }
        shell("am force-stop " + apppkg, { adb: true, root: false })
    }

    common.httpget = function (url) {
        let r = http.get(url);
        if (r.statusCode == 200) {
            return r.body.string();
        } else {
            return null
        }
    }

    common.shizukuforcestopApp = function (appname) {
        apppkg = app.getPackageName(appname)
        if (apppkg) {
            common.shizukuforcestopPkg(apppkg)
        }
    }


    //直接从应用宝获取应用信息
    common.getAppInfoFromMarket = function (appname, apppkg) {
        //    log("应用宝查找app:"+appname+"--"+apppkg)
        let appinfos = httpget("https://sj.qq.com/myapp/searchAjax.htm?kw=" + appname)
        if (appinfos) {
            data = JSON.parse(appinfos)
            let obj = data.obj
            if (obj) {
                let items = obj.items
                if (items) {
                    i = 0
                    while (i < items.length) {
                        let e = items[i]
                        if (apppkg) {
                            if (e.pkgName == apppkg) {
                                //                            log(e.pkgName+"=="+apppkg)
                                return e
                            }
                            //                        else{
                            //                            log(e.pkgName+"<>"+apppkg)
                            //                        }
                        } else {
                            appDetail = e.appDetail
                            if (appDetail.appName == appname) {
                                return e
                            }
                        }
                        i = i + 1
                    }
                }
            }
        }
        return null
    }


    global.__asGlobal__(common, ['textclick', 'maytextclick', 'clicktexts', 'idclick', 'clickids', 'descclick', 'clickdescs', 'rswipe', 'clicknode', 'gettextFromId',
        'textoneexist', 'idoneexist', 'textallexist', 'idallexist', 'descallexists', 'enableshizuku', 'shizukuforcestopPkg', 'shizukuforcestopApp'
        , 'getAppInfoFromMarket', 'httpget']);
    return common;
}

