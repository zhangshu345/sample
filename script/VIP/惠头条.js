/*---------------------------------lib-------------------------------*/
left = 0;
top = 0;
right = device.width;
buttom = device.height;
w = device.width;
h = device.height;
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
} else {
    log("公共函数实例化失败,程序返回")
}
app_name = "惠头条"
var button_arr = [

    ['id', 'iv_close', 1], // 新人红包
    ['text', '忽略', 1],// 签到成功
    ['id', ' img_close', 1],
    ['text', '以后再说', 1],
    // ['text', '始终允许', 1],
    // ['text', '跳过', 1],// 绑定微信
    // ['id', 'b9_', 1], //关闭开启推送按钮
    // ['text', '点击领钱', 1], //新人红包
    // ['id', 'uy', 1], //看小视频 砸金蛋奖励后的弹窗
    // ['id', 'y3', 1], //看文章弹出的 赞赏
    // ['id', 'dcs_iv_close', 1], //签到关闭
    // ['id', 'tt_insert_dislike_icon_img', 1], //签到弹出广告
    // ['id', 'dcs_iv_close_ad', 1], //签到关闭2
    // ['text', '取消', 1], //更新
]



function 初始化() {
    while(true){
        while (true) {
            is_first1 = id("iv_back").findOne(1000)
            if (is_first1) {
                button = "id"
                vlause = "iv_back"
                result = control_click(button, vlause)
            } 

            if(!is_first1){
                break
            }
        }
        close_windows(button_arr)
        button = "text"
        vlause = "头条"
        result = control_click(button, vlause)
        sleep(2000)
        
        var current_Activity = currentActivity()
        console.log("当前活动页--->>"+current_Activity);
        if(current_Activity == "com.cashtoutiao.account.ui.main.MainTabActivity"){
            log("初始化完成")
            toast("初始化完成")
            break

        }

    }
    
}

/*---------------------------------login-------------------------------*/
// close_windows(button_arr)
// login()
function login() {
    button = "text"
    vlause = "我的"
    result = control_click(button, vlause)
    close_windows(button_arr)
    button = "textContains"
    vlause = "领1元红包"
    result = control_click(button, vlause)
    button = "id"
    vlause = "tv_bind_wx"// 绑定微信
    result = control_click(button, vlause)
    wechat_agree()
    初始化()

    // aa = text("本机号码一键登录").findOne(2000)
    // if(aa){
    //     button = "text"
    //     vlause = "本机号码一键登录"
    //     result = control_click(button, vlause)
    // }
    // bb = text("微信一键登录").findOne(2000)
    // if(bb){
    //     button = "text"
    //     vlause = "微信一键登录"
    //     result = control_click(button, vlause)
    //     wechat_agree()
    // }

    // close_windows(button_arr)
    // button = "text"
    // vlause = "点击领钱"
    // result = control_click(button, vlause)
    // wechat_agree()

}
/*---------------------------------login-------------------------------*/
/*--------------------------------sign------------------------------*/


function sign_work() {
    sign_reullt = read_cfg_j(app_name, "have_sign")
    if (sign_reullt == "yes") {
        toast("读取--已签到，跳过")
        log("读取--已签到，跳过")
        return true
    }
    button = "text"
    vlause = "任务中心"
    result = control_click(button, vlause)

    button = "id"
    vlause = "sign_btn_container"
    result = control_click(button, vlause)
    aa = text("继续阅读").findOne(1000)
    if(aa){
        button = "text"
        vlause = "继续阅读"
        result = control_click(button, vlause)
        write_cfg_j(app_name, "have_sign", "yes")
        初始化()

    }
    bb = text("签到成功").findOne(1000)
    if(bb){
        初始化()

    }
    // write_cfg_j(app_name, "have_sign", "yes")




    // aa = text("任务中心").findOne(1000)
    // if(aa){
    //     button = "text"
    //     vlause = "任务中心"
    //     result = control_click(button, vlause)
    // }


    // bb = text("任务").findOne(1000)
    // if(bb){
    //     button = "text"
    //     vlause = "任务"
    //     result = control_click(button, vlause)
    // }


    // button = "id"
    // vlause = "tasksign_gtop_dec"
    // sign_button = control_click(button, vlause)
    // if(sign_button){
    //     write_cfg_j(app_name, "have_sign", "yes")
    //     sleep(1000)
    //     close_windows(button_arr)
    //     初始化()
        
    // }else{
    //     write_cfg_j(app_name, "have_sign", "yes")
    // }


}
/*--------------------------------sign------------------------------*/

