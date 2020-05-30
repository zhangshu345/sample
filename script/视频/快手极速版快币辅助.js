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
var appliveactivity="com.kuaishou.live.core.basic.activity.LivePlayActivity"

var 快手极速版弹窗主播名称id="com.kuaishou.nebula:id/live_red_packet_name_view"  // text 主播名称 
var 快手极速版弹窗状态=""
var 快手极速版弹窗快币抢到后数量id=""
var 快手极速版直播页红包标志="com.kuaishou.nebula:id/background_view_normal"
var 快手极速版直播页红包倒计时="com.kuaishou.nebula:id/live_arrow_red_packet_pendant_state_text_view"  
var 快手极速版直播页弹窗红包倒计时="com.kuaishou.nebula:id/count_down_view"  // 5秒后 4分钟后 android.widget.TextView  "depth","7" "columnSpan","-1" "packageName","com.kuaishou.nebula" "indexInParent","0"
var 快手极速版直播退出标志=""
var 快手极速版直播关闭按钮=""
var 快手极速版直播页红包背景=""
var 快手极速版直播页主播姓名=""
var 快手极速版直播红包金额数="com.kuaishou.nebula:id/live_red_packet_coin_num_view"   //直接数量 "depth","4"
var 快手极速版直播红包状态="com.kuaishou.nebula:id/live_red_packet_pre_snatch_state_view"  //可以点击
var 快手极速版直播页红包集合=[快手极速版直播红包状态,快手极速版直播页红包背景]
var 快手极速版直播退出标志集合=[快手极速版直播退出标志,快手极速版直播关闭按钮]
var 快手极速版直播间标志集合=[快手极速版弹窗主播名称id,快手极速版直播退出标志]
var x=500
var y=1376
var 按压时间=3
var 提前时间=2000
var 循环次数=1000
var 获取倒计时=function(){
    show("开始获取倒计时")
    node_coin=id(快手极速版直播红包金额数).findOne(100)
    if(node_coin){
        n_coin=parseInt(node_coin.text())
        show("金币数:"+n_coin)
    }
    node_count=id(快手极速版直播页弹窗红包倒计时).findOne(100)
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
            djcs=0
            for(var i = 0; i < 循环次数; i++){
             //点击位置(500, 1000), 每次用时1毫秒
             press(x, y, 按压时间);
             djcs=djcs+1
             }
             show("结束点击:"+djcs)
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
show("快手极速版抢快币")
gfw.setPosition(0,device.height*6/7)
while(true){
    获取倒计时()
    sleep(4000)
}
