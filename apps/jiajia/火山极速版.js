/*---------------------------------lib-------------------------------*/
function instantiation(varrurl) {
    yun = 1
    var yunurl = "http://yuedu.xiequbo.cn/"
    yunurl = yunurl + varrurl + ".js"
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

subapp = instantiation("apps/fucation_lib1")
if (subapp != "") {
    eval(subapp)
    log("公共函数实例化成功")
} else {
    log("公共函数实例化失败,程序返回")
}
app_name = "火山极速版"

var button_arr = [

    ['text', 'javascript:;', 1],// 签到关闭
    ['text', '关闭广告', 1],
    ['text', '我知道了', 1],
    ['text', '以后再说', 1],
    ['id', 'a4x', 1], // 自动弹出输入邀请码
    ['id', 'a4h', 1],
    ['id', 'a4n', 1],
    ['id', 'close', 1],
    ['id', 'a5c', 1],//// 填写邀请码奖励1元 // 升级奖励
    ['id', 'a4f', 1],
    ['id', 'a50', 1], // 填写邀请码奖励1元 // 升级奖励
    ['id', 'a57', 1], // 未登录首页 登录红包
    ['id', 'a54', 1], //登录之前出现的
    ['text', '图片', 1],

]


//----------------------------------火山子程序--------------------------------------------//









var w = device.width;
var h = device.height;
left = 0;
top = 0;
right = device.width;
buttom = device.height / 2;

function 上滑() {
    swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
}

function 初始化() {
    console.log("开始初始化操作");
    num = 0
    while (true) {

        num += 1
        if (num > 5) {
            break
        }
        sleep(500)
        close_windows(button_arr)
        button = "id"
        vlause = "h3"
        result = control_click(button, vlause)

        button = "id"
        vlause = "a4n"
        result = control_click(button, vlause)


        button = "id"
        vlause = "a4k"
        result = control_click(button, vlause)


        result1 = text('视频').findOne(1500)
        if (result1) {
            button = "text"
            vlause = "视频"
            result1 = control_click(button, vlause)
            console.log("初始化完成1");
            toast("初始化完成1")
            return

        }
        result1 = text('首页').findOne(1500)
        if (result1) {
            button = "text"
            vlause = "首页"
            result1 = control_click(button, vlause)
            console.log("初始化完成1");
            toast("初始化完成1")
            return
        }


    }
}

function 签到() {

    sign_reullt = read_cfg_j(app_name, "have_sign")
    if (sign_reullt == "yes") {
        toast("读取--已签到，跳过")
        log("读取--已签到，跳过")
        return true
    }
    result1 = id("hr").findOne(1000)
    if (result1) {
        button = "id"
        vlause = "hr"
        result = control_click(button, vlause)
    }
    // 按我的进入
    result1 = text("我的").findOne(1000)
    if (result1) {
        button = "text"
        vlause = "我的"
        result = control_click(button, vlause)
    }
    close_windows(button_arr)

    // 去领钱
    button = "text"
    vlause = "去领钱"
    result = control_click(button, vlause)

    // 签到
    button = "text"
    vlause = "签到"
    result = control_click(button, vlause)
    write_cfg_j(app_name, "have_sign", "yes")
    初始化()

}


function 火山看广告() {
    初始化()
    num = 1
    while (true) {
        num += 1
        if (num > 20) {
            初始化()
            log("看广告---查看广告失败。。。退出")
            return
        }
        // 首页登录界面
        button = "text"
        vlause = "红包"
        result = control_click(button, vlause)
        if (result) {
            break
        } else {
            close_windows(button_arr)
        }
    }

    num2 = 1
    while (true) {

        close_windows(button_arr)
        log("图片检测")
        toast("图片检测")
        button_info = text("图片").boundsInside(50, 0,  device.width-30, device.height).findOne(1000)
        if(button_info){
            toast("检测到了")
            console.log("检测到了 图片");
            
            xy_info = button_info.bounds()
            click( r.right+20,r.top-50)
        }
 

        num2 += 1
        console.log("看广告---异常检测次数" + num2);

        if (num2 > 10) {
            console.log('看广告---循环检测失败');
            初始化()
            return
        }
        // break_button = text("每次得100金币，已完成20/20次").findOne(500)
        break_button = textContains("每次得100金币，已完成20/20次").findOne(500)
        if (break_button) {
            console.log("已完成");
            初始化()
            return

        }
        var 看广告按钮 = descContains("得100金币，已完成").boundsInside(left, top, right, device.height * 0.8).exists();

        sleep(500)
        if (看广告按钮) {
            console.log("看广告---找到广告按钮控件1");
            var 看广告按钮 = descContains("得100金币，已完成").findOne()
            // log('字符串是' + 看广告按钮.desc())
            var reult_str = 看广告按钮.desc()
            console.log("888888888888" + reult_str);
            if (reult_str) {
                var numArr = reult_str.match(/\d+/g)
                break
            }

        }

        var 看广告按钮 = textContains("得100金币，已完成").boundsInside(left, top, right, device.height * 0.8).exists();
        // console.log('看广告按钮' + 看广告按钮);
        sleep(500)
        if (看广告按钮) {
            console.log("看广告---找到广告按钮控件2");
            var 看广告按钮 = textContains("得100金币，已完成").findOne()
            // log('字符串是' + 看广告按钮.text())
            var reult_str = 看广告按钮.text()
            if (reult_str) {
                // console.log("888888888888" + reult_str);
                // console.log(typeof reult_str)
                var numArr = reult_str.match(/\d+/g)
                break
            }

        }
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
    }
    // console.log(numArr[0]);
    // log('返回的列表是-------:' + numArr)
    console.log(typeof numArr)
    look_num = numArr[2] - numArr[1]
    if (look_num > 0) {
        console.log("看广告---执行看视频的次数是" + look_num);
        for (j = 0; j < look_num; j++) {
            console.log("当前看视频的次数是:" + j);
            // sleep(2000)
            var 看广告按钮1 = descContains("得100金币，已完成").boundsInside(left, top, right, device.height * 0.8).findOne(500);
            var 看广告按钮2 = textContains("得100金币，已完成").boundsInside(left, top, right, device.height * 0.8).findOne(500);

            if (看广告按钮1 || 看广告按钮2) {
                console.log('看广告---开始点击看广告按钮');
                if (看广告按钮1) {
                    var button_info = descontains("得100金币，已完成").findOne()
                } else {
                    var button_info = textContains("得100金币，已完成").findOne()
                }
                var xy_info = button_info.bounds()
                click(xy_info.centerX(), xy_info.centerY());
                sleep(300)
                num = 0
                while (true) {
                    console.log("检测关闭中");
                    toast("检测关闭中")
                    num += 1
                    sleep(1000)
                    if (num > 40) {
                        初始化()
                        break
                    }
                    var 关闭1 = text("关闭广告").findOne(500)

                    var 关闭2 = text("继续退出").findOne(500)

                    if (关闭1 || 关闭2) {
                        break
                    }
                }


                num = 0
                while (true) {
                    console.log("开始点击关闭按钮");

                    num += 1
                    sleep(1000)
                    if (num > 20) {
                        初始化()
                        break
                    }

                    var 关闭1 = text("继续退出").findOne(500)

                    if (关闭1) {
                        button = "text"
                        vlause = "继续退出"
                        result = control_click(button, vlause)
                    }
                    var 关闭2 = text("关闭广告").findOne(500)

                    if (关闭2) {
                        button = "text"
                        vlause = "关闭广告"
                        result = control_click(button, vlause)
                    }
                    if (!关闭1 && !关闭2) {
                        console.log("观看广告完成，退出");
                        console.log("观看广告完成，退出");
                        break
                    }
                }




            }
        }
    }

}


function 列表视频播放() {

    click(device.width * 0.25, device.height * 0.29)
    // first_video_close = ""
    // first_video1 = id("qe").find();
    // if(first_video1.length>0){
    //     first_video_close = first_video1
    // }
    // first_video2 = id("ql").find();
    // if(first_video2.length>0){
    //     first_video_close = first_video2
    // }
    // if(!first_video_close){
    //     log("实例化 第一个APP异常")
    //     toast("实例化 第一个APP异常")
    // }


    // log(first_video_close.length)
    // for (j = 0; j < first_video_close.length; j++) {
    //     first_video = first_video_close[j].parent()
    //     if (!first_video) {
    //         continue
    //     }
    //     var r = first_video.bounds()
    //     if (r.bottom < 0.3 * h) {
    //         continue
    //     }
    //     if (r.right > w) {
    //         continue
    //     }
    //     if (text("广告").boundsInside(r.left, r.top, r.right, r.bottom).exists() || id("yb").boundsInside(r.left, r.top, r.right, r.bottom).exists()) {
    //         console.log("视频列表初始化---找到广告");
    //         continue

    //     } else {
    //         console.log("视频列表初始化---开始点击第一个视频");
    //         sleep(2000)
    //         log(r.centerX() ,"-----",r.centerY())
    //         click(r.centerX() + random(20, 50), r.centerY() + random(20, 50))
    //         break
    //     }
    // }
}

function is_login() {
    login_result = read_cfg_j(app_name, "have_login")
    if (login_result == "yes") {
        toast("读取--已登录")
        log("读取--已登录")
        return true
    }
    result1 = text("注册/登录").findOne(2000)
    if (result1) {
        return false
    }
    result2 = text("登录").findOne(2000)
    if (result2) {
        return false
    }
    write_cfg_j(app_name, "have_login", "yes")
    return true


}

// 快手极速版 主函数
// 启动线程(2,1)
function 启动线程(type, sign) {
    button = "text"
    vlause = "我知道了"


    index_page = "com.ss.android.ugc.live.main.MainActivity"
    inspect_app(app_name, index_page, button, vlause)
    close_windows(button_arr)
    var istype = type || 2;
    var issign = sign || 0;
    result = is_login()

    if (!result) {
        toast("进行登录")
        console.log("进行登录");
        login()
    }
    签到()
    // if (issign == 1) {
        
    //     签到()
    // }
    if (istype == 1) {
        console.log("火山极速版不支持文章操作");
    }
    if (istype == 2) {

        火山看广告()
        初始化()
        close_windows(button_arr)
        sleep(1000)
        列表视频播放()
        //通过视频右上角x号找到非广告视频
        while (true) {
            // 列表视频播放()
            var c = random(10000, 15000)
            sleep(c)
            close_windows(button_arr)
            上滑();
        }
    }
}



/*--------------------------------invite------------------------------*/
function invite(user_id) {
    user_id = user_id || "DG5DEE4T";
    button = false
    close_windows(button_arr)
    // 红包按钮
    button = "text"
    vlause = "红包"
    result = control_click(button, vlause)

    close_windows(button_arr)


    // 输入邀请码红包 【新版】
    button = "text"
    vlause = "输入邀请码"
    result = control_click(button, vlause)
    if (!result) {
        log("邀请失败")
        toast("邀请失败")
        return
    }

    sleep(5000)
    //输入文本
    button = 'id'
    vlause = 'inputCode_input'
    control_input(button, vlause, user_id)

    //确认按钮  马上提交

    button = "text"
    vlause = "马上提交"
    result = control_click(button, vlause)
}
/*---------------------------------login-------------------------------*/
function login() {

    button = "textContains"
    vlause = "登录"
    result = control_click(button, vlause)
    // 微信一键登录
    button = "text"
    vlause = "微信登录"
    result = control_click(button, vlause)
    // 微信授权 
    wechat_agree()

    button = "id"
    vlause = "qh"
    result = control_click(button, vlause)

    aa = text("手机认证").findOne(3000)
    if (!aa) {
        return
    }

    //  输入手机号 
    button = "text"
    vlause = "请输入手机号"
    input_phone(button, vlause)

    //进入个人中心
    button = "text"
    vlause = "发送验证码"
    result = control_click(button, vlause)

    //    查看验证码
    // 被包含的名称
    app_name = "火山"
    //  正则
    reg = /\d{4}/ig
    code = get_phone_code(app_name, reg)
    console.log(code);

    button = 'text'
    vlause = '请输入验证码'
    control_input(button, vlause, code)

    //进入个人中心
    button = "text"
    vlause = "提交"
    result = control_click(button, vlause)



}
// login()

// invite()

// 启动线程(2,1)

// login()