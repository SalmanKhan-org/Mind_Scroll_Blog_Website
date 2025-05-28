const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Blog = require("../../models/blogSchema");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.getBlogBySlug = catchAsyncError(
    async (req, res, next) => {
        const { slug } = req.params;

        let singleBlog = await Blog.findOne({slug}).populate('category','name').populate('author','name avatar role');
        if (!singleBlog) {
            return next(new ErrorHandler("Blog not Found", 404));
        }

        res.status(200).json({
            success: true,
            singleBlog
        })
    }
)