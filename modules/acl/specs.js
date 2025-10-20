'use strict'

const validator = require('./validator');
const userAuth = require('../../auth/auth');
const Response = require("../../response");

module.exports = {
    create: {
        description: 'Acl Add',
        notes: 'Acl Add',
         tags: ["Acl", "api"],
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
            payload: validator.create.payload,
            failAction: Response.failAction

        }

    },

    view: {
        description: 'Acl view',
        notes: 'Acl view',
        tags: ["Acl", "api"],
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
            failAction: Response.failAction

        }

    },

    list: {
        description: 'Acl list',
        notes: 'Acl list',
        tags: ["Acl", "api"],
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
        pre: [{
            method: userAuth.verifyToken,
            assign: 'token'
        }],
        validate: {
            payload: validator.list.params,
            failAction: Response.failAction
        }

    },

        remove: {
            description: 'Delete',
            notes: 'Delete',
            tags: ['Acl', "api"],
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
            pre: [
                {
                    method: userAuth.verifyToken,
                    assign: 'token'
                },
                {
                    method: userAuth.checkRoleAccess(["admin", "superadmin"]),
                    assign: 'checkRoleAccess'
                }
            ],
            validate: {
                params: validator.remove.params,
                failAction: Response.failAction
            }
        },

}