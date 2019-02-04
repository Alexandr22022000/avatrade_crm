module.exports = {
    ADD_MIGRATE: 'INSERT INTO migrates(id, from_id, to_id, stocks, sender_id, recipient_id) VALUES($1, $2, $3, $4, $5, -1)',
};