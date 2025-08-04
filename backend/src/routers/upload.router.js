import { Router } from "express";
import multer from "multer";
import handler from "express-async-handler";
import { configCloudinary } from "../config/cloudinary.config.js";
import admin from "../middleware/admin.mid.js";

const router = Router();
const upload = multer();

router.post(
  "/",
  admin,
  upload.single("image"),
  handler(async (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    if (!file.mimetype.startsWith("image/")) {
      return res.status(400).json({ error: "File must be an image" });
    }

    try {
      const imageUrl = await uploadImageToCloudinary(file.buffer);
      res.json({ imageUrl });
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  })
);

const uploadImageToCloudinary = (imageBuffer) => {
  return new Promise((resolve, reject) => {
    const cloudinary = configCloudinary();

    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", angle: "exif" },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error("No result from Cloudinary"));
          resolve(result.secure_url);
        }
      )
      .end(imageBuffer);
  });
};

export default router;
