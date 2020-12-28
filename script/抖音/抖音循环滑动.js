const douyin="抖音"  //有的手机显示未抖音短视频
const douyinpkg="com.ss.android.ugc.aweme"



function 获取当前视频作者名(){
  return   gettextFromid("com.ss.android.ugc.aweme:id/title")
}


function 获取当前视频标题(){
    let n_title=id("com.ss.android.ugc.aweme:id/title").findOne(300)
    if(n_title){
        let bounds=n_title.bounds()
        let y = bounds.bottom+1

        let t=className('android.widget.TextView').visibleToUser().boundsInside(0,y,device.width,device.height).depth(25).findOne(300)
        
        // ts.forEach(t => {
        //     log(t.text())
        // });
        if(t){
            log("标签:"+t.text())
            return t.text()
        }
    }
    return ""
}

