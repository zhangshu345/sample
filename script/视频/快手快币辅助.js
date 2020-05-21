auto.waitFor()
auto.setMode("normal")
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        toastLog("网络有问题五秒后重试")
        sleep(5000)
        return httpget(url)
    }
}
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
}else {
toastLog("公共函数实例化失败,程序返回")
}
[["属性","值"],["accessibilityFocused","false"],["bounds","(301,1120,778,1193)"],["checked","false"],["className","android.widget.TextView"],["clickable","false"],["column","-1"],["columnCount","0"],["columnSpan","-1"],["contextClickable","false"],["depth","4"],["desc",""],["dismissable","false"],["drawingOrder","4"],["editable","false"],["enabled","true"],["focusable","false"],["fullId","com.smile.gifmaker:id/live_red_packet_message_view"],["id","live_red_packet_message_view"],["idHex","0x7f09166a"],["indexInParent","3"],["longClickable","false"],["packageName","com.smile.gifmaker"],["row","-1"],["rowCount","0"],["rowSpan","-1"],["scrollable","false"],["selected","false"],["text","手慢了，红包派完了"]]

var 快手弹窗倒计时id="com.smile.gifmaker:id/count_down_view"
var 快手弹窗状态="com.smile.gifmaker:id/live_red_packet_pre_snatch_state_view"
var 快手弹窗快币抢到后数量id="com.smile.gifmaker:id/coin_num_view"
var 快手直播页红包标志="com.smile.gifmaker:id/live_arrow_red_packet_pendant_icon_view"
var 快手直播退出标志="com.smile.gifmaker:id/live_close_place_holder"
var 快手直播关闭按钮="com.smile.gifmaker:id/close_icon_view"
var 快手直播页红包背景="com.smile.gifmaker:id/background_view_normal"
var 快手直播页主播姓名="com.smile.gifmaker:id/live_name_text"
var 快手直播红包金额数="com.smile.gifmaker:id/live_red_packet_coin_num_view"
var 快手直播页红包集合=[快手直播页红包标志,快手直播页红包背景,]
var 快手直播退出标志集合=[快手直播退出标志,快手直播关闭按钮]
var 快手直播间标志集合=[快手直播页主播姓名,快手直播退出标志]
var x=500
var y=1376
var 按压时间=3
var 提前时间=2000
var 循环次数=1000
var 获取倒计时=function(){
    show("开始获取倒计时")
    node_coin=id(快手直播红包金额数).findOne(100)
    if(node_coin){
        n_coin=parseInt(node_coin.text())
        show("金币数:"+n_coin)
    }
    node_count=id(快手弹窗倒计时id).findOne(100)
    if(node_count){
        x=node_count.bounds().centerX()
        y=node_count.bounds().centerY()
        txt_count=node_count.text()
        show("文本："+txt_count)
        n_count=2
         if(txt_count.indexOf("分钟后")!=-1){
            n_count=parseInt(txt_count.replace("分钟后开抢",""))*60
        }else if(txt_count.indexOf("秒后")!=-1){
            n_count=parseInt(txt_count.replace("秒后开抢",""))
        }
        show("时间:"+n_count)
        if(n_count<10){
            sleep(n_count*1000-提前时间)
            show("开始点击")
            循环次数=提前时间/(按压时间*2)
            for(var i = 0; i < 循环次数; i++){
             //点击位置(500, 1000), 每次用时1毫秒
             press(x, y, 按压时间);
             }
             show("结束点击")
        }else{
            show("时间过长")
        }

    }
}

//记录 那个地区的主播 和在线人数多少和 查看
//466,1339,613,1396
//循环100次
// 获取倒计时()
engines.stopOther()
creatsetfloatywindow()
进直播间次数=0
show("快手抢快币")
gfw.setPosition(0,device.height*6/7)
while(true){
    
    获取倒计时()
    sleep(4000)
}


// while(true){
//     滑动(20,5,13,7,3,500,500)
//     sleep(3000)
//     if(idoneexist(快手直播间标志集合)){
//         show("在直播间")
//         sleep(3000)
//         if(clickoneids(快手直播页红包集合,300,500)){
//             获取倒计时()
//             press(500, 1376, 1);
//         }else{
//             show("退出直播间")
//            if(clickoneids(快手直播退出标志集合,100,2000)) {
              
//             textclick("退出",1500)
//            }else{
//                back()
//             sleep(1500)
//            }
//         }
//         进直播间次数=进直播间次数+1
//         show("进直播间次数:"+进直播间次数)
//     }else{
//         show("不在直播间")
//         if(进直播间次数/2==0){
//             show("开始滑动："+进直播间次数/2)
//             滑动(20,5,10,7,3,500,500)
//             sleep(1000)
//             click(device.width*1/4,device.height/4)
//         }else{
//             click(device.width*3/4,device.height/4)
//         }
//     }
   
// }
