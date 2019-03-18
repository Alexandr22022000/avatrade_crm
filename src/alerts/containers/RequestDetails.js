import RequestDetails from "../components/RequestDetails";
import { connect } from "react-redux";
import createPdf from '../async-actions/createPdf';

export default connect(
    state => ({
        selectedObject: state.alerts.selectedObject,
    }),
    dispatch => ({
        print: (id) => {
            dispatch(createPdf(id));
        },
    })
)(RequestDetails);
