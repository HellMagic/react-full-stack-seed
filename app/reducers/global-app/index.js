/*
* @Author: HellMagic
* @Date:   2016-04-11 19:19:03
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-04-11 22:31:55
*/

'use strict';

import _ from 'lodash';
import {Record} from 'immutable';

import InitialState from '../../states/global-app-state';

//引入和自己的state数据相关的常量
import {
    GET_USER_SUCCESS,
    GET_USER__FAILURE
} from '../../lib/constants';

var initialState = new InitialState;

export default function reducer(state, action) {
    if(_.isUndefined(state)) return initialState;
//服务端拿到的数据也不是InitialState类型的，所以当拿到js raw data后被冲掉了
//注意这里对Record进行merge操作的时候，merge的对象一定也要是Record实例，而不能是js对象，所以这里要将从服务端获取的js数据封装一下
    if(!(state instanceof InitialState)) return initialState.merge(new Record(state)());

    switch(action.type) {
        case GET_USER_SUCCESS:
            // console.log('pp = ', state.user);
            // var nextState = state.set('user', {name: 'hi'});
            // console.log('==================================');
            // console.log('name = ', nextState.user.name);
            var nextState = state.set('user', action.res);
            // console.log('nextState.user.name = ', nextState.user.name);
            return nextState;
    }
    return state;
}


// pp =  {}
// ==================================
// name =  hi
// pp =  { name: 'HellMagic' }
// ==================================
// name =  hi
