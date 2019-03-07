module.exports = {
    SERVICES_GET: 'SELECT id FROM services',
    ADD_SERVICES: 'INSERT INTO services(id, name, is_product, price,consumables, status) VALUES($1, $2, $3, $4, $5, 0)',
    SERVICES_STATUS: 'UPDATE services SET status = $2 WHERE id = $1',
    SET_SERVICES: 'UPDATE services SET  status = $2 WHERE id = $1',
    CHECK_SERVICES: 'SELECT id FROM services WHERE (name = $1 or price = $4 or is_product = $2) and (id != $3 or $3 IS NULL)',
};