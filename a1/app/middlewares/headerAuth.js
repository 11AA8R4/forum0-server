import jwt from 'jsonwebtoken'
import {promisify} from 'util'
import multer from 'multer'
import uploadConfig from '../../config/upload'
import authConfig from '../../config/auth'

const multiPartJson = multer(uploadConfig)

export default async (req,res,next)=>{

  let authToken
  //Read json data
  if(req.headers.token){
    authToken=req.headers.token
    req.path=req.headers.path
  }
  //Read multiPart data
  else{
    multiPartJson.any()
    console.log('req.body.token',req.body.token)
    console.log('req.body',req.body)
    console.log('req.files',req.files)
    authToken=req.body.token
    req.path=req.body.path
    req.itens=req.body.itens
  }

  if(!authToken){
    return res.status(401).json({error:'token does not exist'})
  }

  const [,token] = authToken.split(' ')

  console.log('auth token',token)
  try{
    const decoded = await promisify(jwt.verify)(token,authConfig.secret)
    req.uid = decoded.id
    console.log('decoded id(uid)',decoded)
    return next()
  }catch(err){
    return res.status(401).json({error:'invalid token'})
  }
}
