import React, { useState } from "react";

const FileInput = ({ file, setFile, handleSubmit }) => {
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "No file chosen");
    setFile(file);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <input
        type="text"
        value={fileName}
        readOnly
        style={{
          flex: 1,
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      {file == null ? (
        <label className="upload_btn"
          htmlFor="file-upload"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Танлаш
        </label>
      ) : (
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Юбориш
        </button>
      )}
      <input
        id="file-upload"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileInput;
