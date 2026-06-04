import { Router, Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

const router = Router();

router.post("/", upload.any(), async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    return res.status(400).json({ success: false, error: "No file provided" });
  }

  try {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const url = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "kirombo-foundation/posts", resource_type: "image" },
          (error, result) => {
            if (error || !result) reject(error ?? new Error("Upload failed"));
            else resolve(result.secure_url);
          }
        );
        stream.end(file.buffer);
      });
      uploadedUrls.push(url);
    }

    // Response format Jodit editor expects
    res.json({
      success: true,
      data: {
        files: uploadedUrls,
        baseurl: "",
        path: "",
      },
    });
  } catch (error) {
    console.error("[POST /upload] Error:", error);
    res.status(500).json({ success: false, error: "Upload failed" });
  }
});

export default router;
