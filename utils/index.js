'use strict'

const md5 = require('md5')
const Mongoose = require("mongoose");

const ObjectId = (id) => {
    return Mongoose.Types.ObjectId.createFromHexString(id);
}

const hexaId = (id) => {
    return id.toHexaString();
}

const randomToken = (value) => {
    const valueWithTimeStamp = value + Date.now()
    return md5(valueWithTimeStamp)
}

const slugify = (value) => {
   return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}


exports.slugify = slugify;
exports.ObjectId = ObjectId;
exports.hexaId = hexaId;
exports.randomToken = randomToken;