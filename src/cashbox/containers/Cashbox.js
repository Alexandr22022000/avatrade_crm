import {connect} from 'react-redux';
import Cashbox from "../components/Cashbox";
import getFastServices from "../async-actions/getFastServices";
import getServices from "../../services/async-actions/getServices";
import getStocksList from "../async-actions/getStocksList";
import getServicesList from "../async-actions/getServicesList";
import setServicesSearch from "../actions/setServicesSearch";
import setStocksSearch from "../actions/setStocksSearch";


export default connect (
	state => ({
		fastServices: state.cashbox.fastServices,
        services: state.cashbox.services,
        stocks: state.cashbox.stocks,
	}),
	dispatch => ({
		onLoadFastServices: () => dispatch(getFastServices()),
        onLoadStocksList: () => dispatch(getStocksList()),
        onLoadServicesList: () => dispatch(getServicesList()),
        onChangeServiceFilter: (search) => dispatch(setServicesSearch(search)),
        onChangeStockFilter: (search) => dispatch(setStocksSearch(search)),
	})
)(Cashbox);