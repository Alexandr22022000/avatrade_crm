module.exports = (stores, data, daysCount) => {
    let turnoverValueAll = 0,
        endMoney = 0,
        startMoney = 0,
        days = stores[0].values.map(() => ({
            pco: 0,
            acquiring: 0,
            account: 0,
            rco: 0,
        }));

    stores.sort((a, b) => +a.id > +b.id ? 1 : (+a.id === +b.id ? 0 : -1));

    stores.forEach(store => {
        let oldMoney = 0, turnoverValue = 0;
        data.oldSells.forEach(sell => {
            if (store.id === sell.store_id)
                oldMoney += sell.price + sell.price_resell;
        });

        data.oldCollections.forEach(collection => {
            if (store.id === collection.store_id)
                oldMoney -= collection.value;
        });

        store.startValue = oldMoney;
        let totalPco = 0,
            totalAcquiring = 0,
            totalAccount = 0,
            totalRco = 0;

        store.values.forEach((item, index) => {
            turnoverValue += item.pco;
            turnoverValue += item.acquiring;
            oldMoney += item.pco;
            oldMoney -= item.rco;
            totalPco += item.pco;
            totalAcquiring += item.acquiring;
            totalAccount += item.account;
            totalRco += item.rco;

            days[index].pco += item.pco;
            days[index].acquiring += item.acquiring;
            days[index].account += item.account;
            days[index].rco += item.rco;
        });

        store.values[0].pco = totalPco;
        store.values[0].acquiring = totalAcquiring;
        store.values[0].account = totalAccount;
        store.values[0].rco = totalRco;
        store.endValue = oldMoney;
        store.turnoverValue = turnoverValue;
        delete store.id;

        days[0].pco += totalPco;
        days[0].acquiring += totalAcquiring;
        days[0].account += totalAccount;
        days[0].rco += totalRco;
        turnoverValueAll += turnoverValue;
        endMoney += oldMoney;
        startMoney += store.startValue;
    });

    const allStores = {
        values: days,
        endValue: endMoney,
        startValue: startMoney,
        turnoverValue: turnoverValueAll,
        name: "Все подразделения",
    };

    stores = [allStores, ...stores];

    return stores;
};