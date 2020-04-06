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
app_name = "聚看点"
//----------------------------------聚看点子程序--------------------------------------------//

var w = device.width;
var h = device.height;
left = 0;
top = 0;
right = device.width;
buttom = device.height / 2;
var  button_arr = [


    ['id','v2_sign_sign_button',1],// 大厅签到
    ['id','mine_starlert_close',1],// 我的红包
    ['id','image_user_task_pop_close',1],// 首页弹窗广告
    ['id','v2_sign_close_button',1],// 签到关闭2
    ['id','dismisstv',1],// 要闻推送
    ['id','close',1],// 奖励弹窗
    ['id','dialog_close',1],// 检测到领金币弹窗
    ['id','close_button',1],// 登录弹窗
    ['id','timer_close_but',1],// 签到成功
]






function 弹窗() {
    //签到检测，收入囊中
    sleep(300)
    var 立即签到2 = id("v2_sign_sign_button").exists();
    if (立即签到2) {
        sleep(200)
        console.log("找到大厅操作 开始签到操作");
        var button_info = id("v2_sign_sign_button").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(300)
    }

    if (id("mine_starlert_close").exists()) {
        console.log("我的红包关闭按钮");
        var button_info = id("mine_starlert_close").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(100)
    }

    if (id("image_user_task_pop_close").exists()) {
        console.log("首页进入弹窗广告");
        var button_info = id("image_user_task_pop_close").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(100)
    }
    // 签到关闭按钮
    if (id("v2_sign_close_button").exists()) {
        console.log("签到关闭按钮");
        var button_info = id("v2_sign_close_button").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(100)
    }

    if (id("timer_close_but").exists()) {
        sleep(100)
        console.log("监测到大厅签到窗口，执行关闭操作");
        var button_info = id("timer_close_but").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(100)
    }
    if (id("dismisstv").exists()) {
        sleep(100)
        console.log("要闻推送");
        var button_info = id("dismisstv").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(100)
    }
    if (id("cancel_quit").exists()) {
        sleep(100)
        console.log("检测到退出");
        var button_info = id("cancel_quit").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(100)
    }
    if (id("dialog_close").exists()) {
        sleep(100)
        console.log("检测到领金币弹窗");
        var button_info = id("dialog_close").findOne(1000)
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(100)
    }
    //奖励弹窗
    if (id("close").exists()) {
        sleep(100)
        console.log("检测到奖励金币弹窗");
        var button_info = id("close").findOne(1000)
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(100)
    }
    //登录弹窗
    if (id("close_button").exists()) {
        sleep(100)
        console.log("登录弹窗");
        var button_info = id("close_button").findOne(1000)
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(100)
    }

    // APP卡顿提示
    if (text("关闭应用").exists()) {
        if (text("等待").exists()) {
            log('弹窗函数---检测到系统级弹窗，开始关闭操作...')
            text("等待").findOne(3000).click();
        }
    }


    sleep(500)
}

