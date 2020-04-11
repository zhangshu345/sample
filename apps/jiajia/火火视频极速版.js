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
var  button_arr = [
    ['id','jp',1],//  签到关闭2
    ['id','jh',1],//  签到关闭
    ['id','lq',1],//  看视频红包
    // ["text",'始终允许',1],
    ['text','先去逛逛',1],
    ['text','我知道了',1],
    ['text','我再想想',1],
    ['text','不再提醒',1],
    // ['text','关闭广告',1],
    // ['text','取消',1],


]
app_name = "火火视频极速版"







// 初始化()
function 初始化(){
    while (true) {
        is_first1 = id("a4t").findOne(1000)
        if (is_first1) {
            button = "id"
            vlause = "a4t"
            result = control_click(button, vlause)
        } 
        is_first2 = id("a62").findOne(1000)
        if (is_first2) {
            button = "id"
            vlause = "a62"
            result = control_click(button, vlause)
        } 
        is_first3 = id("sb").findOne(1000)
        if (is_first3) {
            button = "id"
            vlause = "sb"
            result = control_click(button, vlause)
        } 

        if(!is_first1 && !is_first2 && !is_first3){
            break
        }
    }
    close_windows(button_arr)
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

    初始化()
    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>5){
            log("失败1")
            toast("失败1")
            初始化()
            goto_smell_video()
            return
        }
        close_windows(button_arr)
        aa = text("任务").findOne(500)
        if(aa){
            button = "text"
            vlause = "任务"
            result = control_click(button, vlause)  
        }
        bb = textContains("看视频").findOne(500)
        if(bb){
            button = "textContains"
            vlause = "看视频"
            result = control_click(button, vlause)  
        } 
        cc = textContains("领取红包").findOne(500)
        if(cc){
            button = "textContains"
            vlause = "领取红包"
            result = control_click(button, vlause)  
        } 
        close_windows(button_arr)
        result = text("立即提现").findOne(2000)
        if(result){
            break
        } 
    }
        
    money_button = textContains("今日金币").findOne(500)
    have_money = money_button.text()
    have_money = have_money.replace("今日金币：","")
    log(have_money)

    money_button = id("pc").findOne(500)
    if(money_button){
        have_gold = money_button.text()
    } 
    money_button2 = id("a2q").findOne(500)
    if(money_button2){
        have_gold = money_button2.text()
    } 
    if(!have_gold){
        log("检测总钱数失败")
        toast("检测总钱数失败")
        初始化()
        goto_smell_video()
    }
    log(have_gold)
    if(have_money < 1000 || have_gold <3000){
        log("金币不够")
        toast("金币不够")
        goto_smell_video()
        return
    }

    button = "text"
    vlause = "立即提现"
    result = control_click(button, vlause)  
    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>5){
            log("失败2")
            toast("失败2")
            初始化()
            goto_smell_video()
            return

        }
        button = "textContains"
        vlause = "今日金币"
        result = control_click(button, vlause)  
        find_result = text("提现记录 >").findOne(2000)
        if(find_result){
            break
        }
    }

    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>5){
            log("失败2")
            toast("失败2")
            初始化()
            goto_smell_video()
            break
        }
        button = "text"
        vlause = "0.3"
        result = control_click(button, vlause)  
        button = "text"
        vlause = "立即提现"
        result = control_click(button, vlause)  
        find_result = textContains("明天再试").findOne(2000)
        if(find_result){
            log("提现成功")
            toast("提现成功")
            write_cfg_j(app_name, "have_money", "yes")
            初始化()
            goto_smell_video()
            return
        }
        

        find_result = text("去绑定").findOne(2000)
        if(find_result){
            log("需要绑定手机")
            toast("需要绑定手机")
            write_cfg_j(app_name, "have_money", "yes")
            初始化()
            goto_smell_video()
            return
        }
        log("异常退出")
        toast("异常退出")
        write_cfg_j(app_name, "have_money", "yes")
        初始化()
        goto_smell_video()
        return
    }


}
function goto_smell_video(){
    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>5){
            log("返回小视频失败1")
            toast("返回小视频失败1")
            初始化()
        }
        button = "text"
        vlause = "小视频"
        result = control_click(button, vlause)  
        find_result = text("刷新").findOne(2000)
        if(find_result){
            break
        }
    }
    while (true) {
        aa = id("ye").findOne(500)
        if(aa){
            button = "id"
            vlause = "ye"
            result = control_click(button, vlause)
        }
        bb = id("za").findOne(500)
        if(bb){
            button = "id"
            vlause = "za"
            result = control_click(button, vlause)
        }

        sleep(1000)
        var current_Activity = currentActivity()
        if(current_Activity != "com.qukandian.video.qkdbase.activity.MainActivity"){
            break
        }
    }
}


