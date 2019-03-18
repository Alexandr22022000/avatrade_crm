import {connect} from 'react-redux';
import Services from "../components/Services";
import getServices from "../async-actions/getServices";
import changeFilter from '../actions/changeFilter';
import setCurrentService from "../actions/setCurrentService";
import {getCargos} from "../../warehouse/async-actions/getCargos";

export default connect(
	state => ({
		services: state.services.services,
		filter: state.services.filter,
	}),
	dispatch => ({
		onLoadServices: () => dispatch(getServices()),
		onFilterChange: (search,is_product,is_del) => dispatch(changeFilter(search,is_product,is_del)),
		onSetCurrentService: (service) => dispatch(setCurrentService(service)),
		onGetCargos: () => dispatch(getCargos('')),
	})
)(Services)
