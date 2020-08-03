"ui";

ui.layout(
    <vertical> 
       <button id="next" text="下一个" />
       
      
        <button id="btnplay" text="播放" />
        <io.microshow.rxffmpeg.player.RxFFmpegPlayerView id="playview" layout_width="match_parent"  layout_height="match_parent" >
            
        </io.microshow.rxffmpeg.player.RxFFmpegPlayerView>
  
       
       
    </vertical>
)

ui.playview.on("click",function(v){

})

ui.btnplay.on("click",function(v){
    log("播放")
  ui.playview.play("https://s3.pstatp.com/aweme/resource/web/static/image/index/tvc-v3_0b9db49.mp4",true)
})