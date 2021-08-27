
import path from 'path'
import fs from 'fs'

export default function deleteTempAssets(files){
  const assets = files
  assets.forEach(asset=>{
    fs.unlinkSync(asset.path,path.resolve(__dirname,'..','..','..','assets','temp',asset.originalname))
  })
}