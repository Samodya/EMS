const File = require('../Model/File');

// Logic to create a file
exports.createFile = async (file) => {
 try {
    const newFile = new File({
      fileName: file.originalname,
      filePath: file.path,
      fileSize: file.size
    });
    const savedFile = await newFile.save();
    return savedFile;
 } catch (error) {
    //throw error;
    console.log(error)
 }
};

// Logic to get all files
exports.getAllFiles = async (page, limit) => {
   try {
     const skip = (page -  1) * limit;
     const files = await File.find().skip(skip).limit(limit);
     return files;
   } catch (error) {
     throw error;
   }
 };
 

// Logic to get a file by id
exports.getFileById = async (id) => {
 try {
    const file = await File.findById(id);
    return file;
 } catch (error) {
    throw error;
 }
};

// Logic to delete a file
exports.deleteFile = async (id) => {
 try {
    const file = await File.findByIdAndDelete(id);
    return file;
 } catch (error) {
    throw error;
 }
};

