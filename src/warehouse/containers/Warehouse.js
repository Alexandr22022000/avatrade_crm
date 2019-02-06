import {connect} from "react-redux";
import Warehouse from "../components/Warehouse";
import {getStocks} from "../async-actions/getStocks";
import {getStores} from "../async-actions/getStores";

export default connect(
    state=>({
        stocks: state.warehouse.stocks,
        cargos: state.warehouse.cargos,
        stores: state.warehouse.stores,
    }),
    dispatch =>({
        onGetStocks: (is_all,store,search) => dispatch(getStocks(is_all,store, search)),
        onGetStores: () => dispatch(getStores())
    })
)(Warehouse);