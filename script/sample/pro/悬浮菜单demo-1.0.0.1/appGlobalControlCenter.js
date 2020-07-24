var 小白点layout = require("./config/layout/小白点");
var menuLayout = require("./config/layout/menu");
var 计量单位转换 = require("./lib/计量单位转换");
var 悬浮窗函数库 = require("./lib/悬浮窗函数库");
var viewCURD = require("./common/viewCURD");
var 悬浮菜单动作 = require("./common/悬浮菜单动作");
var 动画 = require("./common/动画");

var init = require("./init");
var appGlobalControlCenter = {
  layout: {
    小白点: 小白点layout,
    menu: menuLayout,
  },
  init: init,
  display: false,
  lib: {
    计量单位转换: 计量单位转换,
    悬浮窗函数库: 悬浮窗函数库
  },
  viewCURD: viewCURD,
  悬浮菜单动作: 悬浮菜单动作,
  动画: 动画,

};

module.exports = appGlobalControlCenter;
