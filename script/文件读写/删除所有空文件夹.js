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
                if(houzhui.indexOf(extendname)>-1){
                    log("包含后缀："+extendname)
                    try {
                        let tmpfilename=files.getName(child)
                        let su=  files.remove(child)
                         log("删除文件:"+tmpfilename+"--"+extendname+"--"+su)
                    } catch (error) {
                        log("删除文件出错:"+tmpfilename)
                    }
                  
                }else{
                    log("不包含后缀："+extendname)
                }
            }
        }
    }
}
let houzhuis=['apk','tmp']
deleteAllFiles(files.getSdcardPath(),houzhuis)
// if(confirm("该操作会删除SD卡目录及其子目录下所有空文件夹，是否继续？")){
//     toast("请点击右上角打开日志");
//     deleteAllEmptyDirs(files.getSdcardPath());
//     toast("全部完成！");
// }
// log(["apk","tmp"])
// if(Array.isArray(houzhuis)){
//     log("是数组")
// }else{
//     log("不是数组")
// }
// ss=houzhuis.indexOf("apk")
// if(ss>-1){
//     log("包括"+ss)
// }else{
//     log("不包括"+ss)
// }