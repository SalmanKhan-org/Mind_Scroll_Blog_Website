const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: "C:/MindScroll/Backend/.env"});

cloudinary.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloud_name: process.env.CLOUD_NAME
})


module.exports = cloudinary;