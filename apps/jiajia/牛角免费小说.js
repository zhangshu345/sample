

left = 0;
top = 0;
right = device.width;
buttom = device.height;
w = device.width;
h = device.height;

app_name = "牛角免费小说"

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







let button_arr = [

    ['text', '同意',1],// 同意协议
    ['id', 'guide_login_close',1],// 未登录红包
    ['id', 'sign_sueecss_close',1],// 签到按钮
    ['id', 'guide_invite_close',1],//邀请红包关闭
    ['id', 'book_recom_close',1],
    ['desc', '返回按钮',1],
    ['id', 'tt_video_ad_close_layout',1],// 关闭广告
    ['id', 'home_rad_close',1],
    ['id','tt_video_ad_close',1],// 关闭广告
    ['text', '知道了',1],// 规则知道了
    ['id', 'tt_splash_skip_btn',1],//  文章内抖音广告
    ['text', '关闭应用',1],// 跳过
    ['id', 'tt_titlebar_close',1],//  文章内已经进入的广告
    ['id', 'app_up_close',1],//  欢迎页更新
    // ['id', 'tt_click_upper_non_content_layout',1],//  视频广告2


]



function close_windows2(button_arr) {

    num = 1

    while(true){

        num +=1

        left = 0;

        top = 0;

        right = device.width;

        buttom = device.height;

        sleep(2000)

        v = false

        for (let i = 0, len = button_arr.length; i < len; i++) {

            button = button_arr[i][0]

            vlause = button_arr[i][1]

            operation_type = button_arr[i][2]

            if (button == 'id') {

                button_info = id(vlause).boundsInside(left, top, right, buttom).findOne(50);

            } else if (button == 'text') {

                button_info = text(vlause).boundsInside(left, top, right, buttom).findOne(50);

            } else if (button == 'desc') {

                button_info = desc(vlause).boundsInside(left, top, right, buttom).findOne(50);

            } else if (button == 'className') {

                button_info = className(vlause).boundsInside(left, top, right, buttom).findOne(50);

            } else if (button == 'textContains') {

                button_info = textContains(vlause).boundsInside(left, top, right, buttom).findOne(50);

            } else {

                console.log("关闭弹窗 传参错误");

                toast("关闭弹窗 传参错误")

                result = false

            }

            if (button_info) {

                var xy_info = button_info.bounds()

                if (0 < xy_info.centerX() &&xy_info.centerX() < device.width &&0 < xy_info.centerY() &&xy_info.centerY() < device.height) {

                    v = true

                    if(operation_type ==1 ){

                        log("弹窗点击关闭 => ", button_arr[i][0],"=>", button_arr[i][1])

                        toast("弹窗点击关闭 => ", button_arr[i][0],"=>", button_arr[i][1])

                        click(xy_info.centerX(), xy_info.centerY());

                        break

                    }else if(operation_type ==2){

                        log("弹窗点返回 => ", button_arr[i][0],"=>", button_arr[i][1])

                        toast("弹窗点返回 => ", button_arr[i][0],"=>", button_arr[i][1])

                        back()

                    }

            }

            }

        }

        if( num >4){

            toast("关闭弹窗异常退出")

            log("关闭弹窗异常退出")

            break

        }

        if(!v){

            toast("关闭弹窗完成")

            log("关闭弹窗完成")

            break

        }

    }



}







// 翻页()

