import {CHANGE_FILTER, SET_CONSUMABLES, SET_CURRENT_SERVICE, SET_SERVICES} from "../actions/types";

const defaultState = {
	filter: {
		search: '',
		is_product: null,
		is_del: null,
	},
	services: [],
	currentService: null,
	currentConsumables: [],
};

const services = (state = defaultState, action) => {
	switch (action.type) {
		case SET_CURRENT_SERVICE:
			return {
				...state,
				currentService: action.service
			};
		case SET_SERVICES:
			return {
				...state,
				services: action.services,
			};
		case CHANGE_FILTER:
			console.log(action.filter);
			return {
				...state,
				filter: action.filter,
			};
		case SET_CONSUMABLES:
			return {
				...state,
				currentConsumables: action.consumables,
			};
		default:
			return state;
	}
};

export default services;