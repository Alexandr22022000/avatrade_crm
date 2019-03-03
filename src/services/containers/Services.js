import {connect} from 'react-redux';
import Services from "../components/Services";
import changeFilterServ from "../actions/changeFilterServ";

export default connect(
	state => ({
		filter: state.services.filter,
	}),
	dispatch => ({
		onFilterChange: (search, servType, is_all)=>dispatch(changeFilterServ(search,servType,is_all))
	})
)(Services)
