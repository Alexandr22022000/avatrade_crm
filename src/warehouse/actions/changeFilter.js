import {CHANGE_FILTER} from './types';

const changeFilter = (search, store, is_all) => ({
    type: CHANGE_FILTER,
    search,
    store,
    is_all,
});

export default changeFilter;