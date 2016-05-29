'use strict';

var User = require('../../model/user').model;

exports.whoAmI = function(req, res) {
  res.json(req.user);
  return;
};

exports.getOne = function(req, res) {

  var query = User.findById(req.params.id);

  if (req.user.id !== req.params.id) {
    query.select('-facebook -twitter -google');
  }

  query
    .then(function(doc) {
      console.log('get User with id: ' + req.params.id);
      res.json(doc);
      return doc;
    })
    .catch(function(err) {
      console.log('users get err: ' + err);
      res.status(500).end();
      return;
    });
};

exports.update = function(req, res) {
  res.status(500).end();
  return;
};

