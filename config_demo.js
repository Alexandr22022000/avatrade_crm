module.exports = {
    DATABASE_URL: 'postgres://postgres:0000@localhost:5432/avatrade_crm',
    DOMAIN: 'http://localhost:4000',
    PORT: 4000,
    EMAIL_SERVER: {
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
            user: '',
            pass: '',
        },
    },
};