// 计算字符串abc的md5
toastLog(crypto.digest("abc", "MD5"));
// 计算字符串abc的sha-256
toastLog(crypto.digest("abc", "SHA-256"));
// 计算文件/sdcard/1.txt的md5
// toastLog(crypto.digest("/sdcard/1.txt", "MD5", {
//     input: "file"
// }));