function 初始化() {
    log("正在初始化")
    toast("正在初始化")
    num = 0    
    while(true){
        num+=1
        if (num>5){
            log("初始化失败")
            toast("初始化失败")
            break
        }
        close_windows(button_arr)
        button = "text"
        vlause = "看点"
        result = control_click(button, vlause)  
        recommend_button = text("推荐").findOne(1000)
        if(recommend_button){
            log("初始化完成")
            toast("初始化完成")
            break
        }
        back()
    }

}
// 签到()
function 签到() {
    // 点击2次签到按钮
    sign_reullt = read_cfg_j(app_name, "have_sign")
    if (sign_reullt == "yes") {
        toast("读取--已签到，跳过")
        log("读取--已签到，跳过")
        return true
    }
    var 立即签到2 = id("v2_sign_sign_button").exists();
    console.log('立即签到2' + 立即签到2);
    if (立即签到2) {
        sleep(200)
        console.log("找到大厅操作 开始签到操作");
        var button_info = id("v2_sign_sign_button").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(300)
        console.log("签到完成");
        write_cfg_j(app_name, "have_sign", "yes")

        return
    }

    num = 0
    while (true) {
        num += 1
        if (num > 20) {
            console.log("签到失败 开始初始化操作");

            return
        }
        sleep(200)
        var 任务按钮 = text("任务中心").exists();
        if (任务按钮) {
            console.log("已点到任务中心");

            var button_info = text("任务中心").findOne()
            var xy_info = button_info.bounds()
            click(xy_info.centerX(), xy_info.centerY());
            sleep(300)
            var 上方任务按钮 = text("任务中心").boundsInside(left, top, right, buttom).exists();
            console.log('上方任务按钮' + 上方任务按钮);
            if (上方任务按钮) {
                break

            }

        }
    }

    sleep(300)
    var 立即签到 = desc(" 立 即 签 到").exists();
    if (立即签到) {
        console.log("开始签到操作");
        var button_info = desc(" 立 即 签 到").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(300)
        write_cfg_j(app_name, "have_sign", "yes")
    }
    var 立即签到2 = id("v2_sign_sign_button").exists();
    if (立即签到2) {
        console.log("找到大厅操作 开始签到操作");
        var button_info = id("v2_sign_sign_button").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(300)
        write_cfg_j(app_name, "have_sign", "yes")
    }
    // log(55555)
    // sleep(5555555)
    write_cfg_j(app_name, "have_sign", "yes")
    

}



function 聚看点首页初始化() {
    while (true) {
        // 关闭红包
        sleep(1000)
        var 按钮 = id("close_button").exists();
        log(按钮)
        if (按钮) {
            var 坐标 = id("close_button").findOne().click();
        }
        sleep(2000)
        //签到按钮
        var 按钮 = id("v2_sign_sign_button").exists();
        log(按钮)
        if (按钮) {
            var 坐标 = id("v2_sign_sign_button").findOne().click();
        }
        // 签到关闭按钮1
        sleep(2000)
        var 按钮 = id("iv_cancel").exists();
        log(按钮)
        if (按钮) {
            var 坐标 = id("iv_cancel").findOne().click();
        }

        //签到关闭按钮2
        sleep(2000)
        var 按钮 = id("v2_sign_close_button").exists();
        log(按钮)
        if (按钮) {
            var 坐标 = id("v2_sign_close_button").findOne().click();
        }
        //点击 视频按钮

        sleep(2000)
        var 按钮 = id("tv_tab2").exists();
        log("查找视频标签：", 按钮)
        if (按钮) {
            var 坐标 = id("tv_tab2").findOne();
            log(坐标.text())
            var 文字 = 坐标.text()
            if (文字 != "刷新") {
                var 坐标 = 坐标.bounds()
                log(坐标)
                sleep(2000)
                click(坐标.centerX(), 坐标.centerY());
                sleep(1000)
                // id("tv_tab2").findOne().click()

            } else {
                log("到达视频界面")
                break
            }
        }
    }


}

function 聚看点上滑() {
    swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
    // swipe(w/2,h/3*1,w/2,h/3*2,random(220, 235));
}

function 文章详情() {
    log("查看详情")
    var i = 0
    while (true) {
        if (i > 40) {
            back()
            break
        }
        if (text("查看全文，奖励更多").exists()) {
            log("查看全文，奖励更多")
            var bb = text("查看全文，奖励更多").boundsInside(0, 0.2 * h, w, 0.9 * h).findOne(1000)
            if (!bb) {
                sleep(3000)
                弹窗()
                swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 335))
                i = i + 3
                continue
            }
            var b = bb.bounds()
            log(b)
            sleep(800)
            弹窗()
            click(b.centerX(), b.centerY())
            swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 335))
            sleep(3000)
            i = i + 3
            continue
        }
        sleep(3000)
        i = i + 3
        弹窗()
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.5 + random(10, 30), random(220, 335))

    }
}

