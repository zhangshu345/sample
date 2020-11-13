appname="刷宝短视频"
pkg=app.getPackageName(appname); 
app.openAppSetting(pkg);


var forcestop=function(appname,st){
    if(!getPackageName(appname)){  show(appname+"：没有安装");  return  }; 
       show("强制关闭应用:"+appname);  
       st=st||10000; 
         packagename=app.getPackageName(appname); 
          app.openAppSetting(packagename);
  closetexts= ["强制停止","停止运行","强制关闭","强行停止","结束运行","确定"];
  i=0;  while(i<3){ clicktexts(closetexts,500,1500);    i=i+1;  }}