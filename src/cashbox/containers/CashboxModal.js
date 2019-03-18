import {connect} from 'react-redux';
import CashboxModal from "../components/CashboxModal";
import setSellingServs from "../actions/setSellingServs";
import postSell from "../async-actions/postSell";

export default connect(
    state => ({
        sellServices: state.cashbox.sellServices,
        store: state.status.storeId,
    }),
    dispatch => ({
        onServicesChange: (services) => dispatch(setSellingServs(services)),
        onSell: (is_card, services) => dispatch(postSell(is_card, services)),
    })
)(CashboxModal)
