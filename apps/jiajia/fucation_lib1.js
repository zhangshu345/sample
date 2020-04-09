
// 1控件点击 传入button, vlause 成功返回真，失败返回假
function control_click(button, vlause, left, top, right, buttom) {
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
        button_info = className(vlause).boundsInside(left, top, right, buttom).findOne(3000);
     } else if (button == 'textContains') {
        button_info = textContains(vlause).boundsInside(left, top, right, buttom).findOne(3000);
    } else {
        console.log("点击传参错误"+">>"+button+">>"+vlause);
        toast("点击传参错误"+">>"+button+">>"+vlause)
        result = false

    }
    if (button_info) {
        var xy_info = button_info.bounds()
        if (  0 < xy_info.centerX() && xy_info.centerX() < device.width 
        	&&0 < xy_info.centerY() && xy_info.centerY() < device.height){
            click(xy_info.centerX(), xy_info.centerY());
        	return true
        }else{
            console.log("点击控件超出范围"+">>"+button+">>"+vlause+">>"+xy_info.centerX()+">>"+xy_info.centerY());
            toast("点击控件超出范围"+">>"+button+">>"+vlause+">>"+xy_info.centerX()+">>"+xy_info.centerY())
            return false
        }
    } else {
        console.log("点击查找失败"+">>"+button+">>"+vlause);
        toast("点击查找失败"+">>"+button+">>"+vlause)
        return false
    }
}
// // 使用方法
// button = "id"
// vlause = "btn_read_book_hint2"
// result = control_click(button, vlause)

// button = "text"
// vlause = "哈哈哈"
// result = control_click(button, vlause)


// 2查找控件 存在返回XY坐标，失败返回XY坐标-1-1
function control_have(button, vlause, left, top, right, buttom) {

    var result
    left = left || 0;
    top = top || 0;
    right = buttom || device.width;
    buttom = buttom || device.height;
    if (button == 'id') {
        result = id(vlause).boundsInside(left, top, right, buttom).findOne(3000)
    } else if (button == 'text') {
        result = text(vlause).boundsInside(left, top, right, buttom).findOne(3000)
    } else if (button == 'desc') {
        result = desc(vlause).boundsInside(left, top, right, buttom).findOne(3000)
    } else if (button == 'className') {
        result = className(vlause).boundsInside(left, top, right, buttom).findOne(3000)
    } else if (button == 'textContains') {
        result = textContains(vlause).boundsInside(left, top, right, buttom).findOne(3000)
    } else if (button == 'desc') {
        result = desc(vlause).boundsInside(left, top, right, buttom).findOne(3000)
    } else {
        console.log("查找参数错误");
        toast("查找参数错误")
        result[-1,-1] 
    }
    if (result) {
        var xy_info = result.bounds()
        if (  0 < xy_info.centerX() && xy_info.centerX() < device.width 
        	&&0 < xy_info.centerY() && xy_info.centerY() < device.height){

            return [xy_info.centerX(),xy_info.centerY()]
        }else{
            console.log("查找控件超出范围");
            toast("查找控件超出范围")
            return[-1,-1]
        }
    } else {
        console.log("查找控件失败1");
        toast("查找控件失败1")
        return [-1,-1]
    }
}
// 使用方法 失败返回 x = -1 y = -1 否则 x>0 y>0
// var x,y
// button = "text"
// vlause = "书架"
// result_list = control_have(button, vlause)  
// x = result_list[0]
// y = result_list[1]

// if(x>0 && y>0){
//     console.log("查找成功");
//     console.log("查找成功");
//     log(x)
//     log(y)
// }else{
//     console.log("查找失败");
//     console.log("查找失败");
//     log(x)
//     log(y)
// }

