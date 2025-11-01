'use strict'

const Operation = require("../../operations");
const Mongoose = require("mongoose");
const { createToken } = require("../../auth/auth");
const { ObjectId } = require("../../utils");
const { getHash, count, generateOTP } = require("../../helpers");

exports.sendOTP = async (data, h) => {
    let model = Mongoose.models.otps;
    data.otp = generateOTP(6);
    data.otp_for = "number";
    // Integrate to send otp
    let result = await Operation.CREATE(model, data);
    return { otp_id: result._id, contry_code: data.contry_code, contact_number: data.contact_number };
}


exports.verifyOTP = async (data, h) => {
    let model = Mongoose.models.otps, token = null;
    let query = { _id: ObjectId(data.otp_id) }
    let update = { is_deleted: true }
    let result = await Operation.SOFT_DELETE(model, query, update);
    if (data.otp_for == "signup") {
        model = Mongoose.models.temp_companies, matchQuery = {};
        matchQuery = { contry_code: result.country_code, contact_number: result.contact_number };
        let aggregateQuery = [
            {
                $match: matchQuery
            }
        ]
        let temp_company = await Operation.GET(model, aggregateQuery);
        let createCompany = {
            company_name: temp_company[0].company_name,
            id: temp_company[0].id,
            slug: temp_company[0].slug,
            email: temp_company[0].email,
            country_code: temp_company[0].country_code,
            contact_number: temp_company[0].contact_number,
            industry: temp_company[0].industry,
            pwd: temp_company[0].pwd
        }

        let company = await Operation.CREATE(model, createCompany);
        token = createToken(company._id, "company");
        await Operation.HARD_DELETE({ _id: temp_company[0]._id });
        return { 
            otp_for: data.otp_for, 
            token: token, 
            company_name: company.company_name, 
            country_code: company.country_code,
            contact_number: company.contact_number,
            email: company.email 
        };
    } else {
        return { otp_for: data.otp_for, token: token };
    }

}

exports.register = async (data, h) => {
    let model = Mongoose.models.temp_companies;
    data.pwd = await getHash(data.pwd);
    data.id = `COM_${await count("company")}`;
    let otp = await this.sendOTP(data, h);
    let result = await Operation.CREATE(model, data);
    return otp;
}

exports.login = async (data, h) => {
    try {
        data.token = createToken(data.id, data.role);
        let model = Mongoose.models.companies,
            query = { _id: data.id },
            updateObj = { token: data.token },
            populateQuery = [],
            selection = "-updated_at -slug -created_at -token -pwd -is_deleted";

        let user = await Operation.PATCH(model, query, updateObj, populateQuery, selection);
        user.token = data.token;
        return user;
    } catch (e) {
        console.log(e);
    }

}

exports.view = async (data) => {
    let model = Mongoose.models.companies, matchQuery = {};
    matchQuery["$and"] = [];
    matchQuery["$and"].push({ is_deleted: false, _id: ObjectId(data.company_id) })
    let aggregateQuery = [
        {
            $match: matchQuery
        },
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

exports.remove = async (data, h) => {
    let model = Mongoose.models.companies;
    let query = { _id: ObjectId(data.company_id) };
    let updateObj = { is_deleted: true };
    return await Operation.SOFT_DELETE(model, query, updateObj);
}

exports.update = async (data, h) => {
    let model = Mongoose.models.companies,
        query = { _id: ObjectId(data.company_id) },
        updateObj = { pwd: await getHash(data.new_pwd)},
        populateQuery = [],
        selection = "-updated_at -slug -created_at";
    return await Operation.PATCH(model, query, updateObj, populateQuery, selection);
}


exports.resetPassword = async (data, h) => {
    let model = Mongoose.models.companies,
        query = { country_code: data.country_code, contact_number: data.contact_number },
        updateObj = { pwd: await getHash(data.pwd)},
        populateQuery = [],
        selection = "-updated_at -slug -created_at";
    return await Operation.PATCH(model, query, updateObj, populateQuery, selection);
}


exports.changeNumber = async (data, h) => {
    let model = Mongoose.models.companies,
        query = { _id: ObjectId(data.company_id) },
        updateObj = {country_code: data.country_code, contact_number: data.contact_number },
        populateQuery = [],
        selection = "-updated_at -slug -created_at";
    return await Operation.PATCH(model, query, updateObj, populateQuery, selection);
}

