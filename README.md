<!--
 * @Description: 
 * @Author: qingyang
 * @Date: 2021-05-06 11:12:29
 * @LastEditors: qingyang
 * @LastEditTime: 2021-05-06 13:13:54
-->
# sequelize-cli的使用 
##  安装：
`npm install --save-dev sequelize-cli`
## 初始化：
`mkdir db`
`cd db`
`npx sequelize init`
运行成功后 在db文件夹下将创建以下文件夹:
config, 包含配置文件，它告诉CLI如何连接数据库   这里配置好账号密码
models,包含您的项目的所有模型   
migrations, 包含所有迁移文件
seeders, 包含所有种子文件
## 创建数据库
`npx sequelize db:create`
## 创建模型
`npx sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string`
在 models 文件夹中创建了一个 user 模型文件
在 migrations 文件夹中创建了一个名字像 XXXXXXXXXXXXXX-create-user.js 的迁移文件
## 数据库中实际创建该表
`npx sequelize db:migrate`


## 启动redis
打开cmd 定位到本地redis目录，
`redis-server.exe redis.windows.conf`