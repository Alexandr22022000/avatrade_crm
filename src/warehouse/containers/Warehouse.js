import {connect} from "react-redux";
import Warehouse from "../components/Warehouse";
import {getStocks} from "../async-actions/getStocks";
import {getStores} from "../async-actions/getStores";
import changeFilter from "../actions/changeFilter";

export default connect(
    state=>({
        stocks: state.warehouse.stocks,
        cargos: state.warehouse.cargos,
        stores: state.warehouse.stores,
        filter: state.warehouse.filter,
    }),
    dispatch =>({
        onGetStocks: () => dispatch(getStocks()),
        onGetStores: () => dispatch(getStores()),
        changeFilter: (search, store, is_all) => dispatch(changeFilter(search, store, is_all)),
    })
)(Warehouse);