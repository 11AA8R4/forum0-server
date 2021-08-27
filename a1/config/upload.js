import multer from 'multer'
import path from 'path'

export default{
  storage:multer.diskStorage({
    destination:(req,file,cb)=>{
      const temp = path.resolve(__dirname,'..','..','assets','temp')
      cb(null,temp)
    },
    filename:(req,file,cb)=>{
      const randomId = Math.round(Math.random()*999999999999999)
      const ext = path.extname(file.originalname)
      const name = path.basename(file.originalname,ext)
      cb(null,`${name}-${randomId}${ext}`)
    },
    limits:{fileSize: 10000000} // 10 mb
  })
}
