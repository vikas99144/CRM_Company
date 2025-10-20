'use strict'

const adminModel = require("../modules/admin/model");
const roleModel = require("../modules/role/model");
const otpModel = require("../modules/otps/model");
const menuModel = require("../modules/acl/model");
const countModel = require("../modules/setting/count.model");

module.exports = {
    adminModel,
    roleModel,
    otpModel,
    countModel,
    menuModel
}