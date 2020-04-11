/*---------------------------------lib-------------------------------*/
left = 0;
top = 0;
right = device.width;
buttom = device.height;
w = device.width;
h = device.height;
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
}
else {
    log("公共函数实例化失败,程序返回")
}
var button_arr = [
    ["text", '始终允许', 1],
    ['id', 'close', 1],
    ['id', 'img_close', 1],
    ['id', 'tt_video_ad_close', 1],
    ['text', '关闭广告', 1],
    ['text', '取消', 1],
    ['id', 'close_sign_dialog_btn', 1],

]

function 初始化() {
    close_windows(button_arr)
    while (true) {
        log("返回")
        toast("返回")

        is_first = id("back").boundsInside(0, 0, device.width * 0.8, device.height).findOne(1000)
        nn = 0 
        if (is_first) {
            nn +=1 
            if(nn>5){
                back()
                nn=0
            }
            xy_info = is_first.bounds()
            console.log(xy_info.centerX() ,xy_info.centerY() );
            if(xy_info.centerX()>0 && xy_info.centerY()>0){
                click(xy_info.centerX(),xy_info.centerY())
                
            }else{
                break
            }
            sleep(1000)
        } else {
            break
        }
    }
    close_windows(button_arr)
    button = "text"
    vlause = "首页"
    result = control_click(button, vlause)
    if (result) {
        return
    }
    swipe(w * 0.6 - random(10, 30), h * 0.6 + random(10, 20), w * 0.6 + random(50, 80), h * 0.2 + random(10, 30), random(220, 235))
}


/*---------------------------------login-------------------------------*/


function login(){


    // 首页登录界面
    button = "text"
    vlause = "我"
    result = control_click(button, vlause)  

    // 点击登录【头像】
    button = "id"
    vlause = "tv_user_nick"
    result = control_click(button, vlause)  

    // 登录  
    button = "id"
    vlause = "wechat_login"
    result = control_click(button, vlause)  
    if(!result){
        log("已经登录")
        toast("已经登录")
        back()
        return
    }
    // 微信授权 
    wechat_agree()
    // 已经授权过
    have_Record = text("切换账号").findOne(500)
    if(have_Record){
        button = "text"
        vlause = "切换账号"
        result = control_click(button, vlause)  
        button = "text"
        vlause = "好的"
        result = control_click(button, vlause)  
    }


    button = "text"
    vlause = "首页"
    result = control_click(button, vlause)  


}

/*---------------------------------login-------------------------------*/
/*--------------------------------sign------------------------------*/


/*--------------------------------sign------------------------------*/

/*--------------------------------invite------------------------------*/
function invite(user_id){
    user_id = user_id || "13209130271";
	button = "text"
	vlause = "同意并继续"
	app_name = "有颜短视频"
    index_page = "com.liquid.box.home.HomeActivity"
    inspect_app(app_name,index_page,button,vlause)
        // 任务中心  
        button = "id"
        vlause = "tab_image"
        result = control_click(button, vlause)  
        var w = device.width;
    var h = device.height;
    swipe(w * 0.6 - random(10, 30), h * 0.5 + random(10, 20), w * 0.6 + random(50, 80), h * 0.2 + random(10, 30), random(220, 235))
    sleep(1000)
        // 去填写按钮
        button = "text"
        vlause = "去填写"
        result = control_click(button, vlause)  
        if(!result){
            log("邀请失败1")
            toast("邀请失败1")
        }
        sleep(5000)
        result = className("android.widget.EditText").findOne(500)
        if(result){
            button = 'className'
            vlause = 'android.widget.EditText'
            control_input(button, vlause,user_id)
        } 


        sleep(1000)
        button = "text"
        vlause = "立即领取"
        result = control_click(button, vlause)  
}



/*--------------------------------invite------------------------------*/
/*--------------------------------video------------------------------*/

/*--------------------------------video------------------------------*/
/*---------------------------------star-------------------------------*/
/*---------------------------------sign_work-------------------------------*/


