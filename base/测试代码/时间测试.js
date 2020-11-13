let newtime=java.lang.System.currentTimeMillis();
log("当前时间："+newtime)

var cal=java.util.Calendar.getInstance();
cal.set(java.util.Calendar.HOUR_OF_DAY, 0);
cal.set(java.util.Calendar.SECOND, 0);
cal.set(java.util.Calendar.MINUTE, 0);
cal.set(java.util.Calendar.MILLISECOND, 0);


log("今日时间："+cal.getTimeInMillis())
// log("是不是今日："+com.blankj.utilcode.util.TimeUtils.isToday(todaytime))