// log('iBigCircleCenterRadians = '+iBigCircleCenterRadians)

var menuList = require("../config/menuList");
var 计量单位转换 = require("../lib/计量单位转换");
var 悬浮窗函数库 = require("../lib/悬浮窗函数库");
var menu = require("../config/layout/menu");
var menuButton = menu.button;
var menuButtonWidthDp = menuButton.width;
var menuButtonWidthPx = 计量单位转换.dip2px(menuButtonWidthDp);
var smallCircleRadius = menuButtonWidthPx / 2;
var len = menuList.length;
var bigCircleDegrees = 360 / ((len + 1) * 2);
var bigCircleDegreesHalf = 360 / ((len + 1) * 2) / 2;
var bigCircleRadians = 计量单位转换.degrees2radians(bigCircleDegrees);
var bigCircleRadiansHalf = 计量单位转换.degrees2radians(bigCircleDegreesHalf);
var sinBigCircleRadiansHalf = Math.sin(bigCircleRadiansHalf);
var getBigCircleRadius = function(smallSquareSideLength) {
  var bigCircleRadius = (sinBigCircleRadiansHalf * smallSquareSideLength) / (sinBigCircleRadiansHalf + 1);
  return bigCircleRadius;
};
var getBigCircleCenter = function(smallSquareSideLength, i) {
  var bigCircleRadius = getBigCircleRadius(smallSquareSideLength);
  // 三角形斜边 Triangle  三角形
  var hypotenuseOfTriangle = smallSquareSideLength - bigCircleRadius;
  var iBigCircleCenterDegrees = 90 + bigCircleDegrees * i;
  var iBigCircleCenterRadians = 计量单位转换.degrees2radians(iBigCircleCenterDegrees);
  var x = Math.abs(Math.cos(iBigCircleCenterRadians) * hypotenuseOfTriangle);
  var y = Math.abs(Math.sin(iBigCircleCenterRadians) * hypotenuseOfTriangle);
  x = smallSquareSideLength - x;
  if (iBigCircleCenterDegrees > 180) {
    y = smallSquareSideLength + y;
  } else {
    y = smallSquareSideLength - y;
  }
  var result = {
    x: x,
    y: y
  };
  return result;
};

var getChildViewCoordinate = function(animationInfo, i) {
  log("i = " + i);
  // i++;
  var mode = animationInfo.mode;
  var appGlobalControlCenter = animationInfo.appGlobalControlCenter;
  var parentView = animationInfo.parentView;
  var childView = parentView.getChildAt(i);
  var parentViewPosition = appGlobalControlCenter.lib.悬浮窗函数库.getWindowPosition(parentView);
  var childViewPosition = appGlobalControlCenter.lib.悬浮窗函数库.getWindowPosition(childView);
  var smallSquareSideLength = parentViewPosition.width;
  var bigCircleCenter = getBigCircleCenter(smallSquareSideLength, ++i);
  var smallCircleCenter = bigCircleCenter;
  var left = smallCircleCenter.x - smallCircleRadius;
  var top = smallCircleCenter.y - smallCircleRadius;
  var childViewCoordinate = {};
  if (mode === "hide") {
    childViewCoordinate.start = { x: parseInt(left), y: parseInt(top) };
    childViewCoordinate.end = { x: smallSquareSideLength, y: parseInt(smallSquareSideLength - childViewPosition.height / 2) };
  } else if (mode === "show") {
    childViewCoordinate.start = { x: smallSquareSideLength, y: parseInt(smallSquareSideLength - childViewPosition.height / 2) };
    childViewCoordinate.end = { x: parseInt(left), y: parseInt(top) };
  } else {
    throw new Error("animationInfo mode error");
  }
  return childViewCoordinate;
};

module.exports = {
  渐渐隐藏(animationInfo, duration) {
    duration = duration || 300;
    console.log("渐渐隐藏");
    var appGlobalControlCenter = animationInfo.appGlobalControlCenter;
    var parentView = animationInfo.parentView;
    var len = parentView.getChildCount();
    for (var i = 0; i < len; i++) {
      var childView = parentView.getChildAt(i);
      var coordinate = getChildViewCoordinate(animationInfo, i);
      log("coordinate = " + JSON.stringify(coordinate));
      var xyStart = coordinate.start;
      var xyEnd = coordinate.end;
      var childViewPosition = appGlobalControlCenter.lib.悬浮窗函数库.getWindowPosition(childView);
      var animatorX = ObjectAnimator.ofFloat(childView, "translationX", xyStart.x, xyEnd.x);
      var animatorY = ObjectAnimator.ofFloat(childView, "translationY", xyStart.y, xyEnd.y);
      var animatorSX = ObjectAnimator.ofFloat(childView, "scaleX", 1, 0);
      var animatorSY = ObjectAnimator.ofFloat(childView, "scaleY", 1, 0);
      var animatorA = ObjectAnimator.ofFloat(childView, "alpha", 1, 0);
      var set = new AnimatorSet();
      set.playTogether(animatorX, animatorY, animatorSX, animatorSY, animatorA);
      set.setDuration(duration);
      set.start();
    }
  },
  渐渐显示(animationInfo, duration) {
    duration = duration || 300;
    console.log("渐渐显示");
    var appGlobalControlCenter = animationInfo.appGlobalControlCenter;
    var parentView = animationInfo.parentView;
    var len = parentView.getChildCount();
    for (var i = 0; i < len; i++) {
      var childView = parentView.getChildAt(i);
      var coordinate = getChildViewCoordinate(animationInfo, i);
      log("coordinate = " + JSON.stringify(coordinate));
      var xyStart = coordinate.start;
      var xyEnd = coordinate.end;
      var childViewPosition = appGlobalControlCenter.lib.悬浮窗函数库.getWindowPosition(childView);
      var animatorX = ObjectAnimator.ofFloat(childView, "translationX", xyStart.x, xyEnd.x);
      var animatorY = ObjectAnimator.ofFloat(childView, "translationY", xyStart.y, xyEnd.y);
      var animatorSX = ObjectAnimator.ofFloat(childView, "scaleX", 0, 1);
      var animatorSY = ObjectAnimator.ofFloat(childView, "scaleY", 0, 1);
      var animatorA = ObjectAnimator.ofFloat(childView, "alpha", 0, 1);
      var set = new AnimatorSet();
      set.playTogether(animatorX, animatorY, animatorSX, animatorSY, animatorA);
      set.setDuration(duration);
      set.start();
    }
  }
};
