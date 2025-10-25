'use strict'

const handler = require('./handler');
const specs = require('./specs');

module.exports = [
    {
        method: 'POST',
        path:'/setting/add',
        options: specs.add,
        handler: handler.add
    },
    {
        method: 'GET',
        path:'/view/view/{id}',
        options: specs.view,
        handler: handler.view
    },
    {
        method: 'PATCH',
        path:'/setting/update',
        options: specs.update,
        handler: handler.update
    },
      {
        method: 'POST',
        path:'/setting/encrytdecrypt',
        options: specs.encrytdecrypt,
        handler: handler.encrytdecrypt
    }
]