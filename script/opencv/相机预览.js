"ui";

ui.layout(
    <vertical>
        <text textSize="18sp" textColor="#000000" margin="20" textStyle="bold">
            关于Auto.js的用户调查
        </text>
        <ScrollView>
            <vertical id="root">
    
                <linear gravity="center" id="root">
                    <button margin="16">提交</button>
                    <button margin="16">放弃</button>
                </linear>
            </vertical>
        </ScrollView>
    </vertical>
)


let OpenCVLoader = org.opencv.android.OpenCVLoader

let javacameraview =new org.opencv.android.JavaCameraView(activity,111111)

ui.root.addView(javacameraview)
javacameraview.setVisibility(0);

// javacameraview.setCvCameraViewListener({
//     onCameraViewStarted:function(width,height){

//     },
//     onCameraViewStopped:function(){
    
//     }
//     ,
//     onCameraFrame:function(inputFrame){
//         return inputFrame.rgba();
//     }
    
// })

ui.emitter.on("pause",function(){
    if(javacameraview){
        javacameraview.disableView();
    }
})

let mLoaderCallback= function(status){
    if(status==0){
        javacameraview.enableView();
    }else{

    }
}

ui.emitter.on("resume",function(){
  if(!OpenCVLoader.initDebug()){
    OpenCVLoader.initAsync("3.0.0", context, mLoaderCallback);
  }else{

  }
})