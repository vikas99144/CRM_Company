
'use strict'
const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
    otp: { type: String, required: true },
    country_code: { type: String },
    contact_number: { type: String },
    email: { type: String },
    otp_for: { type: String, enum: ["email", "number"], default: "number" },
    is_deleted: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now, expires: 300 }
},
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })


module.exports = mongoose.model('otps', otpSchema, 'otps');

