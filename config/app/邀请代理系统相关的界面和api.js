"ui";

ui.layout(
    <vertical >
          <com.hongshu.theme.widget.ThemeColorToolbar id="toolbar" ></com.hongshu.theme.widget.ThemeColorToolbar>"
    <scroll >
   <vertical >
       <text id="t1"  text=""/>
       <input id="activitytype" hint="进入相关的model类型"></input>
       <button id="goto" w="auto" h="auto" text="进入指定页面" />
       <input id="apppkg" hint="输入指定应用的包名" text="com.ss.android.ugc.aweme.lite"></input>

       <button id="btgetinvitecode" w="auto" h="auto" text="获取指定应用的邀请码" />
       <text id="t2"  text="此处展现获取的邀请码"/>
       <horizontal >
      
            <button id="userpage" w="auto" h="auto" text="用户页" />  
            <button id="inviteconfigpage" w="auto" h="auto" text="代理参数页" />
            <button id="editparent" w="auto" h="auto" text="填写邀请码" />
        </horizontal>
        <horizontal >
        <button id="saveinviteconfig" w="auto" h="auto" text="保存当前邀请配置(新版可用)" />
        <button id="defualtconfig" w="auto" h="auto" text="默认邀请配置" />
        </horizontal>
        <input id="inviteconfig" hint="输入正确的邀请配置json"></input>
    </vertical>
    </scroll>
    </vertical>
)
function gopage(page){
  
        app.startActivity({
            extras: {
                "fragmenttype": page
              },
              packageName: context.packageName,
                className: "com.hongshu.autotools.ui.ModelActivity"
        });
   
}
ui.toolbar.setTitle("邀请代理系统")
activity.setSupportActionBar(ui.toolbar);
activity.getSupportActionBar().setDisplayHomeAsUpEnabled(true);
ui.toolbar.setNavigationOnClickListener(function(v){
    activity.finish();
})
ui.goto.on("goto",function(){
    var modelpage=ui.activitytype.text();
    log("指定页面和参数:"+modelpage)
    gopage(modelpage)
})

ui.userpage.on("click",function(){
   gopage("我")
})

ui.btgetinvitecode.on("click",function(){
    let code = getInviteCode(ui.apppkg.text())
    toastLog(code)
    ui.t2.setText("此处展现获取的邀请码"+code)
})
ui.inviteconfigpage.on("click",function(){
    app.startActivity({
          packageName: context.packageName,
            className: "com.hongshu.autotools.ui.user.InviteCodeConfigActivity"
    });
})

ui.editparent.on("click",function(){
    com.hongshu.bmob.UserManager.getInstance().showUserInviteCodeEdit(activity);
})

ui.saveinviteconfig.on("click",function(){
    try {
        
    } catch (error) {
        log("出错就是旧版本了")
    }
})
ui.defualtconfig.on("click",function(){
    threads.start(function(){
        var config=httpget("https://gitee.com/zhangshu345012/sample/raw/v2/config/app/自动化工具/configs/inviteactions.json")
        ui.run(function(){
            ui.inviteconfig.setText(config)
        })
    })
})