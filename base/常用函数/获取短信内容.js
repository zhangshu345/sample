runtime.requestPermissions(["READ_SMS","RECEIVE_SMS","WRITE_SMS"]);
let datasms=runtime.getSmsBody(7200000)
log(datasms)
// let smsdata=com.hongshu.autojs.core.sms.SmsExtractor.extractFromDatabase(null)
// log("短信内容："+smsdata.sms)