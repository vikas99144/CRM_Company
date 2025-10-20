'use strict'
const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
    otp: { type: String, required: true },
    otp_for: { type: String, enum:["email","number"], default: "number" },
    is_deleted: { type: Boolean, default: false },
},
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })


module.exports = mongoose.model('otps', otpSchema, 'otps');

