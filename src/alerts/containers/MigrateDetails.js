import MigrateDetails from "../components/MigrateDetails";
import { connect } from "react-redux";
import {approveMigrate} from "../async-actions/approveMigrate";

export default connect(
    state => ({
        selectedObject: state.alerts.selectedObject,
    }),
    dispatch => ({
        onApproveMigrate: (id) => {
            dispatch(approveMigrate(id));
        },
    })
)(MigrateDetails);
