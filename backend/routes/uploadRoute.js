import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import config from '../config';

const ACCEPTED_FILE_TYPES = ['video/mp4']; // Thêm định dạng file cho video MP4

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.mp4`); // Thay đổi phần mở rộng của tệp thành .mp4
    },
});


const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (ACCEPTED_FILE_TYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only MP4 videos are allowed.'), false);
        }
    },
});



const router = express.Router();

router.post('/', upload.single('video'), (req, res) => {
    res.send(`/${req.file.path}`);
});

aws.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
});
const s3 = new aws.S3();
const storageS3 = multerS3({
    s3,
    bucket: 'funvideosite-bucket',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Thêm timestamp vào tên file để tránh trùng lặp
    },
});
const uploadS3 = multer({
    storage: storageS3,
    fileFilter: (req, file, cb) => {
        if (ACCEPTED_FILE_TYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only MP4 videos are allowed.'), false);
        }
    },
});
router.post('/s3', uploadS3.single('video'), (req, res) => {
    res.send(req.file.location);
});
export default router;
