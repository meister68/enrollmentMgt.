var http = require("http");
var url = require('url');
var data = require('./scripts/data');
var readData = require('./scripts/readLine');
var show = require('./scripts/show');



var server = http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' });

    var path = url.parse(request.url, true);
    var filename = "." + path.pathname + "index.html";
    if (path.pathname === '/') {
        show.show(filename, response);
    } else if (path.pathname.includes("/class/")) {
        filename = path.pathname
        readData.read(filename, response);
    } else if (path.pathname === '/enroll') {
        data.dataHandler(request);
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        return response.end("404 Not Found");
    }


}); server.listen(8080)