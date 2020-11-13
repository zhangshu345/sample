
"ui";

showLoginUI();
ui.statusBarColor("#000000")

function showLoginUI(){
    ui.layout(
      <frame>
        <vertical h="auto" align="center" margin="0 50">
          <linear>
             <text w="56" gravity="center" color="#111111" size="16">编辑命令</text>
             <input id="name" w="*" h="40"/>
          </linear>

          <linear gravity="center">
             <button id="login" text="编辑"/>
        
          </linear>
        </vertical>
      </frame>
    );

    ui.login.on("click", () => {
       // execvideocmd("nihao","ffmpeg -y -i /storage/emulated/0/快手.mp4 -f image2 -ss 00:00:03 -vframes 1 -preset superfast /storage/emulated/0/脚本测试.jpg")
       execffmpegcmd("ffmpeg -y -i /storage/emulated/0/快手.mp4 -f image2 -ss 00:00:03 -vframes 1 -preset superfast /storage/emulated/0/脚本测试.jpg")

    });

}

function execffmpegcmd(cmd){
    importClass(com.microshow.rxffmpeg.RxFFmpegInvoke)
    var s=cmd.split(" ")
    RxFFmpegInvoke.getInstance().runFFmpegCmd(s)
}

function execvideocmd(taksname,cmd){
    events.once(taksname+"_finish",()=>{
        log(taksname+"——finish")
    })
    events.on(taksname+"_progress",(progress,progresstime)=>{
        log(taksname+"——progress--"+progress+"--"+progresstime)
    })
    
    events.once(taksname+"_cancel",()=>{
        log(taksname+"——cancel")
    })
    
    events.once(taksname+"_error",(err)=>{
        log(taksname+"——error"+err)
    })
    toastLog("md")
    execMediaEditCommand(taksname,cmd)
    toastLog("nddd")
}

