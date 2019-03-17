import RequestDetails from "../components/RequestDetails";
import { connect } from "react-redux";

export default connect(
    state => ({
        selectedObject: state.alerts.selectedObject,
    }),
    dispatch => ({
    })
)(RequestDetails);
