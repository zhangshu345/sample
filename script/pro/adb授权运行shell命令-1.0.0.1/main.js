if ($app.getAppName("moe.shizuku.privileged.api") == null){
    alert("请下载Shizuku并按照说明连接电脑授权");
    $app.openUrl("https://www.coolapk.com/apk/moe.shizuku.privileged.api");
    exit();
}
$shell.setDefaultOptions({adb: true});
// 使用adb权限运行shell命令
log($shell("am force-stop com.example.package"));
log($shell("input swipe 100 100 100 10000 500"));