function 金币() {
    var jb = id("icon_home_left_timer_lq").findOne(2000)
    if (jb) {
        var b = jb.bounds()
        click(b.centerX(), b.centerY())
    }
}




// watch_video()


function watch_video() {

    //确认进入视频页面
    while(true){
        button = "text"
        vlause = "视频"
        result = control_click(button, vlause)
        play_button = id("item_video_play").findOne(1000)
        if(play_button){
            break
        } 
        初始化()
    }
    log("确认进入视频页")
    have_num = 0
    while (true) {

        result = id("item_video_play").boundsInside(0,  device.height*0.2 , device.width, device.height*0.6).findOne(3000)
        if (!result) {
            swipe(w * 0.6 - random(10, 30), h * 0.6 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(500, 700))
            play_button = id("item_video_play").findOne(500)
            if(!play_button){
                初始化()
                button = "text"
                vlause = "视频"
                result = control_click(button, vlause)
            } 


        } else {

            button = "id"
            vlause = "item_video_play"
            result = control_click(button, vlause, 0,  device.height*0.2 , device.width, device.height*0.6)
            back_buuton = id("v2_video_detail_bottom_comment_finish").findOne(3000)
            if(!back_buuton){
                log("失败")
                toast("观看失败")
                swipe(w * 0.6 - random(10, 30), h * 0.6 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(500, 700))
                continue
            }  
            have_num += 1
            log("成功开始观看" + have_num)
            toast("成功开始观看" + have_num)
  
            time_num = 0
            while(true){
                sleep(2000)
                time_num += 1
                var c = random(10, 20)
                if(time_num>c){
                    back()
                    break
                }
                end_button = text("重播").findOne(200) 
                if(end_button){
                    back()
                    break
                }
                toast("播放中...")
                log("播放中")
                close_windows(button_arr)
            }

            close_windows(button_arr)
            swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(500, 700))
            sleep(2000)

        }
    }



}



function 文章() {
    sleep(3000)
    弹窗()
    sleep(1000)
    弹窗()
    sleep(1000)
    弹窗()
    while (true) {
        var c = id("item_artical_three_parent").boundsInside(0, 0, w, h).find()
        log(c.length)
        sleep(1000)
        for (var i = 0; i < c.length; i++) {
            // log(i)
            // log(c[i].text())
            // var d = c[i].parent()
            // if (d == null) {
            //     continue
            // }
            var b = c[i].bounds()
            if (id("item_artical_three_title_tv").boundsInside(b.left, b.top, b.right, b.bottom).exists()) {
                log("找到视频标题")
                log(id("item_artical_three_title_tv").boundsInside(b.left, b.top, b.right, b.bottom).findOne(1000).text())
                // continue
            } else {
                continue
            }
            sleep(5000)
            if (b.centerY() > 0.8 * h) {
                //太靠下，会点到别的
                continue
            }
            log("检测到文章")
            弹窗()
            click(b.centerX(), b.centerY())
            文章详情()
        }
        sleep(1000)
        弹窗()
        金币()
        sleep(1000)
        弹窗()
        swipe(w * 0.6, h * 0.8, w * 0.6, h * 0.5, random(220, 235))
    }
}


function 我的金币() {
    sleep(1000)
    //通过任务按钮找到我的按钮
    var c = id("ll_tab4_layout").findOne(3000)
    if (c) {
        var b = c.bounds()
        sleep(500)
        //进入我的界面
        弹窗()
        click(b.centerX(), b.centerY())
        var coin = id("goldValue").findOne(1000)
        if (coin) {
            var num = coin.text()
            log("检测到今日金币")
            log(num)
            sleep(500)
        }
        sleep(1500)
        c = id("ll_tab1_layout").findOne(3000)
        if (c) {
            弹窗()
            c.click()
            sleep(1500)
            弹窗()
            c.click()
        }
        sleep(1000)
    }
}

