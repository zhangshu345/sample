
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
app_name = "快看点"
var  button_arr = [
	['id', 'coin_get',1],// 签到
    ['id', 'close_img',1],// 专属红包
    ['text', '收入囊中',1],// 收入囊中
    ['id', 'tt_video_ad_close',1],// 签到关闭2
    ['id', 'close_iv',1],// 体现按钮
    ['text', '先去逛逛',1],// 未登录
    ['text', '忽略此版本',1],// 
    ['text', 'star',1],// 签到 快手广告
]
/*---------------------------------star-------------------------------*/




//----------------------------------快看点子程序--------------------------------------------//
left = 0;
top = 0;
right = device.width;
buttom = device.height;
w = device.width;
h = device.height;
function 弹窗() {
    //签到检测，收入囊中
    sleep(300)
    if (id("coin_get").exists()) {
        console.log("弹窗---检测到签到");
        id("coin_get").findOne().click()

    }
    if (id("close_img").exists()) {
        log("弹窗---检测到专属红包")
        sleep(1000)
        back()
        sleep(3000)
    }
    if (text("收入囊中").exists()) {
        console.log("弹窗---发现收入囊中");
        var button_info = text("收入囊中").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
    }
    if (id("tt_video_ad_close").exists()) {
        console.log("弹窗---找到签到的关闭按钮");
        var button_info = id("tt_video_ad_close").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
    }
    if (id("close_iv").exists()) {
        console.log("弹窗---提现按钮");
        var button_info = id("close_iv").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
    }
    // if (id("iv_close").exists()) {
    //     console.log("弹窗---提现提醒");
    //     var c = id("close_iv").findOne(1000)
    //     if(c && c.clickable)
    //     {
    //         c.click()
    //     }
    //     else{
    //         back()
    //     }
    // }
    // APP卡顿提示
    if (text("关闭应用").exists()) {
        if (text("等待").exists()) {
            log('弹窗函数---检测到系统级弹窗，开始关闭操作...')
            text("等待").findOne(3000).click();
        }
    }

}

function 初始化() {
    toast("正在进行初始化操作")
    num = 0
    while (true) {
        弹窗()
        num += 1
        if (num > 20) {
            console.log("初始化---异常退出");
            break
        }
        sleep(500)
        result = text('首页').boundsInside(left, top, right, buttom).exists()
        if (result) {
            button_info = text('首页').boundsInside(left, top, right, buttom).findOne();
            var 首页是否选中 = button_info.selected()
            // console.log(首页是否选中);
            if (首页是否选中) {
                console.log("初始化---确认在首页");
                // 弹窗()
                break
            } else {
                console.log("初始化---不在首页，去点击首页");
                var xy_info = button_info.bounds()
                click(xy_info.centerX(), xy_info.centerY());
                // 弹窗()
            }
        }
    }
}


function 文章详情() {
    log("查看详情")
    var i = 0
    while (true) {
        if (i > 30) {
            back()
            break
        }
        sleep(3000)
        i = i + 3
        弹窗()
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.5 + random(10, 30), random(220, 335))

    }
}

function 文章() {
    log("进入文章")
    弹窗()
    sleep(1000)
    弹窗()
    sleep(1000)
    弹窗()
    while (true) {
        var c = id("title").boundsInside(0, 0, w, h).find()
        log(c.length)
        sleep(1000)
        for (var i = 0; i < c.length; i++) {
            var f = c[i].parent()
            if (!f) {
                continue
            }
            var b = f.bounds()
            if (id("video_length").boundsInside(b.left, b.top, b.right, b.bottom).exists()) {
                log("找到视频")
                continue
            }
            if (id("video_series_count").boundsInside(b.left, b.top, b.right, b.bottom).exists()) {
                log("找到视频")
                continue
            }
            sleep(1000)
            log("检测到文章")
            弹窗()
            if (b.centerX() < 0 || b.centerY() < 0) {
                continue
            }
            if (b.left != 0) {
                log("检测到异常坐标文章")
                continue
            }
            log(b)
            log(c[i].text())
            弹窗()
            click(b.centerX(), b.centerY())
            文章详情()
        }
        sleep(1000)
        弹窗()
        swipe(w * 0.6, h * 0.8, w * 0.6, h * 0.5, random(220, 235))
    }
}

function 签到() {
    sign_reullt =  read_cfg_j(app_name,"have_sign")
	if(sign_reullt=="yes"){
		toast("读取--已签到，跳过")
        log("读取--已签到，跳过")
        return true
    }
    // 点击2次签到按钮
    sleep(200)
    var 任务按钮 = text("任务").exists();
    if (任务按钮) {
        console.log("签到---第一次点任务按钮");
        var button_info = text("任务").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
    }
    sleep(200)
    var 任务按钮 = text("任务").exists();
    if (任务按钮) {
        console.log("签到---第二次点任务按钮");
        var button_info = text("任务").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
    }
    弹窗()
    var 领取签到控件 = id("reward_ad_iv").exists();
    if (领取签到控件) {
        console.log("签到---开始签到");
        sleep(200)
        var button_info = id("reward_ad_iv").findOne()
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        write_cfg_j(app_name,"have_sign","yes")
        sleep(35000)
        弹窗()
    }
    初始化()
    log("签到完成")
}

