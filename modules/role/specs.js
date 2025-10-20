'use strict'

const validator = require('./validator');
const userAuth = require('../../auth/auth');
const response = require("../../response");

module.exports = {
    create: {
        description: 'Role add',
        notes: 'Role add',
        tags: ['Role', "api"],
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
        // pre: [
        //     {
        //         method: userAuth.verifyToken,
        //         assign: 'token'
        //     },
        //     {
        //         method: userAuth.checkRoleAccess(["admin", "superadmin"]),
        //         assign: 'checkRoleAccess'
        //     }
        // ],
        validate: {
            payload: validator.create.payload,
            failAction: response.failAction
        }
    },

    view: {
        description: 'Role view',
        notes: 'Role view',
        tags: ['Role', "api"],
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
            params: validator.view.params,
            failAction: response.failAction
        }
    },

    list: {
        description: 'Role list',
        notes: 'Role list',
        tags: ['Role', "api"],
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
            query: validator.list.query,
            failAction: response.failAction
        }
    },

    remove: {
        description: 'Role delete',
        notes: 'Role delete',
        tags: ['Role', "api"],
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
            failAction: response.failAction
        }
    },

    status: {
        description: 'Role status',
        notes: 'Role status',
        tags: ['Role', "api"],
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
            params: validator.status.params,
            payload: validator.status.payload,
            failAction: response.failAction
        }
    },

    addAcl: {
        description: 'Add acl',
        notes: 'Add acl',
        tags: ['Role', "api"],
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
            params: validator.addAcl.params,
            payload: validator.addAcl.payload,
            failAction: response.failAction
        }
    },

    update: {
        description: 'Role update',
        notes: 'Role update',
        tags: ['Role', "api"],
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
            params: validator.status.params,
            payload: validator.status.payload,
            failAction: response.failAction
        }
    },
}