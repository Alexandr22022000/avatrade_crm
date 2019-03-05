module.exports = {
    GET_STOCKS_BY_STORE: 'SELECT id, cargo_id, count FROM stocks WHERE stocks.store_id = $1',
    DECREASE_STOCKS: 'UPDATE stocks SET count = count - $2 WHERE id = $1'
};