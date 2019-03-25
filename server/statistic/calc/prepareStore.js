module.exports = (stores, data) => {
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

        store.values.forEach(item => {
            turnoverValue += item.pco;
            turnoverValue += item.acquiring;
            oldMoney += item.pco;
            oldMoney -= item.rco;
            totalPco += item.pco;
            totalAcquiring += item.acquiring;
            totalAccount += item.account;
            totalRco += item.rco;
        });

        store.values[0].pco = totalPco;
        store.values[0].acquiring = totalAcquiring;
        store.values[0].account = totalAccount;
        store.values[0].rco = totalRco;
        store.endValue = oldMoney;
        store.turnoverValue = turnoverValue;
        delete store.id;
    });

    return stores;
};