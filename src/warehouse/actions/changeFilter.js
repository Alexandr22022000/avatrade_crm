import {CHANGE_FILTER} from './types';

const changeFilter = (search, store, is_all, is_del) => ({
    type: CHANGE_FILTER,
    search,
    store,
    is_all,
    is_del,
});

export default changeFilter;