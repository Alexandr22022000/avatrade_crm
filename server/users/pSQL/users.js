module.exports = {
    GET_USERS_WORK: 'SELECT users.id, ranks.name AS rank, users.name, users.phone FROM users JOIN ranks ON users.rank = ranks.id WHERE users.status = 0',
    GET_USERS_ALL: 'SELECT users.id, ranks.name AS rank, users.name, users.phone FROM users JOIN ranks ON users.rank = ranks.id',
    GET_USER: 'SELECT name, phone, rank, permissions, address, email, docs, vk FROM users WHERE id = $1',

    ADD_USER: 'INSERT INTO users(id, email, password, permissions, name, phone, vk, address, rank, docs, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 0)',
    SET_USER: 'UPDATE users SET email = $2, permissions = $3, name = $4, phone = $5, vk = $6, address = $7, rank = $8, docs = $9 WHERE id = $1',
    SET_USER_STATUS: 'UPDATE users SET status = $2 WHERE id = $1',
    SET_USER_PASSWORD: 'UPDATE users SET password = $2 WHERE id = $1',

    CHECK_USER: 'SELECT id FROM users WHERE email = $1',
};