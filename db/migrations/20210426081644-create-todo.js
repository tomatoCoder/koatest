/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2021-04-26 16:16:44
 * @LastEditors: qingyang
 * @LastEditTime: 2021-04-26 16:17:13
 */
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      statusName: {
        type: Sequelize.STRING
      },
      finisher: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Todos');
  }
};