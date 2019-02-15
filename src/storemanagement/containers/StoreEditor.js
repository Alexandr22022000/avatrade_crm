import {connect} from 'react-redux';
import StoreEditor from "../components/StoreEditor";
import postNewStore from "../async-actions/postNewStore";
import postChangedStore from "../async-actions/postChangedStore";

export default connect(
	state => ({
		currentStore: state.storemngmt.currentStore,
	}),
	dispatch => ({
		onAddNewStore: (store) => dispatch(postNewStore(store)),
		onChangeStore: (store) => dispatch(postChangedStore(store))
	})
)(StoreEditor);