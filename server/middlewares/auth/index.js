/*
* @Author: liucong
* @Date:   2016-03-31 11:59:40
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-04-16 10:51:39
*/

'use strict';

var _ = require("lodash");
var path = require('path');
var bcrypt = require('bcryptjs');
var utils = require("../../lib/util");
var jsonwebtoken = require("jsonwebtoken");
var Router = require("express").Router;
var murmur = require('murmur');
var when = require('when');
var ObjectId = require('mongodb').ObjectId;
// var md5 = crypto.createHash('md5');

var debug = require('debug')('app:utils:' + process.pid);

var peterMgr = require('../../lib/peter').Manager;

var UnauthorizedAccessError = require('../../errors/UnauthorizedAccessError');
var BadRequestError = require('../../errors/BadRequestError');
var DBError = require('../../errors/DBError');

var config = require('../../config/env');
var debug = require('debug')('app:routes:default' + process.pid);


exports.authenticate = function (req, res, next) {
    debug("Processing authenticate middleware");
    var value = req.body.value;//注意：body里面写value而不再是username
    var password = req.body.password;//暂时还是明文传递过来，后面进行md5

    //TODO:使用express-validator来处理各种验证的需求
    if (_.isEmpty(value) || _.isEmpty(password)) {
        return next(new UnauthorizedAccessError("401", {
            message: 'Invalid value or password'
        }));
    }
    value = value.toLowerCase();

//1.验证User的usernmae和password是否有效：new UnauthorizedAccessError("401", { message: 'Invalid username or password' })
    var hash = murmur.hash128(value).hex().substr(0, 24);

    when.promise(function(resolve, reject) {
        peterMgr.get('@UserIndex.' + hash, function(err, result) {
            if(err) return reject(new DBError('500', { message: 'get user index error' }));
            var target = _.find(result['[list]'], function(item) {
                return value == item.key;
            });
            if(!target) return reject(new UnauthorizedAccessError('401', { message: 'not found user of value : ' + value }));
            resolve(target);
        });
    }).then(function(target) {
        return when.promise(function(resolve, reject) {
            peterMgr.get(target.userid, ['_id', 'pass'], function(err, result) {
                if(err) return reject(new DBError('500', { message: 'find user error' }));
                if(!result) return reject(new UnauthorizedAccessError('401', { message: 'db not found user of value = ' + value}));

                //md5.update(result.pass)
                 result.pass == password ? resolve(result) : reject(new UnauthorizedAccessError('401', { message: 'invalid password' }));
            });
        });
    }).then(function(user) {
        var token = jsonwebtoken.sign({ _id: user._id.toString() }, config.secret);
        user.token = token;
        req.user = user;
        next();
    }).catch(function(err) {
        next(err);
    });
};


module.exports.verify = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.authorization;

    if(!token) return next(new BadRequestError('400', { message: 'no token be passed'}));
    when.promise(function(resolve, reject) {
        jsonwebtoken.verify(token, config.secret, function (err, decode) {
            if (err) return reject(new UnauthorizedAccessError("invalid_token"));
            //如果验证通过，则通过decode._id，然后去找user，并赋值给req.user
            resolve(decode._id);
        });
    }).then(function(userid) {
        return when.promise(function(resolve, reject) {
            peterMgr.query('@User', {_id: ObjectId(userid)}, function(err, user) {
                if(err) return reject(new DBError('500', {message: 'find user error'}));
                resolve(user);
            });
            // peterMgr.get("56850d5d00000ac75857b77a", null, function(err, user) {
            //     if(err) return reject(new DBError('500', { message: 'find user error' }));
            //     resolve(user);
            // });
        });
    }).then(function(user) {
        req.user = user;
        next();
    }).catch(function(err) {
        next(err);
    });
};



