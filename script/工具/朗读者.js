"ui";

ui.layout(
    <relative>
        <toolbar id="toolbar" w="*" >
            <text gravity="center">朗读器</text>
            </toolbar>
        <scroll layout_below="toolbar" layout_above="ll_btn">
            <input id="content" w="*" h="*"  hint="输入朗读内容"/>

          </scroll>
        <horizontal id="ll_btn" w="*" layout_alignParentBottom="true">
            <com.allen.library.SuperButton id="read"  gravity="center" app_sCornersRadius="10dp" app_sSelectorNormalColor="#FFFFFF"  app_sSelectorPressedColor="#0000FF" app_sUseSelector="true" layout_margin="15dp" layout_weight="1"  text="朗读"/>
            <com.allen.library.SuperButton id="stop" gravity="center" app_sCornersRadius="10dp" app_sSelectorNormalColor="#FFFFFF"  app_sSelectorPressedColor="#0000FF" app_sUseSelector="true" layout_margin="15dp" layout_weight="1" text="停止" />
        </horizontal>
        </relative>
)


ui.read.on("click",function(){
    var s=ui.content.getText();
    toastLog(s)
    media.speak("nihs",s,0,1,null,java.util.Locale.CHINA,1,1.1)
})

ui.stop.on("click",function(){
    media.stopspeak()
})
// media.speak("nihs","1245",0,10,null,java.util.Locale.ENGLISH,1,1.1)
//  media.speak("nihs","少时诵诗书所所所",0,2,null,java.util.Locale.CHINA,1,1.1)
// sleep(3000)
// 