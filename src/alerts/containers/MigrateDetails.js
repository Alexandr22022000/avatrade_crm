import MigrateDetails from "../components/MigrateDetails";
import { connect } from "react-redux";
import setActiveMigration from "../../core/actions/setActiveMigration";
import {approveMigrate} from "../../core/async-actions/approveMigrate";

export default connect(
    state => ({
        selectedObject: state.alerts.selectedObject,
    }),
    dispatch => ({
        setActiveMigrate: migrate => {
            dispatch(setActiveMigration(migrate));
        },
        onApproveMigrate: (id) => {
            dispatch(approveMigrate(id));
        },
    })
)(MigrateDetails);
