var 微信扫一扫=function(){
    var intent = com.hongshu.utils.IntentUtils.getComponentIntent("com.tencent.mm","com.tencent.mm.ui.LauncherUI",true)
    intent.putExtra("LauncherUI.From.Scaner.Shortcut", true);
    intent.setFlags(335544320);
    intent.setAction("android.intent.action.VIEW");
    context.startActivity(intent);
}
微信扫一扫()