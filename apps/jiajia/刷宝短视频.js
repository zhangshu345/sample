/*---------------------------------lib-------------------------------*/
function instantiation(varrurl) {
    yun = 1
    // var yunurl = "http://yuedu.xiequbo.cn/"
    yunurl = varrurl 
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

subapp = instantiation("https://gitee.com/zhangshu345012/sample/raw/v1/apps/jiajia/fucation_lib1.js")
if (subapp != "") {
    eval(subapp)
    log("公共函数实例化成功")
}
else {
    log("公共函数实例化失败,程序返回")
}
app_name = "刷宝短视频"
var  button_arr = [
    ['id', 'imgClose',1],// 红包
    ['id', 'cancel',1],// 未知
    ['text', '取消',1],// 未知
    ['id', 'btn_back',1],// 返回按钮
 ]

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
    button = "text"
    vlause = "首页"
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
        button = "text"
        vlause = "我"
        result = control_click(button, vlause)  
        find_result = id("tv_gold_num").findOne(1000) // 金币
        if(find_result){
            nn = find_result.text()
            if(nn>0){
                break
            }
            
        }
        find_result = id("tv_mine_money").findOne(1000)
        if(find_result){
            nn = find_result.text()
            if(nn>0){
                break
            }
        }
    }
    
    money_button = id("tv_mine_money").findOne(500)
    have_money = money_button.text()
    log(have_money)
    if(have_money<0.3){
        log("允许金额不够,今日将不再进行提现操作")
        toast("允许金额不够,今日将不再进行提现操作")
        write_cfg_j(app_name, "have_money", "yes")
        初始化()
        return
    }
    gold_button = id("tv_gold_num").findOne(500)
    have_gold = gold_button.text()
    log(have_gold)
    if(have_gold < 6666){
        log("金币不够,稍后再试")
        toast("金币不够,稍后再试")
        初始化()
        return
    }
    toast("开始提现操作")
    log("开始提现操作")
    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>5){
            log("失败2")
            toast("失败2")
            初始化()
            return
        }
        button = "id"
        vlause = "tv_mine_money"
        result = control_click(button, vlause)  
        find_result = text("立即提现").findOne(2000)
        if(find_result){
            break
        }
    }

    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>5){
            log("失败3")
            toast("失败3")
            初始化()
            return
        }
        button = "text"
        vlause = "立即提现"
        result = control_click(button, vlause)  
        find_result = text("活动提现").findOne(1000)
        if(find_result){
            break
        }
        find_result = text("常规提现").findOne(1000)
        if(find_result){
            break
        }
        
    }

    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>5){
            log("失败4")
            toast("失败4")
            write_cfg_j(app_name, "have_money", "yes")
            初始化()
            break
        }
        button = "textContains"
        vlause = "0.3"
        result = control_click(button, vlause)  

        button = "text"
        vlause = "立即提现"
        result = control_click(button, vlause)  

        find_result = text("提现详情").findOne(2000)
        if(find_result){
            log("提现成功")
            toast("提现成功")
            write_cfg_j(app_name, "have_money", "yes")
            初始化()
            break
        }
        current_page = currentPackage()
        if(current_page == "com.tencent.mm"){
            button = "text"
            vlause = "同意"
            result = control_click(button, vlause)  
        }
    }


    
}


