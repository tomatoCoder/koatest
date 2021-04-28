/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2021-04-28 09:44:30
 * @LastEditors: qingyang
 * @LastEditTime: 2021-04-28 13:16:03
 */
module.exports = {
    REDIS_CONF: {
        port: 6379,
        host: '127.0.0.1'
    },
    security: {
        secretKey: "secretKey",
        // 过期时间 1小时
        expiresIn: 60 * 60
    }
}