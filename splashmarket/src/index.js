import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Change this in prod
// http://68.183.27.80
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://www.splashmarket.io/' : 'http://localhost:8000/';
//

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
