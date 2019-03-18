const {checkUser} = require('neuronex-login-backend'),
    fs = require('fs'),
    path = require('path');

module.exports = (app) => {
    app.get('/api/v0.0/temp_pdf/:name', (req, res) => {
        let filename = req.params.name;

        const user = checkUser(req.query.token);
        if (!user) return res.status(401).end();

        const stream = fs.createReadStream(path.resolve('temp/' + filename));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/pdf');
        stream.pipe(res);
    });
};