const multer = require('multer');
const path = require('path');
const diskStorege = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(path.resolve(__dirname,'../'),"photo"));
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const upload = multer({storage:diskStorege});


module.exports = upload;