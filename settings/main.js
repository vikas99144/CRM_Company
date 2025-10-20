
'use strict'

module.exports.configure =  async(server) => {
     await server.route(require('../modules/company/router'));
     await server.route(require('../modules/acl/router'));
     await server.route(require('../modules/role/router'));
     await server.route(require('../modules/setting/router'));
}