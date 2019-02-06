module.exports = {
    STORES_GET: 'SELECT id, address, name FROM stores',
    ADD_STORE: 'INSERT INTO stores(id, name, address) VALUES($1, $2, $3)',
    CHECK_STORE: 'SELECT id FROM stores WHERE (name = $1 or address = $2) and (id != $3 or $3 IS NULL)',
    SET_STORE: 'UPDATE stores SET name = $2, address = $3 WHERE id = $1',
};