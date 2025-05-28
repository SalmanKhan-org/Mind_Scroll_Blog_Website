const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Comment = require("../../models/commentModel");

exports.createComment = catchAsyncError(async (req, res, next) => {
    const { comment, blogId } = req.body;
    const userId = req.user._id;

    let isExist = await Comment.findOne({ author: userId, blog: blogId });

    if (isExist) {
        isExist = await Comment.findByIdAndUpdate(
            isExist._id,
            { comment },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Comment updated",
            comment: isExist,
        });
    }

    const newComment = await Comment.create({
        comment,
        author: userId,
        blog: blogId,
    });

    res.status(200).json({
        success: true,
        message: "Comment submitted",
        comment: newComment,
    });
});
