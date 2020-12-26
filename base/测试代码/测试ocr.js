 const chisimvertraineddata="http://zhangshuhong888.iask.in:8989/tessdata_best/chi_sim_vert.traineddata";
 const chisimtraineddata="http://zhangshuhong888.iask.in:8989/tessdata_best/chi_sim.traineddata";

files.ensureDir("/sdcard/tessdata/")
if(!files.exists("/sdcard/tessdata/chi_sim.traineddata")){
    var res = http.get(chisimtraineddata);
    if(res.statusCode != 200){
        toast("请求失败");
    }
    files.writeBytes("/sdcard/tessdata/chi_sim.traineddata", res.body.bytes());
    toast("下载成功");
}

// app.viewFile("/sdcard/chi_sim_vert.traineddata");
importClass(com.hongshu.autotools.core.runtime.api.Ocr)
var ocr =new Ocr();
log(files.getSdcardPath())
ocr.init(files.getSdcardPath(),"chi_sim")
var s=ocr.ocrFile(files.getSdcardPath()+"/DCIM/Screenshots/你就.jpg")
log("识别结果:"+s)

corRect()