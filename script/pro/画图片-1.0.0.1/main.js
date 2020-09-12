//使用之前请在路径src上存储一张图片
//可能会杀进程

"ui";
ui.layout(
    <vertical>
    <canvas id="b"/>
    </vertical>
)

var src = "/storage/emulated/0/1.png"



var p = new Paint()
ui.b.on("draw", function(c){
    var a = images.read(src)
    if(a==null){
        toast("找不到图片")
        exit()
        }
 c.drawImage(a, 0, 0, a.getWidth(), a.getHeight(),  p)
 //获取宽高也能是数字，实现马赛克化
 a.recycle();
   })