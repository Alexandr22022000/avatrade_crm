import {connect} from 'react-redux';
import StoresWrapper from "../components/StoresWrapper";
import {getStores} from "../../warehouse/async-actions/getStores";
import setCurrentStore from "../actions/setCurrentStore";

export default connect(
	state => ({
		stores: state.warehouse.stores,
		currentStore: state.storemngmt.currentStore,
	}),
	dispatch => ({
		onGetStores: () => dispatch(getStores()),
		onSetCurrentStore: (store) => dispatch(setCurrentStore(store)),
	})
)(StoresWrapper);