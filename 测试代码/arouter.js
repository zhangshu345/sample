var agourl=function(url){
    app.startActivity({
        extras: {
            "url": url
          },
          packageName: context.packageName,
            className: "com.hongshu.ui.scheme.SchemeFilterActivity"
    });
}
// importClass(com.alibaba.android.arouter.launcher.ARouter)
// url="\/script\/develop"
// log("url:"+url)
// arout=ARouter.getInstance();
// log("rout")
// let pa=arout.build(""+url)
// log("pa")
// pa.navigation();

aroutergourl("\/script\/develop")