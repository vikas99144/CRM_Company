'use strict'

const validator = require('./validator');
const userAuth = require('../../auth/auth');
const response = require("../../response");

module.exports = {

    sendOTP: {
        description: 'Add acl',
        notes: 'Add acl',
        tags: ['Company', "api"],
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
            payload: validator.sendOTP.payload,
            failAction: response.failAction
        }
    },

    verifyOTP: {
        description: 'Verify OTP',
        notes: 'Verify OTP',
        tags: ['Company', "api"],
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
            payload: validator.verifyOTP.payload,
            failAction: response.failAction
        }
    },

    acl: {
        description: 'Add acl',
        notes: 'Add acl',
        tags: ['Company', "api"],
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
                method: userAuth.checkRoleAccess(["superCompany", "Company"]),
                assign: 'checkRoleAccess'
            }
        ],
        validate: {
            payload: validator.acl.payload,
            failAction: response.failAction
        }
    },

    register: {
        description: 'Add',
        notes: 'Add',
        tags: ['Company', "api"],
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
                method: userAuth.checkRoleAccess(["company"]),
                assign: 'checkRoleAccess'
            }
        ],
        validate: {
            payload: validator.register.payload,
            failAction: response.failAction
        }
    },

    login: {
        description: 'Login',
        notes: 'Login',
        tags: ['Company', "api"],
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
        ],
        validate: {
            payload: validator.login.payload,
            failAction: response.failAction
        }
    },


    changePassword: {
        description: 'Change Password',
        notes: 'Change Password',
        tags: ['Company', "api"],
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
                method: userAuth.checkRoleAccess(["company"]),
                assign: 'checkRoleAccess'
            }
        ],
        validate: {
            payload: validator.changePassword.payload,
            params: validator.changePassword.params,
            failAction: response.failAction
        }
    },

    forgotPassword: {
        description: 'Forgot Password',
        notes: 'Forgot Password',
        tags: ['Company', "api"],
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
                method: userAuth.checkRoleAccess(["company"]),
                assign: 'checkRoleAccess'
            }
        ],
        validate: {
            payload: validator.forgotPassword.payload,
            failAction: response.failAction
        }
    },

    resetPassword: {
        description: 'Reset Password',
        notes: 'Reset Password',
        tags: ['Company', "api"],
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
                method: userAuth.checkRoleAccess(["company"]),
                assign: 'checkRoleAccess'
            }
        ],
        validate: {
            payload: validator.resetPassword.payload,
            failAction: response.failAction
        }
    },

    view: {
        description: 'View',
        notes: 'View',
        tags: ['Company', "api"],
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
                method: userAuth.checkRoleAccess(["Company", "superCompany"]),
                assign: 'checkRoleAccess'
            }
        ],
        validate: {
            params: validator.view.params,
            failAction: response.failAction
        }
    },

    remove: {
        description: 'Delete',
        notes: 'Delete',
        tags: ['Company', "api"],
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
                method: userAuth.checkRoleAccess(["Company", "superCompany"]),
                assign: 'checkRoleAccess'
            }
        ],
        validate: {
            params: validator.remove.params,
            failAction: response.failAction
        }
    },

    update: {
        description: 'Update',
        notes: 'Update',
        tags: ['Company', "api"],
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
                method: userAuth.checkRoleAccess(["Company"]),
                assign: 'checkRoleAccess'
            }
        ],
        validate: {
            params: validator.status.params,
            payload: validator.status.payload,
            failAction: response.failAction
        }
    },

    changePassword: {
        description: 'Change Password',
        notes: 'Change Password',
        tags: ['Company', "api"],
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
                method: userAuth.checkRoleAccess(["company"]),
                assign: 'checkRoleAccess'
            }
        ],
        validate: {
            params: validator.changePassword.params,
            payload: validator.changePassword.payload,
            failAction: response.failAction
        }
    },

    changeNumber: {
        description: 'Change Contact Number',
        notes: 'Change Contact Number',
        tags: ['Company', "api"],
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
                method: userAuth.checkRoleAccess(["company"]),
                assign: 'checkRoleAccess'
            }
        ],
        validate: {
            params: validator.changeNumber.params,
            payload: validator.changeNumber.payload,
            failAction: response.failAction
        }
    },
}