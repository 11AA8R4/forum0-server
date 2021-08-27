import Sequelize,{Model} from "sequelize"
import bcrypt from 'bcryptjs'
import { NUMERIC } from "sequelize"

class Post extends Model{
  static init(sequelize){
    super.init(
      {
        uid:Sequelize.STRING,
        title:Sequelize.STRING,
        description:Sequelize.STRING,
        comments:Sequelize.ARRAY(Sequelize.JSONB),
        likes:Sequelize.ARRAY(Sequelize.INTEGER)
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
