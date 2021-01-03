
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

输入滑动应用名()