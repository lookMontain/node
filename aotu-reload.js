let fs = require('fs');
let reload = require('auto-reload');
let data = reload('./data');
setInterval(function() {
    console.log(data.name)
}, 1000);
setInterval(function() {
    console.log('updata----data.json');
    let data = '{"name":"' + random(1000, 9000) + '"}';
    fs.writeFile('./data.json', data);
}, 5000);
let random = function(min, max) {
    let rang = max - min;
    let rand = Math.random();
    return (min + Math.random(rang * rand));
}