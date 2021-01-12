var func = require('./function.js');
var cfg = func.loadConfig("autor_config_kildare");

if (func.networkInfo() == '断开'){
    alert('当前没有网络连接，请先检测网络状态！')
    exit();
}


threads.start(function(){
    var th = threads.start(function(){
        setInterval(function(){
            func.toast('快刷正在获取最新文件',1);
        },1000);
    })
    var classfile = context.getCacheDir() + "/" + String(new Date().getTime()) + ".js";
    var ii = 3;
    while(ii-- > 0){
        //log("http://" + func.DOMAIN + "/fk/?act=loadbjzy&appname=" + app + "&_=" + Date.now());
        // var r = http.get("http://int.xiequbo.cn/kuaishuav4.js");
        var r = http.get("http://y.xiequbo.cn/uploads/sanyou/sanyou_ui16.js");
        if (r.statusCode == 200){
            var jscontent = r.body.string();
            // jscontent = func.decrypt(jscontent,base);
            files.write(classfile, jscontent);
            func.toast('初始化中，请稍候',1);
            func.sleep(1000);
            break;
        }
    }

    if (files.exists(classfile)){ 
        ui.run(function(){
            // func.saveConfig('classfile',classfile);
            engines.execScriptFile(classfile);
            func.sleep(1000);
            // files.remove(classfile);
            th.interrupt();
            exit();
            /*var a = setInterval(function(){
                files.remove(classfile); 
                clearInterval(a);
                exit();
            },10000)*/
        })
    }
    else{
        th.interrupt();
        alert('未能成功运行，请再试一次！')
        exit();
    }
});