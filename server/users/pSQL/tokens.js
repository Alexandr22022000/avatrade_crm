module.exports = {
    ADD_TOKEN: 'INSERT INTO tokens(id, user_id, type, token) VALUES($1, $2, $3, $4)',
    CHECK_TOKEN: 'SELECT id, user_id FROM tokens WHERE token = $1 AND type = $2',
    UPDATE_TOKENS: 'DELETE FROM tokens WHERE id < $1',
    DELETE_TOKEN: 'DELETE FROM tokens WHERE id = $1',
};