/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2021-05-11 17:42:59
 * @LastEditors: qingyang
 * @LastEditTime: 2021-05-11 17:44:24
 */
const ws = require("nodejs-websocket")
 
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        console.log("Received "+str)
        conn.sendText(str.toUpperCase()+"!!!")
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });
}).listen(8001)

console.log("WebSocket建立完毕")