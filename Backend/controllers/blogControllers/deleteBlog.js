const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Blog = require("../../models/blogSchema");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.deleteBlog = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;
        let category = await Blog.findById(id);
        if (!category) {
            return next(new ErrorHandler("Blog Not Found", 404));
        }

        await Blog.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message:"Blog Deleted Successfully"
        })
    }
)