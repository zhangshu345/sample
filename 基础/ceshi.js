importClass(com.hongshu.utils.ImageUtils)
requestScreenCapture()
sleep(3000)
var img=images.captureScreen()

var showimg=sync(function(im,t,left,top,width,height){
    t=t||1200
    left= left ||device.width/20
    top =top || device.height/20
    width =width|| device.width-100
    height =height || device.height-180
    var fw=floaty.rawWindow(
        <frame gravity="center">
        <ImageView id="img" w="*" h="*"></ImageView>
        </frame>
    );
   
    fw.setTouchable(false)
    fw.setSize(width/2, height/2)
    fw.setPosition(50,85)
      ui.run(function(){
         

        fw.img.setImageDrawable(ImageUtils.bitmap2Drawable(im))
        setTimeout(()=>{
            img=fw.get
            fw.close()
        },t)
     })
});
if(img){
    showimg(img.getBitmap(),10000)
}else{
    log("没有截图")
}


var showimg2=sync(function(im,t,left,top,width,height){
    t=t||1200
    left= left ||device.width/20
    top =top || device.height/20
    width =width|| device.width-100
    height =height || device.height-180
    var fw=floaty.rawWindow(
        <frame gravity="center">
        <ImageView id="img" w="*" h="*"></ImageView>
        </frame>
    );
   
    fw.setTouchable(false)
    fw.setSize(width, height)
    fw.setPosition(50,85)
      ui.run(function(){
         
         fw.img.setImageDrawable(ImageUtils.bitmap2Drawable(im))
        setTimeout(()=>{
            fw.close()
        },t)
     })
});