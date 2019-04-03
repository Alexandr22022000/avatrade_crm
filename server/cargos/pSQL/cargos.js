module.exports = {
    ADD_CARGOS: 'INSERT INTO cargos(id, name, article) VALUES($1, $2, $3)',
    GET_CARGOS: 'SELECT id, name, article, status FROM cargos WHERE status = 0',
    GET_CARGOS_ALL: 'SELECT id, name, article, status FROM cargos',
    CHECK_CARGOS: 'SELECT id FROM cargos WHERE name = $1 or article = $2',
    SET_CARGO: 'UPDATE cargos SET name=$2, article=$3 WHERE id=$1',
    SET_CARGO_STATUS: 'UPDATE cargos SET status=$2 WHERE id=$1',
};