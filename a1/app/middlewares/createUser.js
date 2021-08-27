import jwt from 'jsonwebtoken'
import * as Yup from 'yup'
import User from '../models/User'
import deleteTempAssets from '../functions/deleteTempAssets'

export default async (req,res,next)=>{

  const json = JSON.parse(req.body.json)

  //validate if forms are correctly filled
  console.log('json',json)
  const schema = Yup.object().shape({
    name:Yup.string(),
    email:Yup.string().email().required(),
    password:Yup.string().required().min(6),
  })
  if(!(await schema.isValid(json))){
    return res.status(400).json({error:'invalid email or password'})
  }

  //validate if email in use
  const userExists = await User.findOne({where:{email:json.email}})
  if(userExists){
    return res.status(400).json({error:'email in use'})
  }
  next()
}