/*--------------------------------invite------------------------------*/
function invite(user_id) {
    user_id = user_id || "58XyTLw";
    // button = "text"
    // vlause = "同意并继续"
    // app_name = "刷视频"
    // index_page = "com.android.packageinstaller.permission.ui.GrantPermissionsActivity"
    // index_page2 = "com.boda.cvideo.controller.MainActivity"
    // inspect_app(app_name, index_page, button, vlause,index_page2)
    button = "text"
    vlause = "任务"
    result = control_click(button, vlause)
    close_windows(button_arr)
    button = "text"
    vlause = "去填写"
    result = control_click(button, vlause)
    if (!result) {
        toast("邀请失败")
        log("邀请失败")
        button = "text"
        vlause = "首页"
        result = control_click(button, vlause)
        button = "text"
        vlause = "推荐"
        result = control_click(button, vlause)
        log("初始化完成")
        toast("初始化完成")
        return
    }
    // 输入邀请
    button = 'textContains'
    vlause = '输入'
    control_input(button, vlause, user_id)

    button = "text"
    vlause = "立即提交"
    result = control_click(button, vlause)




}
/*--------------------------------invite------------------------------*/
/*--------------------------------video------------------------------*/












function find_img(img){

    code_num = 0  
    while(true){
        // log(code_num)
        code_num+=1
        sleep(50)
        if(code_num>5){
            log("未找到...")
            return false
        }
        var p=images.findImage(captureScreen(),img)
        if(p){
            log("找到")
            log("x:"+p.x+","+p.y)
            return p
        }

    }

}

function download_img(img_name) {
    file_path_root = files.getSdcardPath()
    filePath = file_path_root + "/" + img_name
    have_file = files.exists(filePath)
    log(have_file)
    if(have_file){
        return
    }
    console.log('下载的名字是'+img_name);
    var url = 'http:///yuedu.xiequbo.cn/imgs/' + img_name

    // 获取APP的名字
    // 在每个空格字符处进行分解。
    file_name_url = url.split("/");
    file_name = file_name_url[file_name_url.length - 1]
    console.log('要下载的' + file_name);
    file_path_root = files.getSdcardPath()

    filePath = file_path_root + "/" + file_name

    importClass('java.io.FileOutputStream');
    importClass('java.io.IOException');
    importClass('java.io.InputStream');
    importClass('java.net.MalformedURLException');
    importClass('java.net.URL');
    importClass('java.net.URLConnection');
    importClass('java.util.ArrayList');

    var url = new URL(url);
    var conn = url.openConnection(); //URLConnection
    var inStream = conn.getInputStream(); //InputStream
    var fs = new FileOutputStream(filePath); //FileOutputStream
    var connLength = conn.getContentLength(); //int
    var buffer = util.java.array('byte', 1024); //byte[]
    var byteSum = 0; //总共读取的文件大小
    var byteRead; //每次读取的byte数
    // log('要下载的文件大小=');
    // log(connLength);
    var threadId = threads.start(function () {
        while (1) {
            var 当前写入的文件大小 = byteSum;
            var progress = (当前写入的文件大小 / connLength) * 100;
            if (progress > 0.1) {
                var progress = parseInt(progress).toString() + '%';
                ui.run(function () {
                    // console.log(name + "下载进度", progress);
                    toast(name + "下载进度" + progress)
                    // w.progressNum.setText(progress);
                });
                if (当前写入的文件大小 >= connLength) {
                    break;
                }
            }
            sleep(1000);
        }
    });
    while ((byteRead = inStream.read(buffer)) != -1) {
        byteSum += byteRead;
        //当前时间
        currentTime = java.lang.System.currentTimeMillis();
        fs.write(buffer, 0, byteRead); //读取
    }
    threadId && threadId.isAlive() && threadId.interrupt();
    toastLog(img_name + '下载完成');
    // install_app(filePath, name)

}