function is_login() {
    login_result = read_cfg_j(app_name, "have_login")
    if (login_result == "yes") {
        toast("读取--已登录")
        log("读取--已登录")
        return true
    }
    result = text("未登录").findOne(2000)
    if (result) {
        return false
    } else {
        write_cfg_j(app_name, "have_login", "yes")
        return true
    }
}
// 启动线程(1, 1)
// 初始化()
// exports.启动线程 = function (type, sign) {
function 启动线程(type, sign) {
    button = "text"
    vlause = "立刻体验"

    index_page2 = "com.xiangzi.jukandian.activity.MainActivity"
    index_page = "com.xiangzi.jukandian.activity.PushDialogActivity"
    index_page3 = "android.app.Dialog"
    inspect_app(app_name, index_page, button, vlause, index_page2,index_page3)
    // 弹窗()
    close_windows(button_arr)
    result = is_login()
    if (!result) {
        toast("进行登录")
        console.log("进行登录");
        login()
        弹窗()
    }

    var istype = type || 1;
    var issign = sign || 0;
    签到()
    // if (issign == 1) {
    //     初始化()
    //     签到()
    // }
    if (istype == 2) {
        // 文章()
    }

    if (istype == 1) {
        初始化()
        watch_video()
    //     聚看点首页初始化()
    //     while (true) {


    //         result = id("item_video_title").boundsInside(0, device.height * 0.2, device.width, device.height * 0.8).findOne(3000)
    //         if (!result) {

    //             aa = id("v2_video_detail_bottom_comment_finish").findOne(500)
    //             if (aa) {
    //                 button = "id"
    //                 vlause = "v2_video_detail_bottom_comment_finish"
    //                 result = control_click(button, vlause)
    //             }
    //             bb = text("忽略").findOne(500)
    //             if (bb) {
    //                 button = "text"
    //                 vlause = "忽略"
    //                 result = control_click(button, vlause)
    //             }

    //             swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.2 + random(10, 30), random(500, 700))
    //         } else {

    //             button = "id"
    //             vlause = "item_video_title"
    //             result = control_click(button, vlause, 0, h * 0.5, w, h)
    //             log("resultresult--------", result)
    //             if (!result) {
    //                 button = "text"
    //                 vlause = "忽略"
    //                 result = control_click(button, vlause)
    //                 swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.2 + random(10, 30), random(500, 700))
    //                 sleep(2000)
    //                 continue
    //             }
    //             cc = text("忽略").findOne(500)
    //             if (cc) {
    //                 button = "text"
    //                 vlause = "忽略"
    //                 result = control_click(button, vlause)
    //             }

    //             back_button = id("v2_video_detail_bottom_comment_finish").findOne(1500)
    //             if (back_button) {
    //                 log("成功进入")

    //                 var c = random(45000, 60000)
    //                 sleep(c)
    //                 // sleep(5000)
    //                 log("正常退出")
    //                 button = "id"
    //                 vlause = "v2_video_detail_bottom_comment_finish"
    //                 result = control_click(button, vlause)
    //                 sleep(500)
    //             } else {

    //             }


    //             aa = id("v2_video_detail_bottom_comment_finish").findOne(500)
    //             if (aa) {
    //                 button = "id"
    //                 vlause = "v2_video_detail_bottom_comment_finish"
    //                 result = control_click(button, vlause)
    //             }
    //             bb = text("忽略").findOne(500)
    //             if (bb) {
    //                 button = "text"
    //                 vlause = "忽略"
    //                 result = control_click(button, vlause)
    //             }
    //             swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.2 + random(10, 30), random(500, 700))
    //             sleep(2000)

    //         }
    //     }

    }


}

//----------------------------------聚看点子程序--------------------------------------------//

