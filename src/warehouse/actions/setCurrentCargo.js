import {SET_CURRENT_CARGO} from "./types";

const setCurrentCargo = (cargo) => ({
    type: SET_CURRENT_CARGO,
    cargo,
});

export default setCurrentCargo;