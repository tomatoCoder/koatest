/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2021-05-08 13:05:43
 * @LastEditors: qingyang
 * @LastEditTime: 2021-05-10 13:08:49
 */
const models = require('../db/models');
const {STATUS_OBJ} = require('../utils/contant')

// models.Todo.hasOne(models.User, {
//     foreignKey: 'id'
//   })
// as 表示起别名 
// 对于user来说，todo可以很多 所以是todo.belongsTo.user
models.Todo.belongsTo(models.User,{
    as: 'finisherInfo', 
    foreignKey: 'finisher', // finisher是TODO表的外键
    targetKey: 'id'})   // 如果不指定targetKey属性，默认关联关联User表的id
module.exports = {
     // 列表todo 
    'GET /api/todo/list': async (ctx, next) => {
        const {limit, offset} = ctx.query;
        const TodoList =  await models.Todo.findAll({
            limit: parseInt(limit || 10),
            offset: parseInt(offset || 0),
            include: [{ // include关键字表示关联查询
                model: models.User, // 指定关联的model
                as:'finisherInfo', // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
                attributes: ['name'], // 这里的attributes属性表示查询class表的name字段 [['name','className']] 表示起别名
            }]

        })
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
        const statusName = status && STATUS_OBJ[status]
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