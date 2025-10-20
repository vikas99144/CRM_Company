
'use strict'

const Joi = require('joi');


module.exports = {
    add: {
        payload: Joi.object({ 
            android_version: Joi.string().required().description('Name is required')
        })

    },

    view: {
        params: Joi.object({ 
            id: Joi.string().required().description('Id is required')
        })

    },

    encrytdecrypt: {
        payload: Joi.object({ 
            data: Joi.string().required().description('Data is required')
        })

    },

    
    update: {
        payload: Joi.object({ 
            id: Joi.string().required().description('Id is required'),
            android_version: Joi.string().optional().description('Data is required')
        })
    },

} 
