
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
app_name = "微鲤看看"
var  button_arr = [
     ['id', 'image_close',1],
     ['id', 'tv_ok',1],
     ['id', 'iv_close',1],
     ['text', '取消',1],
     ['text', '继续观看',1],

]

var w = device.width;
var h = device.height;
function 弹窗()
{
    if(id("image_close").exists())
    {
        sleep(1000)
        log("检测到image_close弹框")
        back()
        sleep(1000)
    }
    //视频播放到一定时间弹出奖励窗口
    if(id("tv_ok").exists())
    {
        sleep(1000)
        log("检测到奖励弹框")
        id("tv_ok").findOne(1000).click()
        sleep(1000)
    }
    //社区红包弹窗
    if(id("iv_close").exists())
    {
        sleep(1000)
        log("检测到奖励弹框")
        id("iv_close").findOne(1000).click()
        sleep(1000)
    }
    // APP卡顿提示
    if (text("关闭应用").exists()) {
        if (text("等待").exists()){
            log('弹窗函数---检测到系统级弹窗，开始关闭操作...')
            text("等待").findOne(3000).click();
        }  
    }
}
//----------------------------------微鲤看看子线程--------------------------------------------//
function 文章详情(){
    var i = 0
    log("开始查看文章详情")
    while(true)
    {
        if(i>35)
        {
            back()
            break
        }
        //部分手机无法检测到该文本框：锤子
        if(id("tv_height_more").exists())
        {
            // log("展开查看全文")
            var b = id("tv_height_more").findOne().bounds()
            // log(b)
            if(b.top<0)
            {
                sleep(800)
                back()
                break
            }
            sleep(800)
            if(b.top<0.9*h)
            {
                click(b.centerX(),b.centerY())
            }
            
            swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
            sleep(3000)
            i = i + 3
            continue
        }
        sleep(3000)
        i = i + 3
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
    }
    log("完成文章阅读")
    
}

function 文章(){
    log("进入文章模块")
    sleep(1000)
    if(id("rl_bottom_0").exists())
    {
        id("rl_bottom_0").findOne(1000).click()
        sleep(3000)
        id("rl_bottom_0").findOne(1000).click()
    }
    else
    {
        log("没有找到文章标签，模块已退出")
    }
    while (true) {       
        log('检测文章列表')       
        sleep(1000)
        var uc = id("tv_title").find();
        for(var i = 0; i < uc.length; i++)
        {
                log("找到文章标题")
                log(uc[i].text())
                var c = uc[i].parent()
                if(!c)
                {
                    continue
                }
                var b = c.bounds()   
                log(b)
                //检测到普通视频，跳过            
                if(id("tv_duration").boundsInside(b.left, b.top, b.right, b.bottom).exists()){
                    log("检测到普通视频，跳过")
                    continue
                } 
                //检测到精选小视频，跳过
                if(id("tv_more").boundsInside(b.left, b.top, b.right, b.bottom).exists()){
                    log("检测到精选小视频，跳过");
                    
                    continue
                } 
                //检测到广告标识
                if(id("img_gdt_more").boundsInside(b.left, b.top, b.right, b.bottom).exists()){
                    log("检测到广告标识,跳过")
                    continue
                } 
                
                //检测到领取金币
                if(id("ll_open").boundsInside(b.left, b.top, b.right, b.bottom).exists()){
                    var d=id("ll_open").findOne(1000).bounds()
                    log("检测到领取金币并执行领取金币")
                    sleep(800)
                    弹窗()
                    sleep(800)
                    click(d.centerX(),d.centerY())
                    弹窗()
                    continue
                }

                 //检测到隐藏广告，宽度不为w
                 if(b.width()!=w){
                    log("检测到隐藏广告,跳过")
                    continue
                } 
                if(b.bottom > h){
                    log("超过屏幕边界")
                    continue
                } 
                弹窗()
                sleep(500)              
                click(b.centerX(),b.centerY())
                sleep(1000)
                文章详情()
                sleep(800)
        }
        // 上滑()       
        sleep(3000)
        弹窗()
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.35 + random(10, 30), random(220, 335))
        sleep(1500)
        弹窗()
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.35 + random(10, 30), random(220, 335))
 
    }
}

function 签到(){
    log("本模块没有开发签到，敬请期待")
}

function appinit(){
    log("微鲤看看初始化")
    log("等待主页出现...")
    var current_Activity = currentActivity()
    var i = 0
    for(i;i<7;i++)
    {
        if(current_Activity =="cn.etouch.ecalendar.MainActivity")
        {
            log("进入到首页")
            sleep(500)
            弹窗()
            sleep(500)
            return 
        }
        else
        {
            sleep(2000)
        }
    }
    // waitForActivity("cn.etouch.ecalendar.MainActivity")  
    // log("进入到首页")
    // sleep(1000)
    // 弹窗()
    // sleep(1000)
}

