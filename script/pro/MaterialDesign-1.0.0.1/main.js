"ui";
/**
 * 作者: 家
 * QQ: 203118908
 * 功能: 参照 Material Design 做的界面
 */

//            \{\{(.*?)\}\}
//            ${$1}


//            \$\{(.+?)\}

//               {{$1}}


importClass(android.webkit.WebView)
importClass(android.webkit.WebChromeClient)
importClass(android.webkit.WebResourceResponse)
importClass(android.webkit.WebViewClient)
importClass(android.view.View)
importClass("android.graphics.drawable.NinePatchDrawable")
importClass("android.content.Context")
importClass("android.graphics.Bitmap")
importClass("android.graphics.BitmapFactory")
importClass("android.graphics.NinePatch")
importClass("android.os.Bundle")
importClass("android.graphics.Rect")

var imgPath = files.join(files.getSdcardPath(), '.d2l.9.png')
imgPath = files.path(imgPath)
if (!files.exists(imgPath)) {
  var url = 'https://dwyk.oss-cn-beijing.aliyuncs.com/image/d2l.9.png'
  http.get(url, {}, function (res, err) {
    if (err) {
      console.error(err);
      return;
    }
    log("code = " + res.statusCode);
    files.writeBytes(imgPath, res.body.bytes());
  });

}

var 网页源代码filePath = files.join(files.getSdcardPath(), '.网页源代码.html')


var UIcolors = {
  通知栏颜色: "#3F51B5",
  主体色: "#3F51B5",
  整体背景色: "#E8EAF6",
  按钮背景色: "#3F51B5",
  按钮按下背景色: "#303F9F",
  按钮文字颜色: "#70ffffff",
  id颜色: "#ffffff",
  标题字体颜色: "#87000000",
  内容字体颜色: "#54000000",
  配置信息背景色: "#9FA8DA",
  日志信息背景色: "#9FA8DA"
};
var UITextSize = {
  按钮字体大小: 15,
  id字体大小: 20,
}
ui.statusBarColor(UIcolors.通知栏颜色);



