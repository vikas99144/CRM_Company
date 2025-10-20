'use strict'

const validator = require('./validator');
const userAuth = require('../../auth/auth');
const response = require("../../response");



module.exports = {

       acl: {
        description: 'Add acl',
        notes: 'Add acl',
        tags: ['Admin', "api"],
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
                method: userAuth.checkRoleAccess(["superadmin","admin"]),
                assign: 'checkRoleAccess'
            }
        ],
        validate: {
            payload: validator.acl.payload,
            failAction: response.failAction
        }
    },

    create: {
        description: 'Add',
        notes: 'Add',
        tags: ['Admin', "api"],
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
            // {
            //     method: userAuth.verifyToken,
            //     assign: 'token'
            // },
            {
                method: userAuth.checkRoleAccess(["superadmin"]),
                assign: 'checkRoleAccess'
            }
        ],
        validate: {
            payload: validator.create.payload,
            failAction: response.failAction
        }
    },

    login: {
        description: 'Login',
        notes: 'Login',
        tags: ['Admin', "api"],
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
            payload: validator.login.payload,
            failAction: response.failAction
        }
    },

    view: {
        description: 'View',
        notes: 'View',
        tags: ['Admin', "api"],
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
        description: 'List',
        notes: 'List',
        tags: ['Admin', "api"],
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
        description: 'Delete',
        notes: 'Delete',
        tags: ['Admin', "api"],
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
        description: 'Status',
        notes: 'Status',
        tags: ['Admin', "api"],
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

    update: {
        description: 'Update',
        notes: 'Update',
        tags: ['Admin', "api"],
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