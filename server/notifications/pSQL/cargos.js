module.exports = {
    GET_CARGOS: 'SELECT id, name, article FROM cargos WHERE (LOWER(cargos.name) like LOWER($1) OR LOWER(cargos.article) like LOWER($1)) OR $1 IS NULL',
};