// 启动线程(2, 0)

function 弹窗() {
    // 新人红包弹窗
    var 新人红包 = id("img_close").exists();
    if (新人红包) {
        log("弹窗---新人红包按钮存在关闭")
        var button_info = id("img_close").findOne();
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY() + 5);
    }
    // 返回按钮
    var 返回按钮 = id("img_back").exists();
    if (返回按钮) {
        log("弹窗---存在返回按钮")
        var button_info = id("img_back").findOne();
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY() + 5);
    }
    // 取消推送
    var 取消按钮 = text("取消").exists();
    if (取消按钮) {
        log("弹窗---存在取消推送按钮")
        var button_info = text("取消").findOne();
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY() + 5);
    }
    // APP卡顿提示
    if (text("关闭应用").exists()) {
        if (text("等待").exists()){
            log('弹窗函数---检测到系统级弹窗，开始关闭操作...')
            text("等待").findOne(3000).click();
        }  
    }
}

function 初始化视频() {
    log("初始化视频....")
    num = 0
    while (true) {
        num += 1
        if (num > 20) {
            console.log("初始化视频---1失败！！！");
            toast("初始化视频---1失败！！！")
            break
        }
        sleep(500)
        var 视频按钮 = text("视频").findOne(500)
        if (视频按钮) {
            console.log("初始化视频---开始点视频按钮");
            var xy_info = 视频按钮.bounds()
            click(xy_info.centerX(), xy_info.centerY());
            var 视频按钮 = text("视频").findOne(500)
            if (视频按钮.selected()) {
                console.log("初始化视频---选中视频");
                var 推荐按钮 = text("推荐").boundsInside(0, 0, device.width, device.width / 4).findOne(2000)
                if (推荐按钮) {
                    var xy_info2 = 推荐按钮.bounds()
                    click(xy_info2.centerX() + 5, xy_info2.centerY());
                    sleep(500)
                    console.log("初始化视频---初始化完成");
                    return
                }
            }
        } else {
            console.log("初始化视频---2失败！！！");
            toast("初始化视频---2失败！！！")
            break
        }
    }
}

function 下滑() {
    sleep(500)
    var w = device.width;
    var h = device.height;
    弹窗()
    swipe(
        w * 0.6 - random(10, 30),
        h * 0.8 + random(10, 20),
        w * 0.6 + random(50, 80),
        h * 0.3 + random(10, 30),
        random(220, 235))
}

function 视频() {
    look_num = 0
    while (true) {
        look_num += 1
        sleep(3000)
        console.log("视频---检测播放按钮");
        播放按钮 = id("iv_play").boundsInside(0, device.width / 4, device.width, device.width - device.width / 5).findOne(1000);
        console.log("播放按钮" + 播放按钮);


        标题播放按钮 = id("tv_video_title").boundsInside(0, 300, device.width, device.width - device.width / 5).findOne(1000);
        console.log("标题播放按钮" + 标题播放按钮);
        if (播放按钮) {
            console.log("视频---找到播放按钮11111");
            var xy_info = 播放按钮.bounds()
            console.log(xy_info.centerX());
            console.log(xy_info.centerY());
            弹窗()
            click(xy_info.centerX(), xy_info.centerY());
            console.log("11111点击完成");

        } else if (标题播放按钮) {
            console.log("视频---找到播放按钮22222");
            var xy_info = 标题播放按钮.bounds()
            弹窗()
            click(xy_info.centerX(), xy_info.centerY());
        } else {
            console.log("点击播放失败");
            var 视频按钮 = text("视频").findOne(500)
            if (视频按钮) {
                console.log("视频---尝试刷新中");
                var xy_info2 = 视频按钮.bounds()
                弹窗()
                click(xy_info2.centerX(), xy_info2.centerY());
                sleep(5000)
                continue
            }
        }

        // var c = random(8000, 12000)
        var c = random(45000, 70000)
        sleep(c)
        num = 1
        while (true) {
            num += 1
            if (num > 10) {
                console.log("视频---视频返回失败");
                break
            }
            返回按钮 = id("img_back").findOne(1000);
            if (返回按钮) {
                // console.log("视频---back退出");
                // back()
                弹窗()
            } else {
                console.log("视频---成功退出视频");
                break
            }
        }

        // 看5-10次随机刷新视频
        var mum = random(5, 10)
        if (look_num > mum) {
            look_num = 0
            var 视频按钮 = text("视频").findOne(500)
            if (视频按钮) {
                console.log("视频---随机刷新中");
                var xy_info2 = 视频按钮.bounds()
                弹窗()
                click(xy_info2.centerX(), xy_info2.centerY());
                sleep(5000)
                continue
            } else {
                console.log("视频---刷新异常");
            }
        }
        下滑()
    }
}






