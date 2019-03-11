import {connect} from 'react-redux';
import ServiceMCFEditor from "../components/ServiceMCFEditor";
import setCurrentService from "../actions/setCurrentService";
import {getCargos} from "../../warehouse/async-actions/getCargos";
import setConsumables from "../actions/setConsumables";

export default connect(
    state => ({
        currentService: state.services.currentService,
        cargos: state.warehouse.cargos,
        currentConsumables: state.services.currentConsumables,
    }),
    dispatch => ({
        onChangeCurrentService: (service) => dispatch(setCurrentService(service)),
        onLoadCargos: () => dispatch(getCargos('')),
        onSetConsumables: (consumables) => dispatch(setConsumables(consumables)),
    })
)(ServiceMCFEditor);