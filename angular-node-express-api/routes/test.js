var cors = require('cors');

module.exports = function(app) {
    app.use(cors());

    app.post('/test', (req, res) => {
        console.log(req.body);
        res.send({ body: "Hello World" });
    });
}