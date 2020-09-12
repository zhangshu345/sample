/**
 * 修改调整：叁玖
 * QQ交流群：4607221
 * 去除多余代码，美化抽屉，扩展了抽屉收起的方式
 */
"ui";
ui.statusBarColor("#ffffff");
activity.getWindow().getDecorView().setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
importClass(android.content.Context);
importClass(android.provider.Settings);
var color = "#080808";
var tabs_view = []
var selectView = 0;
let blblankImg = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591742950226&di=2c2a83fe81283a6c8f69979c9b2a8385&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201205%2F07%2F200343cx0b5wwqdp0wbdb3.jpg"
var tabs_data = {
    bg: "#ffffff",
    selectColor: {
        on: "#03A9F5",
        off: "#999999"
    },
    srcSize: 20,
    textSize: 14,
    zoom: 1.5,
    tabs_h: true,
    data: [
        ["首页", "@drawable/ic_beach_access_black_48dp"],
        ["二页", "@drawable/ic_group_black_48dp"],
        ["三页", "@drawable/ic_highlight_black_48dp"],
        ["四页", "@drawable/ic_directions_boat_black_48dp"],
        ["五页", "@drawable/ic_desktop_windows_black_48dp"],
    ],
}
var Tabs_btn_layout = function () {
    util.extend(Tabs_btn_layout, ui.Widget);
    function Tabs_btn_layout() {
        ui.Widget.call(this);
        this.defineAttr("data", (view, attr, value, defineSetter) => {
            arr = tabs_data.data[value]
            view._text.setText(arr[0])
            view._src.attr("src", arr[1])
            tabs_view[tabs_view.length] = view
            if (value == selectView) {
                view._src.attr("tint", tabs_data.selectColor.on)
                view._text.setTextColor(colors.parseColor(tabs_data.selectColor.on))
            }
        });
    }
    Tabs_btn_layout.prototype.render = function () {
        return (
            <vertical id="_bg" w="*" bg="{{tabs_data.bg}}" padding="0 10" gravity="center" >
                <img w="{{tabs_data.srcSize}}" id="_src" tint="{{tabs_data.selectColor.off}}" />
                <text w="auto" id="_text" textSize="{{tabs_data.textSize}}" textColor="{{tabs_data.selectColor.off}}" />
            </vertical>
        )
    }
    ui.registerWidget("tabs_btn-layout", Tabs_btn_layout);
    return Tabs_btn_layout;
}()

var Tabs_layout = function () {
    util.extend(Tabs_layout, ui.Widget);
    function Tabs_layout() {
        ui.Widget.call(this);
        this.defineAttr("data", (view, attr, value, defineSetter) => {
            for (var i = 0; i < tabs_data.data.length; i++) {
                time = i
                ui.inflate(<tabs_btn-layout data="{{time}}" layout_weight="1" />, view._tabs, true)
            }
            tabs_data.tabs_h ? _color = tabs_data.selectColor.on : _color = "#00000000";
            view.tabs.selectedTabIndicatorColor = colors.parseColor(_color);
        });
    }
    Tabs_layout.prototype.render = function () {
        return (
            <card w="*" h="auto" cardElevation="10" foreground="?selectableItemBackground">
                <horizontal id="_tabs" />
                <tabs id="tabs" />
                <horizontal weightSum="5" h="20" layout_gravity="center_vertical">
                    <frame layout_weight="1" >
                        <View bg="#e8e8e8" w="1" layout_gravity="right" />
                    </frame>
                    <frame layout_weight="1" >
                        <View bg="#e8e8e8" w="1" layout_gravity="right" />
                    </frame>
                    <frame layout_weight="1" >
                        <View bg="#e8e8e8" w="1" layout_gravity="right" />
                    </frame>
                    <frame layout_weight="1" >
                        <View bg="#e8e8e8" w="1" layout_gravity="right" />
                    </frame>
                </horizontal>
            </card>
        )
    }
    ui.registerWidget("tabs-layout", Tabs_layout);
    return Tabs_layout;
}()

