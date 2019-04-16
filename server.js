const express = require('express'),
    bodyParser = require('body-parser'),
    n_login = require('neuronex-login-backend'),
    n_pg = require('neuronex-pg'),
    n_mailer = require('neuronex_mailer'),
    fs = require('fs'),
    path = require('path'),

    coreApi = require('./server/core/api'),
    usersApi = require('./server/users/api'),
    cargosApi = require('./server/cargos/api'),
    storesApi = require('./server/stores/api'),
    notificationsApi = require('./server/notifications/api'),
    cashboxApi = require('./server/cashbox/api'),
    servicesApi = require('./server/services/api'),
    statisticApi = require('./server/statistic/api'),
    checkUser = require('./server/core/users/login'),
    planningApi = require('./server/planning/api'),
    CONFIG = require('./server/core/config'),

    app = express();

app.set('port', (process.env.PORT || CONFIG.PORT));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
n_login.setConfig(checkUser);
n_pg.setConfig(CONFIG.DATABASE_URL);
n_mailer.setConfig(CONFIG.EMAIL_SERVER);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

coreApi(app);
usersApi(app);
cargosApi(app);
storesApi(app);
notificationsApi(app);
cashboxApi(app);
servicesApi(app);
statisticApi(app);
planningApi(app);

app.use(express.static('build'));

app.get('/*', (req, res) => {
    const stream = fs.createReadStream(path.resolve('build/index.html'));
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    stream.pipe(res);
});

app.listen(app.get('port'), () => console.log('Server is started on port ' + app.get('port')));