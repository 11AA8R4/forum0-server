import jwt from 'jsonwebtoken'
import {promisify} from 'util'
import User from '../models/User'
import authConfig from '../../config/auth'

class SessionController{

  async auth(req,res){
    console.log('..',req.headers)
    const authHeader = req.headers.token
    if(!authHeader){
      return res.status(401).json({error:'token does not exist'})
    }

    console.log('authHeader.split',authHeader.split(' '))
    const [a,token] = authHeader.split(' ')
    try{
      const decoded = await promisify(jwt.verify)(token,authConfig.secret)
      res.body = 'authorized user'
      console.log('decoded',decoded)
      console.log('res.body',res.body)
      return res.status(200).json('authorized user')
    }catch(err){
      return res.status(401).send('invalid token')
    }
  }

  
  //login
  async store(req,res){
    const {email,password} = req.body

    //Verify if email (user) exists
    const user = await User.findOne({where:{email:email}})
    if(!user){
      return res.status(401).json({error:'unregistered user'})
    }

    //Verify if password incorrect
    if(!(await user.checkPassword(password))){
      return res.status(401).json({error:'incorrect password'})
    }

    const {id,name} = user
    return res.json({
      user:{uid:id,name:name,email:email},
      token:jwt.sign({id},authConfig.secret,{expiresIn:authConfig.expires})
    })
  }

}
export default new SessionController()
