import {CHANGE_SELLING_SERVS} from "./types";

const setSellingServs = (services) => ({
    type: CHANGE_SELLING_SERVS,
    services
});

export default setSellingServs;