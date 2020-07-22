"ui";
var apps={"随便粘":"179319"}

const scriptapppkg=context.getPackageName()
const scriptappname=app.getAppName(scriptapppkg)


ui.layout(
    <vertical>
        <horizontal w="*" horizontal="64dp" >
        <button id="back" text="返回" w="96dp" h="auto"/>
        <button id="home" text="主页" w="96dp" h="auto"/>
        <text id="title" text="标题" w="auto" h="auto"/>
        
        </horizontal>

        <webview id="webview" h="*" w="*" />
    </vertical>
);

function getTXCUrl(){
    return "https://support.qq.com/products/"+apps[scriptappname]
}

function getUserInfo(nickname,headimgurl,openid){
   return  "nickname=" + nickname + "&avatar="+ headimgurl + "&openid=" + openid;
}
ui.back.on("click",(v)=>{
    back()
})
ui.home.on("click",(v)=>{
    let url=getTXCUrl()
    log(url)
    ui.webview.loadUrl(url);
})
ui.run(function(){
    let url=getTXCUrl()
    log(url)
   // ui.webview.postUrl(url,getUserInfo().getBytes());
   ui.webview.loadUrl(url);
})