import {connect} from 'react-redux';
import ServiceMCFEditor from "../components/ServiceMCFEditor";
import setConsumables from "../actions/setConsumables";

export default connect(
    state => ({
        currentService: state.services.currentService,
        cargos: state.warehouse.cargos,
        currentConsumables: state.services.currentConsumables,
    }),
    dispatch => ({
        onSetConsumables: (consumables) => dispatch(setConsumables(consumables)),
    })
)(ServiceMCFEditor);