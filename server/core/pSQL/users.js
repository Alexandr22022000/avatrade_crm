module.exports = {
    LOGIN: 'SELECT id, permissions, name FROM users WHERE email = $1 and password = $2 and status = 0',
};