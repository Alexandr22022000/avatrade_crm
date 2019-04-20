import {connect} from 'react-redux';
import PlanningModal from "../components/PlanningModal";
import postOrder from "../async-actions/postOrder";
import postNewOrder from "../async-actions/postNewOrder";

export default connect(
    state => ({
        managers: state.stuff.users,
        stores: state.warehouse.stores,
        order: state.planning.currentOrder,
    }),
    dispatch => ({
        onPostOrder: (order) => dispatch(postOrder(order)),
        onPostNewOrder: (order) => dispatch(postNewOrder(order)),
    })
)(PlanningModal);