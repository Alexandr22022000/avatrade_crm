import {SET_MIGRATES} from "./types";

export const setMigrates = (migrates) => ({
    type: SET_MIGRATES,
    migrates,
});
