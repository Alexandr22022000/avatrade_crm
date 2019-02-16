import {connect} from "react-redux";
import Warehouse from "../components/Warehouse";
import {getStocks} from "../async-actions/getStocks";
import {getStores} from "../async-actions/getStores";
import changeFilter from "../actions/changeFilter";
import checkStock from "../actions/checkStock";
import checkAllStocks from "../actions/checkAllStocks";

export default connect(
    state=>({
        stocks: state.warehouse.stocks,
        cargos: state.warehouse.cargos,
        stores: state.warehouse.stores,
        filter: state.warehouse.filter,
        buffer: state.warehouse.buffer,
    }),
    dispatch =>({
        onGetStocks: () => dispatch(getStocks()),
        onGetStores: () => dispatch(getStores()),
        checkAllStocks: (check) => dispatch(checkAllStocks(check)),
        checkStock: (index, isBuffer) => dispatch(checkStock(index, isBuffer)),
        changeFilter: (search, store, is_all) => dispatch(changeFilter(search, store, is_all)),
    })
)(Warehouse);