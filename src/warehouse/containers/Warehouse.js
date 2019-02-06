import {connect} from "react-redux";
import Warehouse from "../components/Warehouse";
import {getStocks} from "../async-actions/getStocks";
import {getCargos} from "../async-actions/getCargos";
import {postAddNewStocks} from "../async-actions/postAddNewStocks";
import {postAddStocks} from "../async-actions/postAddStocks";
import {getStores} from "../async-actions/getStores";

export default connect(
    state=>({
        stocks: state.warehouse.stocks,
        cargos: state.warehouse.cargos,
        stores: state.warehouse.stores,
    }),
    dispatch =>({
        onGetStocks: (is_all,store,search) => dispatch(getStocks(is_all,store, search)),
        onGetCargos: (search) => dispatch(getCargos(search)),
        onAddNewStocks: (name,article,count) => dispatch(postAddNewStocks(name,article,count)),
        onAddStocks: (count, cargo) => dispatch(postAddStocks(count, cargo)),
        onGetStores: () => dispatch(getStores())
    })
)(Warehouse);