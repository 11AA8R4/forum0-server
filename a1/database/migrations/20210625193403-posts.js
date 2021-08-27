'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('posts', {
      id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
      },
      uid:{
        type:Sequelize.STRING,
        allowNull:false,
      },

      title:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      description:{
        type:Sequelize.STRING,
        allowNull:true,
      },
      comments:{
        type:Sequelize.ARRAY(Sequelize.JSONB),
        allowNull:true,
        defaultValue:[]
      },
      likes:{
        type:Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull:true,
        defaultValue:[]
      },

      created_at:{
        type:Sequelize.DATE,
        allowNull:true
      },
      updated_at:{
        type:Sequelize.DATE,
        allowNull:true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('posts');
  }
};
