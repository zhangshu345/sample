var 小白点 = require("./小白点");
var 小白点宽度 = 小白点.宽度;
var radius = 28;
var distanceToCenterOfWhiteDot = 160;
var menuWidth = radius * 2 + distanceToCenterOfWhiteDot - 小白点宽度 / 2;
module.exports = {
  button: {
    width: radius * 2,
    height: radius * 2,
    radius: radius,
    bg: "#3F51B5",
    src: "#ffffff",
    textSize: 20,
    textColor: "#ffffff"
  },
  distanceToCenterOfWhiteDot: distanceToCenterOfWhiteDot,
  width: menuWidth,
  height: menuWidth * 2,
  distanceToWhiteDots: radius * 2
};
