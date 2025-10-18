// import multer from "multer";
import multer from'multer';
const storage=multer.diskStorage({
    // destination: (req, file, callback) => {
    //     // Specify the directory to save files
    //     callback(null, '../public/my-uploads'); // Make sure 'uploads/' exists or create it
    // },
    filename:function(req, file, callback) {
        callback(null,file.originalname);
    }
})

const upload=multer({storage: storage})

export default upload






