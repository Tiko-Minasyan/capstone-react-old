import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import setupAxios from './axios/setup';

setupAxios();
ReactDOM.render(<AppRouter />, document.getElementById("app"));