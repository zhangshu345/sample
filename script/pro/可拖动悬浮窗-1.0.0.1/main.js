// 防止退出
setInterval(()=>{},1000);

var n = 0, 
    // canMove, 
    position;
var rawWindow = floaty.rawWindow(
  <frame>
    <text bg='#000000' textColor='#ffffff' w='100' h='100' id='exitButton' gravity='center'/>
  </frame>
);
rawWindow.exitButton.setText('长按移动\n点击退出')
rawWindow.exitButton.on('click', () => {
  exit();
});
// 如果想要长按拖动,解除所有canMove的注释
rawWindow.exitButton.on('long_click', () => {
  // canMove = true;
});
rawWindow.exitButton.on('touch', (e) => {
  if (!position) {
    position = [rawWindow.x-e.getRawX(), rawWindow.y-e.getRawY()];
  }
});
rawWindow.exitButton.on('touch_up', () => {
  // canMove = false;
  n = 0;
  position = null;
});
rawWindow.exitButton.on('touch_move', (e) => {
  // if (!canMove) {
  //   return;
  // }
  if (n > 0) {
    let [x, y] = position;
    rawWindow.setPosition(x + e.getRawX(), y + e.getRawY());
  } else {
    n = 1;
  }
});