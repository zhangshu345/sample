
importClass(android.os.Environment);
importClass(android.net.Uri);
importClass(android.app.DownloadManager);
/*作者: @三切玩具箱
参考链接:https://blog.csdn.net/cc20032706/article/details/70239657/
*/
let uri = "http://s9.pstatp.com/package/apk/news_article_lite/news_article_lite_wap_test_lite_1_v7.1.5_91d50e5.apk?v=1569477894";
let request = new DownloadManager.Request(Uri.parse(uri));
//指定下载目录与文件名
request.setDestinationInExternalPublicDir("/download/", "今日头条.apk");

//指定在WIFI状态下，执行下载操作。
//request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI);
//指定在MOBILE状态下，执行下载操作
//request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_MOBILE);
//是否允许漫游状态下，执行下载操作
request.setAllowedOverRoaming(false);
//是否允许“计量式的网络连接”执行下载操作
request.setAllowedOverMetered(true); //默认是允许的。
//设置Notification的标题和描述
request.setTitle("今日头条");  
request.setDescription("今日头条正在下载"); 
//设置Notification的显示，和隐藏。
request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
//设置下载文件类型
request.setMimeType("application/vnd.android.package-archive");//apk类型
//设置网络请求头
//request.addRequestHeader(header, value)；

let downloadManager = context.getSystemService(context.DOWNLOAD_SERVICE);
let id = downloadManager.enqueue(request);
let query = new DownloadManager.Query();

//删除下载任务，会同时删除文件
//downloadManager.remove(id);

let st = setInterval(() => {
    let cursor = downloadManager.query(query.setFilterById(id));
    if (!(cursor != null && cursor.moveToFirst())) return toastLog("下载任务不存在");
    let bytes_downloaded = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR));//已下载字节
    let totalSize = cursor.getLong(cursor.getColumnIndex(DownloadManager.COLUMN_TOTAL_SIZE_BYTES));
    log("下载进度:"+Math.ceil(bytes_downloaded/totalSize*100)+"%");
    //下载状态
    let status = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS));
    if (status == DownloadManager.STATUS_SUCCESSFUL){
        toastLog("下载已完成");
        clearInterval(st);//取消定时器
        }
}, 1500);

