import jwt from 'jsonwebtoken'
import * as Yup from 'yup'
import path from 'path'
import _ from 'lodash'
import objectPath from 'object-path'
import fs from 'fs'

import authConfig from '../../config/auth'
import Post from '../models/Post'
import { Op } from 'sequelize'
import User from '../models/User'

class PostController{

  //Read posts
  async read(req,res){
    const json = JSON.parse(req.body.json)
    let startAt = json.startAt||0
    let pids = json.pids
    console.log('pids',pids)
    let limit = 12
    const posts = await Post.findAndCountAll({
      offset:startAt, //ignores theses matches
      limit:limit-startAt,
      where:{
        id:{[Op.not]:pids},
      },
      order:[['createdAt','desc']]
      
    })
    if(posts.rows) posts.rows.forEach(row=>pids.push(row.id))
    if(posts.count) startAt+posts.count
    return res.json({results:posts.rows,startAt:startAt,pids:pids})
  }

  //Craete post
  async createPost(req,res){
    console.log('req.body.json',req.body.json)
    const json = JSON.parse(req.body.json)
    json.uid = req.uid
    const {title,description} = await Post.create(json)

    console.log('....')
    return res.status(200).json({title,description})
  }

  async like(req,res){
    const {pid} = req.params
    const post = await Post.findByPk(pid)
    if(post){
      console.log('post.likes',post.likes)
      console.log('req.uid',req.uid)
      const foundLike = post.likes.findIndex(found=>(found+'')===(req.uid+''))
      console.log('foundLike',foundLike)
      if(foundLike>=0) post.likes.splice([foundLike],1)
      else post.likes.push(req.uid)

      // post.changed(true)
      post.changed('likes',true)
      await post.save()
      return res.status(200).json({res:!(foundLike>=0)})
    }
    return res.status(200).json({res:'unliked'})
  }

  async comment(req,res){
    const {pid} = req.params
    const post = await Post.findByPk(pid)
    const comment = req.body.json
    if(post){
      const timestamp = new Date().valueOf()
      const user = await User.findByPk(req.uid)
      const commentData = {comment:comment,timestamp:timestamp,uid:req.uid,name:user.name}
      post.comments.push(commentData)

      // post.changed(true)
      post.changed('comments',true)
      await post.save()
      return res.status(200).json(commentData)
    }
    return res.status(200).json({res:'unliked'})
  }

  //Delete users
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
