var menuList = require("../config/menuList");
var menuLayout = require("../config/layout/menu");

var createView = function(parentView, viewInfo) {
  if (!parentView) {
    toastLog("请传入父viewId");
    return;
  }
  viewInfo = viewInfo || {};
  var menuButtonLayout = menuLayout.button;
  var width = menuButtonLayout.width;
  var height = menuButtonLayout.height;
  var radius = menuButtonLayout.radius;
  var bg = menuButtonLayout.bg;
  var src = menuButtonLayout.src;
  var textSize = menuButtonLayout.textSize;
  var textColor = menuButtonLayout.textColor;

  var viewId = viewInfo.id;
  var textContent = viewInfo.textContent;
  if (!viewId) {
    throw new Error("请在路径 config/menuList.js 中 填写菜单id");
  }

  var result =
    '<card id="' +
    viewId +
    '" alpha="1" layout_width="' +
    width +
    'dp" layout_height="' +
    height +
    'dp" cardCornerRadius="' +
    radius +
    "dp" +
    '" cardBackgroundColor="' +
    bg +
    '" cardElevation="2dp" gravity="center">' +
    '  <text text="' +
    textContent +
    '" textSize="' +
    textSize +
    'sp" textColor="' +
    textColor +
    '" textStyle="bold" gravity="center" />' +
    "</card>";
  log("childViewLayout =");
  console.log(result);

  return ui.inflate(result, parentView);
};
module.exports = {
  createView: createView,
  createMenu(parentView) {
    var len = menuList.length;
    for (var i = 0; i < len; i++) {
      var view = createView(parentView, menuList[i]);
      parentView.addView(view);
    }
  }
};
