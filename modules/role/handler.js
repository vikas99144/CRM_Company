'use strict'
const Lang = require("../../locales/en.json");
const Mongoose = require('mongoose');
const Utils = require("../../utils");
const Operation = require("../../operations");
const controller = require('./controller');
const Response = require("../../response");

const create = async (request, h) => {
    try {
        let payload = request.payload
        payload.slug = Utils.slugify(payload.name);
        let model = Mongoose.models.roles;
        let query = { slug: payload.slug, is_deleted: false };
        let isExist = await Operation.EXIST(model, query);
        if (isExist) {
            return Response.validation(h, Lang.ROLE_EXISTS);
        }
        const result = await controller.create(payload, h);
        return Response.success(h, Lang.ROLE_CREATE_SUCCESS, result);
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
        return Response.list(h,result.data, result.total );
    } catch (err) {
        return Response.internalServer(h, err.message);
    }
}


const status = async (request, h) => {
    try {
        const result = await controller.status({role_id: request.params.role_id, ...request.payload});
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
        payload.role_id = request.params.role_id;
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



const addAcl = async (request, h) => {
    try {
        let payload = request.payload;
        payload.role_id = request.params.role_id;
        let model = Mongoose.models.roles;
        let query = { _id: Utils.ObjectId(payload.role_id), is_deleted: false,status: "active"};
        let isExist = await Operation.EXIST(model, query);
        if (!isExist) {
            return Response.validation(h, Lang.ROLE_NOT_EXIST);
        }
        const result = await controller.addAcl(payload);
        return Response.success(h, Lang.UPDATE_SUCCESS, result);
    } catch (err) {
        return Response.internalServer(h, err.message);
    }
}


exports.view = view;
exports.list = list;
exports.create = create;
exports.status = status;
exports.remove = remove;
exports.update = update;
exports.addAcl = addAcl;
