module.exports = {
    ADD_SALE: 'INSERT INTO sales(id, user_id, store_id, services, price, price_resell, is_card, number) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
    STATISTIC_MONEY: 'SELECT SUM(price) AS price, SUM(price_resell) AS price_resell FROM sales WHERE store_id = $1 AND is_card = false',
    COUNT_SALES_BY_MONTH: 'SELECT COUNT(*) FROM sales WHERE id BETWEEN $1 AND $2;',
    //(Start, End, manager_id, store_id, search_string)
    GET_SELLS: 'SELECT sales.id AS date, stores.name AS store, sales.store_id, users.name as manager, sales.user_id as manager_id, sales.price + sales.price_resell as price, sales.services, sales.number FROM sales JOIN stores ON sales.store_id = stores.id JOIN users ON sales.user_id = users.id WHERE (sales.id BETWEEN $1 AND $2) AND ((sales.user_id = $3) OR $3 IS NULL) AND ((sales.store_id = $4) OR $4 IS NULL) ORDER BY sales.id DESC;',
    GET_SERVICES: 'SELECT * FROM services;'
};