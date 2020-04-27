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
}
else {
    log("公共函数实例化失败,程序返回")
}
app_name = "追看视频"
var  button_arr = [
    ['id', 'aez',1],
    ['text', '知道了',1],
    ['id', 'g7',1],
    ['id', 'cash_close',1],
    ['id', 'ge',1], // 更新  好像是错误的
    ['id', 'hj',1], // 更新
    // ['XXXX', 'XXXX',1],
    // ['XXXX', 'XXXX',1],
    // ['XXXX', 'XXXX',1],

]



// 追看视频
var w = device.width;
var h = device.height;
var left = 0;
var top = 0;
var right = device.width;
var buttom = device.height / 2;

function 弹窗() {
    sleep(50)
    var 知道了 = text("知道了").exists();
    if (知道了) {
        log("弹窗---我知道了按钮1")
        var 坐标 = text("知道了").findOne();
        var 坐标 = 坐标.bounds()
        click(坐标.left + 5, 坐标.bottom - 2)
        sleep(500)
    }
    var 知道了 = desc("知道了").exists();
    if (知道了) {
        log("弹窗---我知道了按钮2")
        var 坐标 = desc("知道了").findOne();
        var 坐标 = 坐标.bounds()
        click(坐标.left + 5, 坐标.bottom - 2)
        sleep(500)
    }
    if (id("g7").exists()) {
        console.log("弹窗---检测到APP更新");
        id("g7").findOne().click()

    }
    // APP卡顿提示
    if (text("关闭应用").exists()) {
        if (text("等待").exists()){
            log('弹窗函数---检测到系统级弹窗，开始关闭操作...')
            text("等待").findOne(3000).click();
        }  
    }
    //新人体现
    if (id("cash_close").exists()) {
        console.log("弹窗---新人体现");
        id("cash_close").findOne().click()

    }
}

function 初始化() {
    toast("开始初始化操作")
    var num = 0
    while (true) {
        num += 1
        if (num > 20) {
            console.log("初始化---初始化失败....");
            back()
            return
        }
        sleep(500)
        // 点击视频按钮
        if (text("视频").exists()) {
            视屏按钮控件 = text("视频").findOne()
            if (!视屏按钮控件.selected()) {
                console.log("初始化---开始点击视频按钮");
                视屏按钮控件 = text("视频").findOne()
                var xy_info = 视屏按钮控件.bounds()
                click(xy_info.centerX(), xy_info.centerY());
            } else {
                console.log("初始化---初始化完成");
                return
            }
            // 我的钱包返回按钮
            if (id('fn').exists()) {
                console.log("初始化---发现返回按钮");
                id('fn').findOne().click()
            }


        }
        // 查找刷新按钮是否存在
        if (text("刷新").exists()) {
            console.log("初始化---初始化完成");
            return
        }
    }
}

