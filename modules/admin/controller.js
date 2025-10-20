'use strict'

const Operation = require("../../operations");
const Mongoose = require("mongoose");
const { createToken } = require("../../auth/auth");
const { getHash, count } = require("../../helpers");
const { ObjectId } = require("../../utils");

exports.create = async (data, h) => {
    let model = Mongoose.models.admins;
    data.pwd = await getHash(data.pwd);
    data.id = `ADM_${await count("admin")}`;
    return await Operation.CREATE(model, data);
}

exports.login = async (data, h) => {
    try {
        data.token = createToken(data.id, data.role);
        let model = Mongoose.models.admins,
            query = { _id: data.id },
            updateObj = { token: data.token },
            populateQuery = [
                {
                    path: "role",
                    select: "name slug"
                }
            ],
            selection = "-updated_at -slug -created_at -token -pwd -is_deleted";

        let user = await Operation.PATCH(model, query, updateObj, populateQuery, selection);
        user.token = data.token;
        return user;
    } catch (e) {
        console.log(e);
    }

}

exports.view = async (data) => {
    let model = Mongoose.models.admins, matchQuery = {};
    matchQuery["$and"] = [];
    matchQuery["$and"].push({ is_deleted: false, _id: ObjectId(data.admin_id) })
    let aggregateQuery = [
        {
            $match: matchQuery
        },
        {
            $lookup: {
                from: "roles",
                let: { role_id: "$role" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$_id", "$$role_id"] }
                        }
                    },
                    {
                        $project: { name: 1, slug: 1 }
                    }
                ],
                as: "role"
            }
        },
        { $unwind: { path: "$role", preserveNullAndEmptyArrays: true } },
        {
            $project: {
                slug: 0,
                token: 0,
                pwd: 0,
                is_deleted: 0
            }
        }
    ]
    return await Operation.GET(model, aggregateQuery);
}


exports.list = async (data) => {
    let { page, limit, search, start_date, end_date, role } = data;
    page = data.page || 1;
    limit = data.limit || 10;
    let model = Mongoose.models.admins, matchQuery = {};
    matchQuery["$and"] = [];
    matchQuery["$and"].push({ is_deleted: false })
    if (search) {
        matchQuery["$or"] = [];
        matchQuery.push({ name: { $regex: search, $options: "i" } });
    }

    if (role) {
        matchQuery["$and"].push({ role: ObjectId(role) });
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
        {
            $lookup: {
                from: "roles",
                let: { role_id: "$role" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$_id", "$$role_id"] }
                        }
                    },
                    {
                        $project: { name: 1, slug: 1 }
                    }
                ],
                as: "role"
            }
        },
        { $unwind: { path: "$role", preserveNullAndEmptyArrays: true } },
        { $sort: { created_at: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: parseInt(limit) },
        {
            $project: {
                slug: 0,
                pwd: 0,
                is_deleted: 0,
                token: 0
            }
        }
    ]

    let count = await Operation.TOTAL_COUNT(model, matchQuery);
    let total = count.length > 0 ? count[0].count : count;
    let result = await Operation.FILTER(model, aggregateQuery);
    return { data: result, total: total }
}

exports.status = async (data, h) => {
    let model = Mongoose.models.admins,
        query = { _id: ObjectId(data.admin_id) },
        updateObj = { status: data.status },
        populateQuery = [],
        selection = "-updated_at -slug -created_at";
    return await Operation.PATCH(model, query, updateObj, populateQuery, selection);
}


exports.remove = async (data, h) => {
    let model = Mongoose.models.admins;
    let query = { _id: ObjectId(data.admin_id) };
    let updateObj = { is_deleted: true };
    return await Operation.SOFT_DELETE(model, query, updateObj);
}

exports.update = async (data, h) => {
    let model = Mongoose.models.admins,
        query = { _id: ObjectId(data.admin_id) },
        updateObj = { name: data.name, slug: data.slug },
        populateQuery = [],
        selection = "-updated_at -slug -created_at";
    return await Operation.PATCH(model, query, updateObj, populateQuery, selection);
}

