var record=new com.hongshu.autojs.core.record.accessibility.AccessibilityActionRecorder();
log(record)
record.start();
sleep(30000)
log(record.getCode())
record.stop();
