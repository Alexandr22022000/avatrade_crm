import {connect} from 'react-redux';
import ServicesModal from "../components/ServicesModal";
import postAddServices from "../async-actions/postAddServices";
import postService from "../async-actions/postServices";
import setConsumables from "../actions/setConsumables";
import postServiceStatus from "../async-actions/postServiceStatus";

export default connect(
    state =>({
        currentService: state.services.currentService,
        currentConsumables: state.services.currentConsumables,
        cargos: state.warehouse.cargos,
    }),
    dispatch => ({
        onAddNewService: (name, price, is_product, consumables) =>
            dispatch(postAddServices(name, price, is_product, consumables)),
        onChangeCurrentService: (id, name, price, is_product, consumables) =>
            dispatch(postService(id, name, price, is_product, consumables)),
        onSetConsumables: (consumables) => dispatch(setConsumables(consumables)),
        onChangeServiceStatus: (id, status) => dispatch(postServiceStatus(id, status)),
    })
)(ServicesModal)