'use strict'


module.exports.TOTAL_COUNT = async (model,matchQuery) => {
    try {
        return await model.aggregate([{$match: matchQuery},{  $group: {_id: null,count: { $sum: 1 }}}]).exec();
    } catch (err) {
         throw new Error(err.message);
    }
}

module.exports.EXIST = async (model,query) => {
    try {
        return await model.findOne(query).lean();
    } catch (err) {
         throw new Error(err.message);
    }
}

module.exports.GET = async (model,aggregate) => {
    try {
        return await model.aggregate(aggregate).exec();
    } catch (err) {
        throw new Error(err.message);
    }
}


module.exports.FILTER = async (model,aggregate) => {
    try {
        return await model.aggregate(aggregate).exec();
    } catch (err) {
         throw new Error(err.message);
    }
}

module.exports.HARD_DELETE = async (model,query) => {
    try {
        return await model.deletOne(query).exec();
    } catch (err) {
         throw new Error(err.message);
    }
}

module.exports.SOFT_DELETE = async (model,query,update) => {
    try {
        return await model.findOneAndUpdate(query,update,{new: true}).exec();
    } catch (err) {
         throw new Error(err.message);
    }
}

module.exports.PUT = async (model,query,update,populateQuery,selection) => {
    try {
        return await model.findOneAndUpdate(query,update,{upsert: true, new: true}).populate(populateQuery).select(selection).exec();
    } catch (err) {
         throw new Error(err.message);
    }
}

module.exports.PATCH = async (model,query,update,populateQuery,selection) => {
    try {
          return await model.findOneAndUpdate(query,update,{new: true}).populate(populateQuery).select(selection).exec();
    } catch (err) {
         throw new Error(err.message);
    }
}

module.exports.CREATE = async (model,payload) => {
    try {
        return await model.create(payload);
    } catch (err) {
          throw new Error(err.message);
    }
}