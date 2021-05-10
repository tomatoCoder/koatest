/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2021-04-22 17:36:13
 * @LastEditors: qingyang
 * @LastEditTime: 2021-05-10 11:24:38
 */
const models = require('../db/models');
const {generateToken} = require('../utils/token')
const {getRedis, setRedis} = require('../utils/_redis')
const bcrypt = require('bcryptjs')
const {ParameterException} = require('../utils/http-exception')
module.exports = {
    'POST /api/register': async (ctx, next) => {
        const {name, password} = ctx.request.body;
        console.log(name, password);
        // 数据库查找是否存在对象
        let user = await models.User.findOne({
            where: { name } 
        })
        if(user) {
            ctx.response.body = {
                code: 10001,
                data: null,
                msg: '用户已存在'
            }

        } else {
            const hash = bcrypt.hashSync(password, 10);
            user =  await models.User.create({
                name,
                password: hash

            })
            ctx.response.body = {
                code: 10000,
                data: user,
                msg: '注册成功'
            }
        }
    },

    'POST /api/login': async (ctx, next) => {
        const {name, password} = ctx.request.body;
        console.log(name, password);
        let user = await models.User.findOne({
            where: { name } 
        })
        if(user) {
            const correct = bcrypt.compareSync(password, user.password);
            if(correct) {
                const token = generateToken(user.id, 'admin')
                ctx.response.body = {
                    code: 10000,
                    data: token,
                    msg: '登录成功'
                }
                setRedis(`Bearer ${token}`, user);
            } else {
                throw new ParameterException('账号或密码错误') // 抛错
            } 

        } else {
            throw new ParameterException('账号不存在') // 抛错
        }
    },
    'GET /api/getUserInfo': async (ctx, next) => {
        console.log(ctx.request)
        // 先从缓存里获取user 
        const token = ctx.request.header.authorization;
        const user = await getRedis(token);
        if(user) {
            ctx.response.body = {
                code: 10000,
                data: user,
                msg: '成功'
            }

        } else {
            ctx.response.body = {
                code: 10001,
                data: null,
                msg: '登录已过期'
            }
        }
    }
}