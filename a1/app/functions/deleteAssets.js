
import path from 'path'
import fs from 'fs'

export default function deleteAssets(folderPath){
  if(fs.existsSync(folderPath)){
    fs.readdirSync(folderPath).forEach((file,index)=>{
      const curPath = path.join(folderPath,file)
      if(fs.lstatSync(curPath).isDirectory()){
        // recurse
        deleteAssets(curPath)
      }else{
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
  console.warn('all assets deleted')
}