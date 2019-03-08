module.exports = {
    SERVICES_GET: 'SELECT id, name, is_product, price, consumables, status FROM services WHERE (LOWER(name) like LOWER($1) OR $1 IS NULL) AND (status = $2 OR IS NULL $2) (is_product = $3 OR IS NULL $3)',
    ADD_SERVICES: 'INSERT INTO services(id, name, is_product, price, consumables, status) VALUES($1, $2, $3, $4, $5, 0)',
    SERVICES_STATUS: 'UPDATE services SET status = $2 WHERE id = $1',
    SET_SERVICES: 'UPDATE services SET name = $2, is_product = $3, price = $4, consumables = $5 WHERE id = $1'
};