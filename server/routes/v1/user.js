/*
* @Author: liucong
* @Date:   2016-03-31 12:09:30
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-04-16 10:52:12
*/

'use strict';

var router = require('express').Router();
var users = require('users');
var auth = require('../../middlewares/auth');

router.param('userId', function(req, res, next, id) {
    req.user = {
        id: id
    };
    next();
});

router.get('/:userId', function(req, res, next) {
    res.status(200).send('user: ', req.user);
});

module.exports = router;
