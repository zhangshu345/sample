// radians  弧度
// degrees  角度
var scale = context.getResources().getDisplayMetrics().density;
// r=parseInt(60 * scale + 0.5)
// log(r)
module.exports = {
  dip2px(dpValue) {
    // 根据手机分辨率从dp的单位转换成px
    return parseInt(dpValue * scale + 0.5); //四舍五入取整
  },
  px2dip(pxValue) {
    // 根据手机分辨率从px的单位转换成dp
    return parseInt(pxValue / scale + 0.5); //四舍五入取整
  },
  degrees2radians(degrees) {
    return degrees * (Math.PI / 180);
  },
  radians2degrees(radians) {
    return radians * (180 / Math.PI);
  }
};
