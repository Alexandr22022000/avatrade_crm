import {connect} from 'react-redux';
import CashboxStorePrompt from "../components/CashboxStorePrompt";
import setCurrentStoreId from "../../core/actions/setCurrentStoreId";

export default connect(
    state => ({
        stores: state.warehouse.stores,
    }),
    dispatch => ({
        onSetStoreId: (id) => dispatch(setCurrentStoreId(id)),
    })
)(CashboxStorePrompt)