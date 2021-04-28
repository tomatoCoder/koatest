/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2021-04-22 17:36:13
 * @LastEditors: qingyang
 * @LastEditTime: 2021-04-22 17:38:45
 */
const models = require('../db/models')
module.exports = {
    'POST /api/register': async (ctx, next) => {
        const {name, password} = ctx.request.body;
        console.log(name, password);
        // 数据库查找是否存在对象
        let user = await models.User.findOne({
            where: { name} 
        })
        if(user) {
            ctx.response.body = {
                data: {},
                msg: '用户已存在'
            }

        } else {
            user =  await models.User.create({
                name,
                password
            })
            ctx.response.body = {
                data: user,
                msg: '注册成功'
            }
        }
        // if (name === 'koa' && password === '12345') {
        //     ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
        // } else {
        //     ctx.response.body = `<h1>Login failed!</h1>
        //     <p><a href="/">Try again</a></p>`;
        // }
    },

    'POST /login': async (ctx, next) => {
        const {name, password} = ctx.request.body;
        console.log(name, password);
        let user = await models.User.findOne({
            where: { name} 
        })
        if(user) {
            if(user.name == name && user.password == password) {
                ctx.response.body = {
                    data: user,
                    msg: '登录成功'
                }
            } else {
                ctx.response.body = {
                    data: null,
                    msg: '账号或密码错误'
                } 
            } 

        } else {
            ctx.response.body = {
                data: null,
                msg: '账号不存在'
            }
        }
        // if (name === 'koa' && password === '12345') {
        //     ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
        // } else {
        //     ctx.response.body = `<h1>Login failed!</h1>
        //     <p><a href="/">Try again</a></p>`;
        // }
    }
}