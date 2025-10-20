'use strict'

const handler = require('./handler');
const specs = require('./specs');

module.exports = [
    {
        method: 'POST',
        path: '/api/v1/acl/create',
        options: specs.create,
        handler: handler.create
    },
    {
        method: 'GET',
        path: '/api/v1/acl/view/{acl_id}',
        options: specs.view,
        handler: handler.view
    },
    {
        method: 'POST',
        path: '/api/v1/acl/list',
        options: specs.list,
        handler: handler.list
    },
    {
        method: 'DELETE',
        path: '/api/v1/acl/delete/{acl_id}',
        options: specs.remove,
        handler: handler.remove
    }
]