const checkTransactions = require('./checkTransactions'),
    merge = require('./merge'),
    {query} = require('neuronex-pg');

let idIndex = 0;

const createUser = (days) => (value) => {
    const values = [];
    for (let i = 0; i <= days; i++)
        values.push({
            sell: 0,
            resell: 0,
        });
    return {
        id: value.user_id,
        name: value.name,
        values,
    };
};

const createWorkdays = (calendar, days, start) => (user) => {
    const values = [], descriptions = [];
    for (let i = 0; i <= days; i++) {
        values.push(0);
        descriptions.push('');
    }

    idIndex++;
    const id = Date.now() + idIndex;
    query('INSERT INTO workdays(id, user_id, calendar, date, values, descriptions) VALUES($1, $2, $3, $4, $5, $6)', [id, user.id, calendar, start, values, descriptions])
        .then(() => {});

    return {
        id,
        user_id: user.id,
        name: user.name,
        calendar,
        date: start,
        values,
        descriptions,
    };
};

const createPayment = (start) => (user) => {
    idIndex++;
    const id = Date.now() + idIndex;
    query('INSERT INTO payments(id, user_id, date, value) VALUES($1, $2, $3, $4)', [id, user.id, start, 0])
        .then(() => {});

    return {
        id,
        user_id: user.id,
        name: user.name,
        value: 0,
    };
};

const filter = (data, filterArray) => (user, index) => {
    let isOk = true;
    for (let key in data.inactiveUsers) {
        if (+user.id === +data.inactiveUsers[key].id) {
            isOk = false;
            break;
        }
    }
    if (isOk) return true;

    let sum = 0;
    user.values.forEach(value => {
        sum += value.sell;
        sum += value.resell;
    });
    sum = data.payments[index].value;
    data.workdays[index].values.forEach(v => sum += v);
    data.increase_kpi[index].values.forEach(v => sum += v);
    data.decrease_kpi[index].values.forEach(v => sum += v);
    if (sum !== 0) return true;

    query('DELETE FROM workdays WHERE user_id = $1 AND date >= $2 AND date < $3', [user.id, 0, 50])
        .then(() => {});
    query('DELETE FROM payments WHERE user_id = $1 AND date >= $2 AND date < $3', [user.id, 0, 50])
        .then(() => {});
    filterArray[index] = false;
    return false;
};

module.exports = (data, days, start) => {
    let users = [];
    idIndex = 0;

    //create users list by transactions
    checkTransactions(data.user_sells, users, createUser(days), (user, value, day) => {
        user.values[day].sell += value.price;
        user.values[day].resell += value.price_resell;
    }, 'user_id');

    //merge all lists in users
    data.users.forEach(item => item.user_id = item.id);
    merge(users, data.users, 'id', 'id', createUser(days));
    merge(users, data.workdays, 'id', 'user_id', createUser(days));
    merge(users, data.increase_kpi, 'id', 'user_id', createUser(days));
    merge(users, data.decrease_kpi, 'id', 'user_id', createUser(days));
    merge(users, data.payments, 'id', 'user_id', createUser(days));

    //reverse merge
    merge(data.workdays, users, 'user_id', 'id', createWorkdays(0, days, start));
    merge(data.increase_kpi, users, 'user_id', 'id', createWorkdays(3, days, start));
    merge(data.decrease_kpi, users, 'user_id', 'id', createWorkdays(4, days, start));
    merge(data.payments, users, 'user_id', 'id', createPayment(start));

    //sort by username
    users.sort((a, b) => a.name > b.name ? 1 : (a.name === b.name ? 0 : -1));
    data.workdays.sort((a, b) => a.name > b.name ? 1 : (a.name === b.name ? 0 : -1));
    data.increase_kpi.sort((a, b) => a.name > b.name ? 1 : (a.name === b.name ? 0 : -1));
    data.decrease_kpi.sort((a, b) => a.name > b.name ? 1 : (a.name === b.name ? 0 : -1));
    data.payments.sort((a, b) => a.name > b.name ? 1 : (a.name === b.name ? 0 : -1));

    //del dismissed users
    const filterArray = users.map(() => true);
    users = users.filter(filter(data, filterArray));
    data.workdays = data.workdays.filter((i, index) => filterArray[index]);
    data.increase_kpi = data.increase_kpi.filter((i, index) => filterArray[index]);
    data.decrease_kpi = data.decrease_kpi.filter((i, index) => filterArray[index]);
    data.payments = data.payments.filter((i, index) => filterArray[index]);

    return {
        workdays: data.workdays,
        increase_kpi: data.increase_kpi,
        decrease_kpi: data.decrease_kpi,
        payments: data.payments,
        users,
    };
};