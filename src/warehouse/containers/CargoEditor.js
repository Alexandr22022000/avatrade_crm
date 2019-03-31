import {connect} from 'react-redux';
import CargoEditor from "../components/CargoEditor";
import postSetCargo from "../async-actions/postSetCargo";

export default connect(
    state => ({
        cargo: state.warehouse.currentCargo,
    }),
    dispatch => ({
        onPostCargo: (id, name, article) => dispatch(postSetCargo(id, name, article)),
    })
)(CargoEditor);