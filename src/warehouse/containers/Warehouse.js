import {connect} from "react-redux";
import Warehouse from "../components/Warehouse";
import {getStocks} from "../async-actions/getStocks";
import {getCargos} from "../async-actions/getCargos";

export default connect(
    state=>({
        stocks: state.warehouse.stocks
    }),
    dispatch =>({
        onGetStocks: (store,search) => dispatch(getStocks(store, search)),
        onGetCargos: (search) => dispatch(getCargos(search)),

    })
)(Warehouse);