const test = require ('./test');
const token = require ('./token');

module.exports = function(app) {
    test(app);
    token(app);
}