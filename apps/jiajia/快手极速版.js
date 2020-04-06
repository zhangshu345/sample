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
} else {
    log("公共函数实例化失败,程序返回")
}
app_name = "快手极速版"
var button_arr = [
    ['id', 'btn_privacy_action', 1],
    ['id', 'close', 1],
    ['text', '我知道了', 1],
    //  ['XXXX', 'XXXX',1],
    //  ['XXXX', 'XXXX',1],

]
/*---------------------------------star-------------------------------*/

/*---------------------------------滑块-------------------------------*/
function discernSlidingblock(img, ratio) {
    //此函数的返回值。找到返回滑块左上角坐标对象{x:123,y:123}  没找到返回。null
    /*
       [x1,y1,x2,y2,w]
    坐标(x1,y1)与坐标(x2,y2)构成的长方形区域为找滑块的范围。
    宽度w 比滑块的白色边框宽度要小上10~20. 
    你需要修改下面代码中的这些参数。
    请自行尝试为你的设备找出最佳的数值(宽度)
    */

    var tb; //找滑块的范围。
    //分析设备分辨率
    if (ratio == 720) {
        tb = [348, 253, 691, 638, 81];
        log("您的设备分辨率为：720p");
    } else if (ratio == 1080) {
        tb = [463, 387, 912, 831, 125];
        log("您的设备分辨率为：1080p");
    } else if (ratio == 1440) {
        tb = [699, 525, 699 + 660, 525 + 708, 160];
        log("您的设备分辨率为：1440p");
    } else {
        log("当前设备分辨率不符合规范");
        return null;
    };

    //下面的所有部分不需要修改。
    var num = Math.ceil(tb[4] / 3.3 - 4); //滑块边长1/3。线段的长度。

    //找滑块位置
    for (var k = 29; k <= 40; k++) { //黑色颜色范围。
        var color = colors.rgb(k, k, k);
        var temp2 = [
            [0, 0, color]
        ];
        for (var i = 1; i <= num; i++) {
            //生成三行三竖的左上角点位数组。

            //向右的点位。
            temp2.push([i, 0, color]); //→
            temp2.push([i, 1, color]); //→
            temp2.push([i, 2, color]); //→
            //向下的点位。
            temp2.push([0, i, color]); //↓
            temp2.push([1, i, color]); //↓
            temp2.push([2, i, color]); //↓
        };
        //一个差不多的坐标范围。
        //微调其他3个角的位置。
        for (var x = 0; x > -2; x--) {
            for (var y = 0; y > -2; y--) {
                var temp = new Array;
                for (var i = 1; i <= num; i += 2) {
                    //生成其余6条边线坐标点。
                    temp.push([tb[4] + x - i - 1, 0, color]); //右上角向左
                    temp.push([tb[4] + x - i - 1, 1, color]); //右上角向左。
                    temp.push([tb[4] + x, i, color]); //右上角向下。
                    temp.push([tb[4] + x - 1, i, color]); //右上角向下。


                    temp.push([0, tb[4] + y - i - 1, color]); //左下角向上。
                    temp.push([1, tb[4] + y - i - 1, color]); //左下角向上。
                    temp.push([i, tb[4] + y, color]); //左下角向右。
                    temp.push([i, tb[4] + y - 1, color]); //左下角向右。


                    temp.push([tb[4] + x - i - 1, tb[4] + y, color]); //右下角向左
                    temp.push([tb[4] + x - i - 1, tb[4] + y - 1, color]); //右下角向左
                    temp.push([tb[4] + x, tb[4] + y - i - 1, color]); //右下角向上。
                    temp.push([tb[4] + x - 1, tb[4] + y - i - 1, color]); //右下角向上。

                };
                temp = temp.concat(temp2);

                var p = images.findMultiColors(img, color, temp, {
                    region: [tb[0], tb[1], tb[2] - tb[0], tb[3] - tb[1]],
                    threshold: (Math.floor(k / 10) * 16 + k % 10)
                });


                try {
                    //多点找色。
                    var p = images.findMultiColors(img, color, temp, {
                        region: [tb[0], tb[1], tb[2] - tb[0], tb[3] - tb[1]],
                        threshold: (Math.floor(k / 10) * 16 + k % 10)
                    });
                    if (p) {
                        img.recycle();
                        log("pppppppppp----------", p)
                        log(p.ax)
                        log(p.ay)
                        log(p.bx)
                        log(p.x)
                        log(p.y)
                        console.log("类型:", typeof p);
                        return p.x;
                    }
                } catch (error) {
                    //出错
                    console.log("识别失败，错误原因：" + error);
                    console.error("请检查范围是否超出");
                    return null;
                };
            };
        };
    };
    try {
        img.recycle();
    } catch (error) {
        console.log("识别失败，错误原因：" + error);
    };
    return null;


}

