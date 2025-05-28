const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Comment = require("../../models/commentModel");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.deleteComment = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;
        let comment = await Comment.findById(id);
        if (!comment) {
            return next(new ErrorHandler("Comment Not Found", 404));
        }

        await Comment.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message:"Comment Deleted Successfully"
        })
    }
)