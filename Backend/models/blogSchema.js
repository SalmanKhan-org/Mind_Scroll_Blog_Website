const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Categoryr',
        required:true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
   slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    blogContent: {
        type: String,
        required: true,
        trim:true
    },
    image: {
        type: String,
        required: true,
        trim:true
    }
}, { timestamps:true })



const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog;