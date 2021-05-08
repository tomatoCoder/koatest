/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2021-05-08 13:05:43
 * @LastEditors: qingyang
 * @LastEditTime: 2021-05-08 15:29:24
 */
const models = require('../db/models');
const {STATUS_OBJ} = require('../utils/contant')
module.exports = {
     // 列表todo 
    'GET /api/todo/list': async (ctx, next) => {
        const {limit, offset} = ctx.query;
        const TodoList =  await models.Todo.findAll({
            limit: parseInt(limit || 10),
            offset: parseInt(offset || 0)
        })
        await TodoList.forEach(async (item) => {
            const user = await models.User.findOne({
                   where: {id: item.finisher}}
            )
            console.log(user)
            item.finisherName = user? user.name: ''
         })
        console.log(TodoList)
        ctx.response.body = {
            code: 10000,
            data: {
                limit: limit || 20,
                list: TodoList
            },
            msg: 'success'
        }
    },
    // 更新todo
    'POST /api/todo/update': async (ctx, next) => {
        const {id, status} = ctx.request.body;
        const statusName = STATUS_OBJ[status]
         const Todo = await models.Todo.update({
             status,
             statusName
            }, {
                where: {id}
            }
         )
        ctx.response.body = {
            code: 10000,
            data: Todo,
            msg: '更新成功'
        }
    },
    // 创建todo
    'POST /api/todo/create': async (ctx, next) => {
        const {name, status, finisher} = ctx.request.body;
        const statusName = STATUS_OBJ[status]
        const Todo =  await models.Todo.create({
            name,
            status,
            statusName,
            finisher

        })
        ctx.response.body = {
            code: 10000,
            data: Todo,
            msg: '创建成功'
        }
    },
    // 删除todo
    'POST /api/todo/del': async (ctx, next) => {
        const {id} = ctx.request.body;
        const Todo =  await models.Todo.destroy({
            where: {
                id
            }
        })
        ctx.response.body = {
            code: 10000,
            data: null,
            msg: '删除成功'
        }
    }
}