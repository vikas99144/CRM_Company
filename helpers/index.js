const bcrypt = require('bcrypt');
const saltRounds = 10;
const Mongoose = require("mongoose");

const getHash = async(password) => {
    return bcrypt.hash(password, saltRounds);
}

const compareHash = async (password, hash) => {
    return bcrypt.compare(password, hash)
}

const count = async (name) => {
    let result = 0;
    let exist = await Mongoose.models.counts.findOne({name: name}).exec();
    if(exist){
      result = await Mongoose.models.counts.findOneAndUpdate({name: name},{$inc:{count: 1}},{new: true}).exec();
    }else{
      result = await Mongoose.models.counts.create({name: name,count: 1});
    }
    return result.count;
}

const generateOTP = (length = 6) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  // return Math.floor(min + Math.random() * (max - min));
  return "123456";
};


exports.count = count;
exports.getHash = getHash;
exports.generateOTP = generateOTP;
exports.compareHash = compareHash;