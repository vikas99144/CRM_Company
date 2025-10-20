'use strict'

const controller = require('../controller/index');

const signup = async(request,h)=>{
    try{
        console.log("==== checiking signup service is working ==",request.payload);
         const result = await controller.userRegister(request.payload);
        return response.successData(h,'INTERNAL_SERVER_ERROR',result);
    }catch(err){
        return response.accessDenied(h,err.message,"signup");
    }
}

const login = async(request,h)=>{
    try{
        console.log("==== checiking signup service is working ==",request.payload);
         const result = await controller.login(request.payload);
        return response.successData(h,'INTERNAL_SERVER_ERROR',result);
    }catch(err){
        return response.accessDenied(h,err.message,"signup");
    }
}

const list = async(request,h)=>{
    try{
        console.log("==== checiking signup service is working ==",request.payload,request.user);
         const result = await controller.list(request.payload);
        return response.successData(h,'INTERNAL_SERVER_ERROR',result);
    }catch(err){
        return response.accessDenied(h,err.message,"signup");
    }
}

exports.signup = signup;
exports.login = login;
exports.list = list;