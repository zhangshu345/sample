let view1 = ui.inflate(
    <vertical gravity="center">
        <text>你好</text>
        <img  ></img>
        <progressbar/>
    </vertical>
   
);

var dialog1 = dialogs.build({
    customView: view1,
    title: "加载中...",
    cancelable: true
}).on("cancel", (dialog)=>{
    exit()
     toast("对话框取消了"); }).show();
