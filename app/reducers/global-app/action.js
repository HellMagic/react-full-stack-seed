/*
* @Author: HellMagic
* @Date:   2016-04-11 19:41:24
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-04-11 19:53:47
*/

'use strict';

import {
    GET_USER
} from '../../lib/constants';

import {getMockUser} from '../../api/user';


//模式：这种action是针对need使用的。此action creator function一定返回一个带有promise属性的object
export function initUser() {
    return {
        type: GET_USER,
        promise: getMockUser()
    }
}


