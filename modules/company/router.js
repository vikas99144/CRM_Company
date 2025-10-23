'use strict'

const handler = require('./handler');
const specs = require('./specs');

module.exports = [
      {
        method: 'POST',
        path: '/api/v1/company/send-otp',
        options: specs.sendOTP,
        handler: handler.sendOTP
    },
    {
        method: 'POST',
        path: '/api/v1/company/register',
        options: specs.register,
        handler: handler.register
    },
    {
        method: 'POST',
        path: '/api/v1/company/login',
        options: specs.login,
        handler: handler.login
    },
    {
        method: 'GET',
        path: '/api/v1/company/view/{company_id}',
        options: specs.view,
        handler: handler.view
    },
    {
        method: 'GET',
        path: '/api/v1/company/list',
        options: specs.list,
        handler: handler.list
    },
    {
        method: 'PATCH',
        path: '/api/v1/company/status/{company_id}',
        options: specs.status,
        handler: handler.status
    },
    {
        method: 'PATCH',
        path: '/api/v1/company/update/{company_id}',
        options: specs.update,
        handler: handler.update
    },
    {
        method: 'DELETE',
        path: '/api/v1/company/delete/{company_id}',
        options: specs.remove,
        handler: handler.remove
    }
]