ui.layout(
    <frame id="frame" bg="#ffffff">
        <vertical fitsSystemWindows="true">
            <appbar>
                <linear id="toolbar" clipChildren="false" elevation="0" bg="#ffffff" gravity="center">
                    <img id="mainmenu" w="38" h="38" padding="5" margin="8" tint="#555555" foreground="?android:attr/selectableItemBackgroundBorderless" src="@drawable/ic_menu_black_48dp" />
                    <text id="title" textColor="#080808" gravity="center" margin="12" layout_weight="1" textSize="19" text="多页面底部菜单示例" />
                    <img id="selectTime" w="38" h="38" padding="5" margin="8" tint="#555555" foreground="?android:attr/selectableItemBackgroundBorderless" src="@drawable/ic_person_black_48dp" />
                </linear>
            </appbar>
            <vertical id="Main">
                <viewpager id="viewpager" bg="#ffffff">
                    <frame>
                        <card layout_gravity="center|top" marginBottom="70" w="*" marginLeft="20" marginRight="20" h="auto" cardCornerRadius="0dp" bg="#00000000">
                            <ScrollView>
                                <vertical>
                                    <text text="这里编写第一页代码" marginLeft="5" marginRight="5" marginTop="8" textColor="#8c080808" textSize="20sp" />
                                </vertical>
                            </ScrollView>
                        </card>
                    </frame>
                    <frame>
                        <card layout_gravity="center|top" marginBottom="70" w="*" marginLeft="20" marginRight="20" h="auto" cardCornerRadius="0dp" bg="#00000000">
                            <ScrollView>
                                <vertical>

                                    <text text="这里编写第二页代码" marginLeft="5" marginRight="5" marginTop="8" textColor="#8c080808" textSize="20sp" />
                                </vertical>
                            </ScrollView>
                        </card>
                    </frame>
                    <frame>
                        <card layout_gravity="center|top" marginBottom="70" w="*" marginLeft="20" marginRight="20" h="auto" cardCornerRadius="0dp" bg="#00000000">
                            <ScrollView>
                                <vertical>

                                    <text text="这里编写第三页代码" marginLeft="5" marginRight="5" marginTop="8" textColor="#8c080808" textSize="20sp" />
                                </vertical>
                            </ScrollView>
                        </card>
                    </frame>
                    <frame>
                        <card layout_gravity="center|top" marginBottom="70" w="*" marginLeft="20" marginRight="20" h="auto" cardCornerRadius="0dp" bg="#00000000">
                            <ScrollView>
                                <vertical>

                                    <text text="这里编写第四页代码" marginLeft="5" marginRight="5" marginTop="8" textColor="#8c080808" textSize="20sp" />

                                </vertical>
                            </ScrollView>
                        </card>
                    </frame>
                    <frame>
                        <card layout_gravity="center|top" marginBottom="70" w="*" marginLeft="20" marginRight="20" h="auto" cardCornerRadius="0dp" bg="#00000000">
                            <ScrollView>
                                <vertical>
                                    <text text="这里编写第五页代码" marginLeft="5" marginRight="5" marginTop="8" textColor="#8c080808" textSize="20sp" />
                                </vertical>
                            </ScrollView>
                        </card>
                    </frame>
                </viewpager>
            </vertical>
        </vertical>
        <vertical gravity="bottom">
            {/* <fab id="start" w="auto" h="auto" src="@drawable/ic_play_arrow_black_48dp"
                margin="10" layout_gravity="bottom|center" elevation="2" tint="#ffffff" />*/}
            <tabs-layout data="" layout_gravity="bottom" />
        </vertical>
        <vertical id="Off" w="*" h="*">
        </vertical>
    </frame>
)

var fabView = ui.start;
ui.tabs.setupWithViewPager(ui.viewpager);
ui.title.getText();
initPop();
initPopB();
ui.viewpager.setOnPageChangeListener({
    onPageSelected: function (index) {
        tabs_view[selectView]._src.attr("tint", tabs_data.selectColor.off)
        tabs_view[selectView]._text.setTextColor(colors.parseColor(tabs_data.selectColor.off))
        tabs_view[index]._src.attr("tint", tabs_data.selectColor.on)
        tabs_view[index]._text.setTextColor(colors.parseColor(tabs_data.selectColor.on))
        selectView = index
    }
})






