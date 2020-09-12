var hasRoot = threads.atomic();

var thread = threads.start(function() {
    var r = new shell("whoami",true).result;
    if (r == "root\n") {
        log("a");
        hasRoot = 1;
    }
});
thread.waitFor();
sleep(1000);
thread.interrupt();
log(hasRoot);
console.show();