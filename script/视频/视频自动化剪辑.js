"ui";
ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" title="视频自动化剪辑"/>
        </appbar>
        <scroll >
            <vertical >
            <text gravity="center" id="chose1" padding="8dp" textSize="20sp" background="#ffff0000">选择封面</text>
            <img  id="img1"  />

        </vertical>
</scroll>
</vertical>

)
function loadimg(url,showimgnode){
    com.hongshu.utils.GlideUtils.setImage(activity,url,showimgnode)
}

function choseimg(shownode){
    com.luck.picture.lib.PictureSelector.create(activity)
    .openGallery(com.luck.picture.lib.config.PictureMimeType.ofImage())
    .loadImageEngine(com.hongshu.autotools.core.pictrueselector.GlideEngine.createGlideEngine())
    .forResult(  {
        onResult:function(result) {
            // onResult Callback
            console.log(result.size())
            ui.run(function(){
                loadimg(result.get(0).path,ui.img1)
            })
        },
         onCancel:function() {
            // onCancel Callback
            log("cancel")
        }
    })
}

ui.chose1.on("click",function(){
    choseimg(ui.img1)
})