function start_code() {
    // auto.waitFor()
    // for(var i=0;i<0;i++){sleep(1000);log(i);}
    threads.start(function () {
        star_ing = text("立即开始").findOne(1000)
        if (star_ing) {
            star_ing.click()
            return
        }
    })
    if (!requestScreenCapture()) {
        alert("请求截图权限失败！");
        log("请求截图权限失败！");
        exit();
    }
    while (true) {
        log("11111111111111111111111111111")

        // 防止卡死
        xixi = 0
        var haha = threads.start(function () {
            log("454645")
            while (true) {
                log("开始截图")
                img = images.captureScreen();
                if (img) {
                    xixi = 1
                    log("截图成功。进行识别滑块！");
                    break;
                } else {
                    log('截图失败,重新截图');
                }
            }
        })

        heihei = 0
        while (true) {
            heihei += 1
            if (heihei > 10) {
                log("截图 超时")
                toast("截图超时")
                haha.interrupt()
                swipe(70, 645, 100, 645, random(1220, 1505))
                sleep(1000)
                break
            }
            sleep(500)
            if (xixi == 1) {
                break
            }
        }
        if (xixi != 1) {
            continue
        }
        // 防止卡死
        width__ = device.width
        var x = discernSlidingblock(img,width__)
        // var x = discernSlidingblock(img, 720)

        // var x = discernSlidingblock(imgBy1080,720)
        console.info("识别结果滑块X坐标：" + x);
        if (x) {
            // device.width
            // device.height
            // 0.097  0.4243   
            // swipe(70, 645, x + 30, 645, random(1220, 1505))
            if(device.height == 1920){
                log("小米5 滑动")
                toast("小米5 滑动")
                swipe(device.width * 0.097, device.height *0.5    , x + 30, device.height *0.5 , random(1220, 1505))
            }else{
                swipe(device.width * 0.097, device.height *0.4243    , x + 30, device.height *0.4243 , random(1220, 1505))
            }

            sleep(2000)
            aa = id("com.kuaishou.nebula:id/title_tv").exists()
            if (!aa) {
                log("滑块成功")
                toast("滑块成功")
                return
            }
        } else {
            log("滑动失败")
            toast("滑动失败")
            //72 663   144 738       108，700
            // 
            if(device.height == 1920){
                toast("小米")
                log("小米")
                // click(108, 700)  
                click(108, 720)  
                toast("刷新完成")
                // click(device.width * 0.05, device.height * 0.364)  
            }else{
                click(device.width * 0.1, device.height * 0.346)
            }
            
            sleep(5000)
        }
    }
}
/*---------------------------------滑块-------------------------------*/


//----------------------------------快手子程序--------------------------------------------//
left = 0;
top = 0;
right = device.width;
buttom = device.height / 2;
var w = device.width;
var h = device.height;

function 快手上滑() {
    var w = device.width;
    var h = device.height;
    // swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
    swipe(w * 0.6, h * 0.8, w * 0.6, h * 0.3, random(220, 235))
}

function 初始化() {
    log("正在进行初始化")
    // 首页分享的ID
    num = 0
    while (true) {
        num += 1
        if (num > 5) {
            console.log("初始化失败...");
            return
        }
        // console.log("进入初始化操作");
        sleep(1000)
        //   转的红包的圈
        var 首页标识控件 = id("circular_progress_bar").exists();

        console.log('首页标识控件' + 首页标识控件);
        if (首页标识控件) {
            console.log("初始化完成");
            break
        }
        back()
        sleep(3000)
    }

}



function 弹窗() {

    sleep(200)
    // 未记录
    if (id("btn_privacy_action").exists()) {
        log("弹窗函数---出现某个弹窗，开始关闭操作...")
        id("btn_privacy_action").findOne(3000).click()
    }
    // 通用关闭按钮标记
    if (id("close").exists()) {
        log('弹窗函数---存在关闭按钮，开始关闭操作...')
        id("close").findOne(3000).click();
    }
    // 青少年我知道了标记
    if (text("我知道了").exists()) {
        log('弹窗函数---存在“我知道了”按钮，开始关闭操作...')
        text("我知道了").findOne(3000).click();
    }
    // APP卡顿提示
    if (text("关闭应用").exists()) {
        if (text("等待").exists()) {
            log('弹窗函数---检测到系统级弹窗，开始关闭操作...')
            text("等待").findOne(3000).click();
        }
    }

}

