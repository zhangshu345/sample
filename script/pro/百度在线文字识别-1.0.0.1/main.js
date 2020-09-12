var hsp = require("./hsp.js");
var storage = storages.create("selp");
var jt = new function() {
    requestScreenCapture(); //获取截图权限
    this.run = function(zb) {
        var img = captureScreen();
        img = images.clip(img, zb.x, zb.y, zb.w, zb.h);
        return img;
    }
}
var window = floaty.rawWindow(
    <vertical id="vi" h="100px" bg="#90000000">
        <horizontal>
            <img layout_gravity="left" id="sd" h="100px" src="file://./img/Screenshot_20200120114434.png" />
            <button id="sdt" w="140px" h="100px" text="设置"/>
            <button id="ok" h="100px" text="识别"/>
            <button id="dp" w="140px" h="100px" text="详细"/>
            <button id="exit" h="100px" text="退出"/>
            <button id="db" w="140px" h="100px" text="对比"/>
        </horizontal>
        
    </vertical>

);

var window2 = floaty.rawWindow(
    <frame id="vi" w="*" h="*" bg="#aa89abba">
        <img id="cant" w="70px" h="70px" layout_gravity="right|bottom" src="file://./img/Screenshot_20200120072559.png" />
        <text id="rw" gravity="center" layout_gravity="center" padding="0" marginBottom="0px" textColor="#ffffff" text="这里是截图区域" textSize="15sp"/>
    </frame>
);

window.exit.on("click", function() {
    exit();
});

window.sdt.on("click", function() {
    config.setk();
});

window.ok.on("click", function() {
    selp.run();
});

window.dp.on("click", function() {
    xd.run();
});

window.db.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            kol.setxs(false, 2);
            return true;
        case event.ACTION_UP:
            kol.setxs(true, 1);
            return true;
    }
    return true;
});

//悬浮窗控制
var kol = new function() {
    var mrzb = {
        x: 200,
        y: 200,
        w: 460,
        h: 180
    }
    var zb = storage.get("zb", mrzb);
    this.savazb = function() {
        var x = window.getX();
        var y = window.getY();
        var w = window2.getWidth();
        var h = window2.getHeight();
        storage.put("zb", {
            x: x,
            y: y,
            w: w,
            h: h
        })
    }
    this.setxy = function(x, y) {
        if (x < 1) x = 1;
        if (y < 1) y = 1;
        window.setPosition(x, y);
        window2.setPosition(x, y + 100);
    }
    this.setwh = function(w, h) {
        if (w < 100) w = 100;
        if (h < 80) h = 80;
        window.setSize(w, 100);
        window2.setSize(w, h);
    }
    this.setxs = function(vp, i) {
        ui.run(function() {
            //控制悬浮窗可见性,vp为布尔值表示显示或影藏
            var kj;
            if (vp) {
                kj = "visible";
            } else kj = "invisible";
            if (i === 2) {
                window2.vi.attr("visibility", kj);
            } else if (i === 1) {
                window2.vi.attr("visibility", kj);
                window.vi.attr("visibility", kj);
                window2.setTouchable(vp);
                window.setTouchable(vp);
            }
        });
    }
    this.settxt = function(str) {
        ui.run(function() {
            window2.rw.text(str);
        });
    }

    this.setxy(zb.x, zb.y);
    this.setwh(zb.w, zb.h);
}

//详细
var xd = new function() {
    var img, sb, yw;
    this.set = function(c, a, b) {
        img = c; //图片
        sb = a;
        yw = b;
    }
    this.run = function() {
        if (!img) return toast("没有信息");
        threads.start(function() {
            var imgb64 = "data:image/png;base64," + images.toBase64(img);
            let view = ui.inflate(
                <vertical padding="6 0">
                                    <img src={imgb64} />
                                    <frame w="*">
                                        <text textColor="#c429ea" text="识别内容:" />
                                        <text id="copy1" layout_gravity="right" w="60" textColor="#c429ea" text="复制" />
                                    </frame>
                                    <text id="sb" />
                                    <text text="————————————————" />
                                    <frame w="*">
                                        <text textColor="#c429ea" text="翻译内容:" />
                                        <text id="copy2" layout_gravity="right" w="60" textColor="#c429ea" text="复制" />
                                    </frame>
                                    <text id="yw" />
                                    <text text="————————————————" />
                                </vertical>, null, false
            );
            view.sb.text(sb);
            view.yw.text(yw);
            view.copy1.click(function() {
                setClip(sb);
                toast("复制成功");
            });
            view.copy2.click(function() {
                setClip(yw);
                toast("复制成功");
            });
            // 显示对话框
            dialogs.build({
                customView: view,
                title: "截图预览",
                positive: "确定",
                wrapInScrollView: true,
                autoDismiss: true
            }).on("show", () => {
                kol.setxs(false, 1);
            }).on("dismiss", () => {
                kol.setxs(true, 1);
            }).show();
        })
    }
}

