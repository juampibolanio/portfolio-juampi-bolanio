export const uploadToCloudinary = async (file: File) => {
  const cloudinaryFormData = new FormData();
  cloudinaryFormData.append("file", file);
  cloudinaryFormData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: cloudinaryFormData }
    );
    return await res.json();
  } catch (error) {
    console.error("Error subiendo a Cloudinary:", error);
    throw new Error("No se pudo subir la imagen");
  }
};
