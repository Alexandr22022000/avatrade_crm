import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import {Router} from 'react-router';
import Login from './containers/login'
import store from "./store/store";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Login/>
            </Provider>
        );
    }
}

export default App;
