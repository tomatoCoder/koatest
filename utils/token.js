/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2021-04-28 09:40:03
 * @LastEditors: qingyang
 * @LastEditTime: 2021-04-28 09:49:40
 */
const jwt = require('jsonwebtoken');
const {security} = require('./config');
const generateToken = (uid, scope) => {
    const secretKey = security.secretKey;
    const expiresIn = security.expiresIn;
    const token = jwt.sign({
        uid,
        scope
    },secretKey, {
        expiresIn 
    })
    console.log(`token is ${token}`)
    return token;
}
module.exports = {
    generateToken
}