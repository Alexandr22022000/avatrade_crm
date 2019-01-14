module.exports = {
    LOGIN: 'SELECT id, permissions FROM users WHERE email = $1 and password = $2',
};