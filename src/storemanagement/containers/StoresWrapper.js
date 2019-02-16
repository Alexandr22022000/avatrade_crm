import {connect} from 'react-redux';
import StoresWrapper from "../components/StoresWrapper";
import setStoresForEditor from "../async-actions/getStoresForEditor";
import setCurrentStore from "../actions/setCurrentStore";
import setIsAll from "../actions/setIsAll";

export default connect(
	state => ({
		stores: state.storemngmt.stores,
		currentStore: state.storemngmt.currentStore,
		is_all: state.storemngmt.isAll,
	}),
	dispatch => ({
		onGetStores: () => dispatch(setStoresForEditor()),
		onSetCurrentStore: (store) => dispatch(setCurrentStore(store)),
		setIsAll: (isAll) => dispatch(setIsAll(isAll)),
	})
)(StoresWrapper);