'use strict'
const Lang = require("../../locales/en.json");
const Mongoose = require('mongoose');
const Utils = require("../../utils");
const { accountStatus } = require("../../constant/enum");
const { compareHash } = require("../../helpers");
const Operation = require("../../operations");
const controller = require('./controller');
const Response = require("../../response");


const sendOTP = async (request, h) => {
    try {
        let payload = request.payload
        let model = Mongoose.models.otps;
        let query = { country_code: payload.country_code, contact_number: payload.contact_number, is_deleted: false };
        if (payload.send_for == "change_number") {
            query = {
                _id: { $ne: Utils.ObjectId(payload.company_id) },
                country_code: payload.country_code,
                contact_number: payload.contact_number,
                is_deleted: false
            };
        }
        if (payload.send_for == "signup" || payload.send_for == "change_number") {
            let isExist = await Operation.EXIST(model, query);
            if (isExist) {
                return Response.validation(h, Lang.COMPANY_ALREADY_EXIST);
            }
        }
        
        const result = await controller.sendOTP(payload, h);
        return Response.success(h, Lang.OTP_SEND_SUCCESS, result);
    } catch (err) {
        console.log(err)
        return Response.internalServer(h, err.message);
    }
}


const verifyOTP = async (request, h) => {
    try {
        let payload = request.payload
        let model = Mongoose.models.Companies;
        let query = { _id: Utils.ObjectId(payload.otp_id), is_deleted: false };
        let isExist = await Operation.EXIST(model, query);
        if (!isExist) {
            return Response.validation(h, Lang.OTP_EXPIRED);
        }

        if (isExist.otp !== payload.otp) {
            return Response.validation(h, Lang.OTP_INVALID);
        }

        const result = await controller.verifyOTP(payload, h);
        return Response.success(h, Lang.OTP_SEND_SUCCESS, {});
    } catch (err) {
        console.log(err)
        return Response.internalServer(h, err.message);
    }
}


const register = async (request, h) => {
    try {
        let payload = request.payload
        payload.slug = Utils.slugify(payload.name);
        let model = Mongoose.models.companies;
        let query = { email: payload.email, is_deleted: false };
        let isExist = await Operation.EXIST(model, query);
        if (isExist) {
            return Response.validation(h, Lang.COMPANY_ALREADY_EXIST);
        }
        const result = await controller.register(payload, h);
        return Response.success(h, Lang.COMPANY_CREATED_SUCCESS, payload);
    } catch (err) {
        console.log(err)
        return Response.internalServer(h, err.message);
    }
}

const login = async (request, h) => {
    try {
        let model = Mongoose.models.Companies;
        let payload = request.payload
        let query = { email: payload.email, is_deleted: false, account_status: accountStatus.Approved };
        let isExist = await Operation.EXIST(model, query);
        if (!isExist) {
            return Response.validation(h, Lang.USER_NOT_FOUND);
        }
        if (!await compareHash(payload.pwd, isExist.pwd)) {
            return Response.validation(h, Lang.INCORRECT_CREDENTIALS);
        }
        payload.id = isExist._id;
        payload.role = isExist.role;
        const result = await controller.login(payload, h);
        return Response.success(h, Lang.LOGIN_SUCCESS, result);
    } catch (err) {
        console.log(err)
        return Response.internalServer(h, err.message);
    }
}

const view = async (request, h) => {
    try {
        const result = await controller.view(request.params);
        return Response.success(h, Lang.VIEW_SUCCESS, result);
    } catch (err) {
        return Response.internalServer(h, err.message);
    }
}

const remove = async (request, h) => {
    try {
        const result = await controller.remove(request.params);
        return Response.success(h, Lang.DELETE_SUCCESS, request.params);
    } catch (err) {
        return Response.internalServer(h, err.message);
    }
}

const update = async (request, h) => {
    try {
        let payload = request.payload;
        payload.company_id = request.params.company_id;
        payload.slug = Utils.slugify(payload.company_name);
        let model = Mongoose.models.companies;
        let query = { slug: payload.slug, _id: { $ne: Utils.ObjectId(payload.company_id) }, is_deleted: false };
        let isExist = await Operation.EXIST(model, query);
        if (isExist) {
            return Response.validation(h, Lang.COMPANY_ALREADY_EXIST);
        }
        const result = await controller.update(payload);
        return Response.success(h, Lang.UPDATE_SUCCESS, result);
    } catch (err) {
        return Response.internalServer(h, err.message);
    }
}


const changePassword = async (request, h) => {
    try {
        let payload = request.payload;
        payload.company_id = request.params.company_id;
        let model = Mongoose.models.companies;
        let query = { _id: ObjectId(payload.company_id), is_deleted: false };
        let isExist = await Operation.EXIST(model, query);
        if (!isExist) {
            return Response.validation(h, Lang.COMPANY_NOT_FOUND);
        }
        if (!await compareHash(payload.old_pwd, isExist.pwd)) {
            return Response.validation(h, Lang.OLD_PASS_NOT_MATCH);
        }
        const result = await controller.update(payload);
        return Response.success(h, Lang.OTP_SEND_SUCCESS, result);
    } catch (err) {
        return Response.internalServer(h, err.message);
    }
}

const forgotPassword = async (request, h) => {
    try {
        let payload = request.payload;
        let model = Mongoose.models.companies;
        let query = { country_code: payload.country_code, contact_number: payload.contact_number, is_deleted: false };
        let isExist = await Operation.EXIST(model, query);
        if (!isExist) {
            return Response.validation(h, Lang.COMPANY_NOT_FOUND);
        }
        payload.send_for = "forgot_password";
        const result = await controller.sendOTP(payload);
        return Response.success(h, Lang.UPDATE_SUCCESS, result);
    } catch (err) {
        return Response.internalServer(h, err.message);
    }
}


const resetPassword = async (request, h) => {
    try {
        let payload = request.payload;
        let model = Mongoose.models.otps;
        let query = { _id: Utils.ObjectId(payload.otp_id), is_deleted: false };
        let isExist = await Operation.EXIST(model, query);
        if (!isExist) {
            return Response.validation(h, Lang.OTP_EXPIRED);
        }
        if (isExist.otp !== payload.otp) {
            return Response.validation(h, Lang.OTP_INVALID);
        }
        payload.country_code = isExist.country_code;
        payload.contact_number = isExist.contact_number;
        const result = await controller.resetPassword(payload);
        return Response.success(h, Lang.PASSWORD_RESET_SUCCESS, result);
    } catch (err) {
        return Response.internalServer(h, err.message);
    }
}


const changeNumber = async (request, h) => {
    try {
        let payload = request.payload;
        let model = Mongoose.models.otps;
        let query = { _id: Utils.ObjectId(payload.otp_id), is_deleted: false };
        let isExist = await Operation.EXIST(model, query);
        if (!isExist) {
            return Response.validation(h, Lang.OTP_EXPIRED);
        }
        if (isExist.otp !== payload.otp) {
            return Response.validation(h, Lang.OTP_INVALID);
        }
        payload.country_code = isExist.country_code;
        payload.contact_number = isExist.contact_number;
        const result = await controller.changeNumber(payload);
        return Response.success(h, Lang.NUBER_CHANGE_SUCCESS, result);
    } catch (err) {
        return Response.internalServer(h, err.message);
    }
}

exports.view = view;
exports.login = login;
exports.remove = remove;
exports.update = update;
exports.sendOTP = sendOTP;
exports.register = register;
exports.verifyOTP = verifyOTP;
exports.changeNumber = changeNumber;
exports.resetPassword = resetPassword;
exports.changePassword = changePassword;
exports.forgotPassword = forgotPassword;


