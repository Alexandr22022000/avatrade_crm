import {connect} from 'react-redux';
import StoresWrapper from "../components/StoresWrapper";
import setCurrentStore from "../actions/setCurrentStore";
import setIsAll from "../actions/setIsAll";
import getStoresForEditor from "../async-actions/getStoresForEditor";

export default connect(
	state => ({
		stores: state.warehouse.stores,
		currentStore: state.storemngmt.currentStore,
		is_all: state.storemngmt.isAll,
	}),
	dispatch => ({
		onGetStores: () => dispatch(getStoresForEditor()),
		onSetCurrentStore: (store) => dispatch(setCurrentStore(store)),
		setIsAll: (isAll) => dispatch(setIsAll(isAll)),
	})
)(StoresWrapper);