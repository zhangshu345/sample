
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
app_name = "佳人记账"

// 启动线程(2,1)
function 启动线程(type, sign) {


    var istype = type || 2;
    var issign = sign || 1;
    button = "text"
    vlause = "我知道了"
    index_page = "com.bytedance.sdk.openadsdk.activity.TTDelegateActivity"
    index_page2 = "com.houjiajia.jiebill"
    index_page3="com.houjiajia.jiebill.ui.activity.MainActivity"
    inspect_app(app_name,index_page,button,vlause,index_page2,index_page3)
    while(true){
        button = "text"
        vlause = "任务"
        result = control_click(button, vlause)  
        log(result)
        button = "text"
        vlause = "每日签到"
        result_list = control_have(button, vlause)  
        x = result_list[0]
        y = result_list[1]
        log(x)
        log(y)
        if(x!=-1 && y!= -1){
            break
        }
    }
    while(true){
        task2()
        task1()
        task3()
    }
    
}


function task1(){
    // 签到
    button = "id"
    vlause = "cv_sign"
    result = control_click(button, vlause)  
    sleep(5000)
    while(true){
        close_buttron = id("tt_video_ad_close").findOne(500)
        if(close_buttron){
            button = "id"
            vlause = "tt_video_ad_close"
            result = control_click(button, vlause)  
        }
        sleep(500)
        var current_Activity = currentActivity()
        if(current_Activity == "com.android.packageinstaller.PackageInstallerActivity" || current_Activity == "com.qiku.android.app.QKAlertDialog"){
            back()
        }
        sleep(3000)
        log("激励视频观看中...")
        toast("激励视频观看中...")
        var current_Activity = currentActivity()
        // log(current_Activity)
        if(current_Activity.indexOf("houjiajia")>-1){
            break
        }
    }
}
// task1()

function task2(){
    // 全屏广告
    button = "id"
    vlause = "cv_fullvideo"
    result = control_click(button, vlause)  
    sleep(5000)
    while(true){
        close_buttron = id("tt_video_ad_close").findOne(500)
        if(close_buttron){
            button = "id"
            vlause = "tt_video_ad_close"
            result = control_click(button, vlause)  
        }
        sleep(500)
        var current_Activity = currentActivity()
        if(current_Activity == "com.android.packageinstaller.PackageInstallerActivity" || current_Activity == "com.qiku.android.app.QKAlertDialog"){
            back()
        }
        sleep(3000)
        log("全屏视频观看中...")
        toast("全屏视频观看中...")
        var current_Activity = currentActivity()
        // log(current_Activity)
        if(current_Activity.indexOf("houjiajia")>-1){
            break
        }
    }
}
// task2()

function task3(){

    button = "id"
    vlause = "cv_seevideo"
    result = control_click(button, vlause)
    watch_num = 0
    while (true) {
        watch_num+=1

        log("当前观看的次数",watch_num)
        toast("当前观看的次数"+watch_num)

        var c = random(10000, 15000)
        // var c = random(3000, 5000)
        sleep(c)
        if(watch_num>30){
            while(true){
                button = "id"
                vlause = "im_close"
                result = control_click(button, vlause)  

                button = "text"
                vlause = "每日签到"
                result_list = control_have(button, vlause)  
                x = result_list[0]
                y = result_list[1]
                log(x)
                log(y)
                if(x!=-1 && y!= -1){
                    log("结束看小视频")
                    toast("结束看小视频")
                    return
                }
                close_buttron = id("tt_video_ad_close").findOne(500)
                if(close_buttron){
                    button = "id"
                    vlause = "tt_video_ad_close"
                    result = control_click(button, vlause)  
                }

            }

        }
        close_buttron = id("tt_video_ad_close").findOne(500)
        if(close_buttron){
            button = "id"
            vlause = "tt_video_ad_close"
            result = control_click(button, vlause)  
        }
        var w = device.width;
        var h = device.height;
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.3 + random(10, 30), random(220, 235))
    
    }  
}
// task2()
// task1()
// task3()
// while(true){
//     task2()
//     task1()
//     task3()
// }