ui.layout(
  <vertical bg="{{UIcolors.整体背景色}}">

    <vertical weightSum="8" marginLeft="16dp" marginRight="16dp" layout_width="match_parent" layout_height="match_parent">
      <horizontal marginTop="24dp">
        <text marginRight="16dp" textSize="24sp" textStyle="bold" layout_gravity='center' >标题</text>

        <horizontal weightSum="3">
          <card cardElevation="6dp" layout_width="0dp" margin="8 8 8 8" layout_weight="1" layout_height="match_parent" cardCornerRadius="6dp">
            <frame bg="{{UIcolors.按钮背景色}}">
              <button id="ksGetWorkId" bg="{{UIcolors.按钮背景色}}" layout_height="match_parent" layout_width="match_parent" textSize="{{UITextSize.按钮字体大小}}sp" textStyle="bold" textColor="{{UIcolors.按钮文字颜色}}" h="88dp" margin="16 0 16 0">
                提取一个id
            </button>
            </frame>
          </card>
          <card cardElevation="6dp" layout_width="0dp" margin="8 8 8 8" layout_weight="1" layout_height="match_parent" cardCornerRadius="6dp">
            <frame bg="{{UIcolors.按钮背景色}}">
              <button id="ksGetUserId" bg="{{UIcolors.按钮背景色}}" layout_height="match_parent" layout_width="match_parent" textSize="{{UITextSize.按钮字体大小}}sp" textStyle="bold" textColor="{{UIcolors.按钮文字颜色}}" h="88dp" margin="16 0 16 0">
                提取一个id
            </button>
            </frame>
          </card>
          <card cardElevation="6dp" layout_width="0dp" margin="8 8 8 8" layout_weight="1" layout_height="match_parent" cardCornerRadius="6dp">
            <frame bg="{{UIcolors.按钮背景色}}">
              <button id="ksGetLiveRoomId" bg="{{UIcolors.按钮背景色}}" layout_height="match_parent" layout_width="match_parent" textSize="{{UITextSize.按钮字体大小}}sp" textStyle="bold" textColor="{{UIcolors.按钮文字颜色}}" h="88dp" margin="16 0 16 0">
                提取一个id
            </button>
            </frame>
          </card>

        </horizontal>


      </horizontal>
      <View layout_width="match_parent" layout_height="1dp" bg="#12000000" />
      <horizontal marginTop="24dp">
        <text marginRight="16dp" textSize="24sp" textStyle="bold" layout_gravity='center' >标题</text>


        <horizontal weightSum="3">
          <card cardElevation="6dp" layout_width="0dp" margin="8 8 8 8" layout_weight="1" layout_height="match_parent" cardCornerRadius="6dp">
            <frame bg="{{UIcolors.按钮背景色}}">
              <button id="dyGetWorkId" bg="{{UIcolors.按钮背景色}}" layout_height="match_parent" layout_width="match_parent" textSize="{{UITextSize.按钮字体大小}}sp" textStyle="bold" textColor="{{UIcolors.按钮文字颜色}}" h="88dp" margin="16 0 16 0">
                提取一个id
            </button>
            </frame>
          </card>
          <card cardElevation="6dp" layout_width="0dp" margin="8 8 8 8" layout_weight="1" layout_height="match_parent" cardCornerRadius="6dp">
            <frame bg="{{UIcolors.按钮背景色}}">
              <button id="dyGetUserId" bg="{{UIcolors.按钮背景色}}" layout_height="match_parent" layout_width="match_parent" textSize="{{UITextSize.按钮字体大小}}sp" textStyle="bold" textColor="{{UIcolors.按钮文字颜色}}" h="88dp" margin="16 0 16 0">
                提取一个id
            </button>
            </frame>
          </card>
          <card cardElevation="6dp" layout_width="0dp" margin="8 8 8 8" layout_weight="1" layout_height="match_parent" cardCornerRadius="6dp">
            <frame bg="{{UIcolors.按钮背景色}}">
              <button id="dyGetLiveRoomId" bg="{{UIcolors.按钮背景色}}" layout_height="match_parent" layout_width="match_parent" textSize="{{UITextSize.按钮字体大小}}sp" textStyle="bold" textColor="{{UIcolors.按钮文字颜色}}" h="88dp" margin="16 0 16 0">
                提取一个id
            </button>
            </frame>
          </card>

        </horizontal>



      </horizontal>
      <View layout_width="match_parent" layout_height="1dp" bg="#12000000" />

      <horizontal marginTop="24dp" layout_height="72dp" layout_width="match_parent"  >
        <text marginRight="16dp" textSize="24sp" textStyle="bold">链接</text>
        <input id="shareUrl" w="*"></input>
      </horizontal>

      <horizontal layout_height="72dp" marginTop="0dp">
        <text marginRight="16dp" textSize="24sp" textStyle="bold" gravity='center' layout_height="match_parent"   >信息</text>




        <card cardElevation="6dp" layout_width="match_parent" layout_height="match_parent" cardCornerRadius="6dp" gravity='center'>
          <text id="info" bg="{{UIcolors.主体色}}" layout_height="match_parent" layout_width="match_parent" gravity='center' textColor="{{UIcolors.id颜色}}" textSize="{{UITextSize.id字体大小}}sp" >要提取的信息, 显示在这里</text>
        </card>


      </horizontal>
      <card cardElevation="2dp" marginTop="16dp" marginBottom="24dp" layout_height="match_parent" cardCornerRadius="6dp">
        <webview id="webview" h="*" w="*" />
      </card>




    </vertical >
  </vertical >
)
let webview = ui.webview

var view;
view = ui.ksGetWorkId
view.reg = /lalalalalala:\/\/work\/(\d{10,})/
view = ui.ksGetUserId
view.reg = /lalalalalala:\/\/profile\/(\d{6,})/
view = ui.ksGetLiveRoomId
view.reg = /lalalalalala:\/\/live\/play\/(\w{6,})/
view = ui.dyGetWorkId
view.reg = /lalalalalala: \\"(\d{10,})\\",/
view = ui.dyGetUserId
view.reg = /lalalalalala: \\"(\d{6,})\\",/
view = ui.dyGetLiveRoomId
view.reg = /lalalalalala = \\"(\d{10,})\\";/


