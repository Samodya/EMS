import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCamera } from "react-icons/fa";

export const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [previewSource, setPreviewSource] = useState();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);


  const onFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewSource(URL.createObjectURL(file));
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/files",
        formData
      );
      console.log("File uploaded successfully");
      fetchUploadedFiles(currentPage, itemsPerPage); // Refresh the list after upload
    } catch (error) {
      alert("Failed to upload file");
    }
  };

  const fetchUploadedFiles = async (page, limit) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/files?page=${page}&limit=${limit}`
      );
      const files = response.data.map((file) => ({
        ...file,
        filePath: file.filePath.replace(/\\/g, "/"),
      }));
      setUploadedFiles(files);
    } catch (error) {
      alert("Failed to fetch uploaded files");
    }
  };

  const deleteFile = async (fileId) => {
    try {
        await axios.delete(`http://localhost:4000/api/files/${fileId}`);
        setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
        fetchUploadedFiles();
        alert('File deleted successfully');
    } catch (error) {
        alert('Failed to delete file');
    }
};

  useEffect(() => {
    fetchUploadedFiles(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(uploadedFiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = uploadedFiles.slice(startIndex, endIndex);
  return (
    <div>
      {previewSource ? (
        <img src={previewSource} alt="Preview" className="viewImage" />
      ):""}
      <input type="file" id="file-input" className="file-input" onChange={onFileChange} />
            <label htmlFor="file-input" className=" poppins-semibold">
                <FaCamera/>
            </label>
      <button onClick={onFileUpload}>Upload</button>
      <h3>Uploaded Files</h3>
      <ul>
        {currentItems.map((file, index) => (
          <li key={index}>
            <img className="view_after"
              src={`http://localhost:4000/${file.filePath}`}
              />
              <br/>
              <a href={`http://localhost:4000/api/files/download/${file._id}`}>Download </a> 
              <button onClick={() => deleteFile(file._id)}>Delete</button>
            
            
          </li>
        ))}
      </ul>
      {/* Render pagination controls */}
      <div>
        items per page
        <select
          type="number"
          onChange={(e) => {
            setItemsPerPage(e.target.value);
            fetchUploadedFiles()
          }}
        >
          <option value={itemsPerPage}>{itemsPerPage}</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={25}>25</option>
        </select>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

