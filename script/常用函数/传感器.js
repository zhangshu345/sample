// sensors.register("light").on("change", (event, light)=>{
//     log("当前光强度为", light);
// });

// sensors.register("accelerometer").on("change", (event, ax, ay, az)=>{
//     log("当前加速度为", ax, ay, az);
// });


//注册传感器监听
var sensor = sensors.register("gravity");
if(sensor == null){
    toast("不支持重力传感器");
    exit();
}
//监听数据
sensor.on("change", (gx, gy, gz)=>{
    log("重力加速度: %d, %d, %d", gx, gy, gz);
});