//开始识别
var selp = new function() {
    var ts, fy;
    function getzb() {
        var zb = {
            x: window2.getX(),
            y: window2.getY(),
            w: window2.getWidth(),
            h: window2.getHeight()
        }
        return zb;
    }
    this.setfy = function(n) {
        fy = n;
    }
    this.run = function() {
        if (ts && ts.isAlive()) {
            ts.interrupt();
        }
        ts = threads.start(function() {
            var zb = getzb();
            kol.setxs(false, 2);
            sleep(300);
            kol.settxt("识别中........");
            var img = jt.run(zb);
            kol.setxs(true, 2);
            var aa = hsp.sz(img);
            var str = "",
                str2 = "";
            aa.words_result.forEach(function(e) {
                str += e.words;
            });
            kol.settxt(str);
            if (fy) {
                sleep(200);
                kol.settxt("翻译中..........");
                var str2 = hsp.fy(str);
                kol.settxt(str2);
            }
            xd.set(img, str, str2);
        });
    }
}

//设置配置
var config = new function() {
    var shibie, fanyi, fy;
    var read = function() {
        var mr = {
            "识别语言": 1,
            "翻译语言": 2
        }
        var dr = storage.get("语言", mr);
        shibie = dr["识别语言"];
        fanyi = dr["翻译语言"];
        fy = storage.get("fy", false);
        hsp.setSb(shibie);
        hsp.setFy(fanyi);
        selp.setfy(fy);

    }
    var sava = function(data) {
        storage.put("语言", data);
        storage.put("fy", fy);
        read();
    }
    this.setk = function() {
        let view = ui.inflate(
            <vertical padding="6 0">
                        <horizontal>
                            <vertical layout_weight="1" h="auto">
                                <text text="重置位置与屏幕方向" textColor="#222222" textSize="16sp"/>
                                <text text="启动后不能改变屏幕方向，否则将无法正常截取屏幕" textColor="#999999" textSize="14sp"/>
                            </vertical>
                            <button id="re" text="重置"/>
                        </horizontal>
                        <horizontal>
                            <vertical layout_weight="1" h="auto">
                                <text text="打开翻译" textColor="#222222" textSize="16sp"/>
                                <text text="打开后识字完成会接着翻译内容" textColor="#999999" textSize="14sp"/>
                            </vertical>
                            <button id="jn" text="打开"/>
                        </horizontal>
                        <horizontal h="30">
                            <text text="识别语言:"/>
                            <spinner id="sp1" entries="日文|中文|英文"/>
                        </horizontal>
                        <horizontal h="30">
                            <text text="翻译语言:"/>
                            <spinner id="sp2" entries="日文|中文|英文"/>
                        </horizontal>
                    </vertical>, null, false
        );
        view.re.click(function() {
            storage.remove("zb");
            engines.execScriptFile("./main.js");
            exit();
            dialog.dismiss();
        });
        view.jn.click(function() {
            if (!fy) {
                fy = true;
                view.jn.setText("关闭");
            } else {
                fy = false;
                view.jn.setText("打开");
            }
        });

        view.sp1.setSelection(shibie);
        view.sp2.setSelection(fanyi);
        if (fy) {
            view.jn.setText("关闭");
        } else view.jn.setText("打开");
        // 显示对话框
        var dialog = dialogs.build({
            customView: view,
            title: "设置",
            positive: "保存",
            wrapInScrollView: true,
            autoDismiss: true
        }).on("show", () => {
            kol.setxs(false, 1);
        }).on("dismiss", () => {
            kol.setxs(true, 1);
        }).on("positive", function() {
            var s = view.sp1.getSelectedItemPosition();
            var f = view.sp2.getSelectedItemPosition();
            sava({
                "识别语言": s,
                "翻译语言": f
            });
            toast("保存成功");
        }).show();
    }
    read();
}

(function() {
    var x, y, windowX, windowY, downTime;
    window.sd.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                var x1 = windowX + (event.getRawX() - x);
                var y1 = windowY + (event.getRawY() - y);
                //移动手指时调整悬浮窗位置
                kol.setxy(x1, y1);
                return true;
            case event.ACTION_UP:
                kol.savazb();
                return true;
        }
        return true;
    });
    //记录按键被按下时的触摸坐标
    var x1, y1, w, h, time;
    window2.cant.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x1 = event.getRawX();
                y1 = event.getRawY();
                w = window2.getWidth();
                h = window2.getHeight();
                time = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                var w1 = w + (event.getRawX() - x1);
                var h1 = h + (event.getRawY() - y1);
                kol.setwh(w1, h1);
                return true;
            case event.ACTION_UP:
                kol.savazb();
                return true;
        }
        return true;
    });
}())

setInterval(() => {}, 1000);