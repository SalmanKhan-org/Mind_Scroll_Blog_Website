const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Comment = require("../../models/commentModel");

exports.getSingleBlogComments = catchAsyncError(
    async (req, res, next) => {
        const { blogId: blog } = req.params;

        

        const allComments = await Comment.find({ blog }).populate('author', 'name avatar').sort({ createdAt: -1 }).lean().exec();

        res.status(200).json({
            success: true,
            allComments
        })
    }
)