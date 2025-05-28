const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Blog = require("../../models/blogSchema");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.getBlogById = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;

        let blog = await Blog.findById(id).populate('category','name');
        if (!blog) {
            return next(new ErrorHandler("Blog not Found", 404));
        }

        res.status(200).json({
            success: true,
            blog
        })
    }
)