import { toast } from "react-toastify";
import axios from "axios";

export const uploadImage = async (event) => {
  let toastId = null;

  try {
    const image = await getImage(event);
    if (!image) return null;

    const formData = new FormData();
    formData.append("image", image, image.name);
    
    const response = await axios.post("/api/upload", formData, {
      onUploadProgress: ({ progress }) => {
        if (toastId) toast.update(toastId, { progress });
        else toastId = toast.success("Uploading...", { progress });
      },
    });
    
    toast.dismiss(toastId);
    return response.data.imageUrl;
  } catch (error) {
    toast.dismiss(toastId);
    
    if (error.response?.data?.error) {
      toast.error(error.response.data.error);
    } else if (error.response?.status === 500) {
      toast.error("Upload service error. Please check your configuration.");
    } else {
      toast.error("Failed to upload image. Please try again.");
    }
    
    console.error("Upload error:", error);
    throw error;
  }
};

const getImage = async (event) => {
  const files = event.target.files;

  if (!files || files.length <= 0) {
    toast.warning("Please select an image file!", "File Upload");
    return null;
  }

  const file = files[0];

  // Check if file is an image
  if (!file.type.startsWith('image/')) {
    toast.error("Please select a valid image file (JPG, PNG, GIF)", "File Type Error");
    return null;
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    toast.error("Image size must be less than 10MB", "File Size Error");
    return null;
  }

  return file;
};
