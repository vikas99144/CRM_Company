'use strict'

const handler = require('./handler');
const specs = require('./specs');

module.exports = [
    {
        method: 'POST',
        path: '/api/v1/admin/create',
        options: specs.create,
        handler: handler.create
    },
    {
        method: 'POST',
        path: '/api/v1/admin/login',
        options: specs.login,
        handler: handler.login
    },
    {
        method: 'GET',
        path: '/api/v1/admin/view/{admin_id}',
        options: specs.view,
        handler: handler.view
    },
    {
        method: 'GET',
        path: '/api/v1/admin/list',
        options: specs.list,
        handler: handler.list
    },
    {
        method: 'PATCH',
        path: '/api/v1/admin/status/{admin_id}',
        options: specs.status,
        handler: handler.status
    },
    {
        method: 'PATCH',
        path: '/api/v1/admin/update/{admin_id}',
        options: specs.update,
        handler: handler.update
    },
    {
        method: 'DELETE',
        path: '/api/v1/admin/delete/{admin_id}',
        options: specs.remove,
        handler: handler.remove
    }
]