function initPop() {
    {/**global.blankImg = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAICRAEAOw=="*/ }
    var popView = ui.inflate(
        <frame h="auto">
            <img bg="#50718D9D" scaleType="centerCrop" url="{{blblankImg}}" radiusBottomLeft="10dp" radiusBottomRight="10dp" />
            {/**<img src="{{blankImg}}" tint="#ffffff" scaleType="centerCrop" radiusBottomLeft="20dp" radiusBottomRight="20dp" /> */}
            <card w="*" id="indx1" margin="0 0 0 1" h="auto" cardCornerRadius="1"
                cardElevation="3dp" gravity="center_vertical"  >
                <vertical>
                    <card w="*" id="indx2" margin="0 0 0 1" h="40" cardCornerRadius="1"
                        cardElevation="3dp" gravity="center_vertical"  >
                        <linear id="toolbar" clipChildren="false" elevation="0" margin="8 0 0 0" gravity="center_vertical" >
                            <text id="Notice" textColor="#080808" foreground="?android:attr/selectableItemBackgroundBorderless" textSize="13" text="公告：" />
                            <TextView
                                id="tv_text"
                                singleLine="true"
                                ellipsize="marquee"
                                textSize="14"
                                focusable="true"
                                text="根据根据自己的需求，定义此抽屉内容，以及背景或者透明信息，或者把此公告的内容直接复制到变量调用，从云端获取，请自行摸索！    根据根据自己的需求，定义此抽屉内容，以及背景或者透明信息，或者把此公告的内容直接复制到变量调用，从云端获取，请自行摸索！     根据根据自己的需求，定义此抽屉内容，以及背景或者透明信息，或者把此公告的内容直接复制到变量调用，从云端获取，请自行摸索！       根据根据自己的需求，定义此抽屉内容，以及背景或者透明信息，或者把此公告的内容直接复制到变量调用，从云端获取，请自行摸索！"
                                textColor="#ff010100" />
                        </linear>
                    </card>

                    <card w="*" id="indx2" margin="0 0 0 2" h="40" cardCornerRadius="1"
                        cardElevation="3dp" gravity="center_vertical"  >
                        <horizontal gravity="center_vertical">
                            <text id="Group" textColor="#080808" margin="8 0 0 0" gravity="center_vertical" foreground="?android:attr/selectableItemBackgroundBorderless" textSize="13" text="auto.js教学群：4607221" />
                           <text layout_weight="1"/>
                            <card w="60" h="auto" margin="0 0 10 0" cardCornerRadius="10"
                                cardElevation="0dp" cardBackgroundColor="#282828" >
                                <text id="obj" clickable="true" bg="?attr/selectableItemBackground" text="加入" textColor="#e5e5e5" textSize="13" gravity="center" />
                            </card>
                        </horizontal>
                    </card>
                    
                    <card w="*" id="indx2" margin="0 0 0 2" h="40" cardCornerRadius="1"
                        cardElevation="3dp" gravity="center_vertical"  >
                        <horizontal gravity="center_vertical">
                            <text id="Group" textColor="#080808" margin="8 0 0 0" gravity="center_vertical" foreground="?android:attr/selectableItemBackgroundBorderless" textSize="13" text="auto.js教学群：4607221" />
                           <text layout_weight="1"/>
                            <card w="60" h="auto" margin="0 0 10 0" cardCornerRadius="10"
                                cardElevation="0dp" cardBackgroundColor="#282828" >
                                <text id="obj" clickable="true" bg="?attr/selectableItemBackground" text="加入" textColor="#e5e5e5" textSize="13" gravity="center" />
                            </card>
                        </horizontal>
                    </card>
                    
                    <card w="*" id="indx2" margin="0 0 0 2" h="40" cardCornerRadius="1"
                        cardElevation="3dp" gravity="center_vertical"  >
                        <horizontal gravity="center_vertical">
                            <text id="Group" textColor="#080808" margin="8 0 0 0" gravity="center_vertical" foreground="?android:attr/selectableItemBackgroundBorderless" textSize="13" text="auto.js教学群：4607221" />
                           <text layout_weight="1"/>
                            <card w="60" h="auto" margin="0 0 10 0" cardCornerRadius="10"
                                cardElevation="0dp" cardBackgroundColor="#282828" >
                                <text id="obj" clickable="true" bg="?attr/selectableItemBackground" text="加入" textColor="#e5e5e5" textSize="13" gravity="center" />
                            </card>
                        </horizontal>
                    </card>
               

                    <card w="*" id="indx2" margin="0 0 0 2" h="40" cardCornerRadius="1"
                        cardElevation="3dp" gravity="center_vertical"  >
                        <horizontal gravity="center_vertical">
                        <text id="ID" textColor="#080808" margin="8 0 0 0" textSize="13" gravity="center_vertical" foreground="?android:attr/selectableItemBackgroundBorderless" text="设备ID：{{device.getIMEI()||device.getAndroidId().toUpperCase()}}" />
                           <text layout_weight="1"/>
                            <card w="60" h="auto" margin="0 0 10 0" cardCornerRadius="10"
                                cardElevation="0dp" cardBackgroundColor="#282828" >
                                <text id="clip" clickable="true" bg="?attr/selectableItemBackground" text="复制" textColor="#e5e5e5" textSize="13" gravity="center" />
                            </card>
                        </horizontal>
                    </card>

            
                    <card w="*" id="indx2" margin="0 0 0 1" h="40" cardCornerRadius="1"
                        cardElevation="3dp" gravity="center_vertical"  >
                        <linear id="toolbar" clipChildren="false" elevation="0" gravity="center_vertical" margin="8 0 0 0" >
                            <text id="expirydate" textColor="#080808" gravity="center" textSize="13" text="到期时间：未激活" />
                            <text layout_weight="1"/>
                            <button id="DeviceIDSure" textColor="#03A9F5" text="解绑" gravity="center" style="Widget.AppCompat.Button.Borderless.Colored" w="70" />
                        </linear>
                    </card>
                </vertical>
            </card>
        </frame>, ui.inflate(
            <linear />))
    var popWin = new android.widget.PopupWindow(popView, -1, -2)
    var is = new android.transition.Slide(android.view.Gravity.TOP)
    is.setDuration(250)
    popWin.setEnterTransition(is)
    var os = new android.transition.Slide(android.view.Gravity.TOP)
    os.setDuration(250)
    os.setMode(android.transition.Visibility.MODE_OUT)
    popWin.setExitTransition(os)
    ui.selectTime.click(() => {
        if (!popWin.isShowing()) {
            popWin.showAsDropDown(ui.toolbar)
            ui.Off.setVisibility(0)
        } else {
            popWin.dismiss()
        }
    })

    ui.Off.on("click", function () {
        if (popWin.isShowing()) {
            popWin.dismiss()
            ui.Off.setVisibility(8)
        }
    });
    popView.DeviceIDSure.click(() => {
        if (ui.First.visibility == 0) {
            ui.First.visibility = 99999999;
        } else {
            ui.First.visibility = 0;
        }
    })
    popView.ID.click(() => {
        setClip(DeviceId);
        toast("可以根据需求自定义窗口");
    })
    popView.tv_text.setSelected(true);
    popView.indx1.setAlpha(0.7);//名片
    popView.obj.setAlpha(0.7);//名片
    popView.obj.on("click",function(){
        $app.startActivity({ 
            data: "mqqapi://card/show_pslcard?card_type=group&uin=4607221" 
        })
    })
    popView.clip.on("click",function(){
      let txt=device.getIMEI()||device.getAndroidId().toUpperCase()
      setClip(txt),toast("设备码：" + txt + "已复制成功")
    })
}



