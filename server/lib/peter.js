/*
* @Author: ZhuangXiaobin
* @Date:   2016-04-03 20:32:47
* @Last Modified by:   ZhuangXiaobin
* @Last Modified time: 2016-04-03 20:32:47
*/

'use strict'

var peter = require('peter').createManager();

module.exports = {
  bindDb : function(dbUrl, cb) {
    peter.bindDb(dbUrl, cb);
  },
  Manager: peter
}
