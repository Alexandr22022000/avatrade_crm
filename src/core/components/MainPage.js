import React, {Component} from 'react';
import getToken from "../cookie/getToken";
import PropTypes from "prop-types";

class MainPage extends Component{
    render() {
        return(
            <div>
                Main page
            </div>
        )
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(nextProps.tokenInfo.tokenExists !== true && nextProps.tokenInfo.token === null){
            this.context.router.history.push('/login');
            return false;
        }
        return true;
    }


    componentDidMount() {
        if(this.props.tokenInfo.permissions === null) {
            console.log(this.props.tokenInfo);
            let token = getToken();
            if(token === null) {
                this.context.router.history.push('/login');
            }
            this.props.onTokenDispatch(token);
            this.props.onPermissionsGet(token);
        }
    }
}

MainPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default MainPage;