function initPopB() {
    {/**global.blankImg = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAICRAEAOw==" */ }
    var popViewB = ui.inflate(
        <frame>
            <img bg="#50718D9D" scaleType="centerCrop" url="http://pic1.win4000.com/pic/4/ce/bb5a755733.jpg" />
            {/*<img src="{{blankImg}}" tint="#ffffff" scaleType="centerCrop" radiusBottomLeft="20dp" radiusBottomRight="20dp" />*/}
            <vertical>
                <list id="menu">
                    <card w="*" id="indx2" margin="0 0 0 1" h="auto" cardCornerRadius="1"
                        cardElevation="3dp" gravity="center_vertical"  >
                        <horizontal bg="?selectableItemBackground" w="*">
                            <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}" />
                            <text textColor="#080808" textSize="15sp" text="{{this.title}}" layout_gravity="center" />
                        </horizontal>
                    </card>
                </list>
                <View w="*" h="2" bg="#000000" />
            </vertical>
        </frame>, ui.inflate(
            <linear />))
    var popWinB = new android.widget.PopupWindow(popViewB, -1, -2)
    var is = new android.transition.Slide(android.view.Gravity.TOP)
    is.setDuration(250)
    popWinB.setEnterTransition(is)
    var os = new android.transition.Slide(android.view.Gravity.TOP)
    os.setDuration(250)
    os.setMode(android.transition.Visibility.MODE_OUT)
    popWinB.setExitTransition(os)
    ui.Off.setVisibility(8)
    ui.mainmenu.click(() => {
        if (!popWinB.isShowing()) {
            ui.Off.setVisibility(0)
            popWinB.showAsDropDown(ui.toolbar)
        } else {
            popWinB.dismiss()
        }
    })
    ui.Off.on("click", function () {
        if (popWinB.isShowing()) {
            popWinB.dismiss()
            ui.Off.setVisibility(8)
        }
    });



    popViewB.menu.setDataSource([{
        title: "运行日志",
        icon: "@drawable/ic_assessment_black_48dp"
    },
    {
        title: "高级设置",
        icon: "@drawable/ic_settings_black_48dp"
    },
    {
        title: "说明文档",
        icon: "@drawable/ic_chrome_reader_mode_black_48dp"
    },
    {
        title: "版本更新",
        icon: "@drawable/ic_archive_black_48dp"
    },
    {
        title: "购买卡密",
        icon: "@drawable/ic_favorite_black_48dp"
    },
    {
        title: "软件激活",
        icon: "@drawable/ic_lock_black_48dp"
    },
    {
        title: "关于软件",
        icon: "@drawable/ic_reply_black_48dp"
    }
    ]);

    popViewB.menu.on("item_click", item => {
        switch (item.title) {
            case "运行日志":
                app.startActivity("console");
                break;
            case "高级设置":
                app.startActivity("settings");
                break;
            case "说明文档":
                toast("此菜单暂无关联功能")
                break;
            case "版本更新":
                toast("此菜单暂无关联功能")
                break;
            case "购买卡密":
                toast("此菜单暂无关联功能")
                break;
            case "激活软件":
                toast("此菜单暂无关联功能")
                break;
            case "关于作者":
                toast("此菜单暂无关联功能")
                break;
        }
    })
}