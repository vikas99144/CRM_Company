'use strict'
const mongoose = require("mongoose");
const settingSchema = new mongoose.Schema({
    android_version: { type: String },
    ios_version: { type: String },
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


module.exports = mongoose.model('settings', settingSchema, 'settings');