function 获取播放时间() {
    console.log("开始获取获取播放时间");
    toast("开始获取获取播放时间")
    var look_num1 = 10
    var look_num2 = 60
    // 去任务界面
    任务按钮控件 = text("任务").findOne(3000)
    if (任务按钮控件) {
        // 双点击保证进入函数
        var xy_info = 任务按钮控件.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(2000)
        click(xy_info.centerX(), xy_info.centerY());
    } else {
        console.log("获取播放时间---第一次寻找任务控件失败...开始第二次查找");
        任务按钮控件2 = desc("任务").findOne(500)
        if (任务按钮控件2) {
            // 双点击保证进入函数
            var xy_info = 任务按钮控件2.bounds()
            click(xy_info.centerX(), xy_info.centerY());
            sleep(2000)
            click(xy_info.centerX(), xy_info.centerY());
        } else {
            console.log("获取播放时间---第二次查找任务控件失败...");
        }
    }

    //
    num = 0
    while(true){
        num += 1
        if(num>3){
           break 
        }
        sleep(3500)
        每日任务1 = text("每日任务").findOne(200)
        每日任务2 = desc("每日任务").findOne(200)
        if(每日任务1 || 每日任务2 ){
            break
        }else{
            console.log("任务栏---返回按钮尝试处世");
            back()
            sleep(5000)
        }

    }



    // 自动签到控件
    // var 自动签到控件 = textContains("已连续").findOne(3000)
    // if (自动签到控件) {
    //     console.log("获取播放时间---检测到签到");
    //     back()
    //     sleep(5000)
    // }

    // // 自动签到控件2
    // var 自动签到控件2 = descContains("已连续").findOne(1000)
    // if (自动签到控件2) {
    //     console.log("获取播放时间---检测到签到222");
    //     back()
    //     sleep(5000)
    // }


    // 获取观看视频是的时间
    // var 观看视频次数1 = textContains("观看视频满30秒").boundsInside(left, top, right, device.height).exists();
    // var 观看视频次数2 = descContains("观看视频满30秒").boundsInside(left, top, right, device.height).exists();
    var 观看视频次数1 = textContains("观看视频满30秒").findOne(1000);
    var 观看视频次数2 = descContains("观看视频满30秒").findOne(1010);
    sleep(500)
    if (观看视频次数1 || 观看视频次数2) {
        console.log("获取播放时间---找到观看视频按钮,开始获取视频时间");

        // console.log("看广告---找到广告按钮控件1");
        var 看广告按钮1 = textContains("观看视频满30秒").findOne(500)
        var 看广告按钮2 = descContains("观看视频满30秒").findOne(500)
        if (看广告按钮1) {
            var reult_str = 看广告按钮1.text()
        } else if (看广告按钮2) {
            var reult_str = 看广告按钮2.desc()
        } else {
            console.log("获取播放时间---检测看广告按钮失败1111");
        }

        console.log("888888888888" + reult_str);
        if (reult_str) {
            // console.log(typeof reult_str)
            var numArr = reult_str.match(/\d+/g)
            console.log(numArr);
            look_num1 = numArr[1] - numArr[0]
            console.log("看视频的时间是" + look_num1 * 30 + "秒");
        }
    } else {
        console.log("获取播放时间---观看视频次数失败1111");
    }





    // 获取观看视频是的时间
    var 观看视频次数1 = textContains("观看直播满60秒").findOne(500);
    var 观看视频次数2 = descContains("观看直播满60秒").findOne(500);
    sleep(500)
    if (观看视频次数1 || 观看视频次数2) {
        // console.log("看广告---找到广告按钮控件1");
        var 看广告按钮1 = textContains("观看直播满60秒").findOne(500)
        var 看广告按钮2 = descContains("观看直播满60秒").findOne(500)
        // log('字符串是' + 看广告按钮.desc())
        if (看广告按钮1) {
            var reult_str = 看广告按钮1.text()
        } else if (看广告按钮2) {
            var reult_str = 看广告按钮2.desc()
        } else {
            console.log("获取播放时间---观看直播时间失败");

        }

        console.log("888888888888" + reult_str);
        if (reult_str) {
            // console.log(typeof reult_str)
            var numArr = reult_str.match(/\d+/g)
            console.log(numArr);
            look_num2 = numArr[1] - numArr[0]
            console.log("看视频的时间是" + look_num2 * 60 + "秒");
        }
    } else {
        console.log("获取播放时间---观看直播次数失败2222");
    }
    return [look_num1 * 30, look_num2 * 60]

}





function 观看视频() {
    toast("观看视频")
    初始化()
    // 点击观看按钮

    if (id("video_play_button").exists()) {
        console.log("观看视频----找到播放按钮");
        连播控件 = id("video_play_button").findOne(1000).click()
    }
}