function 翻页() {

    while (true) {

        toast("翻页")
        console.log("翻页");
        //进入新的小说
        reult = id("book_title").findOne(3000)
        if(reult){     
                log("开始阅读新小说")
                toast("开始阅读新小说")   
                button = "id"
                vlause = "book_title"
                result = control_click(button, vlause)
                sleep(2000)
                button = "id"
                vlause = "btn_read_book_hint2"
                result = control_click(button, vlause)
                if (!result) {
                    button = "id"
                    vlause = "btn_read_book"
                    result = control_click(button, vlause)
                    if(!result){
                        click(w * 0.76, h * 0.88)
                    }
                }
        }
        var current_Activity = currentActivity()
        if(current_Activity == "com.android.packageinstaller.PackageInstallerActivity"){
            back()
        }


        // button = "text"

        // vlause = "知道了"

        // result = control_click(button, vlause)

        // button = "id"

        // vlause = "read_page_gold_progress"

        // result = control_click(button, vlause)

        var c = random(5000, 8000)

        sleep(c)

        close_windows2(button_arr)
        sleep(500)

        swipe(w * 0.7 - random(10, 30), h * 0.3 + random(10, 20), w * 0.3 + random(50, 80), h * 0.3 + random(10, 30), random(220, 335))

    }

}



function 初始化() {

    console.log("初始化---开始初始化");

    num = 0

    while (true) {
        num += 1
        if(num>5){
        log("初始化失败")
            toast("初始化失败")
            return
        }

        close_windows2(button_arr)

        // button = "id"
        // vlause = "sign_sueecss_close"
        // result = control_click(button, vlause)

        button = "text"
        vlause = "书库"
        result = control_click(button, vlause)
        var x,y
        button = "text"
        vlause = "书架"
        result_list = control_have(button, vlause)  
        x = result_list[0]
        y = result_list[1]
        if(x>0 && y>0){
            log("初始化完成")
            toast("初始化完成")
            break
        }
    }
}



function 阅读() {

    初始化()

    // 进入小说主页

    num = 0

    while (true) {

        // 初始化()

        num += 1

        if (num > 3) {

            console.log("阅读---尝试3次进入失败");

            break

        }

        // 打开书籍 书架

        sleep(50)



        if (id("book_featured_title").exists()) {

            console.log("阅读---点击小说标题");

            var button_info = id("book_featured_title").findOne(500)

            var xy_info = button_info.bounds()

            console.log(xy_info.centerX(), xy_info.centerY());

            aa = click(xy_info.centerX(), xy_info.centerY());

            console.log('aa----' + aa);

        }

        // 作者

        sleep(1000)

        if (id("book_featured_entirely_author").exists()) {

            console.log("阅读---点击作者");

            var button_info = id("book_featured_entirely_author").findOne(500)

            var xy_info = button_info.bounds()

            console.log(xy_info.centerX(), xy_info.centerY());

            click(xy_info.centerX(), xy_info.centerY());

        }

        // 分类

        sleep(1000)

        if (id("book_featured_entirely_type").exists()) {

            console.log("阅读---点击分类");

            var button_info = id("book_featured_entirely_type").findOne(500)

            var xy_info = button_info.bounds()

            console.log(xy_info.centerX(), xy_info.centerY());

            click(xy_info.centerX(), xy_info.centerY());

        }

        // 简介

        sleep(1000)

        if (id("book_featured_intro").exists()) {

            console.log("阅读---点击简介");

            var button_info = id("book_featured_intro").findOne(500)

            var xy_info = button_info.bounds()

            console.log(xy_info.centerX(), xy_info.centerY());

            click(xy_info.centerX(), xy_info.centerY());

        }





        //阅读框1  阅读框2

        button = "id"

        vlause = "btn_read_book_hint2"

        result = control_click(button, vlause)

        if (!result) {

            button = "id"

            vlause = "btn_read_book"

            result = control_click(button, vlause)

            if(!result){

                click(w * 0.76, h * 0.88)

            }



        }







        sleep(1000)

        if (id("read_page_gold_progress").exists()) {

            console.log("阅读---确认已经进入1");

            break

        }

        if (id("read_bottom_banner_title").exists()) {

            console.log("阅读---确认已经进入2");

            break

        }

        if (id("read_bottom_banner_icon").exists()) {

            console.log("阅读---确认已经进入2");

            break

        }



    }

    console.log("开始翻页操作-----");

    翻页()





}



//观看视频

