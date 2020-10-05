//示列
toastLog("开始1")
var uinode = require("http://zhangshuhong888.iask.in:8989/UiNode.js").UiNode;
toastLog("开始2")
var obj = text("会员到期").findOne(200);

if(obj!=null){
    var node = uinode.create(obj);

    //获得节点文本
    print(node.text)
    
    //控件是否可见
    print(node.visibleToUser);
    
    //节点的方法，获取控件的宽高
    print(node.method.bounds());
}

