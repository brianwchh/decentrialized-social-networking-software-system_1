'user strict';

var Joi = require('@hapi/joi');

var _require = require('../View/View'),
    UserView = _require.UserView;

Route = [{
  path: '/api/user/createsuperuser',
  method: 'POST',
  handler: UserView.createsuperuser
}, {
  path: '/api/user',
  method: 'GET',
  options: {
    auth: 'isSuperUser'
  },
  handler: UserView.userList
}, {
  path: '/api/user/register',
  method: 'POST',
  options: {
    payload: {
      parse: true,
      allow: 'application/json' // multipart: true

    }
  },
  handler: UserView.register
}, {
  path: '/api/user/login',
  method: 'POST',
  handler: UserView.login
}, {
  path: '/api/user/{id}',
  method: 'GET',
  options: {
    validate: {
      params: Joi.object({
        id: Joi.number() // need validate id, otherwise api/user/xo is also valid, which is not what we want

      })
    },
    auth: 'isCurrentOrSuper'
  },
  handler: UserView.getUser
}, {
  path: '/api/user/{id}',
  method: 'PUT',
  options: {
    validate: {
      params: Joi.object({
        id: Joi.number()
      })
    },
    auth: 'isCurrentOrSuper'
  },
  handler: UserView.putUser
}, {
  path: '/api/user/{id}',
  method: 'DELETE',
  options: {
    validate: {
      params: Joi.object({
        id: Joi.number()
      })
    },
    auth: 'isCurrentOrSuper'
  },
  handler: UserView.deleteUser
}];
module.exports = Route;