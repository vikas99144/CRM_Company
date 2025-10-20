const CryptoJS = require('crypto-js');
const dev = require("../config/dev.json");

module.exports.encrypt = async (payload) => {
  let data = {}
  if (payload && Object.keys(payload).length) {
    const bodyString =
      typeof payload === 'string'
        ? payload
        : JSON.stringify(payload);

    data = CryptoJS.AES.encrypt(bodyString, dev.key).toString();
    return { data };
  } else {
    return { data: {} };
  }
}



