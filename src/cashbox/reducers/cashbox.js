import {SET_FAST_SERVICES} from "../actions/types";

const defaultState = {
	fastServices:[],
};

const cashbox = (state = defaultState, action) => {
	switch (action.type) {
		case SET_FAST_SERVICES:
			return {
				...state,
				fastServices: action.fastServices
			};
		default:
			return state;
	}
};

export default cashbox;