const cloudinary = require('./cloudinary');

exports.uploadImageOnCloudinary = async (file) => {
    try {
        const base64 = Buffer.from(file.buffer).toString("base64");
        const dataURI = `data:${file.mimetype};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'mindScroll-mern-blog'
        });

        return result.secure_url;
    } catch (error) {
        throw error;
    }
}