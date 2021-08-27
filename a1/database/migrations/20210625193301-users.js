'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
      },
      adm:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
      },
      
      name:{
        type:Sequelize.STRING,
        allowNull:true,
      },
      email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      password_hash:{
        type:Sequelize.STRING,
        allowNull:false,
      },

      created_at:{
        type:Sequelize.DATE,
        allowNull:false
      },
      updated_at:{
        type:Sequelize.DATE,
        allowNull:false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('users');
  }
};
