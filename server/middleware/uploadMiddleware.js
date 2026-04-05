import multer from 'multer';


const  upload = multer({  storage:multer.diskStorage({ dest: 'uploads/' }) });

export default upload;
