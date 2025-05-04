import { CloudUpload, PenLine, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

function MultiImageUploader({name, value = [], onChange }) {
  const fileInputRef = useRef(null);
  const [previews, setPreviews] = useState([]);

  // Sync preview from value
  useEffect(() => {
    const objectUrls = [];

    const newPreviews = value.map((file) => {
      if (typeof file === 'string') {
        return { id: file, url: file, file: null }; // for URL strings
      } else {
        const url = URL.createObjectURL(file);
        objectUrls.push(url);
        return { id: url, url, file };
      }
    });

    setPreviews(newPreviews);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [value]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const updated = [...value, file];
      onChange(name, updated);
    }
  };

  const handleReplace = (index) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const updated = [...value];
        updated[index] = file;
        onChange(name, updated);
      }
    };

    input.click();
  };

  const handleDelete = (index) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(name, updated);
  };

  return (
    <div className="multi-uploader-container">
      <h2 className="sub-title-md mb-md">Product Images</h2>

      <div className="previews-grid">
        {previews.map((preview, index) => (
          <div key={preview.id} className="preview-box">
            <img
              src={preview.url}
              alt={`Preview ${index + 1}`}
              className="preview-image"
            />
            <button
              className="change-button"
              onClick={() => handleReplace(index)}
              title="Replace"
            >
              <PenLine size={18} />
            </button>
            <button
              className="change-button delete"
              onClick={() => handleDelete(index)}
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        <div className="upload-box" onClick={handleClick}>
          <CloudUpload size={36} strokeWidth={1.5} />
          <p className="upload-label">Upload</p>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        name={name}
        className="uploader-input"
        accept="image/*"
        multiple
        onChange={handleChange}
        hidden
      />
    </div>
  );
}

export default MultiImageUploader;
