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
//http://yuedu.xiequbo.cn/apps/fucation_lib1.js
//
subapp = instantiation("apps/fucation_lib1")
if (subapp != "") {
    eval(subapp)
    log("公共函数实例化成功")
}
else {
    log("公共函数实例化失败,程序返回")
}
var app_name = "抖音极速版"
var  button_arr = [
    ['id','btn_privacy_action',1],
    ['id','close',1],
    ['text','我知道了',1],
    ['id','pay_left_btn',1],
    ['text','日常任务',2],
    ['id','aho',1],// 首页登录红包
    ['text','取消',1],    // 通知权限
    ['text','滑动查看更多',1],//引导滑动
    ['text','好的',1],// 关闭签到
    ['text','以后再说',1],// 升级关闭
    ['text','暂不',1],//
]










//----------------------------------抖音子程序--------------------------------------------//
var w = device.width;
var h = device.height;

function 上滑() {
    var w = device.width;
    var h = device.height;
    swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
    // swipe(w * 0.6, h * 0.8, w * 0.6, h * 0.3, random(220, 235))
}

function 初始化() {
    // log("正在进行初始化")
    // sleep(5000)
    // back()
    // sleep(3000)
    // 弹窗()
    // sleep(1000)
    // 上滑();
    close_windows(button_arr)
}



function is_login(){
    login_result = read_cfg_j(app_name,"have_login")
    if(login_result=="yes"){
    	toast("读取--已登录")
        log("读取--已登录")
        return true
    }

    button = "text"
    vlause = "我"
    result = control_click(button, vlause) 
    close_windows(button_arr)
    result = id("ub").findOne(2000)
    if(result){
        back()
        button = "text"
        vlause = "首页"
        result = control_click(button, vlause) 
        write_cfg_j(app_name,"have_login","yes")
        return true
    } 
    result = text("帮助").findOne(2000)
    if(result){
        return false
    }
    write_cfg_j(app_name,"have_login","yes")

}

// var app_name = "抖音极速版"
// write_cfg_j("抖音极速版","have_login","no")
// 启动线程(2,1)
function 启动线程(type, sign) {
    var istype = type || 2;
    var issign = sign || 0;
	button = "text"
	vlause = "我知道了"

    index_page = "com.ss.android.ugc.aweme.main.MainActivity"
    //com.ss.android.ugc.aweme.account.white.login.DYLoginActivity
    inspect_app(app_name, index_page, button, vlause)
    close_windows(button_arr)
    result = is_login()
    if(!result){
        toast("进行登录")
        console.log("进行登录");
        login()
    }
    签到()
    // if (issign == 1) {
    //     签到()
        
    // }
    // 文章
    if (istype == 1) {
        log("抖音极速版暂不支持阅读文章操作...")
        return
    }
    // 视频
    if (istype == 2) {
        
        while (true) {
            var c = random(10000, 15000)
            sleep(c)
            // 弹窗()
            close_windows(button_arr)
            console.log("主函数---抖音极速版----开始上滑...");
            上滑();
        }
    }

}
/*--------------------------------sign------------------------------*/
function 签到() {
    sign_reullt =  read_cfg_j(app_name,"have_sign")
	if(sign_reullt=="yes"){
		toast("读取--已签到，跳过")
        log("读取--已签到，跳过")
        return true
    }

    var kc = id("kc").findOne(2000)
    if(kc)
    {
        log("找到抖音极速签到入口")
        b = kc.bounds()
        if(b)
        {
            click(b.centerX(),b.centerY())
            sleep(2000)
            back()
            sleep(3000)
            back()
            button = "text"
            vlause = "首页"
            result = control_click(button, vlause) 
            write_cfg_j(app_name,"have_sign","yes")
        }
    }
    else
    {
        log("签到失败")
    }   
}
/*--------------------------------invite------------------------------*/

function invite(user_id){
    user_id = user_id || "83929461";

  

    close_windows(button_arr)


    // 邀请检测
    result = text('即可立得最高2元现金').findOne(3000)
    if(result){
            button = "text"
            vlause = "去填写" //// 不确定？？？ 去填写 去获取
            result = control_click(button, vlause) 
            return
    }else{

                // j进入任务栏
                button = "id"
                vlause = "ke" 
                result = control_click(button, vlause)        
         // 上滑控件寻找
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
            sleep(2000)
            invite_button = text("去填写").boundsInside(left, top, device.width, device.height * 0.8).findOne(500)
            if (invite_button) {
                break
            }
        }
        if (invite_button) {
            button = "text"
            vlause = "去填写"
            result = control_click(button, vlause)
        }
    }

    button = 'id'
    vlause = 'inputCode_input'
    control_input(button, vlause,user_id)
    sleep(2000)
    button = "text"
    vlause = "立即领取"
    result = control_click(button, vlause)
    back()
    sleep(2000)
    back()
    


    

}
/*---------------------------------login-------------------------------*/
// login()
function login(){
    // 进入个人中心
    button = "text"
    vlause = "我"
    result = control_click(button, vlause) 

    result = id("ub").findOne(2000)
    if(result){
        console.log("已登录");
        toast("已登录")
        return
    } 
    
    result = text("本机号码一键登录").findOne(2000)
    if(result) {
        // agree messing
        button = "id"
        vlause = "ae0"
        result = control_click(button, vlause)  

        button = "text"
        vlause = "本机号码一键登录"
        result = control_click(button, vlause)  
        sleep(2000)
        button = "text"
        vlause = "跳过"
        result = control_click(button, vlause)  
        return

    }
    //  输入手机号 

    // button = "text"
    // vlause = "请输入手机号"
    // input_phone(button,vlause)
    var telephoneservice = context.getSystemService("phone")
    var phone = telephoneservice.getLine1Number()
    phone = phone.substring(3)
    console.log("手机号" + phone);
    
    input_key(phone)
    //进入个人中心
    button = "text"
    vlause = "获取短信验证码"
    result = control_click(button, vlause)  

    //    查看验证码
    // 被包含的名称
    app_namess = "抖音"
    //  正则
    reg = /\d{4}/ig
    code = get_phone_code(app_namess,reg)
    console.log(code);
    //  输入验证码
    button = "id"
    vlause = "ae9"
    result = control_have(button, vlause)
    result.setText(code)
    //  同意协议
    button = "id"
    vlause = "ae0"
    control_click(button,vlause)

    //  登录
    button = "text"
    vlause = "登录"
    result = control_click(button,vlause)
    if(result){
        toast("登录成功")
        console.log("登录成功" )
    }
    //  跳过填写资料
    button = "text"
    vlause = "跳过"
    control_click(button,vlause)

    

}
// login()
// invite()
// 启动线程(2,1) 
