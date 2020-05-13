

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


var 快手弹窗倒计时id="com.smile.gifmaker:id/count_down_view"
var 快手弹窗状态="com.smile.gifmaker:id/live_red_packet_pre_snatch_state_view"
var 快手弹窗快币抢到后数量id="com.smile.gifmaker:id/coin_num_view"
var 获取倒计时=function(){
    node_count=id(快手弹窗倒计时id).findOne(100)
    if(node_count){
        txt_count=node_count.text()
       n_count=2
         if(txt_count.indexOf("分钟后开抢")!=-1){
            n_count=parseInt(txt_count.replace("分钟后开抢",""))*60
        }else if(txt_count.indexOf("秒后开抢")!=-1){
            n_count=parseInt(txt_count.replace("秒后开抢",""))
        }
       log(n_count)
    }
}
获取倒计时()