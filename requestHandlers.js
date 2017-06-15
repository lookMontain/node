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
    console.log(request);
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    //该方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        //判断文件夹是否存在
        fs.exists(__dirname + '/uplodImg', function(exists) {
            var retTxt = exists ? retTxt = '文件存在' : '文件不存在';
            console.log(retTxt);
            if (exists) {
                fs.readdir(__dirname + '/uplodImg', function(err, filess) {
                    if (err) {
                        console.error(err);
                        return;
                    } else {
                        //fs.renameSync(oldPath, newPath)--oldPath  原路径 newPath 新路径
                        fs.renameSync(files.upload.path, __dirname + '/uplodImg/test.png');
                        response.writeHead(200, {
                            "Content-Type": "text/html"
                        });
                        //response.write(files);
                        response.write("received image:<br/>");
                        response.write('<img src="/show" />');
                        response.end();
                    }
                })
            } else {
                //创建文件夹
                fs.mkdir(__dirname + '/uplodImg', function(err) {
                    if (err)
                        throw err;
                    console.log('创建目录成功');
                    fs.readdir(__dirname + '/uplodImg', function(err, filess) {
                        if (err) {
                            console.error(err);
                            return;
                        } else {
                            //fs.renameSync(oldPath, newPath)--oldPath  原路径 newPath 新路径
                            fs.renameSync(files.upload.path, __dirname + '/uplodImg/test.png');
                            response.writeHead(200, {
                                "Content-Type": "text/html"
                            });
                            //response.write(files);
                            response.write("received image:<br/>");
                            response.write('<img src="/show" />');
                            response.end();

                        }
                    })
                });
            }
        });

    });
}
//删除文件和里面的文件
function deleteall(path) {
    var files = [];
    //检查路径是否存在
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path); //方法将返回一个包含“指定目录下所有文件名称”的数组对象。
        files.forEach(function(file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse  
                deleteall(curPath);
            } else { // delete file  
                fs.unlinkSync(curPath); //同步版的 unlink() ，删除文件操作。
            }
        });
        fs.rmdirSync(path); //删除文件夹
    }
};

function show(response) {
    console.log("Request handler 'show' was called.");
    /* 
    fs.readFile(filename, [encoding], [callback(err,data)])
       filename    文件路径
       options      option对象，包含 encoding，编码格式，该项是可选的。
       callback      回调，传递2个参数 异常err 和 文件内容 data*/
    console.log('根目录：       ' + __dirname);
    fs.readFile(__dirname + '/uplodImg/test.png', "binary", function(error, file) {
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
            console.log("准备删除目录 uplodImg");
            deleteall(__dirname + '/uplodImg');
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;