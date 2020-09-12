/*作者QQ:936910749
此工具只为帮助大家更方便的开发图色类脚本
本人技术有限，工具可能并不完善
欢迎大佬们指出改善
英文不好，大佬不要笑我哈!
*/
"ui";

ui.layout(
    <vertical h="*" w="*">
        <button id="启动" text="启动" w="*" h="auto"/>
    </vertical>
);

ui.启动.on("click", ()=>{
    var i = app.intent({  
        action: Intent.ACTION_MAIN,
          category: Intent.CATEGORY_HOME,
          flags: ["ACTIVITY_NEW_TASK"] 
    }); 
    context.startActivity(i);
    engines.execScriptFile("./图色助手Pro.js");
});