/*
* @Author: liucong
* @Date:   2016-03-31 12:08:43
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-04-16 11:15:26
*/

'use strict';

var path = require('path');
var router = require('express').Router();
var auth = require('auth');
var util = require('../../lib/util');


router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', auth.authenticate, function(req, res, next) {
    // res.set('authorization', req.user.token);
    res.cookie('authorization', req.user.token);//写入cookie会受cookie时效性影响，所以最好还是返回后写入localStorage--但可能要考虑到降级，或者将此cookie时效性放大，但是对于登出的处理只在客户端
    //删除--但是在服务端就不再有任何验证了。。。
    res.status(200).json(req.user);
});

router.get('/logout', function(req, res, next) {
    delete req.user;
    return res.status(200).json({
        "message": "User has been successfully logged out"
    });
    //返回后要前端一定要移除token！！！
});


module.exports = router;

