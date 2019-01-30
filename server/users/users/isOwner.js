const {query} = require('neuronex-pg'),
    QUERY = require('../pSQL/users');

module.exports = (id) => {
    return new Promise((resolve, reject) => {
        query(QUERY.CHECK_USER_OWNER, [id])
            .then(({rows}) => {
                resolve(rows.length === 1);
            });
    });
};