/*---------------------------------login-------------------------------*/
// login()
function login(){


    // 首页登录界面
    button = "text"
    vlause = "任务"
    result = control_click(button, vlause)  

    close_windows(button_arr)
    button = "textContains"
    vlause = "登录领取"
    result = control_click(button, vlause)  

    button = "text"
    vlause = "微信一键登录"
    result = control_click(button, vlause)  
    wechat_agree()

    初始化()
    // close_windows(button_arr)


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
function sign_work() {
    sign_reullt = read_cfg_j(app_name, "have_sign")
    if (sign_reullt == "yes") {
        toast("读取--已签到，跳过")
        log("读取--已签到，跳过")
        return true
    }


    button = "text"
    vlause = "任务"
    result = control_click(button, vlause)
    if(!result){
        toast(app_name,"签到失败!!!!")
        log(app_name,"签到失败!!!!")
        return true
    }else{
        write_cfg_j(app_name, "have_sign", "yes")
    }






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
    close_windows(button_arr)
    aa = text("任务").findOne(500)
    if(aa){
        button = "text"
        vlause = "任务"
        result = control_click(button, vlause)  
    }
    bb = textContains("看视频").findOne(500)
    if(bb){
        button = "textContains"
        vlause = "看视频"
        result = control_click(button, vlause)  
    } 
    cc = textContains("领取红包").findOne(500)
    if(cc){
        button = "textContains"
        vlause = "领取红包"
        result = control_click(button, vlause)  
    } 

    close_windows(button_arr)

    dd = id("lw").findOne(500)
    if(dd){
        button = "id"
        vlause = "lw"
        result = control_click(button, vlause) 
        if  (result){
            while(true){
                sleep(5000)
                result1 = text("点击重播").findOne(500)
                if(result1){
                    while(true){
                        back()
                        sleep(1000)
                        button = "id"
                        vlause = "jh"
                        result = control_click(button, vlause)
                        
                        var current_Activity = currentActivity()
                        console.log("当前活动页--->>"+current_Activity);
                        if(current_Activity == "com.qukandian.video.qkdcontent.view.activity.SmallVideoDetailActivity"){
                            break
                        }
                    }
                    break
                }
                result2 = text("点击下载").findOne(500)
                if(result2){
                    while(true){
                        back()
                        sleep(1000)
                        button = "id"
                        vlause = "jh"
                        result = control_click(button, vlause)
                        
                        var current_Activity = currentActivity()
                        console.log("当前活动页--->>"+current_Activity);
                        if(current_Activity == "com.qukandian.video.qkdcontent.view.activity.SmallVideoDetailActivity"){
                            break
                        }
                    }
                    break
                }
                result3 = id("tt_video_ad_close").findOne(500)
                if(result3){
                    while(true){
                        button = "id"
                        vlause = "tt_video_ad_close"
                        result = control_click(button, vlause)
                        var current_Activity = currentActivity()
                        console.log("当前活动页--->>"+current_Activity);
                        if(current_Activity == "com.jifen.qkbase.main.MainActivity"){
                            break
                        }
            
                    }
            
                    break
                }
                
                log("广告观看中")
                toast("广告观看中")
            }
    
        }



    } 

    button_info = textContains("登录领取").findOne(1000);
    if (button_info){
        return false
    }

    result = id("p_").findOne(1000)
    if(result){
        log("已登录")
        toast("已登录")
        write_cfg_j(app_name,"have_login","yes")
        return true
    } 
    result = text("立即提现").findOne(1000)
    if(result){
        log("已登录")
        toast("已登录")
        write_cfg_j(app_name,"have_login","yes")
        return true
    } 

}


// 启动线程(2,1)
function 启动线程(type, sign) {
    var istype = type || 2;
    var issign = sign || 0;

	button = "text"
	vlause = "同意"
    index_page = "com.qukandian.video.qkdbase.activity.MainActivity"
    inspect_app(app_name, index_page, button, vlause)
    close_windows(button_arr)

    result = is_login()
    if(!result){
        log("检测",app_name,"进行登录操作")
        toast("检测",app_name,"进行登录操作")
        login()
        初始化()
    }
    sign_work()

    // sign_work(app_name)
    // if (issign == 1) {
    //     //sign_work(app_name)
    //     log("22222")

    // }
    // // 文章
    // if (istype == 1) {
    //     console.log("不支持文章操作");
    //     return
    // }
    if (istype == 2) {

        // while (true) {
        //     is_first = text("小视频").findOne(1000)
        //     if (is_first) {
        //         button = "text"
        //         vlause = "小视频"
        //         result = control_click(button, vlause)
        //     } else {
        //         break
        //     }
        // }
        // while (true) {
        //     aa = id("ye").findOne(500)
        //     if(aa){
        //         button = "id"
        //         vlause = "ye"
        //         result = control_click(button, vlause)
        //     }
        //     bb = id("za").findOne(500)
        //     if(bb){
        //         button = "id"
        //         vlause = "za"
        //         result = control_click(button, vlause)
        //     }

        //     sleep(1000)
        //     var current_Activity = currentActivity()
        //     if(current_Activity != "com.qukandian.video.qkdbase.activity.MainActivity"){
        //         break
        //     }
        // }
        goto_smell_video()

        see_num = 0
        while(true){
            see_num += 1
            if(see_num >40){
                log("开始尝试体现")
                toast("开始尝试体现")
                see_num = 0
                get_money()
            }     
            var c = random(8000, 13000)
            // var c = random(5000, 8000)
            sleep(c)
            close_windows(button_arr)
            var current_Activity = currentActivity()
            if(current_Activity == "com.android.packageinstaller.PackageInstallerActivity"){
                back()
            }
            reward_button = text("金蛋大奖").findOne(500)
            if(reward_button){
                // 确认打开
                nn = 0
                while(true){
                    nn += 1
                    if(nn>5){
                        break
                    } 
                    log("开始砸金蛋")
                    toast("开始砸金蛋")
                    button = "text"
                    vlause = "金蛋大奖"
                    result = control_click(button, vlause)
                    aa = textContains("看视频再").findOne(2000)
                    if(aa){
                        log("到点击")
                        break
                    }
                    bb = id("jh").findOne(500)
                    if(bb){
                        log("我知道了")
                        break
                    }
                    cc = text("赚钱小技巧").findOne(500)
                    if(cc){
                        log("我知道了")
                        back()
                        break
                    }
        
            
                }
                //开始看广告   
                if(aa){
                    while(true){
                        button = "textContains"
                        vlause = "看视频再"
                        result = control_click(button, vlause)
                        log("点击看视频")
                        var current_Activity = currentActivity()
                        console.log("当前活动页--->>"+current_Activity);
                        if(current_Activity != "com.qukandian.video.qkdcontent.view.activity.SmallVideoDetailActivity"){
                            break
                        }
                    }
                    while(true){
                        sleep(5000)
                        result1 = text("点击重播").findOne(500)
                        if(result1){
                            while(true){
                                back()
                                button = "id"
                                vlause = "jh"
                                result = control_click(button, vlause)
                                
                                var current_Activity = currentActivity()
                                console.log("当前活动页--->>"+current_Activity);
                                if(current_Activity == "com.qukandian.video.qkdcontent.view.activity.SmallVideoDetailActivity"){
                                    break
                                }
                            }
                            break
                        }
                        result2 = text("点击下载").findOne(500)
                        if(result2){
                            while(true){
                                back()
                                button = "id"
                                vlause = "jh"
                                result = control_click(button, vlause)
                                
                                var current_Activity = currentActivity()
                                console.log("当前活动页--->>"+current_Activity);
                                if(current_Activity == "com.qukandian.video.qkdcontent.view.activity.SmallVideoDetailActivity"){
                                    break
                                }
                            }
                            break
                        }
                        result3 = id("tt_video_ad_close").findOne(500)
                        if(result3){
                            while(true){
                                button = "id"
                                vlause = "tt_video_ad_close"
                                result = control_click(button, vlause)
                                var current_Activity = currentActivity()
                                console.log("当前活动页--->>"+current_Activity);
                                if(current_Activity == "com.jifen.qkbase.main.MainActivity"){
                                    break
                                }
                    
                            }
                    
                            break
                        }
                        
                        log("广告观看中")
                        toast("广告观看中")
                    }
                    
            
            
                    log(888)
                }
                if(bb){
                    button = "id"
                    vlause = "jh"
                    result = control_click(button, vlause)
                }
            
            }
            close_windows(button_arr)
            var current_Activity = currentActivity()
            if(current_Activity == "com.android.packageinstaller.PackageInstallerActivity"){
                back()
            }
        
        
            log(app_name+"上滑")
            toast(app_name+"上滑")
        
            swipe(w * 0.6 - random(10, 30), h * 0.3 + random(10, 20), w * 0.6 + random(50, 80), h * 0.1 + random(10, 30), random(220, 235))
        }
        






    }
}
// 随机滑动
// sml_move(w * 0.6- random(10, 30), h * 0.6 + random(10, 20),w * 0.6+ random(50, 80), h * 0.2+ random(10, 30), random(220, 235))

// button = "text"
// vlause = "金蛋大奖"
// result = control_click(button, vlause)



















