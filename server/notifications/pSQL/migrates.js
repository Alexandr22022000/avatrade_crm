module.exports = {
    GET_MIGRATES: 'SELECT migrates.id, migrates.from_id, migrates.to_id, migrates.stocks, migrates.sender_id, users.name AS sender, stores.name AS from, store.name AS to FROM migrates JOIN users ON migrates.sender_id = users.id JOIN stores ON migrates.from_id = stores.id JOIN stores store ON migrates.to_id = store.id WHERE migrates.recipient_id = -1'
};