import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { App } from './components/App';
import rootReducer from './reducers';

const middleware = [thunk, logger];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

render(
    <Provider store={store}>
        <Router>
            <Route path='/' component={App} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
