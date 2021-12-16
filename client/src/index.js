import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/App';
import rootReducer from './reducers';
import './style.css';

const middleware = [thunk, logger];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
