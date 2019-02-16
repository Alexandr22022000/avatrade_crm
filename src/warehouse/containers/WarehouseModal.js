import {connect} from "react-redux";
import WarehouseModal from "../components/WarehouseModal";
import {getCargos} from "../async-actions/getCargos";
import {postAddNewStocks} from "../async-actions/postAddNewStocks";
import {postAddStocks} from "../async-actions/postAddStocks";

export default connect(
    state=> ({
        cargos: state.warehouse.cargos,
    }),
    dispatch=> ({
        onGetCargos: (search) => dispatch(getCargos(search)),
        onAddNewStocks: (name,article,count) => dispatch(postAddNewStocks(name,article,count)),
        onAddStocks: (count, cargo) => dispatch(postAddStocks(count, cargo)),
    })
)(WarehouseModal);