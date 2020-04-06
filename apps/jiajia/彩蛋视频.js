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
}
else {
    log("公共函数实例化失败,程序返回")
}

left = 0;
top = 0;
right = device.width;
buttom = device.height / 2;
app_name = "彩蛋视频"
var  button_arr = [
    ['id', 'iv_close',1],// 新人红包 个人中心
    ['id', 'close_bottom_button',1],
    ['text', '等待',1],
    ['id', 'tv_upgrade_cancel',1],// 更新关闭按钮
    ['id', 'imgClose',1],// 红包
    ['id', 'cancel',1],// 未知
    ['text', '取消',1],// 未知

]

//----------------------------------star--------------------------------------------//

function 初始化() {
    close_windows(button_arr)
    while (true) {
        log("返回")
        toast("返回")
        is_first = id("btn_back").boundsInside(0, 0, device.width*0.8, device.height).findOne(1000)
        if (is_first) {
            is_first.click()
            sleep(1000)
        } else {
            break
        }
    }
    close_windows(button_arr)
    button = "text"
    vlause = "发现"
    result = control_click(button, vlause)
}

function get_money(){
    sign_reullt = read_cfg_j(app_name, "have_money")
    if (sign_reullt == "yes") {
        toast("读取--已领取，跳过")
        log("读取--已领取，跳过")
        return true
    }
    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>5){
            log("失败1")
            toast("失败1")
            初始化()
            return
        }
        button = "id"
        vlause = "iv_user_avatar"
        result = control_click(button, vlause,0, 0, device.width*0.8, device.height*0.5)
        sleep(1000)  
        button_info = textContains("今日金币").findOne(1000)
        if(button_info){
            xy_info = button_info.bounds()
            log(xy_info.centerX(),xy_info.centerY()) 
            if(xy_info.centerX()>0 && xy_info.centerY()>0){
                break
            }    
        }
    }
    
    money_button = id("tv_gold_tips").findOne(500)
    have_money = money_button.text()
    have_money = have_money.replace("约","")
    have_money = have_money.replace("元","")
    log(have_money)
    if(have_money<0.3){
        log("允许金额不够,今日将不再进行提现操作")
        toast("允许金额不够,今日将不再进行提现操作")
        write_cfg_j(app_name, "have_money", "yes")
        初始化()
        return
    }

    gold_button = id("tv_person_today_gold_title").findOne(500)
    have_gold = gold_button.text()
    have_gold = have_gold.replace("今日金币","")
    log(have_gold)



    if(have_gold < 2000){
        log("金币不够,稍后再试")
        toast("金币不够,稍后再试")
        初始化()
        return
    }
    money_button = textContains("我的金币").findOne(500)
    have_money = money_button.text()
    have_money = have_money.replace("我的金币","")
    if(have_money<3000){
        log("金币不够,稍后再试")
        toast("金币不够,稍后再试")
        write_cfg_j(app_name, "have_money", "yes")
        return
    }
    toast("开始提现操作")
    log("开始提现操作")
    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>15){
            log("失败2")
            toast("失败2")
            暴力初始化()
            return
        }
        button = "id"
        vlause = "tv_person_today_gold_title"
        result = control_click(button, vlause)  
        find_result = text("立即提现").findOne(10000)
        if(find_result){
            break
        }
    }

    button = "text"
    vlause = "0.3 元"
    result = control_click(button, vlause)  
    find_num = 0 
    while(true){
        log(find_num,"find_num")
        find_num +=1 
        if(find_num>5){
            log("失败3")
            toast("失败3")
            暴力初始化()
            return
        }
        find_result = textContains("今天已获得").findOne(1000)
        if(find_result){
            log("条件满足,继续体现")
            toast("条件满足,继续体现")
            break
        }
        find_result = textContains("还需获取").findOne(1000)
        if(find_result){
            log("体现不满足,重启APP")
            toast("体现不满足,重启APP")
            暴力初始化()
            return
        }
        find_result = textContains("已满足").findOne(1000)
        if(find_result){
            log("条件满足,继续体现")
            toast("条件满足,继续体现")
            break
        }
        find_result = textContains("未满足").findOne(1000)
        if(find_result){
            log("体现不满足,重启APP")
            toast("体现不满足,重启APP")
            暴力初始化()
            return
        }
    }
    log(8888)



    find_num = 0 
    while(true){
        log("find_num",find_num)
        find_num +=1 
        if(find_num>5){
            log("失败3")
            toast("失败3")
            暴力初始化()
            return
        }
        button = "text"
        vlause = "0.3 元"
        result = control_click(button, vlause)  

        button = "text"
        vlause = "立即提现"
        result = control_click(button, vlause)  
        log(6666)
        find_result = text("去绑定").boundsInside(device.width*0.2, device.height*0.4, device.width, device.height*0.8).findOne(1000)
        log("find_result222",find_result)
        if(find_result){
            write_cfg_j(app_name, "have_money", "yes")
            toast("请自定绑定手机号")
            log("请自定绑定手机号")
            暴力初始化()
            return
        }

        find_result = textContains("提现成功").findOne(2000)
        log("find_result111",find_result)
        if(find_result){
            write_cfg_j(app_name, "have_money", "yes")
            暴力初始化()
            return
        }

        
    }



    
}