function 观看直播() {
    toast("观看直播")
    初始化()

    // 点击直播按钮
    直播按钮控件 = text("直播").findOne(3000)
    if (直播按钮控件) {
        // 双点击保证进入函数
        var xy_info = 直播按钮控件.bounds()
        click(xy_info.centerX(), xy_info.centerY());
        sleep(2000)
        click(xy_info.centerX(), xy_info.centerY());
        console.log("点击直播按钮完成");

    } else {
        console.log("观看直播---寻找直播件失败...");
    }
    // 寻找直播框
    // 直播框1 = id("rd").find();
    // 直播框2 = id("pt").find();
    // if(直播框1.length>0){
    //     直播框 = 直播框1
    // }else if(直播框2.length>0){
    //     直播框 = 直播框2
    // } 

    // for (j = 0; j < 直播框.length; j++) {
    //     first_video = 直播框[j].parent()
    //     if (!first_video) {
    //         continue
    //     }
    //     var r = first_video.bounds()
    //     if (r.bottom < 0.3 * h) {
    //         continue
    //     }
    //     if (r.right > w) {
    //         continue
    //     }

    //     console.log("视频列表初始化---开始点击第一个直播");
    //     sleep(2000)
    //     click(r.centerX() + random(20, 50), r.centerY() + random(20, 50))
    //     break
    // }
    // 弹窗()
    // click(device.width / 2 + random(-20, 20), device.height / 2 + random(-20, 20))
    // 进入直播
    num = 0
    while(true){
        弹窗()
        back()
        sleep(3000)
        num +=1
        if(num>10){
            console.log("看直播---进入失败");
        }
        click(device.width/2 + random(-20, 20),device.height/2 + random(-20, 20))

        内容框1 = text("输入你的发言内容").findOne(1000)
        内容框2 = desc("输入你的发言内容").findOne(1000)
        if(内容框1 || 内容框1){
            break
        } 
    }

}
function is_login(){
    login_result = read_cfg_j(app_name,"have_login")
    if(login_result=="yes"){
    	toast("读取--已登录")
        log("读取--已登录")
        return true
    }

    button = "text"
    vlause = "我的"
    result = control_click(button, vlause)  
    result = text("关注").findOne(3000)
    if(result){
        button = "text"
        vlause = "视频"
        result = control_click(button, vlause)  
        write_cfg_j(app_name,"have_login","yes")
        return true
    } 
    return false
}
function 启动线程(type, sign) {

    button = "text"
    vlause = "同意"

    index_page = "com.yy.yylite.MainActivity"
    inspect_app(app_name,index_page,button,vlause)
    close_windows(button_arr)
    result = is_login()
    if(!result){
        login()
    }


    log("进入彩蛋视频子函数")
    var istype = type || 2;
    var issign = sign || 0;
    sleep(1000);
    if (issign == 1) {
        console.log("追看视频不支持签到");
    }
    if (istype == 1) {
        console.log("追看视频不支持文章");
    }
    if (istype == 2) {
        console.log("开始彩蛋视频操作");
        初始化()
        var 函数数组 
        var 视频时间 = 300
        var 直播时间 = 1800
        函数数组 = 获取播放时间()
        console.log(函数数组);
        视频时间 = 函数数组[0]
        直播时间 = 函数数组[1]
        console.log('视频时间--->' + 视频时间);
        console.log("直播时间--->" + 直播时间);
        // 视频相关    
        if (视频时间 > 0) {
            观看视频()
            var num = 0
            while (true) {
                // console.log(视频时间-num);
                var 剩余时间 = 视频时间 - num
                toast("主--- 视频观看中...." + 剩余时间 + '秒')
                num += 5
                if (num > 视频时间) {
                    console.log("主---视频观看完成，开始退出");
                    back()
                    break
                }
                sleep(5000)
                var 连续播放按钮1 = id("u9").exists();
                var 连续播放按钮2 = id("sl").exists();
                if (连续播放按钮1 || 连续播放按钮2) {
                    if (连续播放按钮1) {
                        连续播放控件 = id("u9").findOne(500)
                        连续是否选中 = 连续播放控件.selected()
                    } else if (连续播放按钮2) {
                        连续播放控件 = id("sl").findOne(500)
                        连续是否选中 = 连续播放控件.selected()
                    }

                    if (!连续是否选中) {
                        console.log("主---连续播放不是选中状态，开始点击");
                        连续播放控件 = text("自动连播").findOne(500)
                        var xy_info = 连续播放控件.bounds()
                        click(xy_info.centerX(), xy_info.centerY());
                        sleep(2000)
                    }
                }




            }
        } else {
            toast("主---视屏已经观看完成")
            console.log("主---视屏已经观看完成");
        }


        //  直播相关
        if (直播时间 > 0) {
            观看直播()
            var num = 0
            while (true) {
                var 剩余时间 = 直播时间 - num
                toast("主--- 直播观看中....剩余" + 剩余时间 + '秒')
                num += 5
                if (num > 直播时间) {
                    console.log("主---直播观看完成，开始退出");
                    break
                }
                sleep(5000)
            }
        }
    }
}
//-------------------------------------------//

