import React, { Component } from 'react';
import './App.css';
import Login from './core/containers/Login'
import {Switch, Route} from 'react-router-dom';
import NavBar from "./core/containers/NavBar";
import Stuff from "./personal/containers/Stuff";
import InDev from "./core/components/InDev";
import PassRecover from "./core/containers/PassRecover";
import EmailSender from "./core/containers/EmailSender";
import Warehouse from "./warehouse/containers/Warehouse";
import StoresWrapper from "./storemanagement/containers/StoresWrapper";
import Cashbox from "./cashbox/containers/Cashbox";
import Services from "./services/containers/Services";


class App extends Component {
    render() {
        return (
            <div className={"App"}>
                <div style={{marginBottom:'3%'}}>a</div>
                <div>
                    <Switch>
                        <Route exact path={'/'} children={<NavBar/>}/>
                        <Route exact path={'/stuff'} children={<NavBar><Stuff/></NavBar>}/>
                        <Route exact path={'/cash'} children={<NavBar><Cashbox/></NavBar>}/>
                        <Route exact path={'/planning'} children={<NavBar><InDev/></NavBar>}/>
                        <Route exact path={'/warehouse'} children={<NavBar><Warehouse/></NavBar>}/>
                        <Route exact path={'/prices'} children={<NavBar><Services/></NavBar>}/>
                        <Route exact path={'/turnovers'} children={<NavBar><InDev/></NavBar>}/>
                        <Route exact path={'/events'} children={<NavBar><InDev/></NavBar>}/>
                        <Route exact path={'/cabinet'} children={<NavBar><InDev/></NavBar>}/>
                        <Route exact path={'/contacts'} children={<NavBar><InDev/></NavBar>}/>
                        <Route exact path={'/stores'} children={<NavBar><StoresWrapper/></NavBar>}/>
                        <Route exact path={'/recover_password'} children={<PassRecover/>}/>
                        <Route exact path={'/start_recover_password'} children={<EmailSender/>}/>
                        <Route path={'/login'} children={<Login/>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
