let moduless = {
    exportss: {}
};
let exportss = moduless.exportss;
exportss.name = 'one';
exportss.test = function() {
    console.log('ceshi-one')
};
console.log(moduless);

// 不过 ① exports 是一个引用，直接赋值给它，只是让这个变量等于另外一个引用
exportss = {
        name: 'two',
        test: function() {
            console.log('two-test')
        }
    }
    // 并不会修改到导出的对象
console.log(moduless);

//正确的写法
moduless.exportss = {
        name: 'Bob',
        test: function(a, b) {
            return a + b;
        }
    }
    // ∵① 所以 只有通过 module.exports 才能真正修改到 exports 本身
console.log(moduless);