module.exports = {
    GET_ORDERS: 'SELECT orders.id AS data, orders.customer, orders.contacts, orders.ready, orders.store_id, orders.return_store_id, orders.manager_id, orders.name, orders.description, orders.price, orders.paid, orders.note, orders.status, orders.type,  stores.name AS store, store.name AS return_store,  users.name AS manager ' +
                'FROM orders JOIN stores ON orders.store_id = stores.id JOIN stores store ON orders.return_store_id = store.id JOIN users ON orders.manager_id = users.id' +
                'WHERE (orders.date >= $1 AND orders.date <= $2) OR',
    SET_ORDER: '',
    ADD_ORDER: '',
};