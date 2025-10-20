
'use strict'

const Joi = require('joi');


module.exports = {
    create: {
        payload: Joi.object({
            name: Joi.string().required().description('Name is required')
        })

    },

    view: {
        params: Joi.object({
            acl_id: Joi.string().required().description('Acl id is required'),
        })

    },

    remove: {
        params: Joi.object({
            acl_id: Joi.string().required().description('Acl id is required'),
        })
    },

    list: {
        query: Joi.object({
            page: Joi.number().required().default(1),
            limit: Joi.number().required().default(10),
            search: Joi.string().optional()
        }).unknown(true)
    }

} 
