import {connect} from "react-redux";
import MigrateEditor from "../components/MigrateEditor";
import {postMigrate} from "../async-actions/postMigrate";
import {getStores} from "../async-actions/getStores";
import {getStocks} from "../async-actions/getStocks";
import checkAllStocks from "../actions/checkAllStocks";

export default connect (
    state=>({
        stocks: state.warehouse.stocks,
        buffer: state.warehouse.buffer,
        stores: state.warehouse.stores,
    }),
    dispatch =>({
        addMigrate: (from, to, stocks) => dispatch(postMigrate(from, to, stocks)),
        onGetStores: () => dispatch(getStores()),
        onGetStocks: () => dispatch(getStocks()),
        checkAllStocks: (check) => dispatch(checkAllStocks(check)),
    })
)(MigrateEditor);