function 签到() {
    log("*****************")
	sign_reullt =  read_cfg_j(app_name,"have_sign")
	if(sign_reullt=="yes"){
        return true
    }

    var num = 0

    // 主页进入个人中心
    num  = 0 
    while(true){
        num += 1
        if(num>5){
            log("进入个人中心失败")
            toast("进入个人中心失败")
            break
        }
        var w = device.width;
        var h = device.height;
        swipe(0 + random(10, 30), h * 0.5 + random(10, 20), w * 0.6 + random(50, 80), h * 0.5 + random(10, 30), random(220, 235))
        button_info = text("个人中心").findOne(200)
        if(button_info){
            var xy_info = button_info.bounds()
            if(xy_info.centerX()>0 && xy_info.centerY()>0){
                log("已进入个人中心")
                break
            }
        }
    }


    var 已签到 = text("已签到").boundsInside(left, top, right, buttom).exists();
    console.log(已签到);
    if (已签到) {
        console.log("签到---已经签到,退出");
        write_cfg_j(app_name,"have_sign","yes")
        back()
        return
    }
    sleep(4000)
    var 签到有惊喜 = text("签到有惊喜").boundsInside(left, top, right, buttom).exists();
    // console.log('签到有惊喜' + 签到有惊喜);
    if (签到有惊喜) {
        console.log("签到---开始点击签到按钮");
        // sleep()
        var button_info = text("签到有惊喜").boundsInside(left, top, right, buttom).findOne(500)
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(1000)
        write_cfg_j(app_name,"have_sign","yes")
        back()
    }
    close_windows(button_arr)
    


}

function 彩蛋视频上滑() {
    var w = device.width;
    var h = device.height;
    swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
    // swipe(w/2,h/3*1,w/2,h/3*2,random(220, 235));
}

function 暴力初始化(){
    close_app(app_name)
    var result = launchApp(app_name);
    sleep(7000)
    index_page = "com.jifen.dandan.sub.home.activity.HomeActivity"
    inspect_app(app_name, index_page, button, vlause)
    close_windows(button_arr)
}


