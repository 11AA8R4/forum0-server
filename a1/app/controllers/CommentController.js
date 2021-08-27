import jwt from 'jsonwebtoken'
import * as Yup from 'yup'
import path from 'path'
import _ from 'lodash'
import objectPath from 'object-path'
import fs from 'fs'

import authConfig from '../../config/auth'
import Post from '../models/Post'

class PostController{

  //Craete comment
  async createPost(req,res){
    const json = JSON.parse(req.body.json)
    json.uid = req.uid
    const post = await Post.findByPk(json.pid)
    
    if(post){
      post.comments.push(json.comment)
      post.changed('comments',true)
      await post.save()
    }

    return res.status(200).json(status,json.comment)
  }

  //Delete post
  async delete(req,res){
    // const {pid} = req.params
    const deleted = await Post.destroy({
      where:{
        uid:req.uid
      },
    })

    return res.json(deleted+' users deleted -D')
  }
}

export default new PostController()
