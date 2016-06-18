"use strict";
var express = require('express');
var fs = require('fs');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users');

var Schema = mongoose.Schema;

var schemaCustomers = new Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true }
});

var modelCustomers = mongoose.model('customers', schemaCustomers);

var schemaUsers = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true }
});

var modelUsers = mongoose.model('users', schemaUsers);

router.get('/', function(req, res) {
  fs.readFile('index.html',function(error,txt){
			res.write(txt);
			res.end();
		});
});

router.get('/customers', function(req, res) {
    return modelCustomers.find(function (err, items) {
        res.header({"Access-Control-Allow-Origin" : "*"});
        if (!err) {
            return res.send(items);
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

router.get('/users', function(req, res) {
    return modelUsers.find(function (err, items) {
        res.header({"Access-Control-Allow-Origin" : "*"});
        if (!err) {
            return res.send(items);
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

router.options('/users', function(req, res) {
  res.header({"Access-Control-Allow-Origin" : "*"});
  res.header({"Access-Control-Allow-Credentials" : "true"});
  res.header({"Access-Control-Allow-Headers:" : "accept,accept-language,content-language,content-type,x-requested-with"});
  res.header({"Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE"});
  return res.send();
});

router.options('/customers', function(req, res) {
  res.header({"Access-Control-Allow-Origin" : "*"});
  res.header({"Access-Control-Allow-Credentials" : "true"});
  res.header({"Access-Control-Allow-Headers:" : "accept,accept-language,content-language,content-type,x-requested-with"});
  res.header({"Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE"});
  return res.send();
});

router.post('/users', function(req, res) {
    var user = new modelUsers({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    });
    console.log(req.body);
    user.save(function (err) {
        if (!err) {
            res.header({"Access-Control-Allow-Origin" : "*"});
            return res.send();
        } else {
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
        }
    });
});

router.post('/customers', function(req, res) {
    var customer = new modelCustomers({
        name: req.body.name,
        city: req.body.city,
        phone: req.body.phone
    });
    console.log(req.body);
    customer.save(function (err) {
        if (!err) {
            res.header({"Access-Control-Allow-Origin" : "*"});
            return res.send();
        } else {
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
        }
    });
});

router.delete('/customers/:id', function (req, res){
    return modelCustomers.findById(req.params.id, function (err, article) {
        if(!article) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return article.remove(function (err) {
            if (!err) {
                res.header({"Access-Control-Allow-Origin" : "*"});
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                return res.send({ error: 'Server error' });
            }
        });
    });
});

router.put('/customers/:id', function (req, res){
    return modelCustomers.findById(req.params.id, function (err, article) {
        if(!article) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        article.name = req.body.name;
        article.city = req.body.city;
        article.phone = req.body.phone;

        return article.save(function (err) {
            if (!err) {
                res.header({"Access-Control-Allow-Origin" : "*"});
                return res.send({ status: 'OK', article:article });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
            }
        });
    });
});

module.exports = router;