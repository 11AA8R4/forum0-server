import Sequelize from "sequelize";
import databaseConfig from '../config/database'

import User from '../app/models/User'
import Post from '../app/models/Post'


const models = [User,Post]

class Database{
  constructor(){
    this.init()
  }

  init(){
    // conexão entre banco de dados e models
    this.connection = new Sequelize(databaseConfig)

    models.map(model=>model.init(this.connection))
    .map(model=>model.associate && model.associate(this.connection.models))
  }
}
export default new Database()
