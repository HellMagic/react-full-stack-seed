import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import promiseMiddleware from '../lib/promiseMiddleware';
import createLogger from 'redux-logger';


//TODO: 解决组件init之前需要异步数据的问题。。。
export default function configureStore(initialState, history) {
    const middleware = [thunk, promiseMiddleware];

    const reactRouterReduxMiddleware = routerMiddleware(history);
    if (__DEVCLIENT__) {
        middleware.push(reactRouterReduxMiddleware, createLogger());
    } else {
        middleware.push(reactRouterReduxMiddleware);
    }

    const finalCreateStore = applyMiddleware(...middleware)(createStore);

    const store = finalCreateStore(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