function 视频() {
    while (true) {

        sleep(3000)
        console.log("主---开始点击评论框");
        评论 = id("iv_comment").findOne(2000);
        // log(评论.bounds())
        var 评论坐标 = 评论.bounds()
        click(评论坐标.left, 评论坐标.bottom)
        var 视频框 = id("texture_view_framelayout").findOne()
        log(视频框.bounds())
        var 视频框_bound = 视频框.bounds()
        if (text("广告").boundsInside(视频框_bound.left, 视频框_bound.top, 视频框_bound.right, 视频框_bound.bottom).exists()) {
            console.log("主---发现广告跳过");
            continue
        }

        ///// 暂时释放 做广告检测用     click(Math.abs(parseInt(x22/2)) ,y22+parseInt(y21-y22))
        log("主---正在观看视频")
        // var c = random(8000, 12000)
        var c = random(45000, 70000)
        sleep(c)

        id("video_back").findOne().click()
        log("主---观看完毕已经退出")
        快看点下滑()

    }
}

function 点击快看点视频按钮() {
    log("点击快看点视频按钮")
    sleep(1500)
    var 视频按钮 = text("视频").findOne()
    var xy_info = 视频按钮.bounds()
    click(xy_info.centerX(), xy_info.centerY());
}


function 快看点下滑() {
    sleep(500)
    var w = device.width;
    var h = device.height;
    swipe(
        w * 0.6 - random(10, 30),
        h * 0.8 + random(10, 20),
        w * 0.6 + random(50, 80),
        h * 0.3 + random(10, 30),
        random(220, 235))
}


//我的金币
function 我的金币() {
    sleep(1000)
    if (id("tab_tv").textContains("任务").exists()) {
        var d = id("tab_tv").textContains("任务").findOne(1000)
        var c = d.parent()
        if (c) {
            var b = c.bounds()
            sleep(500)
            弹窗()
            click(b.centerX(), b.centerY())
            sleep(2000)
            var coin = id("today_gold").findOne(1000)
            if (coin) {
                log("检测到今日金币")
                log(coin.text())
                d = id("tab_tv").textContains("首页").findOne(1000)
                if (d) {
                    c = d.parent()
                    if (c) {
                        b = c.bounds()
                        sleep(500)
                        弹窗()
                        sleep(500)
                        click(b.centerX(), b.centerY())
                        sleep(2000)
                    }
                }
                sleep(2000)
            }
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

    button = "text"
    vlause = "任务"
    result = control_click(button, vlause)  
    close_windows(button_arr)
    result = text("微信登录").findOne(1000)
    if(result){
        button = "text"
        vlause = "首页"
        result = control_click(button, vlause)  
        return   false

    }else{
        button = "text"
        vlause = "首页"
        result = control_click(button, vlause)  
        write_cfg_j(app_name,"have_login","yes")
        return true

    }

}

function 启动线程(type, sign) {
    // function 启动线程(type, sign) {
    sleep(3000)
    var istype = type || 2;
    var issign = sign || 0;
    button = "text"
    vlause = "同意并继续"

    index_page = "com.kuaishou.athena.MainActivity"
    inspect_app(app_name,index_page,button,vlause)
    close_windows(button_arr)
    result = is_login()
    if(!result){
        login()
    }
    签到()
    // if (issign == 1) {
    //     初始化()
    //     签到()
    // }

    sleep(500)
    log(istype)
    if (istype == 1) {
        初始化()
        sleep(1000)
        文章()

    }
    if (istype == 2) {
        初始化()
        sleep(1000)
        点击快看点视频按钮()
        视频()
    }
}

//----------------------------------快看点子程序--------------------------------------------//


function invite(user_id){
    user_id = user_id || "PL2K9V";
    button = "text"
    vlause = "同意并继续"
    app_name = "快看点"
    index_page = "com.kuaishou.athena.MainActivity"
    inspect_app(app_name,index_page,button,vlause)
    // 首页 新人体现红包
    button = "text"
    vlause = "先去逛逛"
    result = control_click(button, vlause)  

    // 首页 体现红包2
    button = "id"
    vlause = "close_iv"
    result = control_click(button, vlause)  
    
    // 签到简历
    button = "text"
    vlause = "收入囊中"
    result = control_click(button, vlause)  

    // 个人中心
    button = "text"
    vlause = "任务"
    result = control_click(button, vlause)  

    num = 0
    while(true){
        num += 1
        if(num>5){
            console.log("邀请失败");
            toast("邀请失败")
            return
        } 
        var w = device.width;
        var h = device.height;
        left = 0;
        top = 0;
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
        var button_info = text("填写邀请码").boundsInside(0, 0, device.width, device.height * 0.8).exists();
        if(button_info){
            console.log("找到填写控件");
            break
        }
    }
    // 点击填写邀请码
    button = "text"
    vlause = "填写邀请码"
    result = control_click(button, vlause)  
// 输入验证码
button = 'text'
vlause = '请输入好友提供的邀请码'
control_input(button, vlause,user_id)
// 开
var w = device.width;
var h = device.height;
click(w*0.5,h*0.4)



} 


function login(){


    // 个人中心
    button = "text"
    vlause = "任务"
    result = control_click(button, vlause)  

    close_windows(button_arr)


    // 是否登录标志
    result = text("微信登录").findOne(3000)
    if(!result){
        console.log("已经登录");
        toast("已经登录")
        button = "text"
        vlause = "首页"
        result = control_click(button, vlause)  
        return
        
    }

        // 微信一键登录
    button = "id"
    vlause = "btn"
    result = control_click(button, vlause)  
    // 微信授权 
    wechat_agree()
    sleep(3000)
    // result = text("恭喜获得红包").findOne(3000)
    // if(result){
    //     log("邀请成功")
    //     toast("邀请成功")
    // }
    close_windows(button_arr)
    button = "text"
    vlause = "首页"
    result = control_click(button, vlause)  
} 
// login()
// invite()
// 启动线程(2,1)