// sign_work(app_name)
function sign_work(app_name) {
    sign_reullt = read_cfg_j(app_name, "have_sign")
    if (sign_reullt == "yes") {
        toast("读取--已签到，跳过")
        log("读取--已签到，跳过")
        return true
    }


    button = "id"
    vlause = "tab_image"
    result = control_click(button, vlause)
    if(!result){
        toast(app_name,"签到失败!!!!")
        log(app_name,"签到失败!!!!")
        return true
    }



    
    //  翻牌子
    result = id("tiny_red_pack_item").findOne(2000)
    if (result) {
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
    }
    button = "text"
    vlause = "立即签到"
    result = control_click(button, vlause)
    if (result) {
        write_cfg_j(app_name, "have_sign", "yes")
        sleep(3000)
        // 关闭广告
        var current_Activity = currentActivity()
        if (current_Activity == "com.bytedance.sdk.openadsdk.activity.TTRewardExpressVideoActivity") {
            log("广告中.....")
            toast("广告中....")
            tt_num = 0
            while (true) {
                sleep(3000)
                tt_num += 1
                if (tt_num > 10) {
                    log("签到关闭广告异常")
                    toast("签到关闭广告异常")
                    return
                }
                log("尝试关闭广告...")
                toast("尝试关闭广告...")
                button = "id"
                vlause = "tt_video_ad_close"
                result = control_click(button, vlause)
                if (result) {
                    break
                }
            }
        }
    }
    write_cfg_j(app_name, "have_sign", "yes")
    sleep(1000)
    初始化()


}
/*---------------------------------sign_work-------------------------------*/



function redpackage_work(app_name) {
    sign_reullt = read_cfg_j(app_name, "have_redpackage")
    if (sign_reullt == "yes") {
        toast("读取--红包已拆，跳过")
        log("读取--红包已拆，跳过")
        return true
    }

// close_windows(button_arr)
    button = "id"
    vlause = "tab_image"
    result = control_click(button, vlause)
    if(!result){
        toast(app_name,"拆红包失败1")
        log(app_name,"拆红包失败1")
        return true
    }
    // 点击拆分红按钮
    num = 0
    while(true){
        num += 1
        if(num>5){
            toast(app_name,"拆红包失败2")
            log(app_name,"拆红包失败2")
            return
        }
        button = "id"
        vlause = "red_view"
        result = control_click(button, vlause)
        result = id("tiny_red_pack_item").findOne(2000)
        if(result){
            break
        }
    }
    //已确认出现红包






    all_redpackage_list = id("tiny_red_pack_item").find()
    for (j = 0; j < all_redpackage_list.length-1; j++) {
    
        xy_info = all_redpackage_list[j].bounds()
        sleep(500)
        r = xy_info
        if (id("need_time").boundsInside(r.left, r.top, r.right, r.bottom).exists() ) {
            console.log("红包技能冷却中,切换...");
            toast("红包技能冷却中,切换...")
            continue
        }
    
        x_info = xy_info.centerX()
        y_info = xy_info.centerY()
        log(x_info,",",y_info)
        find_num = 0
        while(true){
            find_num += 1
            if(find_num > 20){
                toast(app_name,"拆红包失败4")
                log(app_name,"拆红包失败4")
                close_windows(button_arr)
                初始化()
                return
            }
            sleep(2000)
            var current_Activity = currentActivity()
            if(current_Activity == "com.liquid.box.home.HomeActivity"){
                click(x_info,y_info)
            }else{
                sleep(2000)
                break
            }

            button = "id"
            vlause = "tv_rewardButton"
            result = control_click(button, vlause)
            if(result){
                break
            }
    
        } 
    
    
        watch_num = 0
        while(true){

            watch_num +=1
            if(watch_num>10){
                toast(app_name,"拆红包失败3")
                log(app_name,"拆红包失败3")
                close_windows(button_arr)
                初始化()
                return
            }
            toast("拆红包,视频观看中...")
            log("拆红包,视频观看中...")
            sleep(2000)
            result1 = id("tt_video_ad_close").findOne(1000)
            result2 = text("关闭广告").findOne(1000)
            if(result1){
                while(true){
                    button = "id"
                    vlause = "tt_video_ad_close"
                    result1 = control_click(button, vlause) 
                    result11 = id("tt_video_ad_close").findOne(1000)
                    if(!result11){
                        break
                    }
                }
                break
    
            }
            if(result2){
                button = "text"
                vlause = "关闭广告"
                result2 = control_click(button, vlause) 
                result11 = text("关闭广告").findOne(1000)
                if(!result11){
                    break
                }
                break
            }
            have_end_button = id("tiny_red_pack_item").findOne(1000)
            if(have_end_button){
                log("异常退出")
                toast("异常退出")
                break
            }
            var current_Activity = currentActivity()
            if(current_Activity == "com.liquid.box.home.HomeActivity"){
                break
            }

        }
        log("拆分红完成一次")
        toast("拆分红完成一次")
        sleep(2500)
    }
    
    write_cfg_j(app_name, "have_redpackage", "yes")
    // sleep(1000)
    // 初始化()


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
    button_info = textContains("游客").findOne(1000);
    if (button_info){
        return false
    }
    result = control_click(button, vlause)  
    button_info = textContains("注册").findOne(1000);
    if (button_info){
        return false
    }


    button = "text"
    vlause = "首页"
    result = control_click(button, vlause)  
    write_cfg_j(app_name,"have_login","yes")
    return true

}


