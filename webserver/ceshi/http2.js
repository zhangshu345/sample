var http  = require('http');
const url =require('url');

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  console.log(request.url)
  if(request.url=="/favicon.ico"){
    var userinfo=url.parse(request.url,true).query;
    console.log("姓名: ${userinfo.name}-- ${userinfo.age}")
  }
 
  response.end('Hello World');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');