const {query} = require('neuronex-pg'),

    QUERYES = require('../../pSQL/users'),
    QUERYES_TOKENS = require('../../pSQL/tokens'),
    TOKENS = require('../../../core/constants/tokens');

module.exports = (app) => {
    app.post('/api/v0.0/recover_password', (req, res) => {
        query(QUERYES_TOKENS.UPDATE_TOKENS, [Date.now() - 24 * 60 * 60 * 1000])
            .then(() => {
                query(QUERYES_TOKENS.CHECK_TOKEN, [req.body.token, TOKENS.CHANGE_PASSWORD])
                    .then(({rows}) => {
                        if (rows.length !== 1) return res.status(401).end();

                        query(QUERYES.SET_USER_PASSWORD, [rows[0].user_id, req.body.password])
                            .then(() => {
                                query(QUERYES_TOKENS.DELETE_TOKEN, [rows[0].id])
                                    .then(() => {
                                        res.status(200).end();
                                    });
                            });
                    });
            });
    });
};