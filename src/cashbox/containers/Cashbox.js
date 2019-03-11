import {connect} from 'react-redux';
import Cashbox from "../components/Cashbox";
import getFastServices from "../async-actions/getFastServices";

export default connect (
	state => ({
		fastServices: state.cashbox.fastServices,
	}),
	dispatch => ({
		onLoadFastServices: () => dispatch(getFastServices()),
	})
)(Cashbox);