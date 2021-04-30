/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2021-04-22 13:29:31
 * @LastEditors: qingyang
 * @LastEditTime: 2021-04-30 15:32:25
 */
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser');
const templating = require('./templating');
const contriller = require('./controller');
const isProduction = process.env.NODE_ENV === 'production';
const xss = require('xss'); // 用来文本转化，预防xss
app.use(async (ctx, next) => { 
    console.log(`${ctx.request.method} ${ctx.request.url}`)
    await next(); // 调用下一个middleware
      
})

// static file support:
if (!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}
app.use(cors())
app.use(bodyParser());
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));


app.use(contriller());
app.listen(3000)