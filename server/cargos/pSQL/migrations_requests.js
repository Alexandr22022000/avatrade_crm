module.exports = {
    GET_REQUEST: 'SELECT migrations_requests.id, migrations_requests.to_id, migrations_requests.sender_id, migrations_requests.stocks, users.name AS sender, stores.name AS to FROM migrations_requests JOIN users ON migrations_requests.sender_id = users.id JOIN stores ON migrations_requests.to_id = stores.id WHERE migrations_requests.id = $1',
    GET_REQUESTS: 'SELECT migrations_requests.id, migrations_requests.to_id, migrations_requests.sender_id, migrations_requests.stocks, users.name AS sender, stores.name AS to FROM migrations_requests JOIN users ON migrations_requests.sender_id = users.id JOIN stores ON migrations_requests.to_id = stores.id',
    UPDATE_REQUESTS: 'UPDATE migrations_requests SET to_id = $2, stocks = $3 WHERE id = $1',
    ADD_REQUESTS: 'INSERT INTO migrations_requests(id, to_id, sender_id, stocks, status) VALUES($1, $2, $3, $4, 0)',
};