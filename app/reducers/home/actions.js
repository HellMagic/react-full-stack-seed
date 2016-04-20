/*
* @Author: HellMagic
* @Date:   2016-04-09 22:26:48
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-04-15 16:00:30
*/

'use strict';

import {
    INIT_HOME_SUCCESS
} from '../../lib/constants';

import Immutable from 'immutable';

import {getMockData} from '../../api/user';

export function initHome() {
    return dispatch => {
        return getMockData()
            .then((resData) => {
                dispatch({type: INIT_HOME_SUCCESS, payload: { data: Immutable.toMap(resData) }})
            })
            .catch((error) => {
                //设计：全局的Action去处理error
                console.log('home action initHome error: ', error);
            })
        ;
    }
}


