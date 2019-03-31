module.exports = {
    GET_STOCKS: 'SELECT stocks.id, stocks.count, cargos.name, cargos.article, cargos.status, stores.name AS store, stocks.cargo_id, stocks.store_id FROM stocks JOIN cargos ON stocks.cargo_id = cargos.id JOIN stores ON stocks.store_id = stores.id ' +
        'WHERE ((LOWER(cargos.name) like LOWER($1) OR LOWER(cargos.article) like LOWER($1)) OR $1 IS NULL) AND (stocks.store_id = $2 OR $2 IS NULL) AND (stocks.count != 0 OR $3) AND (stores.status = 0)',
    INCREASE_STOCKS: 'UPDATE stocks SET count = count + $2 WHERE cargo_id = $1 AND store_id = $3',
    ADD_STOCKS: 'INSERT INTO stocks(id, cargo_id, store_id, count) VALUES($1, $2, $3, $4)',
    CHECK_STOCK: 'SELECT id FROM stocks WHERE cargo_id = $1 and store_id = $2 and count >= $3',
};