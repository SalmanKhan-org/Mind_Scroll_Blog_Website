const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Blog = require("../../models/blogSchema");

exports.getBlogsPerUser = catchAsyncError(
    async (req, res, next) => {
        const user = req.user;
        let allBlogs;
        if (user?.role === 'admin') {
            allBlogs = await Blog.find().populate("author", 'name avatar role').populate("category", 'name').sort({ createdAt: -1 }).lean().exec();
        } else {
            allBlogs = await Blog.find({author:user?._id}).populate("author", 'name avatar role').populate("category", 'name').sort({ createdAt: -1 }).lean().exec();
        }

        res.status(200).json({
            success: true,
            allBlogs
        })
    }
)