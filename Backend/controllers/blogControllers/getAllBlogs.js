const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Blog = require("../../models/blogSchema");

exports.getAllBlogs = catchAsyncError(
    async (req, res, next) => {
        
        const allBlogs = await Blog.find().populate("author",'name avatar role').populate("category",'name').sort({createdAt:-1}).lean().exec();

        res.status(200).json({
            success: true,
            allBlogs
        })
    }
)