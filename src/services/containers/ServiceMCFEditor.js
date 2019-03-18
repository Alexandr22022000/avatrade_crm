import {connect} from 'react-redux';
import ServiceMCFEditor from "../components/ServiceMCFEditor";
import setCurrentService from "../actions/setCurrentService";
import setConsumables from "../actions/setConsumables";

export default connect(
    state => ({
        currentService: state.services.currentService,
        cargos: state.warehouse.cargos,
        currentConsumables: state.services.currentConsumables,
    }),
    dispatch => ({
        onChangeCurrentService: (service) => dispatch(setCurrentService(service)),
        onSetConsumables: (consumables) => dispatch(setConsumables(consumables)),
    })
)(ServiceMCFEditor);