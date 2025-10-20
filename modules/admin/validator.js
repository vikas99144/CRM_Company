
'use strict'

const Joi = require('joi');

module.exports = {

    acl: {
        payload: Joi.object({
            admin_id: Joi.string().required().description('Admin id is required'),
            acl: Joi.array().min(1).required().description('Acl is required')
        })
    },

    create: {
        payload: Joi.object({
            name: Joi.string().required().description('Name is required'),
            email: Joi.string().required().email().description('Email is required'),
            country_code: Joi.string().required().description('Country code is required'),
            contact_number: Joi.string().required().description('Country number is required'),
            role: Joi.string().required().description('Role is required'),
            pwd: Joi.string()
                .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#?!@$%^&*-]).{8,}$'))
                .required()
                .description('Password is required')
                .messages({
                    'string.pattern.base': 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
                })
        })
    },

    login: {
        payload: Joi.object({
            email: Joi.string().required().email().description('Email is required'),
            pwd: Joi.string()
                .required()
                .label('Password is required')
        })
    },

    view: {
        params: Joi.object({
            admin_id: Joi.string().required().description('Admin id is required'),
        })
    },

    remove: {
        params: Joi.object({
            admin_id: Joi.string().required().description('Admin id is required'),
        })
    },

    list: {
        query: Joi.object({
            page: Joi.number().required().default(1),
            limit: Joi.number().required().default(10),
            search: Joi.string().optional(),
            role: Joi.string().optional()
        }).unknown(true)
    },

    status: {
        params: Joi.object({
            admin_id: Joi.string().required().description('Admin id is required')
        }),
        payload: Joi.object({
            status: Joi.string()
                .required()
                .valid('active', 'inactive')
                .description('Status is required')
                .messages({
                    'any.only': 'Invalid status: must be either active or inactive'
                })
        })
    },

    remove: {
        params: Joi.object({
            admin_id: Joi.string().required().description('Admin id is required')
        })
    },

    status: {
        params: Joi.object({
            admin_id: Joi.string().required().description('Admin id is required')
        }),
        payload: Joi.object({
            name: Joi.string()
                .required()
                .description('Name is required')
        })
    }
} 
