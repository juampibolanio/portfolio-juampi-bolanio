import { CloudinaryException } from "../exceptions/cloudinary-exception";

export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string);

  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      { method: "POST", body: formData }
    );

    if (!res.ok) {
      throw new CloudinaryException("Upload failed");
    }

    return await res.json();
  } catch (error) {
    throw new CloudinaryException("Cloudinary upload error: " + (error as Error).message);
  }
};
