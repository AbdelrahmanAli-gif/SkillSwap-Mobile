export const uploadImage = async (imageUrl) => {
    const formData = new FormData();
    formData.append("file", {
        uri: imageUrl,
        type: "image/jpeg",
        name: "profile.jpg",
    });
    formData.append("upload_preset", "profile_pics");
    formData.append("folder", "profile_pictures");

    try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dplcc4igl/image/upload", {
            method: "POST",
            body: formData,
        });
        const result = await res.json();

        if (result.secure_url) return result.secure_url;
        else throw new Error("Upload failed");
    } catch (err) {
        console.log("Error uploading image:", err);
    }
}