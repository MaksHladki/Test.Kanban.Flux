//styles
import 'normalize.css/normalize.css';
import './main.css';
import 'font-awesome/css/font-awesome.css';

//polyfills
import 'nodelist-foreach-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import alt from './lib/alt';
import store from 'store';
import persist from './lib/persist';

persist(alt, store, 'app');

ReactDOM.render(
    <App />,
    document.getElementById('container')
);