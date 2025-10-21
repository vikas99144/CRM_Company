'use strict'
const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., 'owner', 'manager' "employee" "accountant"
    slug: { type: String, required: true },
    description: { type: String },
    permissions: [String],  // e.g. ['read', 'write', 'delete']
    is_deleted: { type: Boolean, default: false },
    acls:[{type: mongoose.Schema.Types.ObjectId,ref: 'acls'}],
    status: { type: String, enum:["active","inactive"], default: "active" },
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


module.exports = mongoose.model('roles', roleSchema, 'roles');

