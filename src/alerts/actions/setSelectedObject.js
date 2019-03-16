import {SET_SELECTED_OBJECT} from './types';

const setSelectedObject = (object, object_type) => ({
    type: SET_SELECTED_OBJECT,
    object,
    object_type,
});

export default setSelectedObject;