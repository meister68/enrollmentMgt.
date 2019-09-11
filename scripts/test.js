var http = require("http");
var fs = require('fs');
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
        var sub = path.pathname.split("/");
        filename = sub[sub.length - 1] + ".csv";

        readData.read(filename, response);

    } else if (path.pathname === '/enroll') {
        //filename = "index.html";
        data.dataHandler(request);
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        return response.end("404 Not Found");
    }


}); server.listen(8080)