//key 是字符串
var myMap = new Map();
var keyString = "a string"; 
 
myMap.set(keyString, "和键'a string'关联的值");
 
myMap.get(keyString);    // "和键'a string'关联的值"
myMap.get("a string");   // "和键'a string'关联的值"
toastLog(myMap.get("a string"))
toastLog(myMap.get(keyString))
 // 因为 keyString === 'a string'
 //key 是对象
var myMap = new Map();
var keyObj = {};
myMap.set(keyObj, "和键 keyObj 关联的值");
myMap.get(keyObj); // "和键 keyObj 关联的值"
myMap.get({}); // undefined, 因为 keyObj !== {}