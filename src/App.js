import React, { Component } from 'react';
import './App.css';
import Login from './core/containers/Login'
import {Switch, Route} from 'react-router-dom';
import NavBar from "./core/containers/NavBar";
import Stuff from "./personal/containers/Stuff";


class App extends Component {
    render() {
        return (
            <div className={"App"}>
                <div>
                    <Switch>
                        <Route exact path={'/'} children={<NavBar/>}/>
                        <Route exact path={'/stuff'} children={<NavBar><Stuff/></NavBar>}/>
                        <Route exact path={'/test'} children={<div>tested</div>}/>
                        <Route path={'/login'} children={<Login/>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
