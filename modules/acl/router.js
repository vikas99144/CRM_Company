'use strict'

const handler = require('./handler');
const specs = require('./specs');

module.exports = [
    {
        method: 'POST',
        path: '/acl/create',
        options: specs.create,
        handler: handler.create
    },
    {
        method: 'GET',
        path: '/acl/view/{acl_id}',
        options: specs.view,
        handler: handler.view
    },
    {
        method: 'POST',
        path: '/acl/list',
        options: specs.list,
        handler: handler.list
    },
    {
        method: 'DELETE',
        path: '/acl/delete/{acl_id}',
        options: specs.remove,
        handler: handler.remove
    }
]