// 验证滑块() 
function 验证滑块() {
    if (id("com.kuaishou.nebula:id/title_tv").exists()) {
        log("开始滑块")
        start_code()
        //       if(text("拖动滑块").exists()){
        // //           hk=hk+1
        //           var c=0
        //           while(true){
        //             log("快手滑块验证")
        //             c=c+1
        //             swipe(70, 645, w * 0.62, 650, random(1220, 1505))
        //             sleep(1000)
        //             swipe(70, 645, w * 0.74, 645, random(1220, 1505))
        //             sleep(2000)
        //             if(text("发现").exists()||text("关注").exists()){
        // //                 hkc=hkc+1
        // //                 log("滑块验证成功:"+hk+":"+hkc)
        // //                 toast("滑块验证成功:"+hk+":"+hkc)
        //                 log("滑块验证成功:")
        //                 toast("滑块验证成功:")
        //                 return
        //             }
        //           }
        //       }
    }
}

// 快手极速版 主函数

function is_login() {
    login_result = read_cfg_j(app_name, "have_login")
    if (login_result == "yes") {
        toast("读取--已登录")
        log("读取--已登录")
        return true
    }
    have_login = id("login_text").findOne(3000)
    if (have_login) {
        return false
    } else {
        write_cfg_j(app_name, "have_login", "yes")
        return true

    }

}
// get_money()
function get_money(){
    jurisdiction = "yes" 
    var thread = threads.start(function () {
        try{
            events.observeNotification();
        }
        catch(err) {
            log("通知权限未开启,不支持体现")
            toast("通知权限未开启,不支持体现")
            jurisdiction = "no"
        }
        
    })
    sleep(500)    
    log("jurisdiction---->",jurisdiction)
    if(jurisdiction == "no"){
        thread.interrupt();
        log("退出函数")
        return
    }



    have_money_num = 0
    have_money = text("现金收益").findOne(500)
    if(!have_money){
        log("体现失败1")
        toast("体现失败1")
        return
    }
    button_list = have_money.parent().parent()
    for(var i = 0; i < button_list.childCount(); i++){
        var child = button_list.child(i);
        log(child.text());
        if(child.text()){
            have_money_num = child.text()
        } 
    }
    log("目前已有的现金是:",have_money_num)
    if(have_money_num<10){
        log("体现金额不够")
        toast("体现金额不够")
        return
    }
    弹窗()
    close_info = depth(11).boundsInside(0, device.height*0.1, device.width*0.3, device.height*0.5).findOne(500)
    if(close_info){
        var xy_info = close_info.bounds()
        console.log(xy_info.centerX(), xy_info.centerY());
        click(xy_info.centerX(), xy_info.centerY());
    } 

    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>5){
            log("失败2")
            toast("失败2")
            初始化()
            return
        }
        button = "text"
        vlause = "现金收益"
        result = control_click(button, vlause)  
        find_result = text("去提现").findOne(2000)
        if(find_result){
            break
        }
    }

    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>5){
            log("失败3")
            toast("失败3")
            初始化()
            return
        }
        button = "text"
        vlause = "去提现"
        result = control_click(button, vlause)  
        find_result = text("可提现").findOne(2000)
        if(find_result){
            break
        }
    }
    

    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>5){
            log("失败4")
            toast("失败4")
            初始化()
            return
        }
        button = "text"
        vlause = "10元"
        result = control_click(button, vlause)  
        button = "text"
        vlause = "立即提现"
        result = control_click(button, vlause)  
        find_result = text("支付宝").findOne(2000)
        if(find_result){
            break
        }
    }


    find_num = 0 
    while(true){
        find_num +=1 
        if(find_num>5){
            log("失败5")
            toast("失败5")
            初始化()
            return
        }
        button = "text"
        vlause = "微信"
        result = control_click(button, vlause)  
        button = "text"
        vlause = "提取"
        result = control_click(button, vlause)  
        find_result = text("帐号确认").findOne(2000)
        if(find_result){
            break
        }
        find_result2 = text("去绑定").findOne(500)
        if(find_result2){
            log("未绑定手机号,请自行绑定")
            toast("未绑定手机号,请自行绑定")
            初始化()
            return
        }

    }


    button = "text"
    vlause = "获取验证码"
    result = control_click(button, vlause)  

    //    查看验证码
    // 被包含的名称
    app_namess = "快手"
    //  正则
    reg = /\d{6}/ig
    code = get_phone_code(app_namess,reg)
    if(!code){
        log("验证码获取失败,检查是否停机")
        toast("验证码获取失败,检查是否停机")
        初始化()
        return
    }
    console.log(code);
    aa  = textContains("验证码 ").findOne(500)
    aa.setText(code)

    button = "text"
    vlause = "下一步"
    result = control_click(button, vlause)  

    find_result = text("提现成功").findOne(5000)
    if(find_result){
        log("体现成功")
        toast("体现成功")
    }else{
        log("体现 异常")
        toast("体现异常")
    }

}




