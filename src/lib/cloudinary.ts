const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export class ImageUploadError extends Error {}

function validateImageFile(file: File): void {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new ImageUploadError("Unsupported file type. Please use JPG, PNG, WEBP, or GIF.");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new ImageUploadError("Image is too large. Maximum size is 10MB.");
  }
}

/**
 * Uploads an image directly from the browser to Cloudinary using an
 * unsigned upload preset (no backend, no API secret in the frontend).
 */
export async function uploadImage(file: File): Promise<string> {
  validateImageFile(file);

  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new ImageUploadError(
      "Image uploads are not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "kirombo-foundation/articles");

  let response: Response;
  try {
    response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new ImageUploadError("Network error while uploading image. Please try again.");
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ImageUploadError(body?.error?.message || "Image upload failed. Please try again.");
  }

  const data = await response.json();
  if (!data?.secure_url) {
    throw new ImageUploadError("Image upload failed: no URL returned.");
  }

  return data.secure_url as string;
}