// essay()


function essay() {
    log(11111)
    toast(11111)
    threads.start(function(){
        log(22222)
        toast(22222)
        star_ing = text("立即开始").findOne(1000)
        if(star_ing){
            star_ing.click()
            return
        }
    })
    //请求截图
    log(33333)
    toast(33333)
    if(!requestScreenCapture()){
        log(44444)
        toast(44444)
        toast("请求截图失败");
        log("请求截图失败");
        exit();
    } 
    log(555555)
    toast(555555)
    img_name = "read_box_money.jpg"
    download_img(img_name)
    file_path_root = files.getSdcardPath()
    log("file_path_root----->",file_path_root)
    var w = device.width;
    var h = device.height;
    num = 0
    have_read = 0
    while (true) {
        sleep(500)
        first_video_close = id('three_title').boundsInside(0, h * 0.2, w, h * 0.8).find()
        if(!first_video_close){
            back_button = id("iv_back").findOne(500)
            if(back_button){
                button = "id"
                vlause = "iv_back"
                result = control_click(button, vlause)
                sleep(500)
            }
        }
        log(first_video_close.length)
        for (j = 0; j < first_video_close.length; j++) {
            log(j)
            log(first_video_close[j].text())
            button_info = first_video_close[j]

            r = button_info.bounds()
            click(r.centerX(), r.centerY())
            sleep(1000)
            back_button_have = id("iv_back").findOne(1000)
            if(back_button_have){
                have_read +=1
                log("开始看"+have_read+"篇")
                toast("开始看"+have_read+"篇")



                filePath = file_path_root + "/" + img_name
                find_img_result = find_img(images.read(filePath))
                if(find_img_result){
                    log(find_img_result.x)
                    log(find_img_result.y)
                    click(find_img_result.x,find_img_result.y)
                    log("领红包")
                    toast("领红包")

                    button = "id"
                    vlause = "dsyt_tv_bind"
                    result = control_click(button, vlause)
                    sleep(5000)
                    nn = 0
                    while(true){
                        sleep(3000)
                        nn +=1
                        if(nn>20){
                            log("广告异常关闭")
                            toast("广告异常关闭")
                            break
                        }
                        aa = id("time_now").findOne(500)
                        if(aa){
                            log(aa.text())
                            // 卡机
                            if(aa.text() ==0){
                                sleep(3000)
                                break
                            }
                        }else{
                            break
                        }
                    }
                    sleep(2000)
                    close_num = 0
                    while(true){
                        close_num+=1

                        back_button = id("cancle").findOne(500)
                        if(back_button){
                            button = "id"
                            vlause = "cancle"
                            result = control_click(button, vlause)
                        }
                        back_button = id("tt_video_ad_close").findOne(500)
                        if(back_button){
                            button = "id"
                            vlause = "tt_video_ad_close"
                            result = control_click(button, vlause)
                        }

                        sleep(500)
                        var current_Activity = currentActivity()
                        if(current_Activity == "com.bang.redbox.ui.box.activity.NewsDetailZJActivity"){
                            break
                        }
                        
                        log("尝试关闭广告次数:",close_num)
                        
                    }
                } 
                
                wechat_num = 0
                while(true){
                    wechat_num +=1
                    if(wechat_num>10){
                        button = "id"
                        vlause = "iv_back"
                        result = control_click(button, vlause)
                        sleep(1000)
                        break

                    }
                    sleep(200)
                    var current_Activity = currentActivity()
                    if(current_Activity == "com.android.packageinstaller.PackageInstallerActivity" || current_Activity == "com.qiku.android.app.QKAlertDialog"){
                        back()
                    }

                    swipe(w * 0.6 - random(10, 30), h * 0.6 + random(10, 20), w * 0.6 + random(50, 80), h * 0.2 + random(10, 30), random(220, 235))
                    // sleep(500)
                    var c = random(3000, 5000)
                    sleep(c)
                    jubao_button = text("举报").boundsInside(0, 0, device.width, device.height*0.8).findOne(1000)
                    if(jubao_button){
                        button = "id"
                        vlause = "iv_back"
                        result = control_click(button, vlause)
                        sleep(1000)
                        break
                    }
                    
                }
            }
        }

        swipe(w * 0.6 - random(10, 30), h * 0.6 + random(10, 20), w * 0.6 + random(50, 80), h * 0.2 + random(10, 30), random(220, 235))
        
        sleep(1000)
        var current_Activity = currentActivity()
        if(current_Activity == "com.android.packageinstaller.PackageInstallerActivity" || current_Activity == "com.qiku.android.app.QKAlertDialog"){
            back()
        }

    }
}







