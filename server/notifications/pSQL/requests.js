module.exports = {
    GET_REQUESTS: 'SELECT migrations_requests.id, migrations_requests.to_id, migrations_requests.sender_id, migrations_requests.stocks, users.name AS sender, stores.name AS to FROM migrations_requests JOIN users ON migrations_requests.sender_id = users.id JOIN stores ON migrations_requests.to_id = stores.id WHERE migrations_requests.status = 0',
};