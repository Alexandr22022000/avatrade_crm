import {CHANGE_FILTER} from "../actions/types";

const defaultState = {
	filter: {
		search:'',
		servType: null,
		is_all: true
	}
};

const services = (state = defaultState, action) => {
	switch (action.type) {
		case CHANGE_FILTER:
			return {
				...state,
				filter: {
					search: action.search,
					servType: action.servType,
					is_all: action.is_all,
				}
			};
		default:
			return state;
	}
};

export default services;