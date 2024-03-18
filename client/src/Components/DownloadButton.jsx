import React from 'react';
import axios from 'axios';

const DownloadButton = ({ filename }) => {
    const handleDownload = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/download/${filename}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            alert('Failed to download file');
        }
    };

    return <button onClick={handleDownload}>Download</button>;
};

export default DownloadButton;
