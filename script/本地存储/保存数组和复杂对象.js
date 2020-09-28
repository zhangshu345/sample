var storage = storages.create("AutoTool例子:复杂数据");
var arr = [1, 4, 2, 5];
var obj = {
    name: "AutoTool",
    url: "www.hongdong.info"
};
//保存
storage.put("arr", arr);
storage.put("obj", obj);

console.show();
//取出
log("arr = ", storage.get("arr"));
log("obj = ", storage.get("obj"));