function invite(user_id){
    user_id = user_id || "14511021";

    button = "text"
    vlause = "同意"
    app_name = "追看视频"
    index_page = "com.yy.yylite.MainActivity"
    inspect_app(app_name,index_page,button,vlause)
    // 关闭推送
    button = "id"
    vlause = "aez"
    result = control_click(button, vlause)  
    // 任务
    button = "text"
    vlause = "任务"
    result = control_click(button, vlause)  

    sleep(5000)
    
    result = textContains('已连续签到').findOne(3000)
    if(result){
        back()
        sleep(3000)
    }
    
    button = "text"
    vlause = "去填写"
    result = control_click(button, vlause)  
    if(!result){
        log("邀请失败")
        toast("邀请失败")
        return
    }


    button = 'text'
    vlause = '请输入好友的邀请码'
    control_input(button, vlause,user_id)
    
    
    button = "text"
    vlause = "提交"
    result = control_click(button, vlause)  

    result = text("成功填写邀请码").findOne(30000)
    if(result){
        console.log("邀请成功");
        toast("邀请成功")
        
    }

}


function login(){

    // // 关闭推送
    // button = "id"
    // vlause = "aez"
    // result = control_click(button, vlause)  
    // 进入个人中心
    button = "text"
    vlause = "我的"
    result = control_click(button, vlause)  
    // 登录领新人红包
    button = "text"
    vlause = "登录领新人红包"
    result = control_click(button, vlause)  
    if(!result){
        console.log("已经登录");
        toast("已经登录")
        return
    }
    // 同意协议
    button = "id"
    vlause = "u1"
    result = control_click(button, vlause)  

    // 微信一键登录
    button = "id"
    vlause = "a2u"
    result = control_click(button, vlause)  

    // 微信授权 
    wechat_agree()


    // 点击此处绑定手机
    result = id("bx").findOne(5000)
    if(result){
        back()
    }
    button = "text"
    vlause = "跳过"
    input_phone(button,vlause)

// // 输入手机号
// button = "id"
// vlause = "yf"
// input_phone(button,vlause)
// // 获取验证码 
// button = "id"
// vlause = "zt"
// result = control_click(button, vlause)  


// // 查看验证码
// //  被包含的名称
// app_name = "YY语音"
// //  正则
// reg = /\d{6}/ig
// code = get_phone_code(app_name,reg)
// console.log(code);

// // 输入验证码
// result = id("w6").findOne(3000)
// if(result){
//     result.setText(code)
// }

// // 确定 
// button = "id"
// vlause = "u_"
// result = control_click(button, vlause)  


// // 设置密码
// result = id("aay").findOne(3000)
// if(result){
//     result.setText("123456789")
// }


// //再次确定 
// button = "id"
// vlause = "aaw"
// result = control_click(button, vlause)  



}
// login()



// invite()

// 启动线程(1,0)