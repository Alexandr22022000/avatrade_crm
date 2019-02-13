import {SET_ACTIVE_MIGRATION} from './types';

const setActiveMigrations = (migrate) => ({
    type: SET_ACTIVE_MIGRATION,
    migrate,
});

export default setActiveMigrations;