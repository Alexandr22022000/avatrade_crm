import {connect} from 'react-redux';
import Planning from "../components/Planning";
import getOrders from "../async-actions/getOrders";
import updateChangeFilter from "../actions/updateChangeFilter";
import {getStuff} from "../../personal/async-actions/getStuff";
import {getStores} from "../../warehouse/async-actions/getStores";
import setCurrentOrder from "../actions/setCurretOrder";


export default connect(
    state => ({
        orders: state.planning.orders,
        filter: state.planning.filter,
        managers: state.stuff.users,
        stores: state.warehouse.stores,
    }),
    dispatch => ({
        onLoadOrders: () => dispatch(getOrders()),
        onUpdateFilter: (filter) => dispatch(updateChangeFilter(filter)),
        onGetStuff: () => dispatch(getStuff()),
        onGetStores: () => dispatch(getStores()),
        onSetCurrentOrder: (order) => dispatch(setCurrentOrder(order)),
    })
)(Planning);