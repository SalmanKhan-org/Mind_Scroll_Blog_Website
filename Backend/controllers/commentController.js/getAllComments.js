const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Comment = require("../../models/commentModel");

exports.getAllComments = catchAsyncError(
    async (req, res, next) => {
        const user = req?.user;
        let allComments;
        if (user?.role === 'admin') {
            allComments = await Comment.find().populate('author', 'name avatar').populate("blog", "title").sort({ createdAt: -1 }).lean().exec();
        } else {
            allComments = await Comment.find({author:user?._id}).populate('author', 'name avatar').populate("blog", "title").sort({ createdAt: -1 }).lean().exec();
        }

        res.status(200).json({
            success: true,
            allComments
        })
    }
)