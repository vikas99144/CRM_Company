'use strict'

const Lang = require("../../locales/en.json");
const controller = require('./controller');


const add = async(request,h)=>{
    try{
        console.log(request.payload,">>>>>>===")
         const result = await controller.add(request.payload);
        return response.successData(h,Lang.DATA_SUCCESS,result);
    }catch(err){
        return response.accessDenied(h,err.message,"signup");
    }
}

const view = async(request,h)=>{
    try{
         const result = await controller.login(request.payload);
         return response.successData(h,Lang.DATA_SUCCESS,result);
    }catch(err){
        return response.accessDenied(h,err.message,"signup");
    }
}

const update = async(request,h)=>{
    try{
         const result = await controller.list(request.payload);
         return response.successData(h,Lang.DATA_SUCCESS,result);
    }catch(err){
        return response.accessDenied(h,err.message,"signup");
    }
}

const encrytdecrypt = async(request,h)=>{
    try{
         const result = await controller.encrytdecrypt(request.payload);
         return response.successData(h,Lang.DATA_SUCCESS,result);
    }catch(err){
        return response.accessDenied(h,err.message,"signup");
    }
}

exports.add = add;
exports.view = view;
exports.update = update;
exports.encrytdecrypt = encrytdecrypt;