'use strict'
const mongoose = require("mongoose");
const countSchema = new mongoose.Schema({
    name: { type: String },
    count: { type: Number, default: 0 },
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


module.exports = mongoose.model('counts', countSchema, 'counts');
