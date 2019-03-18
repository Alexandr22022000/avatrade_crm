import {CHANGE_FILTER} from "./types";

const changeFilterServ = (search, servType, is_all) => ({
	type: CHANGE_FILTER,
	search,
	servType,
	is_all,
});

export default changeFilterServ;