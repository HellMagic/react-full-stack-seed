/*
* @Author: HellMagic
* @Date:   2016-04-08 17:02:10
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-04-15 15:58:15
*/

'use strict';

//设计：输出combineReducers的RootReducer

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

//自定义reducer
import app from './global-app';
import home from './home';

var rootReducer = combineReducers({
    app,
    home,
    routing
});

export default rootReducer;