// watch_video()
function watch_video() {
    // 初始化()
    // 确保进入任务中心
    num = 0
    while (true) {
        num += 1
        if (num > 8) {
            log("异常")
            toast("异常")
            初始化()
            return
        }
        button = "id"
        vlause = "home_gift"
        result = control_click(button, vlause)
        if (!result) {
            log("点击任务失败")
            toast("点击任务失败")
            w = device.width;
            h = device.height;
            click(w * 0.5, h * 0.88)
        }
        button_info = text("福利中心").findOne(500)
        if (button_info) {
            var xy_info = button_info.bounds()
            if (0 < xy_info.centerX() && xy_info.centerX() < device.width &&
                0 < xy_info.centerY() && xy_info.centerY() < device.height) {
                break
            }
        }
        close_windows2(button_arr)
    }
    // 确保获取次数
    num = 0
    while (true) {
        num += 1
        console.log("看广告---异常检测次数" + num);
        if (num > 10) {
            console.log('看广告---循环检测失败');
            初始化()
            return
        }
        //看完标志
        break_button = text("观看视频(30/30)").findOne(500)
        if (break_button) {
            console.log("已完成");
            初始化()
            return
        }
        var video_title = textStartsWith("观看视频(").boundsInside(left, top, right, device.height * 0.8).findOne(500)
        if (video_title) {
            var reult_str = video_title.text()
            if (reult_str) {
                var numArr = reult_str.match(/\d+/g)
                break
            }
        }
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))
    }



    look_num = numArr[1] - numArr[0]

    log(look_num)

    if (look_num > 0) {

        console.log("看广告---执行看视频的次数是" + look_num);
        for (j = 0; j < look_num; j++) {

            while (true){
                sleep(2000)
                time_button = textContains("00:").findOne(500)
                if(!time_button){
                    break
                }
                log("技能冷却中")
                toast("技能冷却中")
            }

            console.log("当前看视频的次数是:" + j);
            wech_click_num = 0
            while(true){
                wech_click_num+=1
                if(wech_click_num>10){
                    log("观看失败")
                    toast("观看失败")
                    初始化()
                    return
                }
                button = "text"
                vlause = "去观看"
                result = control_click(button, vlause)
                time_button = textContains("00:").findOne(500)
                watch_button = text("去观看").findOne(500)
                var current_Activity = currentActivity()

                if(!time_button && !watch_button && current_Activity != "com.yincheng.njread.ui.home.HomeActivity" ){
                    log("成功进入广告")
                    toast("成功进入广告")
                    break
                } 
                toast("尝试观看中....")
                log("尝试观看中......")
                close_windows2(button_arr)
                over_button =  text("已完成").findOne(500)
                if(over_button){
                    return
                }
            }



            // 确保关闭
            while (true) {
                console.log("检测关闭中");
                toast("检测关闭中")
                num += 1
                sleep(1000)
                if (num > 30) {
                    log("观看异常")
                    toast("观看异常")
                    // 650  150
                    click(device.width*0.88,device.height*0.085)
                    初始化()
                    break
                }
                button = "id"
                vlause = "tt_video_ad_close_layout"
                result = control_click(button, vlause)
                if (result) {
                    log("退出广告")
                    toast("退出广告")
                    break
                }

                button = "id"
                vlause = "tt_video_ad_close"
                result = control_click(button, vlause)
                if (result) {
                    log("退出广告")
                    toast("退出广告")
                    break
                }
                close_windows2(button_arr)
                button = "text"
                vlause = "去观看"
                result = control_click(button, vlause)
                var current_Activity = currentActivity()
                if(current_Activity == "com.android.packageinstaller.PackageInstallerActivity"){
                    back()
                }

            }
            // 确保领取奖励
            num = 0
            while (true) {
                num += 1
                if (num > 5) {
                    log("异常4")
                    toast("异常4")
                    初始化()
                    return

                }
                get_reward = id("home_rad_close").findOne(8000)
                if (get_reward) {
                    log("领取奖励")
                    toast("领取奖励")
                    button = "id"
                    vlause = "home_rad_close"
                    result = control_click(button, vlause)
                } else {
                    log("异常3")
                    toast("异常3")
                }
                get_reward = id("home_rad_close").findOne(1000)
                if (!get_reward) {
                    break
                }

                
            }
            // 确保出现已经观看


        }
    }
    初始化()
}



