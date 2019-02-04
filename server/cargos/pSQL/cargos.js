module.exports = {
    ADD_CARGOS: 'INSERT INTO cargos(id, name, article) VALUES($1, $2, $3)',
    GET_CARGOS: 'SELECT id, name, article FROM cargos WHERE (LOWER(cargos.name) like LOWER($1) OR LOWER(cargos.article) like LOWER($1)) OR $1 IS NULL',
    CHECK_CARGOS: 'SELECT id FROM cargos WHERE name = $1 or article = $2',
};