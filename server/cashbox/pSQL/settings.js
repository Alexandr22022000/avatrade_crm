module.exports = {
    SET: 'UPDATE settings SET fast_sales = $2 WHERE id = $1',
    GET: 'SELECT fast_sales FROM settings WHERE id = $1',
};