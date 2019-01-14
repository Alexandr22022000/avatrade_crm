const {query} = require('neuronex-pg'),
    QUERY = require('../pSQL/users');

module.exports = (login, password) => {
    return new Promise((resolve, reject) => {
        query(QUERY.LOGIN, [login, password])
            .then(({rows}) => {
                if (rows.length === 0) return resolve({isUser: false});

                resolve({isUser: true, data: {permissions: rows[0].permissions, id: rows[0].id}});
            });
    });
};