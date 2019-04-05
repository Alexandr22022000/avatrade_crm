const getData = require('./getData'),
    calcStores = require('./calcStores'),
    calcUsers = require('./calcUsers'),
    getMonth = require('./getMonth'),
    prepareStore = require('./prepareStore'),
    prepareUsers = require('./prepareUsers');

module.exports = (date) => {
    return new Promise((resolve, reject) => {
        const {start, end, days} = getMonth(+date);
        getData(start, end)
            .then((data) => {
                let stores = calcStores(data, days);
                stores = prepareStore(stores, data, days);

                let statistic = calcUsers(data, days, start.getTime());
                statistic = prepareUsers(statistic);

                statistic.turnover = stores;
                resolve(statistic);
            });
    });
};