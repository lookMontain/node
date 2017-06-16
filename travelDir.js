//遍历文件夹
let fs = require('fs');
let path = require('path');

function travelDir(dir, callback) {
    fs.readdirSync(dir).forEach(function(file) {
        let pathname = path.join(dir, file); //将多个参数组合成一个 path
        if (fs.statSync(pathname).isDirectory()) {
            travelDir(pathname, callback);
        } else {
            callback(pathname)
        }
    });
}

function printDir(argv) {
    travelDir(argv[0], function(pathname) {
        console.log(pathname)
    })
}
printDir(process.argv.slice(2));