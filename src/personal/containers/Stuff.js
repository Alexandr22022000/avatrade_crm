import {connect} from "react-redux";
import Stuff from "../components/Stuff";
import {getStuff} from "../async-actions/getStuff";
import {getPerson} from "../async-actions/getPerson";
import updateUserData from "../async-actions/updateUserData";
import {addNewUser} from "../async-actions/addNewUser";
import {setEmptyCurrentUser} from "../actions/setEmptyCurrentUser";


export default connect(
    state => ({
        users: state.stuff.users,
        reqStatus: state.status.requestSuccessful,
    }),
    dispatch => ({
        onGetUsers: (is_all = false) => dispatch(getStuff(is_all)),
        onGetCurrentUser: (id) => dispatch(getPerson(id)),
        onUpdateUserData: (data) => {
            dispatch(updateUserData(data))
        },
        onAddNewUser: (userData) => {
            dispatch(addNewUser(userData));
        },
        onSetEmptyUser: () => dispatch(setEmptyCurrentUser()),
    })
)(Stuff);