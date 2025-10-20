'use strict'
const Lang = require("../../locales/en.json");
const Mongoose = require('mongoose');
const Utils = require("../../utils");
const { accountStatus } = require("../../constant/enum");
const { compareHash } = require("../../helpers");
const Operation = require("../../operations");
const controller = require('./controller');
const Response = require("../../response");


const create = async (request, h) => {
    try {
        let payload = request.payload
        payload.slug = Utils.slugify(payload.name);
        let model = Mongoose.models.admins;
        let query = { email: payload.email, is_deleted: false };
        let isExist = await Operation.EXIST(model, query);
        if (isExist) {
            return Response.validation(h, Lang.ADMIN_EXISTS);
        }
        const result = await controller.create(payload, h);
        return Response.success(h, Lang.ADMIN_CREATE_SUCCESS, payload);
    } catch (err) {
        console.log(err)
        return Response.internalServer(h, err.message);
    }
}

const login = async (request, h) => {
    try {
        let model = Mongoose.models.admins;
        let payload = request.payload
        let query = { email: payload.email, is_deleted: false, account_status:  accountStatus.Approved};
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

const list = async (request, h) => {
    try {
        const result = await controller.list(request.query);
        return Response.list(h, result.data, result.total);
    } catch (err) {
        return Response.internalServer(h, err.message);
    }
}

const status = async (request, h) => {
    try {
        const result = await controller.status({ admin_id: request.params.admin_id, ...request.payload });
        return Response.success(h, Lang.UPDATE_SUCCESS, result);
    } catch (err) {
        console.log(err);
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
        payload.id = request.params.id;
        payload.slug = Utils.slugify(payload.name);
        let model = Mongoose.models.roles;
        let query = { slug: payload.slug, is_deleted: false };
        let isExist = await Operation.EXIST(model, query);
        if (isExist) {
            return Response.validation(h, Lang.ROLE_EXISTS);
        }
        const result = await controller.update(payload);
        return Response.success(h, Lang.UPDATE_SUCCESS, result);
    } catch (err) {
        return Response.internalServer(h, err.message);
    }
}


exports.view = view;
exports.list = list;
exports.login = login;
exports.create = create;
exports.status = status;
exports.remove = remove;
exports.update = update;