function is_login(){

    login_result = read_cfg_j(app_name,"have_login")

    if(login_result=="yes"){

    	toast("读取--已登录")

        log("读取--已登录")

        return true

    }

    button_info = textContains("登录查看").findOne(3000);

    if(button_info){

        return false

    }else{

        write_cfg_j(app_name,"have_login","yes")

        return true

    }

}



// 启动线程(1,1)




function 启动线程(type, sign) {

    // exports.启动线程=function (type,sign){
        button = "text"
        vlause = "同意并继续"

        index_page = "com.yincheng.njread.ui.home.HomeActivity"
        index_page2 = "com.yincheng.njread.ui.dialog.SignHintDialog"
        index_page3 = "com.yincheng.njread.ui.load.LoadActivity"
        inspect_app(app_name, index_page, button, vlause,index_page2,index_page3)
        close_windows2(button_arr)
        result = is_login()
        if(!result){
            login()

        }





    var istype = type || 1;

    var issign = sign || 0;

    if (issign == 1) {

        log("不支持签到操作")

    }

    sleep(500)

    if (istype == 1) {
        watch_video()
        log("开始文章")
        阅读()

    }

    if (istype == 2) {

        log("本模块暂不支持视频")

        // 视频()

    }

}





function invite(user_id) {

    user_id = user_id || "o581nj";

    result = inspect_app("牛角免费小说", "com.yincheng.njread.ui.home.HomeActivity")



    //初始化检测

    sleep(1000)

    // 签到关闭

    is_sign = id("sign_sueecss_bg").findOne(1000)

    if (is_sign) {

        is_sign_close = id("sign_sueecss_close").findOne(10000)

        if (is_sign_close) {

            console.log("签到关闭");

            toast("签到关闭")

            is_sign_close.click()

        }

    }

    // 邀请红包关闭

    guide_invite_close = id("guide_invite_close").findOne(1000)

    if (guide_invite_close) {

        console.log("红包关闭1");

        toast("红包关闭1")

        guide_invite_close.click()

    }

    // 登录体现红包

    guide_login_close = id("guide_login_close").findOne(1000)

    if (guide_login_close) {

        console.log("红包关闭2");

        toast("红包关闭2")

        guide_login_close.click()

    }



    // 任务按钮

    button = "id"

    vlause = "home_gift"

    result = control_click(button, vlause)



    // 去填写按钮

    button = "text"

    vlause = "去填写"

    result = control_click(button, vlause)

    if (!result) {

        console.log("已邀请");

        toast("已邀请")

        return



    }

    // 填写验证码

    button = 'id'

    vlause = 'invite_code_content'

    control_input(button, vlause, user_id)







    // 完成按钮

    button = "text"

    vlause = "完成"

    result = control_click(button, vlause)

    log("邀请成功")

    toast("邀请成功")











}



function login() {
    button = "text"
    vlause = "我的"

    result = control_click(button, vlause)

    close_windows2(button_arr)

    button = "text"

    vlause = "点击登录"

    result = control_click(button, vlause)

    

    sleep(2000)

    

    button = "text"

    vlause = "微信一键登录"

    result = control_click(button, vlause)

    wechat_agree()

    close_windows2(button_arr)

    sleep(3000)

    button = "text"

    vlause = "跳过"

    result = control_click(button, vlause)



    

    button = "text"

    vlause = "书架"

    result = control_click(button, vlause)

}

// login()

// invite()



// 启动线程(1,1)

// 初始化() 

// close_windows2(button_arr)

// 翻页()



// 活动页面com.yincheng.njread.ui.detail.book.reader2.Reader2Activity































































