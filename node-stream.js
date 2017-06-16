/*stream-数据流*/
var http = require("http");
var fs = require("fs");
/*var filename = "big.txt";
var serv = http.createServer(function(req, res) {
    var stat = fs.statSync(filename);
    res.writeHeader(200, {
        "Content-Length": stat.size
    });
    var fReadStream = fs.createReadStream(filename);
    fReadStream.on('data', function(chunk) {

        if (!res.write(chunk)) { //判断写缓冲区是否写满(node的官方文档有对write方法返回值的说明)
            console.log('暂停')
            fReadStream.pause(); //如果写缓冲区不可用，暂停读取数据
        }
    });
    fReadStream.on('end', function() {
        res.end();
    });
    res.on("drain", function() { //写缓冲区可用，会触发"drain"事件
        console.log('继续')
        fReadStream.resume(); //重新启动读取数据
    });
});

serv.listen(8888);*/

/*如果写入速度跟不上读取速度的话，只写数据流内部的缓存会爆仓。
我们可以根据.write方法的返回值来判断传入的数据是写入目标了，还是临时放在了缓存了
，并根据drain事件来判断什么时候只写数据流已经将缓存中的数据写入目标，可以传入下一个待写数据了
//或者使用pipe函数
*/

function streamCopy(src, dst) {

    var rs = fs.createReadStream(src);
    var ws = fs.createWriteStream(dst);
    var fig = 0;
    rs.on('data', function(chunk) {
        var writeIS = ws.write(chunk)
        if (writeIS === false) {
            console.log('暂停读取数据');
            fig++;
            rs.pause();
        }
    });

    rs.on('end', function() {
        ws.end();
        console.log('数据流中断次数：   ' + fig)
    });

    ws.on('drain', function() {
        console.log('继续读取数据')
        fig++;
        rs.resume();
    });
    //第二种使用pipe函数：它以用来把当前的可读流和另外一个可写流连接起来
    /*rs.pipe(ws);
    ws.on('close', function() {
        console.log('写入完毕')
    })*/
}
streamCopy('stream1.txt', 'stream2.txt');