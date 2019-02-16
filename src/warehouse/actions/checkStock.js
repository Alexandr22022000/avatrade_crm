import {CHECK_STOCK} from './types';

const checkStock = (index, isBuffer) => ({
    type: CHECK_STOCK,
    index,
    isBuffer,
});

export default checkStock;