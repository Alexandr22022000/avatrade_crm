import MigrateDetails from "../components/MigrateDetails";
import { connect } from "react-redux";
import setActiveMigration from "../actions/setActiveMigration";
import {approveMigrate} from "../async-actions/approveMigrate";

export default connect(
    state => ({
        migrate: state.status.activeMigration,
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
