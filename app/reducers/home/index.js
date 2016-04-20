/*
* @Author: HellMagic
* @Date:   2016-04-08 17:16:06
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-04-15 16:01:36
*/

'use strict';

import InitialState from '../../states/home-state';

var initialState = new InitialState;

import {
    INIT_HOME_SUCCESS,
    SOME_HOME_ONE,
    SOME_HOME_TWO,
    SOME_HOME_THREE
} from '../../lib/constants';


export default function reducer(state, action) {
    if(!(state instanceof InitialState)) return initialState.merge(state);

    switch(action.type) {
        case INIT_HOME_SUCCESS:
            return state.merge(action.payload.data);
        case SOME_HOME_ONE:
        case SOME_HOME_TWO:
        case SOME_HOME_THREE:
            return state;
    }

    return state;
}