// exports.启动线程= function (type, sign) {
function 启动线程(type, sign) {
    var istype = type || 2;
    var issign = sign || 0;
    button = "text"
    vlause = "同意并继续"

    index_page = "com.yxcorp.gifshow.HomeActivity"
    index_page2 = "com.yxcorp.gifshow.webview.KwaiWebViewActivity"
    inspect_app(app_name, index_page, button, vlause,index_page2)
    验证滑块()
    result = is_login()
    if (!result) {
        toast("未登录")
        console.log("未登录");

        login()
    }
    close_windows(button_arr)


    快手签到()
    // if (issign == 1) {
    //     // 初始化()
    //     快手签到()
    // }
    // 文章
    if (istype == 1) {
        toast("快手极速版暂不支持阅读文章操作...")
        return
    }
    if (istype == 2) {
        初始化()
        while (true) {
            var c = random(5000, 8000)
            sleep(c)
            弹窗()
            验证滑块()
            console.log("主函数---快手极速版----开始上滑...");
            快手上滑();
        }
    }

}




function 快手签到() {
    log("判断是否签到")
    toast("判断是否签到")
    sign_reullt = read_cfg_j(app_name, "have_sign")
    log("读取到签到结果是:",sign_reullt)
    if (sign_reullt == "yes") {
        toast("读取--已签到，跳过")
        log("读取--已签到，跳过")
        return true
    }

    var 左上菜单是否存在 = id("left_btn").findOne(5000);
    if (!左上菜单是否存在) {
        console.log("签到函数---签到---失败...");
        return
    }
    弹窗()
    //  点击 左上角 菜单
    var 左上菜单是否存在 = id("left_btn").exists();
    log("左上角上菜单" + 左上菜单是否存在)
    if (左上菜单是否存在) {
        id("left_btn").findOne(3000).click();
    }

    sleep(1000)
    //点击 去挣钱按钮
    var 赚钱按钮否存在 = text("去赚钱").exists();
    log("赚钱按钮否存在" + 赚钱按钮否存在)
    if (赚钱按钮否存在) {
        text("去赚钱").findOne(3000).parent().click();
    }
    // 循环检测是否到个人中心
    num = 0
    while (true) {
        num += 1
        if (num > 5) {
            console.log("签到函数---签到---失败...");
            初始化()
            return
        }
        sleep(3000)
        result = desc("复制链接").exists()
        if (result) {
            break
        }
        result = text("复制链接").exists()
        if (result) {
            break
        }

    }

    sleep(3000)
    弹窗()
    // 双判断 签到弹框
    var 立即签到是否存在 = text("立即签到").exists();
    if (立即签到是否存在) {
        log("签到函数--检测到--签到--按钮，开始签到")
        text("立即签到").findOne(3000).click();
        sleep(200)
        console.log("签到完成");
        write_cfg_j(app_name, "have_sign", "yes")
        get_money()
        初始化()
        return
    }
    var 立即签到是否存在 = desc("立即签到").exists();
    if (立即签到是否存在) {
        log("签到函数---检测到--签到--按钮，开始签到")
        desc("立即签到").findOne(3000).click();
        sleep(200)
        console.log("签到完成");
        write_cfg_j(app_name, "have_sign", "yes")
        get_money()
        初始化()
        return
    }
    sleep(200)
    //寻找签到按钮 
    num = 1
    while (true) {
        console.log("循环检测去签到按钮");
        num += 1
        if (num > 30) {
            console.log("签到函数---签到---失败...");
            初始化()
            return
        }
        sleep(1000)
        var 签到领金币1 = desc("签到领金币").boundsInside(left, top, right, device.height * 0.8).exists();
        var 签到领金币2 = text("签到领金币").boundsInside(left, top, right, device.height * 0.8).exists();
        if (签到领金币1 || 签到领金币2) {
            break
        }
        log("开始上滑")
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))

    }

    // 双属性判断签到按钮
    var 去签到是否存在 = text("去签到").boundsInside(left, top, right, device.height * 0.8).exists();
    if (去签到是否存在) {
        log("签到---检测到--签到按钮，开始签到")
        text("去签到").findOne(3000).click();
        sleep(500)
        console.log("签到完成");
        write_cfg_j(app_name, "have_sign", "yes")
        get_money()
        初始化()
        return
    }
    var 去签到是否存在 = desc("去签到").boundsInside(left, top, right, device.height * 0.8).exists();
    if (去签到是否存在) {
        log("签到函数---检测到--签到--按钮，开始签到")
        desc("去签到").findOne(3000).click();
        sleep(500)
        console.log("签到完成");
        write_cfg_j(app_name, "have_sign", "yes")
        get_money()
        初始化()
        return
    }
    console.log("签到---签到失败....");
}

