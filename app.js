/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2021-04-22 13:29:31
 * @LastEditors: qingyang
 * @LastEditTime: 2021-04-22 17:30:26
 */
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const templating = require('./templating');
const contriller = require('./controller');
const isProduction = process.env.NODE_ENV === 'production';
app.use(async (ctx, next) => { 
    console.log(`${ctx.request.method} ${ctx.request.url}`)
    await next(); // 调用下一个middleware
      
})
app.use(bodyParser());
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));


app.use(contriller());
app.listen(3000)