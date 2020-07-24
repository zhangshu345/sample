/**
 * 作者: 家
 * QQ: 203118908
 * 功能: 悬浮窗
 * 备注: config/menuList.js 中控制菜单数量
 */
var appGlobalControlCenter = require("./appGlobalControlCenter");
log(appGlobalControlCenter);
appGlobalControlCenter.init.导入类();

// =========================小白点===========================================================
var layout小白点 = appGlobalControlCenter.layout.小白点;
var 小白点宽度 = layout小白点.宽度;
var 小白点高度 = layout小白点.高度;
var 小白点radius = layout小白点.radius;
var 小白点背景色 = layout小白点.背景色;
var 小白点padding = layout小白点.padding;
var 小白点src = layout小白点.src;

var 小白点 = floaty.rawWindow(
  <card
    id="root"
    w="{{小白点宽度}}dp"
    h="{{小白点高度}}dp"
    cardCornerRadius="{{小白点radius}}dp"
    cardBackgroundColor="{{小白点背景色}}"
    cardElevation="1dp"
    elevation="1dp"
    foreground="?selectableItemBackground"
  >
    <img padding="{{小白点padding}}dp" src="{{小白点src}}" circle="true" />
  </card>
);

var 小白点悬浮控制 = new appGlobalControlCenter.lib.悬浮窗函数库.悬浮控制(小白点, 小白点.root);
appGlobalControlCenter.lib.悬浮窗函数库.吸附(小白点);
小白点悬浮控制.setClick(function() {
  if (appGlobalControlCenter.display) {
    toastLog("隐藏悬浮菜单");
    隐藏悬浮菜单();
    appGlobalControlCenter.display = false;
  } else {
    toastLog("显示悬浮菜单");
    显示悬浮菜单();
    appGlobalControlCenter.display = true;
  }
});

// =========================悬浮菜单===========================================================
var menuLayout = appGlobalControlCenter.layout.menu;
var menuWidth = menuLayout.width;
var menuHeight = menuLayout.height;
log("menuWidth=" + menuWidth);
log("menuHeight=" + menuHeight);
// var distanceToWhiteDotsPx = appGlobalControlCenter.lib.计量单位转换.dip2px(distanceToWhiteDotsDp);
// var menuListFloatyWindow = floaty.rawWindow(<frame id="root" bg="#ff00ff" w="{{menuListFloatyWindowWidth}}dp" h="{{menuListFloatyWindowHeight}}dp"></frame>);
var menuListFloatyWindow = floaty.rawWindow(<frame id="root" bg="#000f00ff" layout_width="{{menuWidth}}dp" layout_height="{{menuHeight}}dp"></frame>);
menuListFloatyWindow.setPosition(-3000, -3000);
appGlobalControlCenter.display = false;
var animationInfo = {
  appGlobalControlCenter: appGlobalControlCenter,
  menuListFloatyWindow: menuListFloatyWindow,
  parentView: menuListFloatyWindow.root
};
ui.post(function() {
  // 添加菜单控件
  appGlobalControlCenter.viewCURD.createMenu(menuListFloatyWindow.root);
  var 小白点Position = appGlobalControlCenter.lib.悬浮窗函数库.getWindowPosition(小白点);
  var 小白点宽度px = 小白点Position.width;
  var 小白点高度px = 小白点Position.height;
  小白点.setPosition(device.width - 小白点宽度px / 2, device.height / 2 - 小白点高度px / 2);
});

// =========================自定义函数===========================================================
function 隐藏悬浮菜单() {
  animationInfo.mode = "hide";
  var duration = 200;
  appGlobalControlCenter.悬浮菜单动作.隐藏(animationInfo, duration);
  // 令菜单悬浮窗消失
  setTimeout(function() {
    menuListFloatyWindow.setPosition(-3000, -3000);
  }, duration + 200);
}
function 显示悬浮菜单() {
  // 令菜单悬浮窗显示
  var 小白点Position = appGlobalControlCenter.lib.悬浮窗函数库.getWindowPosition(小白点);
  var 小白点width = 小白点Position.width;
  var 小白点height = 小白点Position.height;
  var 小白点left = 小白点Position.left;
  var 小白点top = 小白点Position.top;
  var 小白点centerX = 小白点Position.centerX;
  var 小白点centerY = 小白点Position.centerY;

  var menuListFloatyWindowPosition = appGlobalControlCenter.lib.悬浮窗函数库.getWindowPosition(menuListFloatyWindow);
  var menuListFloatyWindowWidth = menuListFloatyWindowPosition.width;
  var menuListFloatyWindowHeight = menuListFloatyWindowPosition.height;
  var menuListFloatyWindowLeft = menuListFloatyWindowPosition.left;
  var menuListFloatyWindowTop = menuListFloatyWindowPosition.top;
  var menuListFloatyWindowCenterX = menuListFloatyWindowPosition.centerX;
  var menuListFloatyWindowCenterY = menuListFloatyWindowPosition.centerY;

  var x = 小白点centerX - menuListFloatyWindowWidth - 小白点width / 2;
  var y = 小白点centerY - menuListFloatyWindowHeight / 2;
  x = parseInt(x);
  y = parseInt(y);

  menuListFloatyWindow.setPosition(x, y);
  animationInfo.mode = "show";
  var duration = 200;
  appGlobalControlCenter.悬浮菜单动作.显示(animationInfo, duration);
}

// =========================守护命令===========================================================
setInterval(function() {}, 3000);
