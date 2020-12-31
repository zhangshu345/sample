auto();
auto.waitFor()
var storage = storages.create("hs_tyxhxh");
var appname= storage.get("appname","")
var intervaltime=storage.get("intervaltime",15)
var apppkg =""

toast("按压音量下键即可停止运行的工具")

function 循环滑动(包名,滑动间隔时间){
    app.launch(包名)
while(true){
    if(currentPackage()==包名){
        比例滑动(20,10,17,10,4,500,300)
       
    }
    暂停(滑动间隔时间*1000)
}
}

function 获取所有应用名(){
    let appnames=[]
    var packageManager=context.getPackageManager()
    var packageInfos = packageManager.getInstalledPackages(1);
    for(var i = 0; i < packageInfos.size(); i++) {
        var packageInfo = packageInfos.get(i);
            //todo 压缩只对保存有效果bitmap还是原来的大小
        //第一次安装时间
        app_name=packageInfo.applicationInfo.loadLabel(packageManager),
        appnames.push( app_name);
    };
    return appnames;

}

function 选择滑动应用名() {
    toastLog("选择自动滑动的应用")
    let appnames = 获取所有应用名()
    log(appnames)
    let index = dialogs.singleChoice("选择自动滑动的应用", appnames,0);
    if(index>-1){
        storage.put("appname",appnames[index])
       apppkg=app.getPackageName(appnames[index])
       输入滑动间隔时间()
    }else{
        toast("输入的应用名无效,请重新输入")
        输入滑动应用名()
    }
}
function 输入滑动应用名() {
    appname = dialogs.rawInput("请输入自动滑动的应用名", ""+appname);
    if(appname){
        storage.put("appname",appname)
       apppkg=app.getPackageName(appname)
       输入滑动间隔时间()
    }else{
        toast("输入的应用名无效,请重新输入")
        输入滑动应用名()
    }
}

function 输入滑动间隔时间(){
    intervaltime=dialogs.input("请输入自动滑动的间隔时间",intervaltime)
    if(intervaltime<2){
        intervaltime=2
    }
    storage.put("intervaltime",intervaltime)
    循环滑动(apppkg,intervaltime)
}

选择滑动应用名()