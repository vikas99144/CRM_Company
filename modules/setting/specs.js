'use strict'

const validator = require('./validator');
const userAuth = require('../../auth/auth');
const response = require("../../response");

module.exports = {
    add: {
        description: 'Setting',
        notes: 'Setting',
        tags: ["Setting", "api"],
        plugins: {
            'hapi-swagger': {
                responses: {
                    200: {
                        description: 'Example of response model in return to success request',
                        schema: validator.success
                    },
                    320: {
                        description: 'Example of response model in return to failure request',
                        schema: validator.failure
                    }
                }
            }
        },
        validate: {
            payload: validator.add.payload,
            failAction: response.failAction

        }

    },

    view: {
        description: 'View',
        notes: 'View',
        tags: ["Setting", "api"],
        plugins: {
            'hapi-swagger': {
                responses: {
                    200: {
                        description: 'Example of response model in return to success request',
                        schema: validator.success
                    },
                    320: {
                        description: 'Example of response model in return to failure request',
                        schema: validator.failure
                    }
                }
            }
        },
        validate: {
            params: validator.view.params,
            failAction: response.failAction

        }

    },
    update: {
        description: 'Update',
        notes: 'Update',
        tags: ["Setting", "api"],
        plugins: {
            'hapi-swagger': {
                responses: {
                    200: {
                        description: 'Example of response model in return to success request',
                        schema: validator.success
                    },
                    320: {
                        description: 'Example of response model in return to failure request',
                        schema: validator.failure
                    }
                }
            }
        },
        validate: {
            payload: validator.update.payload,
            failAction: response.failAction

        }

    },

    encrytdecrypt: {
        description: 'Encrypt Decrypt',
        notes: 'Encrypt Decrypt',
        tags: ["Setting", "api"],
        plugins: {
            'hapi-swagger': {
                responses: {
                    200: {
                        description: 'Example of response model in return to success request',
                        schema: validator.success
                    },
                    320: {
                        description: 'Example of response model in return to failure request',
                        schema: validator.failure
                    }
                }
            }
        },
        validate: {
            payload: validator.encrytdecrypt.payload,
            failAction: response.failAction
        }

    },

}