import {connect} from "react-redux";
import Stuff from "../components/Stuff";
import {getStuff} from "../async-actions/getStuff";
import {getPerson} from "../async-actions/getPerson";
import {getRanks} from "../async-actions/getRanks";
import {setEmptyCurrentUser} from "../actions/setEmptyCurrentUser";
import setUsersFilter from "../actions/setUsersFilter";


export default connect(
    state => ({
        users: state.stuff.users,
        reqStatus: state.status.requestSuccessful,
        showAll: state.status.showAll,
    }),
    dispatch => ({
        onGetUsers: () => dispatch(getStuff()),
        onGetCurrentUser: (id) => dispatch(getPerson(id)),
        onSetEmptyUser: () => dispatch(setEmptyCurrentUser()),
        setUsersFilter: (showAll) => dispatch(setUsersFilter(showAll)),
        getRanks: () => dispatch(getRanks()),
    })
)(Stuff);