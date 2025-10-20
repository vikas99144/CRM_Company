'use strict'

const Operation = require("../../operations");
const Mongoose = require("mongoose");
const { ObjectId } = require("../../utils");

exports.create = async (data, h) => {
    let model = Mongoose.models.roles;
    return await Operation.CREATE(model, data);
}

exports.view = async (data) => {
    let model = Mongoose.models.roles, matchQuery = {};
    matchQuery["$and"] = [];
    matchQuery["$and"].push({ is_deleted: false, _id: ObjectId(data.role_id) })

    let aggregateQuery = [
        {
            $match: matchQuery
        },
        {
            $project: {
                slug: 0
            }
        }
    ]
    return await Operation.GET(model, aggregateQuery);
}


exports.list = async (data) => {
    let { page, limit, search, start_date, end_date } = data;
    page = data.page || 1;
    limit = data.limit || 10;
    let model = Mongoose.models.roles, matchQuery = {};
    matchQuery["$and"] = [];
    matchQuery["$and"].push({ is_deleted: false })
    if (search) {
        matchQuery["$or"] = [];
        matchQuery.push({ name: { $regex: search, $options: "i" } });
    }

    if (start_date) {
        matchQuery["$and"].push({ created_at: { $gte: start_date } });
    }
    if (end_date) {
        matchQuery["$and"].push({ created_at: { $lte: end_date } });
    }

    if (start_date && end_date) {
        matchQuery["$and"].push({ created_at: { $gte: start_date, $lte: end_date } });
    }
    let aggregateQuery = [
        {
            $match: matchQuery
        },
        { $sort: { created_at: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: parseInt(limit) },
        {
            $project: {
                slug: 0
            }
        }
    ]

    let count = await Operation.TOTAL_COUNT(model,matchQuery); 
    let total = count.length > 0 ? count[0].count: count;
    let result = await Operation.FILTER(model, aggregateQuery);
    return {data: result, total: total}
}

exports.status = async (data, h) => {
    let model = Mongoose.models.roles,
        query = { _id: ObjectId(data.role_id) },
        updateObj = { status: data.status },
        populateQuery = [],
        selection = "-updated_at -slug -created_at";
    return await Operation.PATCH(model, query, updateObj, populateQuery, selection);
}


exports.remove = async (data, h) => {
    let model = Mongoose.models.roles;
    let query = { _id: ObjectId(data.role_id) };
    let updateObj = {is_deleted: true};
    return await Operation.SOFT_DELETE(model, query, updateObj);
}

exports.update = async (data, h) => {
    let model = Mongoose.models.roles,
        query = { _id: ObjectId(data.role_id) },
        updateObj = { name: data.name,slug: data.slug },
        populateQuery = [],
        selection = "-updated_at -slug -created_at";
    return await Operation.PATCH(model, query, updateObj, populateQuery, selection);
}

exports.addAcl = async (data, h) => {
    let model = Mongoose.models.roles,
        query = { _id: ObjectId(data.role_id) },
        updateObj = { acls: data.acls},
        populateQuery = [],
        selection = "-updated_at -slug -created_at";
    return await Operation.PATCH(model, query, updateObj, populateQuery, selection);
}