// 3弹窗关闭
function close_windows(button_arr) {
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
                //火山特殊处理
                if(vlause =="图片"){
                    button_info = text(vlause).boundsInside(60, 300, 650, 1200).findOne(50);
                }else{
                    button_info = text(vlause).boundsInside(left, top, right, buttom).findOne(50);
                }
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
                        // 火山特殊处理
                        if(vlause =="图片"){
                            r = xy_info
                            click( r.right+20,r.top-50)
                        }else{
                            click(xy_info.centerX(), xy_info.centerY());
                        }

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

// 使用方法 第三个参数 1 为发现改控件 点击  2  为 发现该控件 按 返回按钮

// let button_arr = [
//     ['id', 'btn_privacy_action',1],
//     ['id', 'close',1],
//     ['text', '我知道了',1],
//     ['id', 'pay_left_btn',1],
//     ['text', '日常任务',2],
//     ['text', '立即提现',2],
//     ['text', '我的收益',2],
// ]
// close_windows(button_arr)

// 4控件输入
function control_input(button, vlause,num, left, top, right, buttom) {
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
    } else if (button == 'textContains') {
        button_info = textContains(vlause).boundsInside(left, top, right, buttom).findOne(3000);
    } else if (button == 'className') {
        button_info = className(vlause).boundsInside(left, top, right, buttom).findOne(3000);
    } else {
        console.log("控件输入传参错误");
        toast("控件输入传参错误")
        result = false
    }
    if (button_info) {
        var xy_info = button_info.bounds()
        
        if (  0 < xy_info.centerX() && xy_info.centerX() < device.width 
        	&&0 < xy_info.centerY() && xy_info.centerY() < device.height){
                log("控件输入>>"+button+">>"+ vlause+">>"+num)
                toast("控件输入>>"+button+">>"+ vlause+">>"+num)
                result = button_info.setText(num)
        	return true
        }
    } else {
        log("控件输入>>"+button+">>"+ vlause+">>"+"超出范围")
        toast("控件输入>>"+button+">>"+ vlause+">>"+"超出范围")
        return false
    }
}

// // 使用方法
// button = 'id'
// vlause = 'invitation_code'
// user_id = '3758809222'
// control_input(button, vlause,user_id)

// 5获取手机验证码
function input_phone(button,vlause){
    left = 0;
    top = 0;
    right = device.width;
    buttom = device.height;
    var telephoneservice = context.getSystemService("phone")
    var phone = telephoneservice.getLine1Number()
    console.log("手机号" + phone);
    // result = control_have(button, vlause)

    if (button == 'id') {
        result = id(vlause).boundsInside(left, top, right, buttom).findOne(3000)
    } else if (button == 'text') {
        result = text(vlause).boundsInside(left, top, right, buttom).findOne(3000)
    } else if (button == 'desc') {
        result = desc(vlause).boundsInside(left, top, right, buttom).findOne(3000)
    } else if (button == 'className') {
        result = className(vlause).boundsInside(left, top, right, buttom).findOne(3000)
    } else if (button == 'textContains') {
        result = textContains(vlause).boundsInside(left, top, right, buttom).findOne(3000)
    } else {
        console.log("查找参数错误");
        toast("查找参数错误")
    }

    if(result){
        phone = phone.substring(3)
        reult_ = result.setText(phone)
    }
}

function get_phone_code(app_name,reg){
    contet = ""
    packname = ""
    code = ""
    //--------------------------*******************--------------------------//
    var thread = threads.start(function (app_name) {
        events.observeNotification();
        events.onNotification(function (notification) {
            printNotification(notification);
        });
        toast("监听中，请在日志中查看记录的通知及其内容");
        function printNotification(notification) {
            log("应用包名: " + notification.getPackageName())
            log("通知文本: " + notification.getText());
            log("通知优先级: " + notification.priority);
            log("通知目录: " + notification.category);
            log("通知时间: " + new Date(notification.when));
            log("通知数: " + notification.number);
            log("通知摘要: " + notification.tickerText);
            if(notification.getText()){
                contet = notification.getText()
            } 
            if (notification.tickerText){
                contet = notification.tickerText
            }
            packname = notification.getPackageName()
        }
    });
    
    num = 0
    while (true) {
        num +=1 
        if(num > 20){
            toast("监听时长1分钟,接受短信失败,退出自动登录")
            console.log("监听时长1分钟,接受短信失败,退出自动登录"); 
            thread.interrupt();
            return
        } 
        log("短信监听中...");
        sleep(2000);
        if(!contet){
            continue
        }
        if(contet.search(app_name)!=-1){
        // if(contet.search(app_name)!=-1 && packname == "com.cps.android.mms"){
            console.log("找到对应的短信");
            code =contet.match(reg)[0]
            toast("停止监听")
            console.log("停止监听");
            thread.interrupt();
            break
        } 
    
    }
    toast("接受的验证码是:"+code)
    console.log("接受的验证码是:"+code);
    return code
    
}

// // 使用方法
// // 输入手机号 的控件
// button = "id"
// vlause = "setting_tv_input"
// input_phone(button,vlause)

// //// 获取验证码按钮
// button = "id"
// vlause = "btn_read_book_hint2"
// result = control_click(button, vlause)

// // 查看验证码
// //  被包含的名称
// app_name = "趣看视频"
// //  验证码正则
// reg = /\d{4}/ig
// code = get_phone_code(app_name,reg)
// console.log(code);