var w = device.width;
var h = device.height;
left = 0;
top = 0;
right = device.width;
buttom = device.height / 2;

function 初始化() {
    toast("开始初始化操作")
    var num = 0
    while (true) {
        num += 1
        if (num > 20) {
            console.log("初始化失败....");
            return
        }
        sleep(500)
        弹窗()
        // 点击视频按钮
        if (text("首页").exists()) {
            首页按钮控件 = text("首页").findOne()
            if (!首页按钮控件.selected()) {
                console.log("开始点击首页按钮");
                首页按钮控件 = text("首页").findOne()
                var xy_info = 首页按钮控件.bounds()
                click(xy_info.centerX(), xy_info.centerY());
            } else {
                console.log("初始化完成");
                return
            }
        }
    }
}


function 启动线程(type, sign) {
    var istype = type || 2;
    var issign = sign || 0;


    if (istype == 1) {
        console.log("暂不支持文章操作");
    }
    if (issign == 1) {
        console.log("暂不支持签到操作");
    }
    if (istype == 2) {
        初始化()
        初始化视频()
        视频()
    }
}


//---------------------------------------------//
// 指定控件输入
function control_input(button, vlause,num, left, top, right, buttom) {
    // 功能---点击控件
    // 输入---参数1:元素[id、text 、desc、className],参数2:元素值,剩余参数:left, top, right, buttom
    // 默认后四位为当前屏幕
    // 返回---真假
    var result
    var button_info
    left = left || 0;
    top = top || 0;
    right = buttom || device.width;
    buttom = buttom || device.height;
    console.log(button);
    console.log(vlause);
    console.log(left, top, right, buttom);

    sleep(200)
    if (button == 'id') {
        button_info = id(vlause).boundsInside(left, top, right, buttom).findOne(3000);
    } else if (button == 'text') {
        button_info = text(vlause).boundsInside(left, top, right, buttom).findOne(3000);
    } else if (button == 'desc') {
        button_info = desc(vlause).boundsInside(left, top, right, buttom).findOne(3000);
    } else if (button == 'className') {
        button_info = desc(vlause).boundsInside(left, top, right, buttom).findOne(3000);
    } else {
        console.log("传参错误");
        result = false
    }
    if (button_info) {
        result = button_info.setText(num)
        return result
    } else {
        return false
    }

}
function inspect_app(app_name,index_page,button, vlause){
    for (var i = 0; i < 30; i++) {
        sleep(1000)
        // var 当前APP包名 = currentPackage()
        var 当前APP包名 = getPackageName(app_name)
        if (currentPackage() == 当前APP包名) {
            toast("检测当前APP为"+app_name)
            console.log("检测当前APP为"+app_name);
            sleep(1000)
            break
        }
        toast("检测当前APP中....")
        console.log("检测当前APP中");
        if (i > 20) {
            toast("检测"+app_name +"APP失败....")
            console.log("检测"+app_name +"APP失败....");
            return false
        }
    }

    // APP授权
    if(button){
        result = control_click(button, vlause)  
    }
    

    while(true){
        is_first = text("始终允许").findOne(3000)
        if (is_first) {
            toast("允许授权")
            console.log("允许授权");
            is_first.click()
        }else{
            break
        }
    }


    for (var i = 0; i < 30; i++) {
        sleep(1000)
        var current_Activity = currentActivity()
        if (current_Activity == "com.weishang.wxrd.activity.HomeActivity"){
            console.log("首页检测成功1");
            toast("首页检测成功1")
            return true
        }
        if (current_Activity == index_page) {
            console.log("首页检测成功");
            toast("首页检测成功")
            return true
        }
        if (i > 20) {
            toast("首页检测失败")
            console.log("首页检测失败");
            return false
        }
    }
}

