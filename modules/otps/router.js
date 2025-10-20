'use strict'

const handler = require('./handler');
const specs = require('../specs/index');

module.exports = [
    {
        method: 'POST',
        path:'/api/v1/users/signup',
        options: specs.signup,
        handler: handler.signup
    },
    {
        method: 'POST',
        path:'/api/v1/users/login',
        options: specs.login,
        handler: handler.login
    },
    {
        method: 'POST',
        path:'/api/v1/users/list',
        options: specs.list,
        handler: handler.list
    }
]