function get_money() {
    sign_reullt = read_cfg_j(app_name, "have_money")
    if (sign_reullt == "yes") {
        toast("读取--已领取，跳过")
        log("读取--已领取，跳过")
        return true
    }


    find_num = 0
    while (true) {
        find_num += 1
        if (find_num > 5) {
            log("失败1")
            toast("失败1")
            初始化()
            return
        }
        result = id("tiny_red_pack_item").findOne(1000)
        if (result) {
            swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
            sleep(1000)
        }
        button = "text"
        vlause = "去提现"
        result_list = control_have(button, vlause)
        x = result_list[0]
        y = result_list[1]
        if (x > 0 && y > 0) {
            break
        }
        button = "id"
        vlause = "tab_image"
        result = control_click(button, vlause)
    }

    have_money_button = id("tv_cash_money").findOne(500)

    if (!have_money_button) {
        log("检测现金异常,退出提现")
        toast("检测现金异常,退出提现")
        return
    }
    have_money = have_money_button.text()
    log(have_money)
    if (have_money < 1) {
        log("现金不够,尝试兑换")
        toast("现金不够,尝试兑换")
        have_gold_button = id("tv_fash_count").findOne(500)
        if (!have_gold_button) {
            log("检测金币异常,退出提现")
            toast("检测金币异常,退出提现")
            return
        }
        have_gold = have_gold_button.text()
        log(have_gold)
        if (have_gold < 100000) {
            write_cfg_j(app_name, "have_money", "yes")
            log("钱/币不够提现")
            toast("钱/币不够提现")
            return
        }
        find_num = 0
        while (true) {
            find_num += 1
            if (find_num > 5) {
                log("金币兑换失败")
                toast("金币兑换失败")
                write_cfg_j(app_name, "have_money", "yes")
                return
            }
            button = "id"
            vlause = "tv_fash_count"
            result = control_click(button, vlause)
            find_result = text("金币兑换现金").findOne(2000)
            if (find_result) {
                break
            }
        }

        find_num = 0
        while (true) {
            find_num += 1
            if (find_num > 5) {
                log("金币兑换失败2")
                toast("金币兑换失败2")
                write_cfg_j(app_name, "have_money", "yes")
                return
            }
            button = "text"
            vlause = "金币兑换现金"
            result = control_click(button, vlause)
            find_result = text("提示").findOne(2000)
            button = "text"
            vlause = "确定"
            result = control_click(button, vlause)
            have_money_button = id("tv_money_total").findOne(1000)
            have_money = have_money_button.text()
            if (have_money > 1) {
                toast("VVVV---兑换成功")
                log("VVVV---兑换成功")
                break
            }
        }

        while (true) {
            log("返回")
            toast("返回")
            is_first = id("back").boundsInside(0, 0, device.width * 0.8, device.height).findOne(1000)
            if (is_first) {
                xy_info = is_first.bounds()
                console.log(xy_info.centerX() ,xy_info.centerY() );
                if(xy_info.centerX()>0 && xy_info.centerY()>0){
                    click(xy_info.centerX(),xy_info.centerY())
                    
                }else{
                    break
                }
                sleep(1000)
            } else {
                break
            }
        }

    }
    log("开始提现")
    toast("开始提现")
    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>5){
            log("检测金币异常,退出提现")
            toast("检测金币异常,退出提现")
            初始化()
            return
        }
        button = "text"
        vlause = "去提现"
        result = control_click(button, vlause)  
        find_result = text("提现说明：").findOne(2000)
        if(find_result){
            break
        }
    }
    var content_button = textContains("您已连续看").findOne(500)
    var reult_str = content_button.text()
    var numArr = reult_str.match(/\d+/g)[5]
    console.log(numArr);
    if(numArr<5){
        toast("已看"+numArr+"天,不足5天")
        log("已看"+numArr+"天,不足5天")
        write_cfg_j(app_name, "have_money", "yes")
        初始化()
        return
    }

    while(true){
        button = "text"
        vlause = "1元"
        result = control_click(button, vlause)  
        
        button = "text"
        vlause = "立即提现"
        result = control_click(button, vlause)  
        sleep(1000)
        baind_button = text("提现到微信").findOne(1000)
        if(baind_button){
            break
        }
        baind_button = text("绑定手机号").findOne(1000)
        if(baind_button){
            toast("请先自动绑定手机号")
            log("请先自动绑定手机号")

        /////////////////自动绑定手机号码
        // button = "text"
        // vlause = "请输入手机号"
        // input_phone(button, vlause)  
        // button = "text"
        // vlause = "获取验证码"
        // result = control_click(button, vlause)  
        // app_namess = "网络"
        // //  正则
        // reg = /\d{6}/ig
        // code = get_phone_code(app_namess,reg)
        // if(!code){
        //     log("验证码获取失败,检查是否停机")
        //     toast("验证码获取失败,检查是否停机")
        // }
        // console.log(code);
        // aa  = textContains("请输入验证码").findOne(500)
        // aa.setText(code)
        // button = "text"
        // vlause = "绑定手机号"
        // result = control_click(button, vlause)  
        /////////////////自动绑定手机号码
            write_cfg_j(app_name, "have_money", "yes")
            初始化()
            return
        }


    }
    nn = 0
    while(true){
        nn +=1
        if(nn>5){
            write_cfg_j(app_name, "have_money", "yes")
            初始化()
            return
        }
        baind_button = text("提现到微信").findOne(1000)
        if(baind_button){
            button = "text"
            vlause = "提现到微信"
            result = control_click(button, vlause)  
        }
        aa = text("需与微信姓名一致，否则无法到账").findOne(1000)
        if(aa){
            toast("首次提现,自行补充信息")
            log("首次提现,自行补充信息")
            write_cfg_j(app_name, "have_money", "yes")
            初始化()
            return
        }

        button = "text"
        vlause = "立即提现"
        result = control_click(button, vlause)  
        bb = text("确定").findOne(1000)
        if(bb){
            button = "text"
            vlause = "确定"
            result = control_click(button, vlause)  
            if(result){
                console.log("提现成功");
                toast("提现成功")
                write_cfg_j(app_name, "have_money", "yes")
                初始化()
                return
            }
        }
    }





}


