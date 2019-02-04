import {CARGOS_UPDATE} from "./types";

export const setCargos = (cargos) => ({
    type: CARGOS_UPDATE,
    cargos,
});