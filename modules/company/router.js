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
        path: '/api/v1/company/verify-otp',
        options: specs.verifyOTP,
        handler: handler.verifyOTP
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
        method: 'POST',
        path: '/api/v1/company/change-password/{company_id}',
        options: specs.changePassword,
        handler: handler.changePassword
    },
    {
        method: 'POST',
        path: '/api/v1/company/forgot-password',
        options: specs.forgotPassword,
        handler: handler.forgotPassword
    },
    {
        method: 'POST',
        path: '/api/v1/company/reset-password',
        options: specs.resetPassword,
        handler: handler.resetPassword
    },
    {
        method: 'POST',
        path: '/api/v1/company/change-number/{company_id}',
        options: specs.changeNumber,
        handler: handler.changeNumber
    },
    {
        method: 'GET',
        path: '/api/v1/company/view/{company_id}',
        options: specs.view,
        handler: handler.view
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