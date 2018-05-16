import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './css/normalize.css';
import './css/base.css';
import './css/custom.css';
import registerServiceWorker from './registerServiceWorker';
import App from "./App";

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
