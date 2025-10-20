'use strict'

const handler = require('./handler');
const specs = require('./specs');

module.exports = [
    {
        method: 'POST',
        path:'/api/v1/setting/add',
        options: specs.add,
        handler: handler.add
    },
    {
        method: 'GET',
        path:'/api/v1/view/view/{id}',
        options: specs.view,
        handler: handler.view
    },
    {
        method: 'PATCH',
        path:'/api/v1/setting/update',
        options: specs.update,
        handler: handler.update
    },
      {
        method: 'POST',
        path:'/api/v1/setting/encrytdecrypt',
        options: specs.encrytdecrypt,
        handler: handler.encrytdecrypt
    }
]