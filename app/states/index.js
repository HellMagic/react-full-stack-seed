/*
* @Author: HellMagic
* @Date:   2016-04-08 17:02:04
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-04-15 15:59:13
*/

'use strict';

import gloablInitState from './global-app-state';
import homeInitState from './home-state';



var _initState = {
    app: new gloablInitState,
    home: new homeInitState
};

export default _initState;
