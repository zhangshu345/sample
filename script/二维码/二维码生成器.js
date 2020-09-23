"ui";
importClass(android.graphics.Bitmap)
importClass(com.blankj.utilcode.util.KeyboardUtils)
importClass(com.hongshu.advice.AdviceManager)
importClass(android.content.Intent)
importClass(android.provider.MediaStore)
importClass(android.net.Uri)
importClass(java.io.File)
importClass(com.hongshu.utils.SPUtils)
var admanager=AdviceManager.getInstance();
showLoginUI();
ui.statusBarColor("#000000")
w=device.width
h=device.height
imgw=w/2
var dewm
var  spt= SPUtils.getInstance("makecode")

//显示登录界面
function showLoginUI(){
    ui.layout(
      <frame id="ll">
        <vertical h="auto" align="center" w="*" gravity="center">
            <text id="title" h="auto" w="*" gravity="center" textSize="20sp" textStyle="bold" text="二维码生成器"/>
            <text w="auto" gravity="center" color="#111111" size="16sp" text="输入文本"/>
         
           <ScrollView layout_width="match_parent" layout_height="100dp" >
           <vertical w="*"  h="*">
           <input id="content" w="*" h="auto"/>
           </vertical>
           </ScrollView>
          <img id="erweima" w="250"  h="250"  > </img>
          {/* <seekbar  id="imsize" w="*" margin="20 3 20 3"  ></seekbar> */}
          <linear gravity="center">
             <button id="confirm" text="确定"/>
             <button id="reset" text="重置"/>
             <button id="rewardad"  text="保存到相册" />
             <button id="exit"  text="退出" />
          </linear>
          <text id="log" w="auto" gravity="center" color="#111111" size="16sp" text=""/>
          <vertical id="advice" w="*" h="auto">

          </vertical>
        </vertical>
      </frame>
    );
    
    ui.confirm.on("click", () => {
        if(ui.content.getText()==""){
            return
        }
        dewm=com.king.zxing.util.CodeUtils.createQRCode(ui.content.getText(),imgw)
        ui.erweima.setImageBitmap(dewm)
    });
    ui.reset.on("click", () => {
        ui.content.setText("")
    });
    ui.ll.on("click",()=>{
      KeyboardUtils.hideSoftInput(ui.content)
    })

    ui.exit.on("click",()=>{
        ui.finish()
        exit()
    })
    ui.emitter.on("create",function(){
        log("oncreate")
        ui.content.setText(spt.getString("last","再次写入要生成的二维码内容"))
     })
    
    ui.emitter.on("resume",function(){
        log("onresume")
        
     })
     ui.emitter.on("pause",function(){
         log("执行pause")
       spt.put("last",ui.content.getText())
     })
     ui.rewardad.on("click",function(){
        //admanager.showRewardVideoAd(ui.ll.getContext(),null)
        if(dewm){
            rawInput("请输入图片保存名称,以/为目录分割 举例 \"777/888/99\" 保存文件存放在根目录下方777文件夹中的888文件夹的文件99", "1").then(savename =>{
                // saveimg2(dewm,savename+".jpg");
                saveimg2(dewm,savename+".jpg");
                ui.run(function(){
                    ui.log.text("二维码图片保存路径:"+savename+".jpg")
                })
            });
            
        //    if( ImageUtils.save(dewm,"/sdcard/1.jpg",Bitmap.CompressFormat.JPEG,false)){
        //        toastLog("保存成功")
             
        //    }
        }else{
            dialogs.alert("二维码图像丢失，请重新生成二维码")
        }
        
     })
    // admanager.showBanner(ui.ll.getContext(),ui.advice)
    // ui.imsize.setOnSeekBarChangeListener( {
    
    // )

}

function saveimg(sbitmap,fileName,description){
    MediaStore.Images.Media.insertImage(context.getContentResolver(), sbitmap, fileName, description);
//发送广播刷新图片
imguri=Uri.parse(fileName)
log("imgurl:"+imguri)
    context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, imguri));

}

function saveimg2(bitmap,imgpath,format){
    imgformat=android.graphics.Bitmap.CompressFormat.JPEG
    if(format==1){
        imgformat=android.graphics.Bitmap.CompressFormat.JPEG
    }else if(format==2){
        imgformat=android.graphics.Bitmap.CompressFormat.PNG
    }else if(format==3){
        imgformat=android.graphics.Bitmap.CompressFormat.WEBP
    }
    if(com.blankj.utilcode.util.ImageUtils.save(bitmap,"/sdcard/"+imgpath,imgformat,false)){
        //        toastLog("保存成功")
        context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.fromFile(new File(imgpath))));
     }
}