function close_windows_xqb(){
    // APP卡顿提示
    sleep(200)
    if (text("关闭应用").exists()) {
        if (text("等待").exists()){
            log('弹窗函数---检测到系统级弹窗，开始关闭操作...')
            text("等待").findOne(3000).click();
        }  
    }
    sleep(200)
}
function close_app(app_name) {
    // 传入应用名
    // 根据应用名或者包名
    // 跳转对应APP的控制平台【不同机型可能界面不一样】
    var packageName = getPackageName(app_name);
    app.openAppSetting(packageName);
    text(app.getAppName(packageName)).waitFor();
    let is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled()) {
        close_windows_xqb()
        textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne().click();
        sleep(1500);
        //  大部分机型
        普通机型 = textMatches(/(.*确.*|.*定.*)/).exists()
        华为 = text("强行停止").boundsInside(0, device.height / 2, device.width + 15, device.height).findOne(500)
        三星 = text("强制停止").boundsInside(0, device.height / 2, device.width + 15, device.height).findOne(500)
        武汉 = text("关闭应用").boundsInside(0, device.height / 2, device.width + 15, device.height).findOne(500)
        if(普通机型){
            console.log("找到普通机型");
            close_windows_xqb()
            textMatches(/(.*确.*|.*定.*)/).findOne().click(); 
        }else if(华为){
            console.log("找到华为手机");
            close_windows_xqb()
            text("强行停止").boundsInside(0, device.height / 2, device.width + 15, device.height).findOne().click()
        }else if(三星){
            console.log("找到三星手机");
            close_windows_xqb()
            text("强制停止").boundsInside(0, device.height / 2, device.width + 15, device.height).findOne().click()
        }else if(武汉){
            console.log(".........");
            close_windows_xqb()
            text("关闭应用").boundsInside(0, device.height / 2, device.width + 15, device.height).findOne().click()

        }
        sleep(500);
        log(app_name + "已被关闭");
        sleep(1000);
        back();
        return true

    } else {
        log(app.getAppName(app_name) + "应用不能被正常关闭或不在后台运行");
        close_windows_xqb()
        back();
        return false
    }

}

function get_money(){
    sign_reullt = read_cfg_j(app_name, "have_money")
    if (sign_reullt == "yes") {
        toast("读取--已领取，跳过")
        log("读取--已领取，跳过")
        return true
    }
    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>5){
            log("失败1")
            toast("失败1")
            初始化()
            return
        }
        button = "id"
        vlause = "iv_user_avatar"
        result = control_click(button, vlause,0, 0, device.width*0.8, device.height*0.5)
        sleep(1000)  
        button_info = textContains("今日金币").findOne(1000)
        if(button_info){
            xy_info = button_info.bounds()
            log(xy_info.centerX(),xy_info.centerY()) 
            if(xy_info.centerX()>0 && xy_info.centerY()>0){
                break
            }    
        }
    }
    
    money_button = id("tv_gold_tips").findOne(500)
    have_money = money_button.text()
    have_money = have_money.replace("约","")
    have_money = have_money.replace("元","")
    log(have_money)
    if(have_money<0.3){
        log("允许金额不够,今日将不再进行提现操作")
        toast("允许金额不够,今日将不再进行提现操作")
        write_cfg_j(app_name, "have_money", "yes")
        初始化()
        return
    }

    gold_button = id("tv_person_today_gold_title").findOne(500)
    have_gold = gold_button.text()
    have_gold = have_gold.replace("今日金币","")
    log(have_gold)



    if(have_gold < 2000){
        log("金币不够,稍后再试")
        toast("金币不够,稍后再试")
        初始化()
        return
    }
    money_button = textContains("我的金币").findOne(500)
    have_money = money_button.text()
    have_money = have_money.replace("我的金币","")
    if(have_money<3000){
        log("金币不够,稍后再试")
        toast("金币不够,稍后再试")
        write_cfg_j(app_name, "have_money", "yes")
        return
    }
    toast("开始提现操作")
    log("开始提现操作")
    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>15){
            log("失败2")
            toast("失败2")
            暴力初始化()
            return
        }
        button = "id"
        vlause = "tv_person_today_gold_title"
        result = control_click(button, vlause)  
        find_result = text("立即提现").findOne(10000)
        if(find_result){
            break
        }
    }

    button = "text"
    vlause = "0.3 元"
    result = control_click(button, vlause)  
    find_num = 0 
    while(true){
        log(find_num,"find_num")
        find_num +=1 
        if(find_num>5){
            log("失败3")
            toast("失败3")
            暴力初始化()
            return
        }
        find_result = textContains("今天已获得").findOne(1000)
        if(find_result){
            log("条件满足,继续体现")
            toast("条件满足,继续体现")
            break
        }
        find_result = textContains("还需获取").findOne(1000)
        if(find_result){
            log("体现不满足,重启APP")
            toast("体现不满足,重启APP")
            暴力初始化()
            return
        }
        find_result = textContains("已满足").findOne(1000)
        if(find_result){
            log("条件满足,继续体现")
            toast("条件满足,继续体现")
            break
        }
        find_result = textContains("未满足").findOne(1000)
        if(find_result){
            log("体现不满足,重启APP")
            toast("体现不满足,重启APP")
            暴力初始化()
            return
        }
    }
    log(8888)



    find_num = 0 
    while(true){
        log("find_num",find_num)
        find_num +=1 
        if(find_num>5){
            log("失败3")
            toast("失败3")
            暴力初始化()
            return
        }
        button = "text"
        vlause = "0.3 元"
        result = control_click(button, vlause)  

        button = "text"
        vlause = "立即提现"
        result = control_click(button, vlause)  
        log(6666)
        find_result = text("去绑定").boundsInside(device.width*0.2, device.height*0.4, device.width, device.height*0.8).findOne(1000)
        log("find_result222",find_result)
        if(find_result){
            write_cfg_j(app_name, "have_money", "yes")
            toast("请自定绑定手机号")
            log("请自定绑定手机号")
            暴力初始化()
            return
        }

        find_result = textContains("提现成功").findOne(2000)
        log("find_result111",find_result)
        if(find_result){
            write_cfg_j(app_name, "have_money", "yes")
            暴力初始化()
            return
        }

        
    }



    
}

