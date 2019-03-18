const {checkUser} = require('neuronex-login-backend'),
    {query} = require('neuronex-pg'),
    pdf = require('html-pdf'),
    generateHtml = require('../../pdf/request'),
    QUERY_CARGOS = require('../../pSQL/cargos'),
    QUERY_REQUESTS = require('../../pSQL/requests');

module.exports = (app) => {
    app.get('/api/v0.0/create_request_pdf', (req, res) => {
        let id = req.query.id;

        const user = checkUser(req.query.token);
        if (!user) return res.status(401).end();

        query(QUERY_REQUESTS.GET_REQUEST, [id])
            .then(request => {
                query(QUERY_CARGOS.GET_CARGOS, [null])
                    .then(cargos => {
                        request = request.rows[0];
                        request.stocks = request.stocks.stocks.map(stock => {
                            for (let key in cargos.rows) {
                                if (+cargos.rows[key].id === +stock.id) {
                                    stock.name = cargos.rows[key].name;
                                    stock.article = cargos.rows[key].article;
                                    return stock;
                                }
                            }

                            stock.name = "Удален";
                            stock.article = "Удален";
                            return stock;
                        });

                        request = generateHtml(request);
                        const filename = 'migration_request_' + Date.now() + '.pdf';

                        pdf.create(request, { format: 'Letter' }).toFile('./temp/' + filename, (err, ress) => {
                            if (err) return console.log(err);

                            res.status(200).json({link: '/api/v0.0/temp_pdf/' + filename});
                        });
                    });
            });
    });
};