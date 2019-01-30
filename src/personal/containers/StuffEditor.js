import {connect} from "react-redux";
import StuffEditor from "../components/StuffEditor";
import updateUserData from "../actions/updateUserData";
import delCurrentUser from "../actions/delCurrentUser";
import updateUser from "../async-actions/updateUserData";
import {addNewUser} from "../async-actions/addNewUser";
import {changeUserStatus} from "../async-actions/changeUserStatus";


export default connect(
    state => ({
        currentUser: state.stuff.currentUser,
        ranks: state.stuff.ranks,
        permissions: state.status.permissions,
    }),
    dispatch => ({
        updateUserData: (data, name) => dispatch(updateUserData(data, name)),
        updateUser: (data) => dispatch(updateUser(data)),
        onAddNewUser: (userData) => dispatch(addNewUser(userData)),
        delCurrentUser: () => dispatch(delCurrentUser()),
        changeCurrentUserStatus: (status, id) => dispatch(changeUserStatus(status, id)),
    })
)(StuffEditor);