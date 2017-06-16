let bin = new Buffer([0x68, 0x65, 0x6c, 0x6b, 0x6f]);
bin[0] = 0x48;
//而.slice方法也不是返回一个新的Buffer，而更像是返回了指向原Buffer中间的某个位置的指针
let sub = bin.slice(2);
//因此对.slice方法返回的Buffer的修改会作用于原Buffer
sub[0] = 0x67;
console.log(sub)
console.log(bin);
//转化为字符串
let binStr = bin.toString('utf-8');
console.log(binStr); // >>>hello

//将字符串转化指定编码下的二进制
let foo = new Buffer('hello', 'utf-8');
console.log(foo);

/*拷贝buffer,如果想要拷贝一份Buffer，得首先创建一个新的Buffer，
并通过.copy方法把原Buffer中的数据复制过去。这个类似于申请一块新的内存，并把已有内存中的数据复制过去*/
let dup = new Buffer(bin.length);
bin.copy(dup);
dup[0] = 0x99;
console.log(dup, '------',
    bin)