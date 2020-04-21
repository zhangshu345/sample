auto.waitFor()
auto.setMode("normal")
var mylist = []
var storage = storages.create("applist@20200212");

function addnewapp(title, type, allsum) {
    log("添加title"+title)
    var dic = new Array();
    dic["title"] = title
    dic["type"] = type
    if (storage.contains(title)) {
        var tempdic = storage.get(title)
        if (tempdic["type"] == type) {
            dic["allsum"] = tempdic["allsum"]
            dic["runtime"] = tempdic["runtime"]
            if (gettoday() != tempdic["today"]) {
                dic["runtime"] = 0
                tempdic["runtime"] = 0
                tempdic["today"] = gettoday()
                tempdic["todayrunnum"] = 0
                storage.put(title, tempdic)
            }
        }
    }
    else {
        var tempdic = { "runtime": 0 }
        tempdic["allsum"] = allsum
        tempdic["type"] = type
        tempdic["today"] = gettoday()
        tempdic["runtime"] = 0
        tempdic["allrunnum"] = 0
        tempdic["todayrunnum"] = 0
        dic["allsum"] = allsum || 10
        dic["runtime"] = 0
        storage.put(title, tempdic)
    }

    dic["done"] = true
    mylist.push(dic)

   
}

function gettoday() {
    var nowday = new Date();
    var Y = nowday.getFullYear();
    var m = nowday.getMonth();
    var d = nowday.getDate();
    var now_time = Y + '-' + m + '-' + d;
    return now_time;
}

