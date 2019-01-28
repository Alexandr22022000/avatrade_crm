import {connect} from "react-redux";
import Stuff from "../components/Stuff";
import {openPersonModal} from "../actions/openPersonModal";
import {closePersonModal} from "../actions/closePersonModal";
import {getStuff} from "../async-actions/getStuff";
import {getPerson} from "../async-actions/getPerson";
import {changeBlockStatus} from "../actions/changeBlockStatus";
import {fetchUserData} from "../actions/fetchUserData";
import {updateUserData} from "../async-actions/updateUserData";

export default connect(
    state => ({
        stuff: state.stuff.stuff,
        reqStatus: state.status.requestSuccessful,
        modalStatus: state.stuff.modalIsOpen,
        currentPerson: state.stuff.currentUser,
        currentPersonId: state.stuff.currentUserId,
        blockStatuses: state.stuff.blockStatuses,
    }),
    dispatch => ({
        onOpenModal: (id) => {
            dispatch(openPersonModal(id));
        },
        onCloseModal: () => {
            dispatch(closePersonModal());
        },
        onGetUsers: ( is_all = true) => {
            dispatch(getStuff( is_all));
        },
        onGetCurrentUser: (id) => {
            dispatch(getPerson(id));
        },
        onChangeBlockStatus: (index) => {
            dispatch(changeBlockStatus(index));
        },
        onFetchUserData: (data) => {
            dispatch(fetchUserData(data));
        },
        onUpdateUserData: (data) => {
            dispatch(updateUserData(data))
        }
    })
)(Stuff);