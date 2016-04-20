/*
* @Author: HellMagic
* @Date:   2016-04-10 14:33:10
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-04-15 10:37:05
*/

'use strict';


import axios from 'axios';

export function getMockUser() {
    return Promise.resolve({
        name: 'HellMagic'
    });
}

export function getMockData() {
    return Promise.resolve({
        data1: { msg: 'data1' },
        data2: [{ name: 'a', age: 10 }, { name: 'b', age: 20 }],
        data3: { msg: ['a', 'b', 'c'], obj: { one: 'some' } }
    });
    // return axios.get('/api/v1/user/me');
}


export function getData() {
    return Promise.resolve({
        a: 'a'
    })
}
