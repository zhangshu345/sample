log("niaho")
function deleteAllEmptyDirs(dir){
    dir=dir||files.getSdcardPath()
    var list = files.listDir(dir);
    var len = list.length;
    if(len == 0){
        log("删除目录 " + dir + " " + (files.remove(dir) ? "成功" : "失败"));
        return;
    }
    for(let i = 0; i < len; i++){
        var child = files.join(dir, list[i]);
        if(files.isDir(child)){
            deleteAllEmptyDirs(child);
        }
    }
}
function deleteAllFiles(dir,houzhui){
    log("删除目录："+dir+":"+houzhui)
    dir=dir||files.getSdcardPath()
    if(!houzhui||houzhui.length==0){return}
    let list = files.listDir(dir);
    let len = list.length;
    if(len > 0){
        for(let i = 0; i < len; i++){
            let child = files.join(dir, list[i]);
            if(files.isDir(child)){
                deleteAllFiles(child,houzhui);
            }else{
                let extendname=files.getExtension(child)
                log("后缀:"+extendname)
                if(houzhui.includes(extendname)){
                    
                    try {
                        let tmpfilename=files.getName(child)
                        let su=  files.remove(child)
                         log("删除文件:"+tmpfilename+"--"+extendname+"--"+su)
                    } catch (error) {
                        log("删除文件出错:"+tmpfilename)
                    }
                  
                }
            }
        }
    }
}
//deleteAllFiles(files.getSdcardPath(),["apk","tmp"])
// if(confirm("该操作会删除SD卡目录及其子目录下所有空文件夹，是否继续？")){
//     toast("请点击右上角打开日志");
//     deleteAllEmptyDirs(files.getSdcardPath());
//     toast("全部完成！");
// }

log(["apk","tmp"])
if(["apk","tmp"].includes("apk")){
    log("包括")
}else{
    log("不包括")
}