/*--------------------------------video------------------------------*/
/*---------------------------------star-------------------------------*/
// is_login()
function is_login() {
    login_result = read_cfg_j(app_name,"have_login")
    if(login_result=="yes"){
    	toast("读取--已登录")
        log("读取--已登录")
        return true
    }
    close_windows(button_arr)
    result = textContains("微信登录").findOne(3000)
    if (result) {
        return false
    }
    button = "text"
    vlause = "我的"
    result = control_click(button, vlause)
    close_windows(button_arr)

    // result = text("我的金币").findOne(3000)
    // if(result){
    //     write_cfg_j(app_name,"have_login","yes")
    //     return true
    // }
    result = textContains("惠友").findOne(2000)
    if(result){
        return false
    }

    // result = text("微信一键登录").findOne(2000)
    // if(result){
    //     return false
    // }

    //  else {
    //     write_cfg_j(app_name,"have_login","yes")
    //     return true
    // }

}







// write_cfg_j("惠头条", "have_sign", "no")


// 启动线程(2,1)
function 启动线程(type, sign) {

    // button = "text"
    // vlause = "我知道了"
    // index_page = "com.cashtoutiao.account.ui.main.MainTabActivity"
    // inspect_app(app_name, index_page, button, vlause)

    
    // close_windows(button_arr)
    //// 惠头条不支持登录
    // result = is_login()
    
    // if (!result) {

    //     log("进行登录操作")
    //     toast("进行登录操作")
    //     login()
    // }
    // close_windows(button_arr)

    var istype = type || 2;
    var issign = sign || 1;
    // // sign_work()
    // // if (issign == 1) {
    // //     log("签到--子任务中签")
    // //     toast("签到--子任务中签")
    // //     sign_work()

    // // }
    // // 文章
    // if (istype == 1) {
    //     // 初始化()
    //     // essay()
    // }
    if (istype == 2) {
        初始化()
        while(true){
            button = "text"
            vlause = "视频"
            result = control_click(button, vlause,0,device.height*0.5,device.width,device.height)
            close_windows(button_arr)
            button = "text"
            vlause = "小视频"
            result = control_click(button, vlause)
            button = "id"
            vlause = "iv_like"
            result_list = control_have(button, vlause)  
            x = result_list[0]
            y = result_list[1]
            log(x,",",y)
            if(x!=-1 && y!=-1){
                break
            }
            close_windows(button_arr)
        }
        aa = text("我知道了").findOne(500)
        if(aa){
            while(true){
                button = "text"
                vlause = "我知道了"
                result = control_click(button, vlause)
                bb = text("我知道了").findOne(500)
                if(!bb){
                    break
                }
            }


        }

        while(true){
            // button = "id"
            // vlause = "iv_like"
            // result = control_click(button, vlause)
            xx = random(10, 30)
            yy = random(10, 30)
            click(x-xx,y-yy)
            var current_Activity = currentActivity()
            console.log("当前活动页--->>"+current_Activity);
            if(current_Activity!= "com.cashtoutiao.account.ui.main.MainTabActivity"){
                break
            }
        
        }
        watch_video()
    }
}


// login()
// close_windows(button_arr)
// sign_work()
// invite()



// watch_video()   
// click(device.width*0.075,device.height*0.06)

function watch_video(){
    while(true){
        // var c = random(5000, 8000)
        var c = random(10000, 15000)
        sleep(c)
        swipe(w * 0.6 - random(10, 30), h * 0.6 + random(10, 20), w * 0.6 + random(50, 80), h * 0.2 + random(10, 30), random(220, 235))
    }
    
}