function showwindow(){
// 在relative中才能使用的属性    layout_alignBottom 是和别的部件的底部对齐   layout_alignParentTop 是和父部件的顶部对齐   layout_below  位置在部件之下
var fw=floaty.rawWindow(
    <viewpager id="viewpager" bg="#ffffffff" w="*" h="*">
        <frame>
            <relative bg="#3D8EC0CD" w="*" h="*" >
                <relative id="rl_top" bg="#E6FFFFFF" layout_alignParentTop="true" w="*" h="108dp">
                    <img id="im_app" h="72dp" w="72dp" src="http://yuedu.xiequbo.cn/logo.png"></img>
                    <text id="tv_app" textSize="20sp" textStyle="bold" marginLeft="5dp" layout_toRightOf="im_app" marginTop="20dp" w="auto" h="30dp" >悦读九州</text>
                    <text id="tv_root" textSize="16sp" marginLeft="5dp" textColor="#00C7EE" layout_toRightOf="tv_app" marginTop="20dp" w="auto" h="30dp" layout_alignBaseline="tv_app"  >免root</text>
                    <text id="tv_version" textSize="16sp" marginLeft="5dp" textColor="#d50f09" layout_toRightOf="tv_root" marginTop="20dp" w="auto" h="30dp" layout_alignBaseline="tv_app"  >v 1.2</text>
                    <text id="tv_desc" textSize="14sp" marginLeft="5dp" layout_below="@+id/im_app" marginTop="3dp" w="auto" h="auto" >
                        本软件仅支持安卓系统7.0以上手机使用
              </text>
                    <button id="bt_unbind" marginLeft="5dp" layout_toRightOf="tv_desc" layout_alignParentBottom="true" >解绑卡密</button>
                </relative>
                <relative id="rl_bottom" bg="#E6FFFFFF" w="*" h="auto" marginTop="1dp" layout_alignParentBottom="true">
                    <horizontal id="ll_bottom" w="*" h="auto" gravity="center_horizontal">
                        <button id="bt_start" w="auto" h="40dp">启动脚本</button>
                        <button id="bt_exit" w="auto" h="40dp">退出脚本</button>
                        <button id="bt_update" w="auto" h="40dp">检测更新</button>
                    </horizontal>
                    <text id="tv_dec" textSize="10sp" layout_below="@+id/ll_bottom" gravity="center_horizontal" margin="2dp" w="*" h="auto" >
                        本软件永久更新维护，请大家放心使用
              </text>

                </relative>


                <relative id="rl_bindcard" w="*" h="auto" layout_below="rl_top" >

                    {/* <text  id="tv_1" textSize="18sp"  textStyle="bold"   marginTop="2dp" w="auto" h="auto" >激活码:</text>
                <input id="in_card" hint="输入您的验证码" w="170dp"  textSize="17sp" text="00000000000" inputType="text" layout_toRightOf="tv_1" marginLeft="3dp"> </input>
                <text id="tv_2" layout_toRightOf="in_card"    textStyle="bold"  marginLeft="3dp">到期:</text>
                <text id="tv_endtime" layout_toRightOf="tv_2" >0</text>
                <text id="tv_3" layout_toRightOf="tv_endtime" textStyle="bold" marginLeft="3dp"  >号</text> */}
                    <text id="tv_carddesc" textSize="12sp" layout_below="tv_1" margin="3" w="*" h="auto" >
                        用户激活码，只可一机一码使用，注册成功后计算到期时间，软件随机变量处理，有效预防封号，随机增加单次阅读篇数
              </text>
                </relative>
                {/* <relative id="rl_config" bg="#E6FFFFFF" w="*" h="auto"  >
                    <text id="tv_11" margin="3 15" w="auto" h="auto" >基本设置:</text>
                    <text id="tv_12" layout_toRightOf="tv_11" layout_alignBottom="tv_11" textStyle="bold" marginLeft="5dp"  >定时启动:</text>
                    <input id="in_time_start" text="0" w="30dp"  marginLeft="5dp" layout_toRightOf="tv_12" inputType="number" />
                    <text id="tv_13" layout_toRightOf="in_time_start" layout_alignBottom="tv_11" textStyle="bold" marginLeft="5dp"  >结束:</text>
                    <input id="in_time_end" text="7"  w="30dp" layout_toRightOf="tv_13" marginLeft="5dp" inputType="number" />
                    <text id="tv_14" layout_toRightOf="in_time_end" layout_alignBottom="tv_11" marginLeft="5dp" textColor="#FDD835"  >（0到23）</text>
                </relative> */}

                <relative id="rl_config" bg="#E6FFFFFF" w="*" h="auto" layout_below="rl_bindcard">
                    <android.widget.Switch id="sw_night" margin="3" checked="false" textStyle="bold" text="深夜模式(0点到7点不读):"></android.widget.Switch>
                </relative>

                <relative id="rl_config1" bg="#E6FFFFFF" w="*" h="auto" layout_below="rl_config">
                    <android.widget.Switch id="sw_wuzhangai" margin="3" checked="{{auto.service != null}}" textStyle="bold" text="无障碍(必打开):"></android.widget.Switch>
                    <android.widget.Switch id="sw_floaty" margin="3" layout_toRightOf="sw_wuzhangai" checked="false" textStyle="bold" text="悬浮窗(可选):"></android.widget.Switch>
                </relative>
                <relative id="rl_config2" bg="#E6FFFFFF" w="*" h="auto" layout_below="rl_config1">
                    <android.widget.Switch id="sw_clear" margin="3" checked="false" textStyle="bold" text="清理垃圾:"></android.widget.Switch>
                    <android.widget.Switch id="sw_weixin" margin="3" layout_toRightOf="sw_clear" checked="false" textStyle="bold" text="微信登录:"></android.widget.Switch>
                </relative>

                <relative id="rl_relax" bg="#E6FFFFFF" w="*" h="auto" marginTop="1dp" layout_below="rl_config2">

                    {/* <text id="tv_21" textSize="18sp" textStyle="bold" marginTop="2dp" margin="0 15" w="auto" h="auto" >深夜时段:</text>
                    <text id="tv_22" layout_toRightOf="tv_21" layout_alignBottom="tv_21" textStyle="bold" marginLeft="5dp"  >深夜开始:</text>
                    <input id="in_time_start" text="1" w="30dp" layout_alignBottom="tv_21" marginLeft="5dp" layout_toRightOf="tv_22" inputType="number" />
                    <text id="tv_23" layout_toRightOf="in_time_start" layout_alignBottom="tv_21" textStyle="bold" marginLeft="5dp"  >结束:</text>
                    <input id="in_time_end" text="7" w="30dp" layout_alignBottom="tv_21" layout_toRightOf="tv_23" marginLeft="5dp" inputType="number" />
                    <text id="tv_24" layout_toRightOf="in_time_end" layout_alignBottom="tv_21" marginLeft="5dp" textColor="#FDD835"  >（时段可选）</text>
                    <text id="tv_25" layout_below="tv_22" marginTop="5dp" textSize="13sp" >
                        开启深夜模式,在深夜时段内暂停对应平台阅读
              </text> */}
                    <text id="tv_26" layout_below="tv_25" textSize="16sp" margin="3" textStyle="bold" textColor="#FDD835"  >*重要提醒*</text>
                    <text id="tv_27" layout_toRightOf="tv_26" textSize="12sp" layout_toRightOf="tv_26" layout_alignBottom="tv_26" marginLeft="5dp"  >
                        左右滑屏选择阅读平台及设置自动提现
           </text>
                    <text id="tv_28" layout_below="tv_26" textSize="16sp" margin="3" textStyle="bold">选择阅读平台</text>
                    <text id="tv_appnumber" layout_alignBottom="tv_28" layout_toRightOf="tv_28">(0-44)</text>
                    <text id="tv_29" textSize="12sp" layout_alignBottom="tv_appnumber" layout_toRightOf="tv_appnumber" marginLeft="7dp">增加稳定收益平台,请联系代理或作者</text>

                </relative>
                <relative id="rl_reall" bg="#E6FFFFFF" w="*" h="auto" marginTop="1dp" layout_below="rl_relax">
                    <checkbox id="cb_all" text="全选" marginLeft="3" checked="true"/>
                </relative>
                <relative layout_above="rl_bottom" layout_below="rl_reall">

                    <ScrollView marginTop="1dp" bg="#E6FFFFFF" w="*">
                        <vertical bg="#E6FFFFFF">
                            <list id="appList" h="auto" w="*" bg="#E6FFFFFF">
                                <card w="*" h="40" cardCornerRadius="1dp"
                                    cardElevation="1dp" foreground="?selectableItemBackground">
                                    <horizontal>
                                        <checkbox id="done" marginLeft="3" marginRight="3" checked="{{this.done}}" />
                                        <text id="title" w="{{device.width/5}}px" text="{{this.title}}" textColor="#222222" maxLines="1" marginLeft="1" marginRight="6" />
                                        <text w="{{device.width/4}}px" text="已运行:{{this.runtime}}分钟" maxLines="1" marginLeft="3" />
                                        <text w="{{device.width/4}}px" text="总时长:{{this.allsum}}分钟" maxLines="1" marginLeft="3" />
                                        <img id="srcimg" marginTop="5" src="http://yuedu.xiequbo.cn/setting.png" h="20"></img>
                                    </horizontal>
                                </card>
                            </list>
                            {/* <checkbox id="xqb" text="测试" marginLeft="3" /> */}
                        </vertical>
                    </ScrollView>

                </relative>

            </relative>
        </frame>
        <frame>
            <relative id="rl_top1" bg="#E6FFFFFF" layout_alignParentTop="true" w="*" h="auto">
                <img id="im_app1" h="72dp" w="72dp" src="http://yuedu.xiequbo.cn/logo.png"></img>
                <text id="tv_app1" textSize="20sp" textStyle="bold" marginLeft="5dp" layout_toRightOf="im_app1" marginTop="20dp" w="auto" h="30dp" >悦读九州</text>
                <text id="tv_root1" textSize="16sp" marginLeft="5dp" textColor="#00C7EE" layout_toRightOf="tv_app1" marginTop="20dp" w="auto" h="30dp" layout_alignBaseline="tv_app1"  >免root</text>
                <text id="tv_version1" textSize="16sp" marginLeft="5dp" textColor="#d50f09" layout_toRightOf="tv_root1" marginTop="20dp" w="auto" h="30dp" layout_alignBaseline="tv_app1"  >v 1.2</text>
                <text id="tv_desc1" textSize="14sp" marginLeft="5dp" layout_below="@+id/im_app1" marginTop="3dp" w="auto" h="auto" >
                    本软件仅支持安卓系统7.0以上手机使用</text>
                <button id="bt_unbind1" marginLeft="5dp" layout_toRightOf="tv_desc1" layout_alignParentBottom="true" >解绑卡密</button>
            </relative>
        </frame>
    </viewpager>
)

fw.setSize(-1,-1 )
fw.appList.setDataSource(mylist);
var i = 0
var arr = []

fw.bt_start.on("click", function () {
    arr = []
    mylist.forEach(item => {
        if (item.done) {
            var d = [item.title, item.type, item.allsum]
            arr.push(d)
        }
    });

    storage.put("runlist", arr)
    threads.start(function () {
        // engines.execScriptFile("./run.js")
        var dorun = geteval("run")
        engines.execScript("hello world", dorun);
    })
    fw.close()
    
})

fw.bt_exit.on("click", function () {
    fw.close()
})

fw.bt_update.on("click", function () {
    toast("检测更新")
    // engines.all().forEach(en => {
    //     log(en.getSource().getName())
    //     en.forceStop()
    // });
    if (fw.xqb1.checked) {
        log("已选中")
    }
    else {
        log("没选中")
    }
    // log(ui.xqb.text())

})

fw.appList.on("item_bind", function (itemView, itemHolder) {
    //绑定勾选框事件
    itemView.done.on("check", function (checked) {
        let item = itemHolder.item;
        item.done = checked;
    });
});

// ui.appList.on("item_click", function(item, i, itemView, listView){

//     toast("被点击的APP为: " + item.title);
// });

fw.appList.on("item_bind", function (itemView, itemHolder) {
    itemView.srcimg.on("click", function () {
        let item = itemHolder.item;
        rawInput("请输入" + item.title + "运行时间").then(ntime => {
            var reg = /^[0-9]+.?[0-9]*$/
            if (reg.test(ntime)) {
                // log("填写正确")
                item.allsum = parseInt(ntime);
                var tempdic = storage.get(item.title)
                tempdic["allsum"] = ntime
                storage.put(item.title, tempdic)
                fw.appList.setDataSource(mylist)
            }
            else {
                alert("您的输入不正确")
            }
        });
    });
});

fw.sw_wuzhangai.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if(checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if(!checked && auto.service != null){
        auto.service.disableSelf();
    }
});