// app_name = "趣宠短视频"
// app_name = "音浪短视频"
// app_name = "高手短视频"
// app_name = "变身记短视频"
// app_name = "小吃货短视频"
// app_name = "有颜短视频"
// app_name = "快逗短视频"
// write_cfg_j(app_name,"have_login","no")
// write_cfg_j(app_name,"have_sign","no")

// type = 2
// sign = 1 
// liuti(type, sign ,app_name)
function liuti(type, sign ,app_name) {
    var istype = type || 2;
    var issign = sign || 0;

	button = "text"
	vlause = "同意并继续"
    index_page = "com.liquid.box.home.HomeActivity"
    inspect_app(app_name, index_page, button, vlause)
    close_windows(button_arr)

    result = is_login()
    if(!result){
        log("检测",app_name,"进行登录操作")
        toast("检测",app_name,"进行登录操作")
        login()
        初始化()
    }

    sign_work(app_name)
    get_money()
    redpackage_work(app_name)
    if (issign == 1) {
        //sign_work(app_name)
        log("22222")

    }
    // 文章
    if (istype == 1) {
        console.log("不支持文章操作");
        return
    }
    if (istype == 2) {
        while(true){
            add_money = text("看视频奖励最高翻20倍").findOne(500)
            if(add_money){
                button = "text"
                vlause = "看视频奖励最高翻20倍"
                result = control_click(button, vlause)
            }
            result_list= control_have("text", "推荐")
            query_x = result_list[0]
            if(query_x == -1){
                初始化()
                continue
            }
            var c = random(8000, 13000)
            sleep(c)
            add_money = text("看视频奖励最高翻20倍").findOne(500)
            if(add_money){
                button = "text"
                vlause = "看视频奖励最高翻20倍"
                result = control_click(button, vlause)
            }
            close_windows(button_arr)
            sleep(2000)
            // back()
            sleep(500)
            log(app_name+"上滑")
            toast(app_name+"上滑")
            // swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
            swipe(w * 0.6 - random(10, 30), h * 0.6 + random(10, 20), w * 0.6 + random(50, 80), h * 0.2 + random(10, 30), random(220, 235))
        }
    }
}
// 随机滑动
// sml_move(w * 0.6- random(10, 30), h * 0.6 + random(10, 20),w * 0.6+ random(50, 80), h * 0.2+ random(10, 30), random(220, 235))

function sml_move(qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };

    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy , qy + 50)
    };
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy , zy + 50),
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    for (var i = 0; i < 4; i++) {

        eval("point.push(dx" + i + ")");

    };
    log(point[3].x)

    for (let i = 0; i < 1; i += 0.08) {
        xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]

        xxy.push(xxyy);

    }

    // log(xxy);
    gesture.apply(null, xxy);
};
function bezier_curves(cp, t) {
    cx = 3.0 * (cp[1].x - cp[0].x); 
    bx = 3.0 * (cp[2].x - cp[1].x) - cx; 
    ax = cp[3].x - cp[0].x - cx - bx; 
    cy = 3.0 * (cp[1].y - cp[0].y); 
    by = 3.0 * (cp[2].y - cp[1].y) - cy; 
    ay = cp[3].y - cp[0].y - cy - by; 
    
    tSquared = t * t; 
    tCubed = tSquared * t; 
    result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x; 
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y; 
    return result; 
};
















