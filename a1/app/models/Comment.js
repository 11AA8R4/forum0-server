import Sequelize,{Model} from "sequelize"
import bcrypt from 'bcryptjs'
import { NUMERIC } from "sequelize"

class Post extends Model{
  static init(sequelize){
    super.init(
      {
        uid:Sequelize.STRING,
        comment:Sequelize.STRING
      },
      {
        sequelize,
      }
    )
    return this
  }
  // static associate(models){
  //   this.belongsTo(models.User,{foreignKey:'id',as:'user'})
  // }
}

export default Post
