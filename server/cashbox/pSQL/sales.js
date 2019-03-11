module.exports = {
    ADD_SALE: 'INSERT INTO sales(id, user_id, store_id, services, price, is_card) VALUES($1, $2, $3, $4, $5, $6)'
};