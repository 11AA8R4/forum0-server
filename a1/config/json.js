import multer from 'multer'
import path from 'path'

export default{
  storage:multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,path.resolve(__dirname,'..','..','assets','temp'))
    },
    filename:(req,file,cb)=>{
      cb(null,`${Math.random()*90000000000000000000000000}`)
    },
    limits:{fileSize: 1000}
  })
}
