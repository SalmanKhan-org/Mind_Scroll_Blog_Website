const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Blog = require("../../models/blogSchema");

exports.search = catchAsyncError(
    async (req, res, next) => {
        const { q } = req.query;

        let blogs = await Blog.find({ title: {$regex:q,$options:'i'} }).populate('category', 'name slug').populate('author', 'name avatar role').lean().exec();

        res.status(200).json({
            success: true,
            blogs
        })
    }
)