function 我的金币() {
    sleep(1000)
    //通过任务按钮找到我的按钮
    var c = id("rl_bottom_4").findOne(3000)
    if (c) {
        var b = c.bounds()
        sleep(500)
        //进入我的界面
        click(b.centerX(), b.centerY())
        var coin = id("text_today_coin").findOne(1000)
        if (coin) {
            var num = coin.text()
            log("检测到今日金币")
            log(num)
            sleep(500)
        }
        sleep(1500)
        back()
        sleep(1000)
    }
}
function is_login(){
    login_result = read_cfg_j(app_name,"have_login")
    if(login_result=="yes"){
    	toast("读取--已登录")
        log("读取--已登录")
        return true
    }
    result = text("其他方式登录").findOne(2000)
    if (result){
        return false
    }
    write_cfg_j(app_name,"have_login","yes")
    return true
}
function watch_video(){
    while(true){
        button = "id"
        vlause = "iv_tab_1"
        result = control_click(button, vlause,0, device.height * 0.5, device.width, device.height)
        button1 = id("layout_user").findOne(500)
        button2 = id("iv_avatar").findOne(500)
        if(button1 || button2){
            log("成功进入视频")
            toast("成功进入视频")
            break
        }
        close_windows(button_arr)
        log("尝试进入视频...")
        toast("尝试进入视频...")
    }

    while (true) {
        var c = random(10000, 15000)
        sleep(c)
        close_windows(button_arr)
        console.log("主函数---微鲤看看----开始上滑...");
        上滑();
    }
}
function 上滑() {
    var w = device.width;
    var h = device.height;
    swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
    // swipe(w * 0.6, h * 0.8, w * 0.6, h * 0.3, random(220, 235))
}

function 启动线程(type,sign) {
// exports.启动线程 = function (type,sign){
    button = "text"
    vlause = "同意"

    index_page = "cn.etouch.ecalendar.sync.PreLoginActivity"
    index_page2 = "cn.etouch.ecalendar.MainActivity"
    inspect_app(app_name,index_page,button,vlause,index_page2)
    close_windows(button_arr)
    result = is_login()

    if(!result){
        toast("进行登录")
        console.log("进行登录");
        login()
        while (true) {
            is_first = di("btn_back").findOne(3000)
            if (is_first) {
                is_first.click()
            } else {
                break
            }
        }

        close_windows(button_arr)
    }

    var istype = type || 1;
    var issign = sign || 0;
    appinit()
    签到()
    // if(issign==1)
    // {
    //     签到()
    // }
    sleep(500)
    if(istype==1)
    {
        // 文章()
        watch_video()
    }
    if(istype==2)
    {
        视频()
    }
}


function invite(user_id) {
    user_id = user_id || "37645335";
    button = "text"
    vlause = "同意"
    app_name = "微鲤看看"
    index_page = "cn.etouch.ecalendar.MainActivity"
    inspect_app(app_name, index_page, button, vlause)

    // // 助力现金红包
    // button = "id"
    // vlause = "image_close"
    // result = control_click(button, vlause)
    // // 取消推送
    // button = "text"
    // vlause = "取消"
    // result = control_click(button, vlause)
    // 进入个人中心
    button = "id"
    vlause = "iv_tab_4"
    result = control_click(button, vlause)
    // 好友唤醒
    button = "id"
    vlause = "image_close"
    result = control_click(button, vlause)
    // 明天体现【引导】
    button = "text"
    vlause = "明天提现"
    result = control_click(button, vlause)


    invite_button = false
    num = 1
    while (true) {
        num += 1
        if (num > 4) {
            break
        }
        var w = device.width;
        var h = device.height;
        left = 0;
        top = 0;
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
        invite_button = text("输入好友邀请码").boundsInside(left, top, w, h * 0.8).findOne(500)
        if (invite_button) {
            break
        }
    }
    if (invite_button) {
        button = "text"
        vlause = "输入好友邀请码"
        result = control_click(button, vlause)
    }else{
        console.log("邀请失败");
        toast("邀请失败")
        return
    }
    // 去输入按钮
    button = "text"
    vlause = "去输入"
    result = control_click(button, vlause)
    // 输入邀请码 按钮
    sleep(6000)
button = "text"
vlause = "输入邀请码"
result = control_click(button, vlause)
// 输入验证码
button = 'id'
vlause = 'et_input'
user_id = '37645335'
control_input(button, vlause,user_id)
// 领取奖励
button = "text"
vlause = "领取奖励"
result = control_click(button, vlause)
if(result){
    log("邀请成功")
    toast("邀请成功")
}


}

function login(){
    // button = "text"
    // vlause = "同意"
    // app_name = "微鲤看看"
    // index_page = "cn.etouch.ecalendar.sync.PreLoginActivity"
    // inspect_app(app_name,index_page,button,vlause)

    // 微信一键登录
    button = "id"
    vlause = "tv_wechat"
    result = control_click(button, vlause)  
    if(!result){
        console.log("已经登录");
        toast("已经登录")
        return
    }
    
    // 微信授权 
    wechat_agree()
}
// login()


// 
// invite()
// 启动线程(1,1)
