import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import {Router} from 'react-router';
import Login from './components/login'

class App extends Component {
    render() {
        return (
            <Login/>
        );
    }
}

export default App;
