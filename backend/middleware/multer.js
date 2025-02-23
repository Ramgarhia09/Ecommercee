import multer from 'multer';
// import upload from '../middleware/multer.js'; // Ensure .js is included

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname); // Fixed the syntax here
    }
});

const customUpload = multer({ storage: storage });

export default customUpload;