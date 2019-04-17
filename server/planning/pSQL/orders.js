module.exports = {
    GET_ORDERS: 'SELECT orders.id AS data, orders.customer, orders.contacts, orders.ready, orders.store_id, orders.return_store_id, orders.manager_id, orders.name, orders.description, orders.price, orders.paid, orders.note, orders.status, orders.type,  stores.name AS store, store.name AS return_store,  users.name AS manager ' +
                'FROM orders JOIN stores ON orders.store_id = stores.id JOIN stores store ON orders.return_store_id = store.id JOIN users ON orders.manager_id = users.id ' +
                'WHERE ((orders.id BETWEEN $1 AND $2) OR ($1 IS NULL AND $2 IS NULL)) AND ((orders.manager_id = $3) OR $3 IS NULL) AND ((orders.store_id = $4) OR $4 IS NULL) AND ((orders.status = $5) OR $5 IS NULL) AND ((orders.type = $6) OR $6 IS NULL) AND ((LOWER(orders.name) like LOWER($7) OR LOWER(orders.customer) like LOWER($7)) OR $7 IS NULL)',
    SET_ORDER: '',
    ADD_ORDER: 'INSERT INTO orders(id, manager_id, store_id, return_store_id, status, type, name, description, note, customer, contacts, ready, price, paid) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
};

//