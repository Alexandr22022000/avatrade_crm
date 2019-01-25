import React, {Component} from 'react';
//import getToken from "../cookie/getToken";
import PropTypes from "prop-types";
import '../styles/NavBar.css';
import '../styles/buttons.css';
import {PERMISSIONS} from '../constants';


class NavBar extends Component{
    render() {
        console.log('render()');
        const style = {
            holder: '',
            imgHolder: 'imgHolder',
            buttons: 'btn-m',
        };
        style.holder = window.navigator.userAgent.toLocaleLowerCase().indexOf("android") === -1 ?
        'MainPageHolder-d':
        'MainPageHolder-t';

        let buttons = {};
        if(this.props.tokenInfo.permissions !== null){

            for(let perm of this.props.tokenInfo.permissions){
                switch(perm){
                    case PERMISSIONS.OWNER:
                    case PERMISSIONS.TOP_MANAGER:
                        buttons['planning'] = {name:'планнинг', isActive: false, route:'planning'};
                        buttons['warehouse'] = {name:'склад', isActive: false, route:'warehouse'};
                        buttons['stuff'] = {name:'персонал', isActive: false, route:'stuff'};
                        buttons['prices'] = {name:'прайс', isActive: false, route:'prices'};
                        buttons['turnovers'] = {name:'обороты', isActive: false, route:'turnovers'};
                        buttons['events'] = {name:'движуха', isActive: false, route:'events'};
                        break;
                    case PERMISSIONS.STORE_MANAGER:
                        buttons['planning'] = {name:'планнинг', isActive: false, route:'planning'};
                        buttons['cash'] = {name:'касса', isActive: false, route:'cash'};
                        buttons['warehouse'] = {name:'склад', isActive: false, route:'warehouse'};
                        buttons['cabinet'] = {name:'кабинет', isActive: false, route:'cabinet'};
                        buttons['contacts'] = {name:'контакты', isActive: false, route:'contacts'};
                        buttons['prices'] = {name:'прайс', isActive: false, route:'prices'};
                        break;
                    case PERMISSIONS.WAREHOUSE_MANAGER:
                        buttons['planning'] = {name:'планнинг', isActive: false, route:'planning'};
                        buttons['warehouse'] = {name:'склад', isActive: false, route:'warehouse'};
                        buttons['cabinet'] = {name:'кабинет', isActive: false, route:'cabinet'};
                        buttons['contacts'] = {name:'контакты', isActive: false, route:'contacts'};
                        buttons['prices'] = {name:'прайс', isActive: false, route:'prices'};
                        break;
                    default:
                        break;
                }
            }
        }
        let buttonsArray = [];
        console.log(this.context.router.history.location.pathname);
        for(let key in buttons){
            if('/' + buttons[key].route ===
                this.context.router.history.location.pathname) {
                buttons[key].isActive = true;
            }
            buttonsArray.push(buttons[key]);
        }
        return(
            <div>
                <div className={style.holder}>
                    <div className={style.imgHolder}/>
                    <div id={'buttons'}>{buttonsArray.map(value => {
                        if(!value.isActive) {
                            return <button
                                className={`${style.buttons} ${value.isActive ? 'checked' : ''}`}
                                onClick={(e) => {
                                    this.context.router.history.push('/nav-bar/' + value.route);
                                }}
                                style={{paddingBottom: '17px',paddingTop: '15px'}}
                            >
                                {value.name}
                            </button>
                        } else {
                            return <button
                                className={`${style.buttons} ${value.isActive ? 'checked' : ''}`}
                                onClick={(e) => {
                                    this.context.router.history.push('/nav-bar/' + value.route);
                                }}
                                style={{paddingBottom: '0px',paddingTop: '15px'}}
                            >
                                {value.name}
                                <hr color={'#9c00b8'}/>
                            </button>
                        }
                    })}</div>

                </div>
                <div id={'children'}>
                    {this.props.children}
                </div>
            </div>
        )
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextProps.tokenInfo);
        if(nextProps.tokenInfo.tokenExists !== true && nextProps.tokenInfo.token === null){
            this.context.router.history.push('/login');
            return false;
        }
        return true;
    }


    componentDidMount() {
        console.log('componentDidMount()');
        this.props.onLoginInfoFakeDispatch();
        /*if(this.props.tokenInfo.permissions === null) {
            console.log(this.props.tokenInfo);
            let token = getToken();
            if(token === null) {
                this.context.router.history.push('/login');
            }
            this.props.onTokenDispatch(token);
            this.props.onPermissionsGet(token);
        }*/
    }
}

NavBar.contextTypes = {
    router: PropTypes.object.isRequired
};

export default NavBar;