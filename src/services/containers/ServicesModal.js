import {connect} from 'react-redux';
import ServicesModal from "../components/ServicesModal";
import {getCargos} from "../../warehouse/async-actions/getCargos";
import postAddServices from "../async-actions/postAddServices";
import postService from "../async-actions/postServices";

export default connect(
    state =>({
        currentService: state.services.currentService,
    }),
    dispatch => ({
        onAddNewService: (name, price, is_product, consumables) =>
            dispatch(postAddServices(name, price, is_product, consumables)),
        onChangeCurrentService: (id, name, price, is_product, consumables) =>
            dispatch(postService(id, name, price, is_product, consumables)),
    })
)(ServicesModal)