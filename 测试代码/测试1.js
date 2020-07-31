    if (packageName(package).textMatches(keys).filter(
            function(w){
                if (w.text()=='立即下载')
                {return w.bounds().bottom < device.height*0.8}
            })  
            .visibleToUser().exists())
    {
            log("关闭111111")
            func.back();
            func.sleep(3000);
        }