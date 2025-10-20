'use strict'

const Operation = require("../../operations");
const Mongoose = require("mongoose");
const { getHash, count } = require("../../helpers");
const { ObjectId } = require("../../utils");

exports.create = async (data, h) => {
    let model = Mongoose.models.acls;
    data.id = `ACL_${await count("acl")}`;
    return await Operation.CREATE(model, data);
}

exports.view = async (data) => {
    let model = Mongoose.models.admins, matchQuery = {};
    matchQuery["$and"] = [];
    matchQuery["$and"].push({ is_deleted: false, _id: ObjectId(data.acl_id) })
    let aggregateQuery = [
        {
            $match: matchQuery
        }
    ]
    return await Operation.GET(model, aggregateQuery);
}


exports.list = async (data) => {
    let { page, limit, search, start_date, end_date } = data;
    page = data.page || 1;
    limit = data.limit || 10;
    let model = Mongoose.models.acls, matchQuery = {};
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
        { $limit: parseInt(limit) }
    ]

    let count = await Operation.TOTAL_COUNT(model, matchQuery);
    let total = count.length > 0 ? count[0].count : count;
    let result = await Operation.FILTER(model, aggregateQuery);
    return { data: result, total: total }
}

exports.remove = async (data, h) => {
    let model = Mongoose.models.acls;
    let query = { _id: ObjectId(data.acl_id) };
    let updateObj = { is_deleted: true };
    return await Operation.SOFT_DELETE(model, query, updateObj);
}

exports.update = async (data, h) => {
    let model = Mongoose.models.admins,
        query = { _id: ObjectId(data.acl_id) },
        updateObj = { name: data.name, slug: data.slug },
        populateQuery = [],
        selection = "-updated_at -slug -created_at";
    return await Operation.PATCH(model, query, updateObj, populateQuery, selection);
}