// 点击元素
function control_click(button, vlause, left, top, right, buttom) {
    // 功能---点击控件
    // 输入---参数1:元素[id、text 、desc、className],参数2:元素值,剩余参数:left, top, right, buttom
    // 默认后四位为当前屏幕
    // 返回---真假
    var result
    var button_info
    left = left || 0;
    top = top || 0;
    right = buttom || device.width;
    buttom = buttom || device.height;
    console.log(button);
    console.log(vlause);
    console.log(left, top, right, buttom);

    sleep(200)
    if (button == 'id') {
        button_info = id(vlause).boundsInside(left, top, right, buttom).findOne(3000);
    } else if (button == 'text') {
        button_info = text(vlause).boundsInside(left, top, right, buttom).findOne(3000);
    } else if (button == 'desc') {
        button_info = desc(vlause).boundsInside(left, top, right, buttom).findOne(3000);
    } else if (button == 'className') {
        button_info = desc(vlause).boundsInside(left, top, right, buttom).findOne(3000);
    } else {
        console.log("传参错误");
        result = false
    }
    if (button_info) {
        var xy_info = button_info.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        return true
    } else {
        return false
    }

}

function wechat_agree(){
    width = device.width;
    height = device.height;
    num = 0
    while(true){
        sleep(1000)
        num += 1
        current_page = currentPackage()
        if(current_page == "com.tencent.mm"){
            console.log("微信登录初始化完成");
            toast("微信登录初始化完成")
            break
        } 
        if(num>15){
            console.log("微信授权失败");
            toast("微信授权失败")
            return false
        }
    }
    // 同意微信授权
    num = 0
    while(true){
        num +=1
        sleep(2000)
        click(width*0.5,height*0.6)
        current_page = currentPackage()
        if(current_page != "com.tencent.mm"){
            console.log("微信授权成功");
            toast("微信授权成功")
            break
        } 
        if(num>15){
            console.log("微信授权失败2");
            toast("微信授权失败2")
            return false
        }

    }

}


function invite(user_id){
    user_id = user_id || "4662385";
    button = "text"
    vlause = "同意"
    app_name = "趣看天下"
    index_page = "com.yanhui.qktx.activity.NewMainActivity"
    inspect_app(app_name,index_page,button,vlause)

        // 首页新人红包   三重奖励
        button = "id"
        vlause = "img_close"
        result = control_click(button, vlause)  
    // 取消推送
    button = "text"
    vlause = "取消"
    result = control_click(button, vlause)  
    // 进入个人首页
    button = "text"
    vlause = "我的"
    result = control_click(button, vlause)  
    // 输入邀请码  按钮 
    button = "text"
    vlause = "输入邀请码"
    result = control_click(button, vlause)  
    
    // 输入验证码
    button = 'text'
    vlause = '请输入邀请码 （选填项）'
    result = control_input(button, vlause,user_id)
    if(!result){
        toast("邀请失败")
        log("邀请失败")
        return
    }
    // 开
    var w = device.width;
    var h = device.height;
    click(w*0.5,h*0.5)
    result = text("提交成功").findOne(3000)
    if(result){
        log("邀请成功")
        toast("邀请成功")
    }


}
function login(){
    button = "text"
    vlause = "同意"
    app_name = "趣看天下"
    index_page = "com.yanhui.qktx.activity.NewMainActivity"
    inspect_app(app_name,index_page,button,vlause)

        
    // 更新
    button = "text"
    vlause = "以后再说"
    result = control_click(button, vlause)  

        // 首页新人红包
        button = "id"
        vlause = "img_close"
        result = control_click(button, vlause)  
    // 取消推送
    button = "text"
    vlause = "取消"
    result = control_click(button, vlause)  
    // 进入个人首页
    button = "text"
    vlause = "我的"
    result = control_click(button, vlause)  
    // 登录
    button = "id"
    vlause = "tv_login"
    result = control_click(button, vlause)  
    if(!result){
        console.log("已经登陆");
        toast("已经登录")
        return
    }

    // 微信一键登录
    button = "id"
    vlause = "login_wechat_login_bt"
    result = control_click(button, vlause)  

    // 微信授权 
    wechat_agree()
    log("登录成功")
    toast("登陆成功")
}
// login()

// invite()