function invite(user_id) {
    user_id = user_id || "20392887";

    button = "text"
    vlause = "立刻体验"
    app_name = "聚看点"

    index_page = "com.xiangzi.jukandian.activity.PushDialogActivity"
    index_page2 = "com.xiangzi.jukandian.activity.MainActivity"
    inspect_app(app_name, index_page, button, vlause, index_page2)
    // 关闭签到
    button = "id"
    vlause = "v2_sign_close_button"
    result = control_click(button, vlause)
    // 忽略推送
    button = "text"
    vlause = "忽略"
    result = control_click(button, vlause)
    // 首页新人红包
    button = "id"
    vlause = "close_button"
    result = control_click(button, vlause)
    // 检测是否登录
    result = text("未登录").findOne(2000)
    if (!result) {
        console.log("已经登录");
        toast("已经登录")
    }
    // 进入个人中心
    button = "text"
    vlause = "我的"
    result = control_click(button, vlause)
    // 立即领取  已填邀请码才出现这种情况
    button = "id"
    vlause = "mine_starlert_close"
    result = control_click(button, vlause)
    // 签到提醒  已填邀请码才出现这种情况
    button = "id"
    vlause = "iv_cancel"
    result = control_click(button, vlause)
    // 关闭昨天数据 已填邀请码才出现这种情况
    button = "id"
    vlause = "iv_close"
    result = control_click(button, vlause)

    // 关闭签到提醒
    button = "id"
    vlause = "iv_cancel"
    result = control_click(button, vlause)
    // 下滑
    var w = device.width;
    var h = device.height;
    swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
    sleep(1000)
    swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))

    // 输入邀请码按钮
    button = "text"
    vlause = "输入邀请码"
    result = control_click(button, vlause)
    if (!result) {
        console.log("已邀请");
        toast("已邀请")
        return
    }

    // 开始输入
    button = 'text'
    vlause = '输入邀请码'
    control_input(button, vlause, user_id)
    // 拆红包
    var w = device.width;
    var h = device.height;
    click(w * 0.5, h * 0.5)

    result = textContains("已领取").findOne(3000)
    if (result) {
        log("邀请成功")
        toast("邀请成功")
    }





}

function login() {

    // 忽略推送
    button = "text"
    vlause = "忽略"
    result = control_click(button, vlause)
    // 检测是否登录
    result = text("未登录").findOne(2000)
    if (!result) {
        console.log("已经登录");
        toast("已经登录")
        return

    }

    // 个人中心
    button = "text"
    vlause = "未登录"
    result = control_click(button, vlause)
    // 微信登录
    sleep(500)
    button = "id"
    vlause = "towechat_login"
    result = control_click(button, vlause)
    sleep(500)
    // 微信一键登录
    button = "text"
    vlause = "点击这里"
    result = control_click(button, vlause)




    // 微信授权 
    wechat_agree()

    // 检测是否登录
    result = id("bind_phone_number_input").findOne(2000)
    if (result) {
        // 输入手机号
        button = "id"
        vlause = "bind_phone_number_input"
        input_phone(button, vlause)


        // 发送验证码
        button = "id"
        vlause = "bind_phone_send_code"
        result = control_click(button, vlause)

        // 查看验证码
        //  被包含的名称
        app_namesss = "聚看点"
        //  正则
        reg = /\d{6}/ig
        code = get_phone_code(app_namesss, reg)
        console.log(code);

        // 输入验证码
        result = id("bind_phone_code_input").findOne(3000)
        result.setText(code)
        //输入密码
        result = id("bind_phone_new_password_input").findOne(3000)
        result.setText("123456")

        // 确认
        button = "id"
        vlause = "bind_phone_ok_btn"
        result = control_click(button, vlause)
        return

    }

    button = "text"
    vlause = "一键验证"
    result = control_click(button, vlause)

    console.log("非首次登录 无需绑定手机号");
    toast("非首次登录 无需绑定手机号")
    button = "id"
    vlause = "shanyan_navigationbar_back"
    input_phone(button, vlause)
    return

}

// login()
// invite()
// 启动线程(2, 1)