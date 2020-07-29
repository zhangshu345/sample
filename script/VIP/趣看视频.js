//----------------------------------趣看视频子程序--------------------------------------------//
/*---------------------------------lib-------------------------------*/
function instantiation() {
  
    yunurl = "https://gitee.com/zhangshu345012/sample/raw/v2/apps/jiajia/fucation_lib1.js"
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
    log("公共函数实例化成功")
}
else {
    log("公共函数实例化失败,程序返回")
}


var w = device.width;
var h = device.height;
left = 0;
top = 0;
right = device.width;
buttom = device.height / 2;




function 弹窗() {

    //签到检测
    if (id("btn_getcoins").exists()) {
        // id("img_close").findOne().click()
        log("弹窗---检测到签到-----")
        sleep(1000)
        //点击才能获取
        console.log("弹窗---开始点击签到按钮");
        id("btn_getcoins").findOne(5000).click()
        //点击之后会播放30s广告
        console.log("弹窗---开始等待关闭按钮");

        var 关闭签到 = id("tt_video_ad_close").findOne(30000)
        if (关闭签到) {
            console.log("弹窗---找到了 签到观看完视频后的关闭按钮");
            var button_info = id("tt_video_ad_close").findOne()
            var xy_info = button_info.bounds()
            click(xy_info.centerX(), xy_info.centerY());

        }
        // return
    }
    //检测到邀请好友
    if (id("btn_setting_coin_invitenow").exists()) {
        // id("img_close").findOne().click()
        log("弹窗---检测到邀请好友")
        sleep(1000)
        //会有个广告视频的播放，需要进行处理
        back()
        // return
    }
    //提醒好友
    if (id("btn_setting_coin_notice").exists()) {
        // id("img_close").findOne().click()
        log("弹窗---检测到提醒好友")
        sleep(1000)
        //会有个广告视频的播放，需要进行处理
        back()
        // return
    }
    // 检测到签到按钮
    if (id("btn_getcoins").exists()) {
        log("弹窗---检测到签到提醒")
        var button_info = id("btn_getcoins").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
    }

    // 视频广告关闭按钮
    if (id("tt_video_ad_close").exists()) {
        log("弹窗---检测到视频广告关闭按钮")
        var button_info = id("tt_video_ad_close").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());

    }

    // 关闭其他的
    if (id("btn_close").exists()) {
        log("弹窗---检测到其他弹窗")
        var button_info = id("btn_close").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
    }
    //开宝箱
    if (id("btn_user_opencoinbox_close").exists()) {
        log("弹窗---检测到开宝箱")
        var button_info = id("btn_user_opencoinbox_close").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
    }

    var 忽略按钮控件 = id("dismisstv").exists();
    if (忽略按钮控件) {
        sleep(200)
        console.log("弹窗---发现忽略按钮");
        var button_info = id("dismisstv").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(300)
    }


    if (text("点击重试").exists()) {
        log("弹窗---断网")
        var button_info = text("点击重试").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
    }
    if (text("忽略此版本").exists()) {
        console.log("弹窗---版本更新");
        var button_info = text("忽略此版本").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
    }
    // APP卡顿提示
    if (text("关闭应用").exists()) {
        if (text("等待").exists()) {
            log('弹窗函数---检测到系统级弹窗，开始关闭操作...')
            text("等待").findOne(3000).click();
        }
    }

}

//----------------------------------趣看视频子程序--------------------------------------------//
// 指定控件输入


