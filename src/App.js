import React, { Component } from 'react';
import './App.css';
import Login from './core/containers/Login'
import {Switch, Route} from 'react-router-dom';
import Test from "./core/components/Test";



class App extends Component {
    render() {
        return (
            <div className={"App"}>
                <div>
                    <Switch>
                        <Route exact path={'/'} children={<div>aaa</div>}/>
                        <Route excact path={'/login'} children={<Login/>}/>
                        <Route excact path={'/test'} children={<Test/>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
