import { CloudUpload, RefreshCcw } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

function ImageUploader({ name, value, onChange }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // cleanup
    } else if (typeof value === 'string') {
      setPreview(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      onChange(name, file);
    }
  };

  return (
    <div className="uploader-container">
      <h2 className="sub-title-md mb-md">Product Cover</h2>

      {preview ? (
        <div className="preview-box">
          <img src={preview} alt="Preview" className="preview-image" />
          <button className="change-button" onClick={handleClick}>
            <RefreshCcw size={18} />
          </button>
        </div>
      ) : (
        <div className="upload-box" onClick={handleClick}>
          <CloudUpload size={48} strokeWidth={1.5} />
          <p>Click to upload image</p>
        </div>
      )}

      <input
        type="file"
        name={name}
        ref={fileInputRef}
        className="uploader-input"
        accept="image/*"
        onChange={handleChange}
        hidden
      />
    </div>
  );
}

export default ImageUploader;
