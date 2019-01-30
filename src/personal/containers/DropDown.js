import DropDown from '../components/DropDown';
import {connect} from "react-redux";


export default connect(
    state => ({
        currentPerson: state.stuff.currentUser,
        currentPersonId: state.stuff.currentUserId,
    })
)(DropDown);