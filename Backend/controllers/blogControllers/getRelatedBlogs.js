const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Blog = require("../../models/blogSchema");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.getRelatedBlogs = catchAsyncError(
    async (req, res, next) => {
        const { category } = req.params;

        let blogs = await Blog.find({ category }).populate('category', 'name slug').populate('author', 'name avatar role').lean().exec();

        res.status(200).json({
            success: true,
            blogs
        })
    }
)