// sign_work()
function sign_work() {
    sign_reullt = read_cfg_j(app_name, "have_sign")
    if (sign_reullt == "yes") {
        toast("读取--已签到，跳过")
        log("读取--已签到，跳过")
        return true
    }
    while(true){
        button = "text"
        vlause = "任务"
        result = control_click(button, vlause)  
        aa = text("我的元宝").findOne(5000)
        if(aa){
            break
        }
        close_windows(button_arr)
    }
    sleep(1000)
    button_info = text("邀请好友立得").findOne(2000)
    if(button_info){
        var xy_info = button_info.bounds()
        click(xy_info.centerX()+230,xy_info.centerY()-100)
    }


    button = "id"
    vlause = "imgClose"
    result = control_click(button, vlause)  

    button = "text"
    vlause = "立即签到"
    result = control_click(button, vlause)  

    button = "text"
    vlause = "立即签到"
    result = control_click(button, vlause)  

    result = text("看视频签到").findOne(1000)
    if(result){
        button = "text"
        vlause = "看视频签到"
        result = control_click(button, vlause)  
        while(true){
            log("签到视频观看中")
            toast("签到视频观看中")
            button = "id"
            vlause = "tt_video_ad_close"
            result = control_click(button, vlause)
            if (result) {
                break
            }
            button = "id"
            vlause = "iv_close"
            result = control_click(button, vlause)
            if (result) {
                break
            }

        }
        write_cfg_j(app_name, "have_sign", "yes")
        button = "text"
        vlause = "首页"
        result = control_click(button, vlause)  
        return
    }


    result = textContains("今日已签到").findOne(1000)
    if(result){
        write_cfg_j(app_name, "have_sign", "yes")
    }
    result = text("恭喜您获得").findOne(1000)
    if(result){
        write_cfg_j(app_name, "have_sign", "yes")
    }
    button = "text"
    vlause = "首页"
    result = control_click(button, vlause)  

}





//----------------------------------刷宝子程序--------------------------------------------//
function 刷宝上滑() {
    var w = device.width;
    var h = device.height;
    swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
}

function 弹窗() {
    sleep(50)
    var 刷宝红包关闭 = id("imgClose").exists();
    if (刷宝红包关闭) {
        log("红包按钮存在")
        var 坐标 = id("imgClose").findOne();
        log(坐标.bounds())
        var 坐标 = 坐标.bounds()
        click(坐标.left + 5, 坐标.bottom - 2)
    }
    // 
    if (id("cancel").exists()) {
        //id("commit").findOne(1000).click()
        back()
        sleep(1000)
    }
    // 去授权 痰喘
    if (text("去授权").exists()) {
        log("弹窗函数---发现授权弹窗，开始关闭操作...")
        text("去授权").findOne(3000).click()
    }
    // APP卡顿提示
    if (text("关闭应用").exists()) {
        if (text("等待").exists()){
            log('弹窗函数---检测到系统级弹窗，开始关闭操作...')
            text("等待").findOne(3000).click();
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


    // 进入个人中心
    button = "text"
    vlause = "我"
    result = control_click(button, vlause)  
    result = text("微信账号登录").findOne(3000)
    if(result){
        back()
        return false
    }else{
        button = "text"
        vlause = "首页"
        result = control_click(button, vlause)  
        write_cfg_j(app_name,"have_login","yes")
        return true

    }
}
// 
function 启动线程(type, sign) {
    // exports.启动线程 = function (type,sign) {
        // write_cfg_j(app_name, "have_sign", "no")
        app.launchApp("刷宝短视频")
    var istype = type || 2;
    var issign = sign || 0;
    button = "text"
    vlause = "去授权"

    index_page = "com.jm.video.ui.main.MainActivity"
    inspect_app(app_name,index_page,button,vlause)
    close_windows(button_arr)
    result = is_login()
    if(!result){
        console.log("登录");
        toast("登录")
        login()
        close_windows(button_arr)
    }


    // sign_work()

    if (issign == 1) {
        console.log("刷宝不支持签到操作");
    }
    // 文章
    if (istype == 1) {
        console.log("刷宝不支持文章操作");
        return
    }
    if (istype == 2) {
        log("进入刷宝子视频的函数")
        see_num = 0 
        while (true) {
            var c = random(10000, 15000)
            sleep(c)
            弹窗()
            see_num +=1
            if(see_num>60){
                see_num = 0
                get_money()
            }  
            log("刷宝开始上滑------------")
            刷宝上滑();
        }
    }


}






function login(){

    // 进入个人中心
    button = "text"
    vlause = "我"
    result = control_click(button, vlause)  

        // 微信一键登录
    button = "text"
    vlause = "微信账号登录"
    result = control_click(button, vlause)  
    if(!result){
        console.log("已经登录");
        toast("已经登录")
        return
    }
    // 微信授权 
    wechat_agree()
    result = control_click(button, vlause)  
    button = "text"
    vlause = "首页"
    result = control_click(button, vlause)  
}
// login()



// invite()

启动线程(2,1)