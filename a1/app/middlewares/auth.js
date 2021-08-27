import jwt from 'jsonwebtoken'
import {promisify} from 'util'
import multer from 'multer'
import uploadConfig from '../../config/upload'
import authConfig from '../../config/auth'

const multiPartJson = multer(uploadConfig)

export default async (req,res,next)=>{
  console.log('   < Stated Auth >   ')

  let authToken
  //Read json data
  if(req.headers.token){
    authToken=req.headers.token
    req.body.token=req.headers.token
    req.body.path=req.headers.path
    req.body.json=req.headers.json
    req.body.assets=req.headers.assets
  }
  //Read multiPart data
  else{
    authToken=req.body.token
  }
  console.log('req.body.token',req.body.token)
  console.log('req.body.path',req.body.path)
  console.log('req.body.json',req.body.json)
  console.log('req.files',req.files)

  if(!authToken){
    return res.status(401).json({error:'token does not exist'})
  }

  const [,token] = authToken.split(' ')

  console.log('auth token',token)
  try{
    const decoded = await promisify(jwt.verify)(token,authConfig.secret)
    req.uid = decoded.id
    console.log('decoded id(uid)',decoded)
    
    console.log('   < Ended Auth >   ')
    return next()
  }catch(err){
    console.log('   < Ended Auth >   ')
    return res.status(401).json({error:'invalid token'})
  }
  
}