// 
// 6点击A控件 寻找B控件

function click_a_to_b(button, vlause, button2, vlause2, left, top, right, buttom) {
    var result
    var button_info
    left = left || 0;
    top = top || 0;
    right = buttom || device.width;
    buttom = buttom || device.height;
    sleep(200)
    if (button == 'id') {
        button_info = id(vlause).boundsInside(left, top, right, buttom).findOne(3000);
    } else if (button == 'text') {
        button_info = text(vlause).boundsInside(left, top, right, buttom).findOne(3000);
    } else if (button == 'desc') {
        button_info = desc(vlause).boundsInside(left, top, right, buttom).findOne(3000);
    } else if (button == 'className') {
        button_info = className(vlause).boundsInside(left, top, right, buttom).findOne(3000);
    } else if (button == 'textContains') {
        button_info = textContains(vlause).boundsInside(left, top, right, buttom).findOne(3000);
    } else {
        log("点击目标失败1--" + button + ">>" + vlause)
        toast("点击目标失败1--" + button + ">>" + vlause)
        result = false
    }
    if (button_info) {
        var xy_info = button_info.bounds()
        if (0 < xy_info.centerX() && xy_info.centerX() < device.width &&
            0 < xy_info.centerY() && xy_info.centerY() < device.height) {
            click(xy_info.centerX(), xy_info.centerY());
        } else {
            log("点击目标失败2--" + button + ">>" + vlause)
            toast("点击目标失败2--" + button + ">>" + vlause)
            return false
        }

    } else {
        log("点击目标失败3--" + button + ">>" + vlause)
        toast("点击目标失败3--" + button + ">>" + vlause)
        return false
    }

    if (button2 == 'id') {
        button_info = id(vlause2).boundsInside(left, top, right, buttom).findOne(3000);
    } else if (button2 == 'text') {
        button_info = text(vlause2).boundsInside(left, top, right, buttom).findOne(3000);
    } else if (button2 == 'desc') {
        button_info = desc(vlause2).boundsInside(left, top, right, buttom).findOne(3000);
    } else if (button2 == 'className') {
        button_info = className(vlause2).boundsInside(left, top, right, buttom).findOne(3000);
    } else if (button2 == 'textContains') {
        button_info = textContains(vlause2).boundsInside(left, top, right, buttom).findOne(3000);
    } else {
        log("查找目标失败1--" + button2 + ">>" + vlause2)
        toast("查找目标失败1--" + button2 + ">>" + vlause2)
        return false
    }
    if (button_info) {
        var xy_info = button_info.bounds()
        if (0 < xy_info.centerX() && xy_info.centerX() < device.width &&
            0 < xy_info.centerY() && xy_info.centerY() < device.height) {
            return true
        } else {
            log("查找目标失败2--" + button2 + ">>" + vlause2)
            toast("查找目标失败2--" + button2 + ">>" + vlause2)
            return false
        }

    } else {
        log("查找目标失败3--" + button2 + ">>" + vlause2)
        toast("查找目标失败3--" + button2 + ">>" + vlause2)
        return false
    }
}


// // 点击目标控件
// button1 = "text"
// vlause1 = "nyCT94PZimmE71vAAAAAElFTkSuQmCC"
// // 寻找目标控件
// button2 = "text"
// vlause2 = "我的收益"
// result = click_a_to_b(button1, vlause1, button2, vlause2)
// log("result>>>"+result)

