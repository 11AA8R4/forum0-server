import Sequelize,{Model} from "sequelize"
import bcrypt from 'bcryptjs'

class User extends Model{
  static init(sequelize){
    super.init(
      {
        adm:Sequelize.BOOLEAN,

        name:Sequelize.STRING,
        email:Sequelize.STRING,
        password:Sequelize.VIRTUAL,
        password_hash:Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
    this.addHook('beforeSave',async(user)=>{
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password,8)
      }
    })
    return this
  }
  // static associate(models){
  //   this.belongsTo(models.User,{foreignKey:'uid',as:'owner'})
  // }

  checkPassword(password){
    return bcrypt.compare(password,this.password_hash)
  }
}

export default User
