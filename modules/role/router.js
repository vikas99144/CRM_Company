'use strict'

const handler = require('./handler');
const specs = require('./specs');

module.exports = [
    {
        method: 'POST',
        path: '/role/create',
        options: specs.create,
        handler: handler.create
    },
    {
        method: 'GET',
        path: '/role/view/{role_id}',
        options: specs.view,
        handler: handler.view
    },
    {
        method: 'GET',
        path: '/role/list',
        options: specs.list,
        handler: handler.list
    },
    {
        method: 'PATCH',
        path: '/status/{role_id}',
        options: specs.status,
        handler: handler.status
    },
       {
        method: 'PATCH',
        path: '/update/{role_id}',
        options: specs.update,
        handler: handler.update
    },
    {
        method: 'DELETE',
        path: '/role/delete/{role_id}',
        options: specs.remove,
        handler: handler.remove
    },
        {
        method: 'PATCH',
        path: '/role/add-acl/{role_id}',
        options: specs.addAcl,
        handler: handler.addAcl
    }
]