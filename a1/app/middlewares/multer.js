import multer from 'multer'
import path from 'path'
import randomId from '../functions/randomId'

// function makeid (length) {
//   var result = ''
//   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   var charactersLength = characters.length
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength))
//   }
//   return result
// }

const temp = path.resolve(__dirname,'..','..','..','assets','temp')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, temp)
  },
  filename: (req, file, cb) => {
    // const fileName = file.originalname.toLowerCase().split(' ').join('-')
    const ext = path.extname(file.originalname)
    const name = path.basename(file.originalname.split('.').shift()+'-'+randomId(16),ext)
    cb(null, name)
  }
})
const upload = multer({
  storage: storage,
  // fileFilter: (req, file, cb) => {
  //   if (file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
  //     cb(null, true)
  //   } else {
  //     cb(null, false)
  //     return cb(new Error('Only .png, .jpg, .mp4 and .jpeg format allowed!'))
  //   }
  // }
})

module.exports.send = (req, res, next) => {
  console.log('   < Started Multer >   ')
  console.log('req type',req.rawHeaders[1].split(';')[0])
  if(req.rawHeaders[1].split(';')[0]==='multipart/form-data'){
    // console.log('multer .body',req.body)
    return upload.any()(req, res, () => {
      // Remember, the middleware will call it's next function
      // so we can inject our controller manually as the next()

      // if (!req.file) return res.json({ error: 'a1: invalid file type' })
      console.log('   < Ended Multer : Body Type >   ')
      next()
    })
  }
  console.log('   < Ended Multer : Headers Type >   ')
  return next()
}
