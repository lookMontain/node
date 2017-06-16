let head = require('./head');
let body = require('./body');

function createPerson(name) {
    return {
        name: name,
        head: head.createhead(),
        body: body.createbody()
    };
}
exports.createPerson = createPerson;