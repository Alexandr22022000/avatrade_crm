const {query} = require('neuronex-pg'),
    {sendMsg} = require('neuronex_mailer'),
    FirebaseTokenGenerator = require('firebase-token-generator'),
    recoverPasswordMsg = require('../../email/recover_password'),

    QUERYES = require('../../pSQL/users'),
    QUERYES_TOKENS = require('../../pSQL/tokens'),
    TOKENS = require('../../../core/constants/tokens'),
    CONFIG = require('../../../core/config'),

    tokenGenerator = new FirebaseTokenGenerator("Development secret");

module.exports = (app) => {
    app.post('/api/v0.0/start_recover_password', (req, res) => {
        query(QUERYES.CHECK_USER, [req.body.email])
            .then(({rows}) => {
                if (rows.length !== 1) return res.status(401).end();

                const token = tokenGenerator.createToken({
                    uid: 'eb61e19f-d2a2-466e-a2b5-f759258a1166',
                    some: "Development data",
                    data: Date.now(),
                });

                query(QUERYES_TOKENS.UPDATE_TOKENS, [Date.now() - 24 * 60 * 60 * 1000])
                    .then(() => {
                        query(QUERYES_TOKENS.ADD_TOKEN, [Date.now(), rows[0].id, TOKENS.CHANGE_PASSWORD, token])
                            .then(() => {
                                sendMsg({
                                    from: `Avatrade <${CONFIG.EMAIL_SERVER.auth.user}>`,
                                    to: req.body.email,
                                    subject: "Смена пароля",
                                    html: recoverPasswordMsg(`${CONFIG.DOMAIN}/recover_password?token=${token}`),
                                })
                                    .then(() => {
                                        res.status(200).end();
                                    });
                            });
                    });
            });
    });
};