module.exports = {
    ADD_SALE: 'INSERT INTO sales(id, user_id, store_id, services, price, price_resell, is_card) VALUES($1, $2, $3, $4, $5, $6, $7)',
    STATISTIC_MONEY: 'SELECT SUM(price) AS price, SUM(price_resell) AS price_resell FROM sales WHERE store_id = $1 AND is_card = false',
};