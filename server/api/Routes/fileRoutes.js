const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../middleware/fileupload');
const fileController = require('../Controller/fileUpload');

// Set up multer for file handling

router.post('/', upload.single('file'), fileController.createFile);
router.get('/', fileController.getAllFiles);
router.get('/:id', fileController.getFileById);
router.delete('/:id', fileController.deleteFile);
router.get('/download/:id', fileController.downloadFile);

module.exports = router;
