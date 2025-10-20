
'use strict'

const Joi = require('joi');



module.exports = {

    create: {
        payload: Joi.object({
            name: Joi.string().required().description('Name is required'),
            permissions: Joi.array().items(Joi.string()).required().default(["read", "write", "delete"])
        })
    },

    view: {
        params: Joi.object({
            role_id: Joi.string().required().description('Role id is required'),
        })
    },

    remove: {
        params: Joi.object({
            role_id: Joi.string().email().required().description('Role id is required'),
        })
    },

    list: {
        query: Joi.object({
            page: Joi.number().required().default(1),
            limit: Joi.number().required().default(10)
        })
    },

    status: {
        params: Joi.object({
            role_id: Joi.string().required().description('Role id is required')
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

    addAcl: {
        params: Joi.object({
            role_id: Joi.string().required().description('Role id is required')
        }),
        payload: Joi.object({
            acls: Joi.array().min(1).items(Joi.string()).required().description("Acl is required")
        })
    },

    remove: {
        params: Joi.object({
            role_id: Joi.string().required().description('Role id is required')
        })
    },

    status: {
        params: Joi.object({
            role_id: Joi.string().required().description('Role id is required')
        }),
        payload: Joi.object({
            name: Joi.string()
                .required()
                .description('Name is required')
        })
    }
} 
