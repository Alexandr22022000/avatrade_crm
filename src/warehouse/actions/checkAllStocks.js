import {CHECK_ALL_STOCK} from './types';

const checkAllStock = (check) => ({
    type: CHECK_ALL_STOCK,
    check,
});

export default checkAllStock;