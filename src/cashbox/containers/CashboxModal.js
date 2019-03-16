import {connect} from 'react-redux';
import CashboxModal from "../components/CashboxModal";
import setSellingServs from "../actions/setSellingServs";

export default connect(
    state => ({
        sellServices: state.cashbox.sellServices,
    }),
    dispatch => ({
        onServicesChange: (services) => dispatch(setSellingServs(services)),
    })
)(CashboxModal)