function is_login(){
    login_result = read_cfg_j(app_name,"have_login")
    if(login_result=="yes"){
        toast("读取--已登录")
        log("读取--已登录")
        return true
    }

    result = text("注册/登录").findOne(2000)
    if(result){
        toast("判断进行登录")
        console.log("判断进行登录");
        return false
        

    }else{
        toast("判断已经登录")
        console.log("判断已经登录");
        write_cfg_j(app_name,"have_login","yes")
        return true
    }
}


function 启动线程(type, sign) {
    log("进入彩蛋视频子函数")
    var istype = type || 2;
    var issign = sign || 0;

    button = "text"
    vlause = "同意"

    index_page = "com.jifen.dandan.sub.home.activity.HomeActivity"
    //com.ss.android.ugc.aweme.account.white.login.DYLoginActivity
    inspect_app(app_name, index_page, button, vlause)
    close_windows(button_arr)

    result = is_login()

    if(!result){
        toast("进行登录")
        console.log("进行登录");
        login()
        write_cfg_j("彩蛋短视频","have_login","yes")
    }
    签到()
    // if (issign == 1) {
    //     签到()
    // }
    if (istype == 1) {
        console.log("彩蛋暂不支持文章操作");
    }
    if (istype == 2) {
        console.log("开始彩蛋视频操作");
        sleep(1000);
        nn = 0
        while (true) {
            nn += 1

            if(nn>50){
                get_money()
                nn = 0
            }
            var c = random(8000, 12000)
            sleep(c)
            log("距离体现还有"+(50-nn)+"圈")
            toast("距离体现还有"+(50-nn)+"圈")
            close_windows(button_arr)
            log("彩蛋视频开始上滑------------")
            彩蛋视频上滑();

        }
    }




}

//----------------------------------invite--------------------------------------------//
function invite(){
    toast("该APP不支持邀请")
    console.log("该APP不支持邀请");
}
//----------------------------------login--------------------------------------------//

function login(){
    // 注册/登录 
    button = "text"
    vlause = "注册/登录"
    result = control_click(button, vlause)  

    // 微信一键登录
    sleep(1000)
    result_list = text("微信").boundsInside(0, 0, device.width , device.height).find(3000);
    console.log("result_list---->",result_list.length);
    
    for (j = 0; j < result_list.length; j++) {
        button_info = result_list[j]
        xy_info = button_info.bounds()
        if (  0 < xy_info.centerX() && xy_info.centerX() < device.width 
            &&0 < xy_info.centerY() && xy_info.centerY() < device.height){
                click(xy_info.centerX(), xy_info.centerY());
            }
    }

    // 微信授权 
    wechat_agree()
    sleep(3000)
    while (true) {
        is_first = id("btn_back").findOne(3000)
        if (is_first) {
            button = "id"
            vlause = "btn_back"
            result = control_click(button, vlause)  
        } else {
            break
        }
    }


    result = id('iv_user_avatar').findOne(3000)
    if(result){
        toast("登录成功")
        console.log("登录成功");
        
    }

}
// invite()
// 启动线程(2, 1)
// login()
