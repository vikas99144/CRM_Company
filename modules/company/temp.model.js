'use strict'
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    company_name: { type: String, required: true },
    id: {type: String},
    slug: { type: String, required: true },
    email: { type: String, required: true },
    country_code: { type: String, required: true },
    contact_number: { type: String, required: true },
    industry: {type: String},
    role: {type: mongoose.Schema.Types.ObjectId,ref: 'roles',required: true},
    pwd: { type: String },
    created_at: { type: Date, default: Date.now, expires: 60 * 60 }
},
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })


module.exports = mongoose.model('temp_companies', companySchema, 'temp_companies');

