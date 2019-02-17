module.exports = {
    STORES_GET: 'SELECT id, address, name, status FROM stores WHERE status = 0 OR $1',
    ADD_STORE: 'INSERT INTO stores(id, name, address, status) VALUES($1, $2, $3, 0)',
    CHECK_STORE: 'SELECT id FROM stores WHERE (name = $1 or address = $2) and (id != $3 or $3 IS NULL)',
    SET_STORE: 'UPDATE stores SET name = $2, address = $3 WHERE id = $1',
    SET_STORE_STATE: 'UPDATE stores SET status = $2 WHERE id = $1',
};