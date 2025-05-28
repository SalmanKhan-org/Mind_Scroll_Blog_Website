const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
   user: {
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



const Like = mongoose.model('Like', likeSchema)
module.exports = Like;