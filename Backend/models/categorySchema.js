const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    
    name: {
        type: String,
        required: true,
        trim: true
    },
   slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { timestamps:true })



const Category = mongoose.model('Categoryr', categorySchema)
module.exports = Category;