//----------------------------------快手子程序--------------------------------------------//


function invite(user_id) {
    user_id = user_id || "23v4iye";
    button = "text"
    vlause = "同意并继续"
    app_name = "快手极速版"
    index_page = "com.yxcorp.gifshow.HomeActivity"
    inspect_app(app_name, index_page, button, vlause)
    //新人登录红包
    button = "id"
    vlause = "img_close"
    result = control_click(button, vlause)
    //组队
    button = "id"
    vlause = "close_view"
    result = control_click(button, vlause)

    //点击菜单
    button = "id"
    vlause = "left_btn"
    result = control_click(button, vlause)
    sleep(1000)
    //去赚钱
    button = "id"
    vlause = "red_packet_text"
    result = control_click(button, vlause)
    sleep(3000)
    ///立即签到
    result = text("立即签到").findOne(3000)
    if (result) {
        button = "text"
        vlause = "立即签到"
        result = control_click(button, vlause)
        back()
        sleep(2000)
        //点击菜单
        button = "id"
        vlause = "left_btn"
        result = control_click(button, vlause)
        sleep(1000)
        //去赚钱
        button = "id"
        vlause = "red_packet_text"
        result = control_click(button, vlause)
        sleep(3000)
    }

    //填写邀请码  按钮 
    button = "text"
    vlause = "去填写"
    result = control_click(button, vlause)
    if (!result) {
        toast("邀请失败")
        log("邀请失败")
        return
    }

    // 填写
    button = 'text'
    vlause = '填写好友邀请码'
    control_input(button, vlause, user_id)


    //领取
    button = "text"
    vlause = "提交领现金"
    result = control_click(button, vlause)

}
// 特殊
// login()
function login() {

    // have_login = id("login_text").findOne(3000)
    // if(!have_login){
    //     toast("已经登录")
    //     console.log("已经登录");
    //     return
    // }

    // button = "text"
    // vlause = "取消"
    // result = control_click(button, vlause)  

    close_windows(button_arr)

    // 登录领金币

    button = "id"
    vlause = "login_text"
    result = control_click(button, vlause)
    // 上下滑动引导  直接点击2次 
    button = "id"
    vlause = "login_text"
    result = control_click(button, vlause)
    sleep(1000)
    //微信一键登录
    button = "id"
    vlause = "wechat_login_view"
    result = control_click(button, vlause)
    //  授权不弹出界面 是否屏蔽 待验证
    // wechat_agree()
    sleep(3000)
    click(device.width * 0.5, device.height * 0.5)
    close_windows(button_arr)

    result = text("帐号异常").findOne(1000)
    if (result) {
        button = "text"
        vlause = "绑定手机号"
        result = control_click(button, vlause)

        button = "text"
        vlause = "请输入手机号"
        input_phone(button, vlause)

        button = "text"
        vlause = "下一步"
        result = control_click(button, vlause)

        app_name = "快手科技"
        //  正则
        reg = /\d{6}/ig
        code = get_phone_code(app_name, reg)
        console.log(code);
        //  输入验证码
        button = "id"
        vlause = "captcha_et"
        control_input(button, vlause, code)

        button = "text"
        vlause = "确定"
        result = control_click(button, vlause)

    }


}
// login()
// invite()
// 启动线程(2, 1)