"ui";
ui.layout(
    <vertical>
        <webview id="web" h="*"/>
    </vertical>
)
ui.web.getSettings().setJavaScriptEnabled(true);


ui.web.loadUrl("file://" + files.path("./网页.html"))
log(ui.web.getUrl())

setTimeout(() => {
    let js = "let newscript = document.createElement('script');";
    js += "newscript.src='file://" + files.path("./注入脚本.js") + "';";
    js += "document.body.appendChild(newscript);";
    js += "document.body.innerHTML+='添加文本';";

    ui.web.loadUrl("javascript:" + js)
}, 1000)