//利用了悬浮窗
var window = floaty.rawWindow(
    <frame id="action" w="{{device.width}}" h="{{device.height}}">
    </frame>
);

setInterval(()=>{}, 1000);

var x = 0, y = 0;
var downTime;

window.action.setOnTouchListener(function(view, event){
    switch(event.getAction()){
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_UP:
            if(new Date().getTime() - downTime > 1000&&(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5)){
               长按(x,y);
            }
           else {
               if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
               点击(x,y);
                }
                else{
                   滑动(x,y,event.getRawX(),event.getRawY()); 
                 }
                }
            return true;
    }
    return true;
});

      
function 点击(x,y){
         toastLog("点击("+x+","+y+")");
      threads.start(function(){
           window.setTouchable(false);
           sleep(60);
           press(x,y,1);
           window.setTouchable(true);
       });
   }

function 长按(x,y){
    toastLog("长按("+x+","+y+")");
    threads.start(function(){
           window.setTouchable(false);
           sleep(60);
           press(x,y,1000);
           window.setTouchable(true);
           });
           }
           
function 滑动(x,y,x1,y1){
     toastLog("从("+x+","+y+")滑到("+x1+","+y1+")");
    threads.start(function(){
           window.setTouchable(false);
           sleep(60);
           swipe(x,y,x1,y1,350);
           window.setTouchable(true);
           });
    }
  