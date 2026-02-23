/**
 * Cloudinary unsigned upload za slike iz admin panela.
 * U .env dodaj: VITE_CLOUDINARY_CLOUD_NAME i VITE_CLOUDINARY_UPLOAD_PRESET (unsigned preset).
 */

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export async function uploadImageToCloudinary(file: File): Promise<string> {
  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Dodaj VITE_CLOUDINARY_CLOUD_NAME i VITE_CLOUDINARY_UPLOAD_PRESET u .env (unsigned preset u Cloudinary Dashboard)."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errText = await res.text();
    let msg = "Cloudinary upload failed";
    try {
      const errJson = JSON.parse(errText) as { error?: { message?: string } };
      if (errJson?.error?.message) msg = errJson.error.message;
    } catch {
      if (errText) msg = errText;
    }
    console.error("[Cloudinary]", res.status, msg, { preset: uploadPreset, cloudName });
    throw new Error(msg);
  }

  const data = (await res.json()) as { secure_url: string };
  return data.secure_url;
}
