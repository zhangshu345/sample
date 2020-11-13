sensors.register("light").on("change", (event, light)=>{
    log("当前光强度为", light);
});