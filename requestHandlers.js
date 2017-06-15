var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response) {
    console.log("Request handler 'start' was called.");

    var body = `<html>
        <head>
        <meta http-equiv="Content-Type" content="text/html"
        charset="UTF-8" />
        </head>
        <body>
        <form action="/upload" enctype="multipart/form-data" 
        method="post">
        <input type="file" name="upload" multiple="multiple">
        <input type="submit" value="Upload file" />
        </form>
        </body>
        </html>`;

    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    console.log("about to parse");
    //该方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        //fs.renameSync(oldPath, newPath)--oldPath  原路径 newPath 新路径
        fs.renameSync(files.upload.path, "/tmp/test.png");
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        //response.write(files);
        response.write("received image:<br/>");
        response.write('<img src="/show" />');
        response.end();
    });
}

function show(response) {
    console.log("Request handler 'show' was called.");
    /* 
    fs.readFile(filename, [encoding], [callback(err,data)])
       filename    文件路径
       options      option对象，包含 encoding，编码格式，该项是可选的。
       callback      回调，传递2个参数 异常err 和 文件内容 data*/
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
        if (error) {
            response.writeHead(500, {
                "Content-Type": "text/plain"
            });
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {
                "Content-Type": "image/png"
            });
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;