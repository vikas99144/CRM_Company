'use strict'

const fs = require('fs')
const appRoot = require('app-root-path')


const logFolderExists = () => {
    try {
        fs.statSync(`${appRoot.path}/logs/`)
        return true
    } catch (err) {
        return false
    }
}

const assetsFolderExists = () => {
    try {
        fs.statSync(`${appRoot.path}/assets/`)
        return true
    } catch (err) {
        return false
    }
}

module.exports.configure = async()=>{
    if (!logFolderExists()) {
        fs.mkdirSync(`${appRoot.path}/logs/`)
        return true
    }
    if (!assetsFolderExists()) {
        fs.mkdirSync(`${appRoot.path}/assets/`)
        return true
    }
    return true
}
