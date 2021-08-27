import jwt from 'jsonwebtoken'
import * as Yup from 'yup'
import path from 'path'
import _ from 'lodash'
import objectPath from 'object-path'
import fs from 'fs'

import authConfig from '../../config/auth'
import User from '../models/User'

class UserController{

  //Read users
  async read(req,res){
    const user = await User.findOne({where:{id:req.uid}})
    console.log('req.body.path',req.body.path)
    const path = req.body.path.split('/')
    const item = _.get(user,path)
    return res.json(item)
  }
  //Craete user
  async createUser(req,res){
    //create user
    const json = JSON.parse(req.body.json)
    const {id,email,name} = await User.create(json)
    console.log(name)

    return res.json({
      token:jwt.sign({id},authConfig.secret,{expiresIn:authConfig.expires}),
      user:{uid:id,name,email}
    })
  }

  //Delete users
  async delete(req,res){
    const {uid} = req.params
    const deleted = await User.destroy({
      where:{},
      // truncate:true
    })

    return res.json(deleted+' users deleted -D')
  }
}

export default new UserController()
