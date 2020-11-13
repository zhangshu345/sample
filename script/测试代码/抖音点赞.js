// 给平川点赞

var username="舍予宏"
const w=device.width
const  h=device.height
const douyinhome="com.ss.android.ugc.aweme.main.MainActivity"
const douyinsearch="com.ss.android.ugc.aweme.search.activity.SearchResultActivity"
function like(name){
    console.log("给"+name+"点赞")
    //第一步  启动抖音 
     app.launchApp("抖音")
     waitForActivity(douyinhome)
     log("已经进入抖音主页")

    //第二步 搜索   结束 以进入账号详情页为结束
      // 找到搜索按钮位置 
      className("android.widget.FrameLayout").clickable(true).depth(15).findOne().click()
    waitForActivity(douyinsearch)
    sleep(1000)
    packageName('com.ss.android.ugc.aweme').clickable(true).editable(true).findOne().setText(username)
    sleep(2000)
    let p=className('android.view.ViewGroup').depth(11).indexInParent(0).findOne()
       let b= p.bounds()
       click(b.centerX(), b.centerY());
        sleep(3000)
        let u=text('用户').depth(13).className('android.widget.TextView').findOne();
        u.parent().click()
        sleep(1000)
        let d=u.parent().bounds()
        click(300,d.bottom+50)
        waitForActivity("com.ss.android.ugc.aweme.profile.ui.UserProfileActivity")
        sleep(1000)
       let r= className('androidx.recyclerview.widget.RecyclerView').depth(16).findOne()
            d= r.child(0).bounds()
           click(d.centerX(),d.centerY())
           waitForActivity("com.ss.android.ugc.aweme.feed.ui.seekbar.detailvideo.e")
           sleep(5000)
           i=0
            while(i<10){
                swipe(device.width/2,device.height/10*8,device.width/2,device.height/5,1000)
                sleep(8000)
                click(500,500)
                sleep(100)
                click(500,500)
                i=i+1
            }
                   

    //第三部 打开第一个视频

    // 第四部  看视频 
}

like(username)