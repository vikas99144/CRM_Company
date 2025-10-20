'use strict'

const handler = require('./handler');
const specs = require('./specs');

module.exports = [
    {
        method: 'POST',
        path: '/api/v1/role/create',
        options: specs.create,
        handler: handler.create
    },
    {
        method: 'GET',
        path: '/api/v1/role/view/{role_id}',
        options: specs.view,
        handler: handler.view
    },
    {
        method: 'GET',
        path: '/api/v1/role/list',
        options: specs.list,
        handler: handler.list
    },
    {
        method: 'PATCH',
        path: '/api/v1/role/status/{role_id}',
        options: specs.status,
        handler: handler.status
    },
       {
        method: 'PATCH',
        path: '/api/v1/role/update/{role_id}',
        options: specs.update,
        handler: handler.update
    },
    {
        method: 'DELETE',
        path: '/api/v1/role/delete/{role_id}',
        options: specs.remove,
        handler: handler.remove
    },
        {
        method: 'PATCH',
        path: '/api/v1/role/add-acl/{role_id}',
        options: specs.addAcl,
        handler: handler.addAcl
    }
]