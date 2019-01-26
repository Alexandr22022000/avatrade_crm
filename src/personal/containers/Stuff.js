import {connect} from "react-redux";
import Stuff from "../components/Stuff";
import {openPersonModal} from "../actions/openPersonModal";
import {closePersonModal} from "../actions/closePersonModal";
import {getStuff} from "../async-actions/getStuff";
import {getPerson} from "../async-actions/getPerson";

export default connect(
    state => ({
        stuff: state.stuff.stuff,
        reqStatus: state.status.requestSuccessful,
        modalStatus: state.stuff.modalIsOpen,
        currentPerson: state.stuff.currentUser
    }),
    dispatch => ({
        onOpenModal: () => {
            dispatch(openPersonModal());
        },
        onCloseModal: () => {
            dispatch(closePersonModal());
        },
        onGetUsers: ( is_all = true) => {
            console.log('onGetUsers');
            dispatch(getStuff( is_all));
        },
        onGetCurrentUser: (id) => {
            console.log(id);
            dispatch(getPerson(id));
        }
    })
)(Stuff);