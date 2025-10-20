const CryptoJS = require('crypto-js');
const dev = require("../config/dev.json");

module.exports.decrypt = async (payload) => {
  let decryptedData = {};
  if (payload && payload.data) {
    const bytes = CryptoJS.AES.decrypt(payload.data, dev.key);
    const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
    try {
      decryptedData = JSON.parse(decryptedStr);
    } catch (e) {
      decryptedData = decryptedStr;
    }
    return { data: decryptedData };
  } else {
    return { data: {} };
  }
};
