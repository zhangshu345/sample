importClass(android.net.Uri);
importClass(android.content.Intent);

let intent = new Intent();
intent.setAction(Intent.ACTION_VIEW);
intent.addCategory(Intent.CATEGORY_BROWSABLE);
intent.setData(Uri.parse("http://s9.pstatp.com/package/apk/news_article_lite/news_article_lite_wap_test_lite_1_v7.1.5_91d50e5.apk?v=1569477894"));
app.startActivity(intent);