/*
* @Author: liucong
* @Date:   2016-03-31 11:19:09
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-04-16 11:25:00
*/

'use strict';

var express = require('express');
var path = require("path");
var fs = require("fs");
var onFinished = require('on-finished');
var unless = require('express-unless');
var url = require('url');
var engines = require('consolidate');
var cookieParser = require('cookie-parser');

var config = require("./env");
var rootPath = path.join(__dirname, '..', '..', 'index.html');

var util = require('../lib/util');
var NotFoundError = require('../errors/NotFoundError');

var http_port = process.env.HTTP_PORT || 3000;

var debug = require('debug')('app:' + process.pid);

var compiled_app_module_path = path.resolve(__dirname, '../../', 'public', 'assets', 'server.js');
var App = require(compiled_app_module_path);

var peterMgr = require('../lib/peter').Manager;
var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectId;

var auth = require('../middlewares/auth');

// var User = require('../models/user');

module.exports = function(app) {
    debug("Starting application");

//Init Peter
    var peter = require('../lib/peter');
    peter.bindDb(config.db, function(error) {
        if(error) {
            debug("Peter connection error");
            process.exit(1);
        } else {
            debug("Peter connected to the database");
        }
    });

    app.use(require('morgan')("dev"));

    //为了对login的时候使用cookie来存储token
    app.use(cookieParser());

    var bodyParser = require("body-parser");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

    app.use(express.static(path.join(__dirname, '../..', 'public')));

    app.engine('html', engines.swig);
    app.engine('jade', engines.jade);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, '..', 'views'));

    app.use(require('compression')());
    app.use(require('response-time')());

    app.use(function (req, res, next) {

        onFinished(res, function (err) {
            debug("[%s] finished request", req.connection.remoteAddress);
        });

        next();

    });

    // Bootstrap routes（会添加各个版本不同的路由）
    require('../routes/v1')(app);
    // ...其他版本的路由

    app.all("*",  auth.verify, function (req, res, next) {
        App.default(req, res);
    });

    // error handler for all the applications
    app.use(function (err, req, res, next) {

        var errorType = typeof err,
            code = err.status || 500,
            msg = { message: "Internal Server Error" };

        switch (err.name) {
            case "UnauthorizedError":
                code = err.status;
                msg = undefined;
                return res.redirect('/api/v1/auth/login');
            case "BadRequestError":
            case "UnauthorizedAccessError":
                return res.redirect('/api/v1/auth/login');
            case "NotFoundError":
                code = err.status;
                msg = err.inner;
                break;
            default:
                break;
        }

        if(code === 500) {
            //For Debugg
            console.log('服务端Error', err);
        }

        return res.status(code).json(msg);

    });

    debug("Creating HTTP server on port: %s", http_port);
    require('http').createServer(app).listen(http_port, function () {
        debug("HTTP Server listening on port: %s, in %s mode", http_port, app.get('env'));
    });
}
