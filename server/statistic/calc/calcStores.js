const checkTransactions = require('./checkTransactions'),
    merge = require('./merge');

const createStore = (days, idKey) => (value) => {
    const values = [];
    for (let i = 0; i <= days; i++)
        values.push({
            pco: 0,
            acquiring: 0,
            account: 0,
            rco: 0,
        });
    return {
        id: value[idKey],
        name: value.name,
        values,
    };
};

module.exports = (data, days) => {
    const stores = [];

    checkTransactions(data.sells, stores, createStore(days, 'store_id'), (store, value, day) => {
        if (value.is_card)
            store.values[day].acquiring += value.price + value.price_resell;
        else
            store.values[day].pco += value.price + value.price_resell;
    });

    checkTransactions(data.collections, stores, createStore(days, 'store_id'), (store, value, day) => {
        store.values[day].rco += value.value;
    });

    merge(stores, data.stores, 'id', 'id', createStore(days, 'id'));

    return stores;
};