/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2021-04-22 16:44:40
 * @LastEditors: qingyang
 * @LastEditTime: 2021-04-28 10:03:00
 */
module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: 'Welcome'
        });
    },
    'GET /hello': async (ctx, next) => {
        const query = ctx.query;
        console.log(query)
        ctx.response.body = '<span>hello world</span>'
    },
    'GET /register': async (ctx, next) => {
        ctx.render('register.html', {
            title: 'Welcome'
        });
    },
    'GET /upload': async (ctx, next) => {
        ctx.render('upload.html', {
            title: 'Welcome'
        });
    },
    
};