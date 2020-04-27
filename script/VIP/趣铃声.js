/*---------------------------------lib-------------------------------*/
function instantiation() {
  
    yunurl = "https://gitee.com/zhangshu345012/sample/raw/v1/apps/jiajia/fucation_lib1.js"
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
} else {
    log("公共函数实例化失败,程序返回")
}
w = device.width;
h = device.height;
var button_arr = [
    ['id', 'iv_close', 1],
    ['id', 'tv_rewardButton', 1],
    ['id', 'base_card_dialog_close', 1],//新人体现
    ['text', '以后更新', 1],


    
]
app_name = "趣铃声"


function 初始化(){
    close_windows(button_arr)
    while (true) {
        is_first = id("btn_back").findOne(1500)
        if (is_first) {
            is_first.click()
        } else {
            break
        }
    }
    result = control_click(button, vlause)
    button = "text"
    vlause = "铃声"
    result = control_click(button, vlause)
    button = "text"
    vlause = "探索"

}
function is_login() {
    login_result = read_cfg_j(app_name, "have_login")
    if (login_result == "yes") {
        toast("读取--已登录")
        log("读取--已登录")
        return true
    }
    login_button = text("立即提现").boundsInside(0, 0, device.width*0.8, device.height).findOne(3000)
    if(login_button){
        return false
    }
    button = "text"
    vlause = "我的"
    result = control_click(button, vlause)
    login_button = text("微信一键登录").findOne(1000)
    if(login_button){
        return false
    }
    write_cfg_j(app_name,"have_login","yes")
}

// login()
function login(){

    button = "text"
    vlause = "立即提现"
    result = control_click(button, vlause)
    button = "text"
    vlause = "微信一键登录"
    result = control_click(button, vlause)
    // 微信授权 
    wechat_agree()
    初始化()
    write_cfg_j(app_name,"have_login","yes")
}

// 
// 启动线程(2,1)
// button = "id"
// vlause = "base_card_dialog_close"
// w = device.width
// h = device.height
// result = control_click(button, vlause,w*0.3, h*0.5, w*0.7, h*0.8)


function 启动线程(type, sign) {
    var istype = type || 2;
    var issign = sign || 1;
    button = "text"
    vlause = "我知道了"
    index_page = "com.android.packageinstaller.permission.ui.GrantPermissionsActivity"
    index_page2 = "com.zheyun.bumblebee.redpacket.NewUserWithdrawLoginActivity"
    index_page3 = "com.zheyun.bumblebee.ui.MainActivity"
    inspect_app(app_name, index_page, button, vlause,index_page2,index_page3)
    result = is_login()
    if (!result) {
        log("需要登录")
        toast("需要登录")
        login()
    }
    get_money()
    if (issign == 1) {
    log("不支持签到")
    log("不支持签到")
    }
    if (istype == 2) {
        while(true){
            // result_list= control_have("text", "推荐")
            // query_x = result_list[0]
            // if(query_x == -1){
            //     初始化()
            //     continue
            // }
            aa = text("立即设置").findOne(500)
            if(aa){
                log(888)
                toast(888)
                click(350,1060)
            }
            button = "id"
            vlause = "base_card_dialog_close"
            w = device.width
            h = device.height
            result = control_click(button, vlause,w*0.3, h*0.5, w*0.7, h*0.8)
            // var c = random(8000, 13000)
            var c = random(5000, 8000)
            sleep(c)
            close_windows(button_arr)
            sleep(2000)
            sleep(500)
            log(app_name+"上滑")
            toast(app_name+"上滑")
            // swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
            swipe(w * 0.6 - random(10, 30), h * 0.6 + random(10, 20), w * 0.6 + random(50, 80), h * 0.2 + random(10, 30), random(220, 235))
        }
    }



}

function get_money(){
    sign_reullt = read_cfg_j(app_name, "have_money")
    close_windows(button_arr)
    if (sign_reullt == "yes") {
        toast("读取--已领取，跳过")
        log("读取--已领取，跳过")
        return true
    }

    aa = text("立即设置").findOne(500)
    if(aa){
        log(888)
        toast(888)
        click(350,1000)
        click(350,1080)
    }
    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>5){
            log("体现失败1")
            toast("体现失败1")
            button = "text"
            vlause = "铃声"
            result = control_click(button, vlause)  
            break

        }
        button = "text"
        vlause = "我的"
        result = control_click(button, vlause)  
        find_result = text("今日金币").findOne(5000)
        if(find_result){
            break
        }
    }
    sleep(1000)
    all_button_list = depth("17").boundsInside(0, device.height*0.1, device.width*0.5, device.height*0.5).find()
    log(all_button_list.length)
    have_money = 0
    for (j = 0; j < all_button_list.length; j++) {
        prder_button = all_button_list[j]
        // log(prder_button.text())
        prder_button_text = prder_button.text()
        if(prder_button_text.indexOf("约")!= -1){
            log(prder_button_text)
            have_money = prder_button_text
            have_money = have_money.replace("约","")
            have_money = have_money.replace("元","")
        } 
    }
    log(have_money)


    if(have_money>10.30 || 0.03<have_money<10){

    }else{
        log("不够 体现")
        toast("不够体现")
        write_cfg_j(app_name, "have_money", "yes")
        初始化()
        return
    } 



    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>5){
            log("提现失败2")
            toast("提现失败2")
            break
        }
        button = "text"
        vlause = "去提现"
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
            log("提现失败4")
            toast("提现失败4")
            break
        }
        button = "text"
        vlause = "天天可提"
        result = control_click(button, vlause)  

        button = "text"
        vlause = "立即提现"
        result = control_click(button, vlause)  
        find_result = textContains("每天最多").findOne(750)
        if(find_result){
            log("今日已提现过")
            toast("今日已提现过")
            write_cfg_j(app_name, "have_money", "yes")
            初始化()
            return
        }
        find_result = textContains("余额不足").findOne(750)
        if(find_result){
            log("余额不足")
            toast("余额不足")
            write_cfg_j(app_name, "have_money", "yes")
            初始化()
            return
        }

        find_result = textContains("微信提现(").findOne(2000)
        if(find_result){
            log("提现成功")
            toast("提现成功")
            write_cfg_j(app_name, "have_money", "yes")
            初始化()
            return
        }

        find_result = textContains("是否绑定").findOne(500)
        if(find_result){
            log("请绑定手机号码")
            toast("请绑定手机号码")
            write_cfg_j(app_name, "have_money", "yes")
            初始化()
            return
        }
    }
    write_cfg_j(app_name, "have_money", "yes")
    初始化()








}

// get_money()
// 初始化()
// write_cfg_j(app_name, "have_money", "no")
// 启动线程(2,1)



