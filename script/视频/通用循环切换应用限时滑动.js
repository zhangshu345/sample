
auto.waitFor()
var storage = storages.create("hs_tyxhqhyyxshd");
// var appname= storage.get("appname","")
var intervaltime=storage.get("intervaltime",15)
var appruntime=storage.get("appruntime",30)
var apppkg =""
var  selectapps =[]
toast("按压音量下键即可停止运行的工具")

function 循环滑动(包名,应用滑动总时长,滑动间隔时间){
    toastLog("启动应用:"+包名)
    back()
    back()
    back()
    app.launch(包名)
   
    let starttime=new Date().getTime()
while(new Date().getTime()-starttime<应用滑动总时长*60*1000){
    if(currentPackage()==包名){
        比例滑动(20,10,17,10,4,500,300)
       
    }
    暂停(滑动间隔时间*1000)
}

}

function 获取所有应用名(){
    let appnames=[]
    var packageManager=context.getPackageManager()
    var packageInfos = packageManager.getInstalledPackages(128);
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
    toastLog("选择自动滑动的应用，请稍等正在获取手机应用中")
    let appnames = 获取所有应用名()
    log(appnames)
    let indexs = dialogs.multiChoice("选择自动滑动的应用", appnames,[]);
    if(indexs.length>0){
        indexs.forEach(i => {
            selectapps.push(appnames[i])
        });
       
       输入一个应用运行时间()
    }else{
        toast("输入的应用名无效,请重新输入")
        输入滑动应用名()
    }
}

function 输入一个应用运行时间(){
    appruntime=dialogs.input("请输入一个应用运行的时间（分钟）",appruntime)
    if(appruntime<2){
        intervaltime=2
    }
    storage.put("appruntime",appruntime)
    输入滑动间隔时间()
}

function 输入滑动应用名() {
    appname = dialogs.rawInput("请输入自动滑动的应用名", ""+appname);
    if(appname){
        storage.put("appname",appname)
       apppkg=app.getPackageName(appname)
       输入一个应用运行时间()
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
    if(selectapps){
        selectapps.forEach(name =>{
            toastLog("启动滑动:"+name+"--滑动运行时间:"+appruntime+"分钟--滑动间隔:"+intervaltime+"秒")
            apppkg=app.getPackageName(name)
            循环滑动(apppkg,appruntime,intervaltime)
        })
    }
   
}

选择滑动应用名()