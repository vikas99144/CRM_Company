'use strict'

const success = (h, message, data) => {
    const res = h.response({
        isSuccess: true,
        statusCode: 200,
        message: message,
        data: data
    })
    res.code(200)
    return res
}


const list = (h, items, total) => {
    const res = h.response({
        isSuccess: true,
        status: 'success',
        statusCode: 200,
        total: total,
        data: items
    })
    res.code(200)
    return res
}


const failure = (h, message) => {
    const res = h.response({
        isSuccess: false,
        status: 'failure',
        statusCode: 320,
        message: message
    })
    res.code(200)
    res.takeover()
    return res
}

const accessRevoked = (h, message) => {
    const res = h.response({
        isSuccess: false,
        status: 'failure',
        statusCode: 406,
        message: message
    })
    res.code(200)
    res.takeover()
    return res
}


const accessGranted = (h, user, token) => {
    const res = h.response({
        status: 'success',
        statusCode: 200,
        message: 'Successfully Login',
        data: user
    })
    res.header('x-access-token', token)
    return res
}

const error = (h) => {
    const res = h.response({
        status: 'error',
        statusCode: 500,
        message: 'Technical Error! Please try again later.'
    })
    res.code(200)
    res.takeover()
    return res
}

const failAction = (request, h, error) => {
    let customErrorMessage = ''
    if (error.output.payload.message.indexOf('[') > -1) {
        customErrorMessage = error.output.payload.message.substr(error.output.payload.message.lastIndexOf('['))
    } else {
        customErrorMessage = error.output.payload.message
    }
    customErrorMessage = customErrorMessage.replace(/"/g, '')
    customErrorMessage = customErrorMessage.replace('[', '')
    customErrorMessage = customErrorMessage.replace(']', '')
    customErrorMessage = customErrorMessage.replace(']', '')
    const res = h.response({
        isSuccess: false,
        status: 'failure',
        statusCode: 320,
        message: customErrorMessage
    })
    res.code(200)
    res.takeover()
    return res
}

const accessDeniedAction = (request, h, error) => {
    let customErrorMessage = ''
    if (error.output.payload.message.indexOf('[') > -1) {
        customErrorMessage = error.output.payload.message.substr(error.output.payload.message.lastIndexOf('['))
    } else {
        customErrorMessage = error.output.payload.message
    }
    customErrorMessage = customErrorMessage.replace(/"/g, '')
    customErrorMessage = customErrorMessage.replace('[', '')
    customErrorMessage = customErrorMessage.replace(']', '')
    customErrorMessage = customErrorMessage.replace(']', '')
    const res = h.response({
        isSuccess: false,
        status: 'failure',
        statusCode: 400,
        message: customErrorMessage
    })
    res.code(200)
    res.takeover()
    return res

}

const validation = (h,message) => {
    const res =  h.response({
        isSuccess: false,
        status: 'failure',
        statusCode: 400,
        message: message
    });
    return res;
}

const internalServer = (h, message) => {
    const res = h.response({
        isSuccess: false,
        status: 'failure',
        statusCode: 500,
        message: message
    })
    return res
}

const unathorized = (message) => {
    const resData = {
        isSuccess: false,
        status: 'failure',
        statusCode: 404,
        message: message
    };
    return resData;

}


exports.list = list
exports.error = error
exports.failure = failure
exports.accessRevoked = accessRevoked
exports.accessGranted = accessGranted
exports.failAction = failAction
exports.accessDeniedAction = accessDeniedAction
exports.success = success
exports.validation = validation
exports.internalServer = internalServer
exports.unathorized = unathorized
