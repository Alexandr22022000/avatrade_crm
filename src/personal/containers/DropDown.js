import DropDown from '../components/DropDown';
import {connect} from "react-redux";
import {fetchUserData} from "../actions/fetchUserData";

export default connect(
    state => ({
        currentPerson: state.stuff.currentUser,
        currentPersonId: state.stuff.currentUserId,
    }),
    dispatch => ({
        onFetchUserData: (data) => {
            dispatch(fetchUserData(data));
        }
    })
);