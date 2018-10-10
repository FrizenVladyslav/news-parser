import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import store from "./store";

import "../node_modules/semantic-ui-css/semantic.min.css";
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Provider store = { store }>
		<App />
	</Provider>
	
, document.getElementById('root'));
registerServiceWorker();
