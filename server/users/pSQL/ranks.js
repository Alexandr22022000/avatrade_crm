module.exports = {
    GET_RANKS: 'SELECT id, name, payment, status FROM ranks WHERE status = 0',
    SET_RANK: 'UPDATE ranks SET name=$2, payment=$3 WHERE id=$1',
    ADD_RANK: 'INSERT INTO ranks(id, name, payment, status) VALUES ($1,$2, $3, $4)',
    SET_RANK_STATUS: 'UPDATE ranks SET status=$2 WHERE id=$1',
};