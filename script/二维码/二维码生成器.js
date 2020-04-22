"ui";
importClass(android.graphics.Bitmap)
importClass(com.king.zxing.util.CodeUtils)
importClass(com.hongshu.utils.KeyboardUtils)
importClass(com.hongshu.advice.AdviceManager)
importClass(com.hongshu.utils.ActivityUtils)
var admanager=AdviceManager.getInstance();
showLoginUI();
ui.statusBarColor("#000000")
w=device.width
h=device.height
imgw=""+w/2
//显示登录界面
function showLoginUI(){
    ui.layout(
      <frame id="ll">
        <vertical h="auto" align="center" w="*">
            <text id="title" h="auto" w="*" gravity="center" textSize="20sp" textStyle="bold">二维码生成器</text>
            <text w="auto" gravity="center" color="#111111" size="16sp">输入文本</text>
         
           <ScrollView layout_width="match_parent" layout_height="100dp" >
           <vertical w="*"  h="*">
           <input id="content" w="*" h="auto"/>
           </vertical>
           </ScrollView>
          <img id="erweima" w="250"  h="250"  gravity="center"> </img>
          {/* <seekbar  id="imsize" w="*" margin="20 3 20 3"  ></seekbar> */}
          <linear gravity="center">
             <button id="confirm" text="确定"/>
             <button id="reset" text="重置"/>
             <button id="rewardad"  text="创意视频" />
             <button id="exit"  text="退出" />
          </linear>
          <vertical id="advice" w="*" h="auto">

          </vertical>
        </vertical>
      </frame>
    );
    
    ui.confirm.on("click", () => {
        if(ui.content.getText()==""){
            return
        }
       var dewm=CodeUtils.createQRCode(ui.content.getText(),imgw)
       ui.erweima.setImageBitmap(dewm)
    });
    ui.reset.on("click", () => {
        ui.content.setText("")
    });
    ui.ll.on("click",()=>{
        com.hongshu.utils.KeyboardUtils.hideSoftInput(ui.content)
    })

    ui.exit.on("click",()=>{
        ui.finish()
        exit()
    })
    ui.emitter.on("create",function(){
        log("oncreate")
        
     })
    
    ui.emitter.on("resume",function(){
        log("onresume")
        
     })

     ui.rewardad.on("click",function(){
        admanager.showRewardVideoAd(ui.ll.getContext(),null)
     })
     admanager.showBanner(ui.ll.getContext(),ui.advice)
    // ui.imsize.setOnSeekBarChangeListener( {
    
    // )

}