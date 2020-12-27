var script = "toast('Hello, AutoTools');" +
             "sleep(3000);" +
             "toastLog('略略略');";
var execution = engines.execScript("Hello", script);
sleep(1000);
execution.getEngine().forceStop();

// com.hongshu.autotools.core.script.Scripts.INSTANCE.runString("Hello", script,"",null)