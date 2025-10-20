'use strict'

const companyyModel = require("../modules/company/model");
const roleModel = require("../modules/role/model");
const otpModel = require("../modules/otps/model");
const menuModel = require("../modules/acl/model");
const countModel = require("../modules/setting/count.model");

module.exports = {
    companyyModel,
    roleModel,
    otpModel,
    countModel,
    menuModel
}