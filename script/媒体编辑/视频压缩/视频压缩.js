const rootpath=files.getSdcardPath()

log("根目录:"+rootpath)
function 新路径(路径,增名){
    if(路径.indexOf(".")>0){

    }
}

function 视频压缩(视频路径,保存路径){
    if(视频路径==null){
        return ;
    }
    let action="压缩";
    let 视频压缩命令="ffmpeg -y -i 原视频 -b 2097k -r 30 -vcodec libx264 -preset superfast 新视频".replace("原视频",视频路径).replace("新视频",保存路径);
    mediaeditor.runCommandAsync(视频压缩命令,function(){
        function onFinish(){
            toastLog(action+"完成")
        }
        function onProgress(progress,progresstime){
            log("进度："+progress)
        }
        function onCancel(){
            toastLog(cmd+"取消")
        }
        function onError(message){
            toastLog(cmd+":err :"+message)
        }
    })
}

function 视频变速(视频路径,保存路径,速度){
    if(视频路径==null){
        return ;
    }
    let action="变速";
    let 视频变速命令="ffmpeg -y -i 原视频 -filter_complex [0:v]setpts=PTS/速度[v];[0:a]atempo=速度[a] -map [v] -map [a] -preset superfast 新视频".replace("原视频",视频路径).replace("新视频",保存路径).replace("速度",""+速度);
  log(视频变速命令)
    execMediaEditCommand("变速",视频变速命令)
    // execMediaEditCommand("变速",视频变速命令,function(){
    //     function onFinish(){
    //         toastLog(action+"完成")
    //     }
    //     function onProgress(progress,progresstime){
    //         log("进度："+progress)
    //     }
    //     function onCancel(){
    //         toastLog(cmd+"取消")
    //     }
    //     function onError(message){
    //         toastLog(cmd+":err :"+message)
    //     }
    // })
}

// 视频变速(rootpath+"/刷宝.mp4",rootpath+"/新刷宝.mp4",0.5)

execMediaEditCommands("截屏",["ffmpeg -y -i /storage/emulated/0/快手.mp4 -f image2 -ss 00:00:03 -vframes 1 -preset superfast /storage/emulated/0/result.jpg"])