fw.cb_all.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if(checked) {
        mylist.forEach(item => {
            item.done = true
        });
    }
    else
    {
        mylist.forEach(item => {
        item.done = false
        });  
    }
    fw.appList.getAdapter().notifyDataSetChanged()
  //  ui.appList.setDataSource(mylist)
});

}




function httpget(url) {
    var r = http.get(url);
     log("code = " + r.statusCode);
     if (r.statusCode == 200) {
         return r.body.string()
     } else {
         return ""
     }
}


function geteval(varrurl) {
 var yunurl = "http://yuedu.xiequbo.cn/"
 isyun = 1
 yunurl = yunurl + varrurl + ".js"
 log(yunurl)
 if (isyun == 1) {
     var r = http.get(yunurl);
     log("code = " + r.statusCode);
     if (r.statusCode == 200) {
         return r.body.string()

     } else {
         return ""
     }
 }
 if (isyun == 0) {
     var c = files.cwd()
     var filepath = files.join(c, varrurl) + ".js"
     var r = files.read(filepath)
     return r
 }
}
    var appconfig=httpget("http://yuedu.xiequbo.cn/apprunconfig.json")
    log(appconfig)
    //其中，1表示文章，2表示视频
     var apps=JSON.parse(appconfig)
     apps.forEach(app => {
        addnewapp(app.title, app.type, app.allsum)
    })
    showwindow()
   


// // 当用户回到本界面时，resume事件会被触发
// ui.emitter.on("resume", function() {
//     // 此时根据无障碍服务的开启情况，同步开关的状态
//     ui.sw_wuzhangai.checked = auto.service != null;
// });