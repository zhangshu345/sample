

function tofloatysetting(){
    var i = app.intent({
        action: "android.settings.action.MANAGE_OVERLAY_PERMISSION",
        flags:["activity_new_task"]
        // data: "file:///sdcard/1.png"
    });
    context.startActivity(i);
}

var checkfloaty=function(){
    importClass(android.provider.Settings);
    return Settings.canDrawOverlays(context)
}

console.log("是否"+checkfloaty());