// 7首页检测
function inspect_app(app_name, index_page, button, vlause,index_page2,index_page3) {
    index_page2 = index_page2 || "";
    for (var i = 0; i < 30; i++) {
        sleep(1000)
        var 当前APP包名 = currentPackage()
        log("要打开的APP是"+getPackageName(app_name))
        // var 当前APP包名 = getPackageName(app_name)
        //com.android.packageinstaller 是什么？
        if (currentPackage() == getPackageName(app_name) || currentPackage() =="com.android.packageinstaller") {
            toast("检测当前APP为" + app_name)
            console.log("检测当前APP为" + app_name);
            sleep(1000)
            break
        }else{
            toast("错误的APP包名"+当前APP包名)
            log("错误的APP包名"+当前APP包名)
        }
        toast("检测当前APP中....")
        console.log("检测当前APP中");
        if (i > 20) {
            toast("检测" + app_name + "APP失败....")
            console.log("检测" + app_name + "APP失败....");
            return false
        }
    }
    while (true) {
        is_first = text("始终允许").findOne(500)
        if (is_first) {
            toast("允许授权")
            console.log("允许授权");
            is_first.click()
        } else {
            break
        }
    }

    // APP授权
    if (button) {
        result = control_click(button, vlause)
        while (true) {
            is_first = text("始终允许").findOne(2000)
            if (is_first) {
                toast("允许授权")
                console.log("允许授权");
                is_first.click()
            } else {
                break
            }
        }
    }


    for (var i = 0; i < 30; i++) {
        sleep(1000)
        var current_Activity = currentActivity()
        console.log("当前活动页--->>"+current_Activity);
        
        // if (current_Activity == "com.weishang.wxrd.activity.HomeActivity") {
        //     console.log("首页检测成功1");
        //     toast("首页检测成功1")
        //     return true
        // }
        if (current_Activity == index_page) {
            console.log("首页检测成功");
            toast("首页检测成功")
            return true
        }
        if (current_Activity == index_page2) {
            console.log("首页检测成功");
            toast("首页检测成功")
            return true
        }
        if (current_Activity == index_page3) {
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
    while (true) {
        is_first = text("始终允许").findOne(1000)
        if (is_first) {
            toast("允许授权")
            console.log("允许授权");
            is_first.click()
        } else {
            break
        }
    }

}


// // 使用方法
// button = "text"
// vlause = "跳过"
// app_name = "快手极速版"
// index_page = "com.yxcorp.gifshow.HomeActivity"
// inspect_app(app_name, index_page, button, vlause)
// close_windows(button_arr)

// 8 键盘输出验证码

function input_key(string2){
    sleep(2000)
    width = device.width;
    console.log(width);
    height = device.height;
    console.log(height);
    var string2Result = string2.split('')
    console.log(string2Result);
    for(i = 0; i < string2Result.length; i++) {
        j = string2Result[i]
        if(j=="1"){x =width*0.3,y= height*0.7}
        else if(j=="2"){x =width*0.5,y= height*0.7}
        else if(j=="3"){x =width*0.7,y= height*0.7}
        else if(j=="4"){x =width*0.3,y= height*0.76}
        else if(j=="5"){x =width*0.5,y= height*0.76}
        else if(j=="6"){x =width*0.7,y= height*0.76}
        else if(j=="7"){x =width*0.3,y= height*0.8}
        else if(j=="8"){x =width*0.5,y= height*0.8}
        else if(j=="9"){x =width*0.7,y= height*0.8}
        else if(j=="0"){x =width*0.5,y= height*0.9}
        click(x,y)
    } 
}
// string2 = '1234567890'  
// input_key(string2)

// 9 微信授权
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
        num += 1
        sleep(3000)
        click(width*0.5,height*0.6)    
        sleep(2000)
        current_page = currentPackage()
        if(current_page != "com.tencent.mm"){
            console.log("微信授权成功");
            toast("微信授权成功")
            break
        }else{
            console.log("微信授权异常");
            toast("微信授权异常")
            break
        } 

    }
}

function write_cfg_j(app_name,app_key,app_value){
    var storage = storages.create("app_runing");
    apps_key = storage.get(app_name)
    if(!apps_key){
        log("写入配置文件不存在")
        apps_key = {}
    }
    apps_key[app_key] = app_value
    storage.put(app_name, apps_key);
    //校验可以删
    apps_key = storage.get(app_name)
    log("写入完成----->",apps_key)
    toast("写入完成----->",apps_key)
}


function read_cfg_j(app_name,app_key){

    var myDate = new Date();
    tady_time = myDate.toLocaleDateString()
    var storage = storages.create("app_runing");
    apps_key = storage.get(app_name)
    log("读取操作---00",apps_key)
    if(!apps_key){
        log("整个配置文件不存在")
        toast("整个配置文件不存在")
        nwe_dic = {}
        storage.put(app_name, nwe_dic);
    }
    var storage = storages.create("app_runing");
    apps_key = storage.get(app_name)
    have_login = apps_key['have_login']
    read_time = apps_key['time']
    // 只保存 登录状态 其他清空 后续 保存邀请
    if (read_time != tady_time){
        log("读取时间超时，清空字典")
        toast("读取时间超时，清空字典")
        storage.remove(app_name)
        apps_key = {}
        apps_key['time'] = tady_time
        apps_key['have_login'] = have_login
        storage.put(app_name, apps_key);

    }
    var storage = storages.create("app_runing");
    apps_key = storage.get(app_name)
    log("读取的结果是----->",apps_key)
    toast("读取的结果是----->",apps_key)
    result = storage.get(app_name)[app_key]
    if(!result){
        return "no"
    }else{
        return result
    }
}


