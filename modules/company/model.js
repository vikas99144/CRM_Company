'use strict'
const mongoose = require("mongoose");
const { accountStatus } = require("../../constant/enum");

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: {type: String},
    slug: { type: String, required: true },
    email: { type: String, required: true },
    country_code: { type: String, required: true },
    contact_number: { type: String, required: true },
    role: {type: mongoose.Schema.Types.ObjectId,ref: 'roles',required: true},
    token: { type: String, default: null },
    pwd: { type: String },
    is_active: { type: Boolean, default: true },
    account_status: { type: String, enums:[
        accountStatus.Pending, 
        accountStatus.Approved, 
        accountStatus.Rejected, 
        accountStatus.Requestd], default: accountStatus.Approved },
    is_deleted: { type: Boolean, default: false },
    created_by: { type: String },
    updated_by: { type: String }
},
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })


module.exports = mongoose.model('companies', adminSchema, 'companies');

