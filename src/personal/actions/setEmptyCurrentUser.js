import {SET_EMPTY_USER} from "./types";

export const setEmptyCurrentUser = () => ({
    type:SET_EMPTY_USER,
    user: {
        email: '',
        name: '',
        rank: 0,
        phone: '',
        permissions: [],
        address: '',
        vk: '',
        docs: [],
    }
});
