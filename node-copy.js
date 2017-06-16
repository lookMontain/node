var fs = require("fs");

function copyFile(src, dest) {
    varfile = fs.readFileSync(src); //根据文件路劲读取文件
    fs.writeFileSync(dest, varfile); //将内容写入文件  
    //管道读写,管道连接了输入输出流，可以实现大文件拷贝
    //fs.createReadStream(src).pipe(fs.createWriteStream(dest));
}

function main(argv) {
    copyFile(argv[0], argv[1]);
}
main(process.argv.slice(2)); //接受命令参数

//在终端执行 node node-copy  'one.txt'  'two.txt'