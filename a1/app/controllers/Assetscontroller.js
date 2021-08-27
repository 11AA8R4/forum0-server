import fs from 'fs'
import path from 'path'

class Assetscontroller{

  //Create services
  async read(req,res){

    const dirs = req.headers.path.split('/')
    console.log('dirs',dirs)
    const mime = {
      // html: 'text/html',
      // txt: 'text/plain',
      // css: 'text/css',
      gif: 'image/gif',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      mp4: 'video/mp4',
      png: 'image/png',
      // svg: 'image/svg+xml',
      // js: 'application/javascript'
    };

    let filePath = path.resolve(__dirname,'..','..','..','assets',...dirs)

    //Get file extension
    Object.keys(mime).map(key=>{
      if(fs.existsSync(filePath+'.'+key)){
        filePath = filePath+'.'+key
      }
    })
    console.log('filePath',filePath)

    //Create Stream
    const type = mime[path.extname(filePath).slice(1)] || 'text/plain';
    const m = fs.cre
    const s = fs.createReadStream(filePath);

    //Upload Stream
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });

  }
}

export default new Assetscontroller()
