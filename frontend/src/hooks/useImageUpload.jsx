import { uploadImage } from "../util/playerApi";
import { useState } from "react";

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [imgUploadError, setImgUploadError] = useState(null);

  async function handleImgUpload(file) {
    try {
      setIsUploading(true);
      const res = await uploadImage(file);
      return res.imageUrl;
    } catch (error) {
      setImgUploadError("upload fail ", error);
      return null;
    } finally {
      setIsUploading(false);
    }
  }

  return { isUploading, handleImgUpload, imgUploadError };
}
