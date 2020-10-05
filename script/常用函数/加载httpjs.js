//添加可以独立运行


function getUrlfile(fileurl){
    if(fileurl.endsWith(".js")){
        n = context.getCacheDir() + "/" + String((new Date).getTime()) + ".js"
      }else if(fileurl.endsWith(".json")){
        n = context.getCacheDir() + "/" + String((new Date).getTime()) + ".json"
      }else{
        n = context.getCacheDir() + "/" + String((new Date).getTime()) + ".js"
      }
    try {
        // yunurl = 'https://gitee.com/zhangshu345012/sample/raw/v2/script/应用/lib3.js'
        r = http.get(fileurl);
        if (r.statusCode == 200) {
            resutl = r.body.string()
        } else {
            resutl = ''
        }
    }catch (e) {
        resutl = ''
    }
    // log("脚本内容"+resutl)
    files.write(n, resutl)
    return n
}
n = getUrlfile('http://zhangshuhong888.iask.in:8989/UiNode.js')
var func = require(n);
files.remove(n)