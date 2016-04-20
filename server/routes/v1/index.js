/*
* @Author: liucong
* @Date:   2016-03-31 12:08:12
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-04-11 13:40:49
*/

'use strict';

var express = require('express');
var rootRouter = express.Router();

rootRouter.use('/auth', require('./auth'));
rootRouter.use('/user', require('./user'));


module.exports = function(app) {
    app.use('/api/v1', rootRouter);
}
