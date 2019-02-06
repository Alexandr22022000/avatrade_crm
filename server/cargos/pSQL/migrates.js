module.exports = {
    ADD_MIGRATES: 'INSERT INTO migrates(id, from_id, to_id, stocks, sender_id, recipient_id) VALUES($1, $2, $3, $4, $5, -1)',
    GET_MIGRATES: 'SELECT migrates.id, migrates.from_id, migrates.to_id, migrates.stocks, migrates.sender_id, users.name AS sender, stores.address AS from, store.address AS to FROM migrates JOIN users ON migrates.sender_id = users.id JOIN stores ON migrates.from_id = stores.id JOIN stores store ON migrates.to_id = store.id WHERE migrates.recipient_id = -1',
    APPROVE_MIGRATE: 'UPDATE migrates SET recipient_id = $2 WHERE id = $1',
    GET_MIGRATE: 'SELECT from_id, to_id, stocks FROM migrates WHERE id = $1 and recipient_id = -1',
};