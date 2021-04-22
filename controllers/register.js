/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2021-04-22 17:36:13
 * @LastEditors: qingyang
 * @LastEditTime: 2021-04-22 17:38:45
 */
module.exports = {
    'POST /register': async (ctx, next) => {
        const {name, password} = ctx.request.body;
        console.log(name, password);
        if (name === 'koa' && password === '12345') {
            ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
        } else {
            ctx.response.body = `<h1>Login failed!</h1>
            <p><a href="/">Try again</a></p>`;
        }
    }
}