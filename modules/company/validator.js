
'use strict'

const Joi = require('joi');

module.exports = {

    acl: {
        payload: Joi.object({
            admin_id: Joi.string().required().label('Admin id is required'),
            acl: Joi.array().min(1).required().label('Acl is required')
        })
    },

    sendOTP: {
        payload: Joi.object({
            send_for: Joi.string().required().label('OTP send for required'),
            country_code: Joi.string().required().label('Country code is required'),
            contact_number: Joi.string().required().label('contact number is required'),
            company_id: Joi.string().optional()
        })
    },

    verifyOTP: {
        payload: Joi.object({
            otp_id: Joi.string().required().label('Otp id is required'),
            otp_for: Joi.string().required().label('OTP for is required'),
            otp: Joi.string().required().label('OTP is required')
        })
    },

    changePassword: {
        params: Joi.object({
            company_id: Joi.string().required().label('Company id is required')
        }),
        payload: Joi.object({
            old_pwd: Joi.string()
                .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#?!@$%^&*-]).{8,}$'))
                .required()
                .label('Password is required')
                .messages({
                    'string.pattern.base': `Password must be at least 8 characters long and contain at least one uppercase letter, 
                    one lowercase letter, one digit, and one special character.`
                }),
            new_pwd: Joi.string()
                .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#?!@$%^&*-]).{8,}$'))
                .required()
                .label('Password is required')
                .messages({
                    'string.pattern.base': `Password must be at least 8 characters long and contain at least one uppercase letter,
                     one lowercase letter, one digit, and one special character. `
                })
        })
    },



    changeNumber: {
        params: Joi.object({
            company_id: Joi.string().required().label('Company id is required')
        }),
        payload: Joi.object({
            otp_id: Joi.string().required().label('OTP id is required'),
            otp: Joi.string().required().label('OTP is required')
        })
    },


    forgotPassword: {
        payload: Joi.object({
            company_id: Joi.string().required().label('Company id is required'),
            country_code: Joi.string()
                .required()
                .label('Country code is required'),
            contact_number: Joi.string()
                .required()
                .label('Country code is required')
        })
    },


    resetPassword: {
        payload: Joi.object({
            otp_id: Joi.string().required().label('OTP id is required'),
            otp: Joi.string().required().label('OTP is required'),
            pwd: Joi.string()
                .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#?!@$%^&*-]).{8,}$'))
                .required()
                .label('Password is required')
                .messages({
                    'string.pattern.base': `Password must be at least 8 characters long and contain at least one uppercase letter,
                     one lowercase letter, one digit, and one special character. `
                })
        })
    },

    register: {
        payload: Joi.object({
            name: Joi.string().required().label('Name is required'),
            email: Joi.string().required().email().label('Email is required'),
            country_code: Joi.string().required().label('Country code is required'),
            contact_number: Joi.string().required().label('Country number is required'),
            pwd: Joi.string()
                .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#?!@$%^&*-]).{8,}$'))
                .required()
                .label('Password is required')
                .messages({
                    'string.pattern.base': 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
                })
        })
    },

    login: {
        payload: Joi.object({
            email: Joi.string().required().email().label('Email is required'),
            pwd: Joi.string()
                .required()
                .label('Password is required')
        })
    },

    view: {
        params: Joi.object({
            company_id: Joi.string().required().label('Company id is required'),
        })
    },

    remove: {
        params: Joi.object({
            company_id: Joi.string().required().label('Company id is required'),
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
            company_id: Joi.string().required().label('Company id is required')
        }),
        payload: Joi.object({
            status: Joi.string()
                .required()
                .valid('active', 'inactive')
                .label('Status is required')
                .messages({
                    'any.only': 'Invalid status: must be either active or inactive'
                })
        })
    },

    remove: {
        params: Joi.object({
            company_id: Joi.string().required().label('Company id is required')
        })
    },

    status: {
        params: Joi.object({
            company_id: Joi.string().required().label('Company id is required')
        }),
        payload: Joi.object({
            name: Joi.string()
                .required()
                .description('Name is required')
        })
    }
} 
