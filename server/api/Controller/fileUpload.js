const fileService = require('../Services/fileUpload_services');

exports.createFile = async (req, res) => {
 try {
    const file = await fileService.createFile(req.file);
    res.json({ url: `http://localhost:4000/uploads/${file.filePath}` });
 } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the file.' });
 }
};

exports.getAllFiles = async (req, res) => {
 try {
    const files = await fileService.getAllFiles();
    res.json(files);
 } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the files.' });

 }
};

exports.getFileById = async (req, res) => {
 try {
    const file = await fileService.getFileById(req.params.id);
    res.json(file);
 } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the file.' });
 }
};

exports.deleteFile = async (req, res) => {
 try {
    const file = await fileService.deleteFile(req.params.id);
    res.json(file);
 } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the file.' });
 }
};

exports.downloadFile = async (req, res) => {
   try {
     const file = await fileService.getFileById(req.params.id);
     if (!file) {
       return res.status(404).json({ message: 'File not found' });
     }
     res.download(file.filePath, file.fileName, (err) => {
       if (err) {
         // Handle error, but keep in mind the response may be partially-sent
         // So check `res.headersSent` if you plan to respond
       } else {
         // decrement a download credit, etc.
       }
     });
   } catch (error) {
     res.status(500).json({ message: 'An error occurred while downloading the file.' });
   }
 };
 
