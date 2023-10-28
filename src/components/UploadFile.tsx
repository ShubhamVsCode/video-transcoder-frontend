"use client";
import axios from "axios";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function UploadFile() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files && event.target.files[0]);
  };

  const getPutObjectURL = async (objectKey: string) => {
    const response = await axios.post("http://localhost:4000/upload/file", {
      objectKey,
    });
    return response.data.url;
  };

  const uploadVideo = async () => {
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    const objectKey = `videos/${selectedFile.name}`; // S3 object key
    const url = await getPutObjectURL(objectKey); // Call the function to get the pre-signed URL

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: selectedFile,
      });

      console.log("Response", await response.json());

      if (response.ok) {
        console.log("Video uploaded successfully!");
      } else {
        console.error("Failed to upload video.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="space-y-4">
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={uploadVideo}>Upload Video</Button>
    </div>
  );
}

export default UploadFile;