var views = [
  ui.ksGetWorkId,
  ui.ksGetUserId,
  ui.ksGetLiveRoomId,
  ui.dyGetWorkId,
  ui.dyGetUserId,
  ui.dyGetLiveRoomId,
]
var len = views.length
for (var i = 0; i < len; i++) {
  var view = views[i]
  设置控件点击事件(view)
}



function 提取信息 (reg) {
  return randomChars()
}
function 提取url (shareUrl) {
  log('分享链接原始内容=')
  log(shareUrl)
  var matcht = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
  try {
    return "https://m.baidu.com/"
  } catch (e) {
    toastLog('提取链接异常')
  }
}

function 设置控件点击事件 (view) {
  view.click(
    function () {


      view.attr("bg", UIcolors.按钮按下背景色);
      setTimeout(function () {
        view.attr("bg", UIcolors.按钮背景色);
      }, 200);






      var 按钮名字 = view.text()
      log('点击了' + 按钮名字)
      var url = 提取url(ui.shareUrl.text())
      webview.loadUrl(url)
      setTimeout(function () {
        try {
          var r = 提取信息(view.reg)
          if (r) {
            ui.info.setText(r)
            log(按钮名字 + '提取的信息=' + r)
            setClip(r)

            if (!files.exists(imgPath)) {
              toastLog(r)
              return;
            }

            Toast9Patch(r);
          } else {
            ui.info.setText("没有找到指定信息")
          }
        } catch (e) {
          toastLog('提取信息异常')
        }

      }, 2000)
    }
  )
}
let set = webview.getSettings()
set.setAllowFileAccessFromFileURLs(false)
set.setAllowUniversalAccessFromFileURLs(false)
set.setSupportZoom(false)
set.setJavaScriptEnabled(true)




function 打开app (appName) {
  app.launchApp(appName)
}

var webcc = new JavaAdapter(WebChromeClient, {
  onJsPrompt: function (webView, url, fnName, defaultValue, jsPromptResult) {
    fns[fnName](defaultValue)
    // 这段代码是必要的，否则会弹出prompt，阻塞界面。
    jsPromptResult.confirm()
    return true
  },
})


var client = android.webkit.WebViewClient;

var t = new JavaAdapter(client, {
  onPageFinished: function (view, url) {
    console.log(url)
    webview.evaluateJavascript(";" + 网页中获取网页源代码.toString() + ";网页中获取网页源代码();", function (s) {
      console.log(s.length)
      files.write(网页源代码filePath, s)
      console.log('网页源代码  写入文件  完毕')
    })
  }
})


webview.setWebViewClient(t);
webview.setWebChromeClient(webcc)

// htmlFilePath = "/sdcard/脚本/webView.html"
// webview.loadUrl("file://" + htmlFilePath)



webview.loadUrl("https://www.baidu.com/")


function 网页中获取网页源代码 () {
  r = document.getElementsByTagName('html')[0].innerHTML
  return r
}

function getDate () {
  //获取当前时间
  var date = new Date();
  //格式化为本地时间格式
  var date1 = date.toLocaleString();
  //获取div
  var div1 = document.getElementById("dateTime");
  //将时间写入div
  div1.innerHTML = date1;
  return date1
}

function setBackground (view, path) {
  bitmap = BitmapFactory.decodeFile(path)
  chunk = bitmap.getNinePatchChunk(); // byte[]
  npd = new NinePatchDrawable(context.getResources(), bitmap, chunk, new Rect(), null);
  view.setBackground(npd);
}


function Toast9Patch (str) {
  importClass(android.widget.Toast);
  importClass(android.view.Gravity);
  var _toast = Toast.makeText(context, "", Toast.LENGTH_SHORT);
  view = ui.inflate(
    <frame >
      <TextView
        w="auto" id='_text'
        paddingTop="140px" paddingLeft="115px" paddingRight="80px" paddingBottom="35px"
        gravity="center" textColor="#ffffff"
      />
    </frame>
    , null)
  view._text.setText(str)
  setBackground(view._text, imgPath);
  _toast.setView(view);
  _toast.show();
}


function randomChars (num) {
  var num = num || 10;
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  var randomChars = [];
  for (var i = 0; i < num; i++) {
    var randomNum = random(0, 61);
    var char = chars[randomNum];
    randomChars.push(char);
  }
  return randomChars.join("");
}
