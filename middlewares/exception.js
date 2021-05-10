/*
 * @Description: 全局错误处理
 * @Author: qingyang
 * @Date: 2021-05-10 10:16:17
 * @LastEditors: qingyang
 * @LastEditTime: 2021-05-10 11:22:57
 */
const {HttpException} = require('../utils/http-exception')
const catchError = async (ctx, next) => {
  try {
    await next()
    if (ctx.status === 404) ctx.throw(404);
  } catch (error) {
    const isHttpException = error instanceof HttpException;
    const isProduction = process.env.NODE_ENV === 'production';
    if (!isProduction && !isHttpException) {
      throw error
    }
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.response.status = error.code
    } else {
      ctx.body = {
        msg: "未知错误！",
        code: 9999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.response.status = 500
    }
  }
}

module.exports = catchError
