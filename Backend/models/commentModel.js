const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    
    comment: {
        type: String,
        required: true,
        trim: true
    },
   author: {
       type: mongoose.Schema.ObjectId,
       ref: 'User',
       required:true
    },
    blog: {
        type: mongoose.Schema.ObjectId,
        ref: 'Blog',
        required: true
    }
}, { timestamps:true })



const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment;