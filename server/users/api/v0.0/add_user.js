const {query} = require('neuronex-pg'),
    {checkUser} = require('neuronex-login-backend'),
    {sendMsg} = require('neuronex_mailer'),
    checkPermissions = require('../../../core/users/checkPermissions'),
    FirebaseTokenGenerator = require('firebase-token-generator'),
    getStartedMsg = require('../../email/get_started'),

    QUERYES = require('../../pSQL/users'),
    QUERYES_SETTINGS = require('../../pSQL/settings'),
    QUERYES_TOKENS = require('../../pSQL/tokens'),
    PERMISSIONS = require('../../../core/constants/permissions'),
    TOKENS = require('../../../core/constants/tokens'),
    CONFIG = require('../../../core/config'),

    tokenGenerator = new FirebaseTokenGenerator("Development secret");

module.exports = (app) => {
    app.post('/api/v0.0/add_user', (req, res) => {
        const user = checkUser(req.body.token);

        if (!user) return res.status(401).end();
        if (!checkPermissions(user, [PERMISSIONS.OWNER, PERMISSIONS.TOP_MANAGER])) return res.status(403).end();

        const id = Date.now();
        query(QUERYES.ADD_USER, [id, req.body.email, null, req.body.permissions, req.body.name, req.body.phone, req.body.vk, req.body.address, req.body.rank, req.body.docs])
            .then(() => {
                query(QUERYES_SETTINGS.ADD, [id, []])
                    .then(() => {});

                const token = tokenGenerator.createToken({
                    uid: 'eb61e19f-d2a2-466e-a2b5-f759258a1166',
                    some: "Development data",
                    data: id,
                });

                query(QUERYES_TOKENS.UPDATE_TOKENS, [Date.now() - 24 * 60 * 60 * 1000])
                    .then(() => {
                        query(QUERYES_TOKENS.ADD_TOKEN, [id + 1, id, TOKENS.CHANGE_PASSWORD, token])
                            .then(() => {
                                sendMsg({
                                    from: `Avatrade <${CONFIG.EMAIL_SERVER.auth.user}>`,
                                    to: req.body.email,
                                    subject: "Добро пожаловать в Avatrade",
                                    html: getStartedMsg(`${CONFIG.DOMAIN}/recover_password?token=${token}`),
                                })
                                    .then(() => {
                                        res.status(200).end();
                                    });
                            });
                    });
            });
    });
};