function invite(user_id) {
    user_id = user_id || "A18369399";
    button = "text"
    vlause = "同意并继续"
    app_name = "趣看视频"
    index_page = "com.boyibo.kuaikan.activity.MainActivity"
    inspect_app(app_name, index_page, button, vlause)
    //关闭  "我知道了"  引导
    button = "id"
    vlause = "main_get_coin_guide_ling_iv"
    result = control_click(button, vlause)
    //关闭  "登录红包"  引导 
    button_info = text("拆红包").findOne(3000);
    if (button_info) {
        back()
    }
    // 新人体现红包 
    button = "id"
    vlause = "btn_close"
    result = control_click(button, vlause)
    // 进入个人中心
    button = "id"
    vlause = "mineTab"
    result = control_click(button, vlause)
    // 邀请关闭 
    button = "id"
    vlause = "btn_setting_coin_close"
    result = control_click(button, vlause)

    // 邀请关闭 
    button = "id"
    vlause = "btn_setting_coin_close"
    result = control_click(button, vlause)


    // 输入验证码 按钮 
    button = "text"
    vlause = "输入邀请码"
    result = control_click(button, vlause)
    if (!result) {
        toast("已邀请")
        console.log("已邀请");
        return
    }

    // 输入验证码
    button = 'id'
    vlause = 'et_user_inputinvitecode'
    control_input(button, vlause, user_id)

    // 完成
    button = "text"
    vlause = "确认"
    result = control_click(button, vlause)
    log("邀请成功")
    toast("邀请成功")





}

function login() {
    login_result = read_cfg_j(app_name,"have_login")
    if(login_result=="yes"){
    	toast("读取--已登录")
        log("读取--已登录")
        return true
    }
    //关闭  "我知道了"  引导
    button = "id"
    vlause = "main_get_coin_guide_ling_iv"
    result = control_click(button, vlause)
    //关闭  "登录红包"  引导 
    button_info = text("拆红包").findOne(3000);
    if (button_info) {
        back()
    }
    // 进入个人中心
    button = "id"
    vlause = "mineTab"
    result = control_click(button, vlause)
    // 点击登录按钮
    button = "text"
    vlause = "登录领取红包"
    result = control_click(button, vlause)
    if (!result) {
        console.log("已经登录");
        toast("已经登录")
        write_cfg_j(app_name,"have_login","yes")
        return

    }
    wechat_agree()
    // 输入验证码
    button = "id"
    vlause = "setting_tv_input"
    input_phone(button, vlause)
    // 点击获按钮
    button = "text"
    vlause = "获取短信验证码"
    result = control_click(button, vlause)
    // 查看验证码
    //  被包含的名称
    app_name = "趣看视频"
    //  正则
    reg = /\d{4}/ig
    code = get_phone_code(app_name, reg)
    console.log(code);
    // 
    input_key(code)
    log("登录成功")
    toast("登录成功")
    write_cfg_j(app_name,"have_login","yes")

}

// 
// exports.启动线程 = function (type, sign) {
    // 启动线程(2,1)
function 启动线程(type, sign) {

    button = "text"
    vlause = "同意并继续"
    app_name = "趣看视频"
    index_page = "com.boyibo.kuaikan.activity.MainActivity"
    inspect_app(app_name, index_page, button, vlause)



    var istype = type || 2;
    var issign = sign || 0;
    if (issign == 1) {
        console.log("暂不支持签到操作");
    }

    if (istype == 1) {
        console.log("暂不支持文章操作");
    }
    if (istype == 2) {
        while (true) {
            sleep(3000)
            弹窗()
            log('循环检测...')
            button = "text"
            vlause = "暂不更新"
            result = control_click(button, vlause)

            // button = "id"
            // vlause = "base_navigation_bar_back_ll"
            // result = control_click(button, vlause)


            button_info = id("main_bottom_ling_get_tv").findOne(500)
            // num_ = button_info.text()
            // if(!button_info){
            //     button = "id"
            //     vlause = "main_bottom_ling_view_rl"
            //     result = control_click(button, vlause)
            // }
            if(button_info){
                button_info_text = button_info.text()
                toast(button_info_text)
                if(button_info_text=="0" || !button_info_text){
                    w = device.width;
                    h = device.height;
                    click(w*0.87,h*0.78)
                    // button = "id"
                    // vlause = "main_bottom_ling_view_rl"
                    // result = control_click(button, vlause)
                }
            }else{
                click(w*0.87,h*0.78)
                // button = "id"
                // vlause = "main_bottom_ling_view_rl"
                // result = control_click(button, vlause)
            }
            
        }
        
        
    }




}
// 启动线程(2, 1)

// login()

// invite()

