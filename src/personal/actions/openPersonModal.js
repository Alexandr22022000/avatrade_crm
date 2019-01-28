import {OPEN_PERSON_MODAL} from "./types";

export const openPersonModal = (id) => {
    return {
        type: OPEN_PERSON_MODAL,
        id
    }
};