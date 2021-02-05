auto.waitFor()

launchApp("RxFFmpeg")
id('io.microshow.rxffmpeg.app:id/editText').waitFor();
sleep(1000)
id('io.microshow.rxffmpeg.app:id/editText').findOne(300).setText("你好这是测试")
sleep(1000)
clicktext("运行")