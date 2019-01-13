const express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    path = require('path'),
    app = express();

app.set('port', (process.env.PORT || 4000));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('build'));

app.get('/*', (req, res) => {
    const stream = fs.createReadStream(path.resolve('build/index.html'));
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    stream.pipe(res);
});

app.listen(app.get('port'), () => console.log('Server is started on port ' + app.get('port')));