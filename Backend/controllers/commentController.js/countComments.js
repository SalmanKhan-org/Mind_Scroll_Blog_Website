const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Comment = require("../../models/commentModel");

exports.getcount= catchAsyncError(
    async (req, res, next) => {
        const { blogId: blog } = req.params;


        const count = await Comment.countDocuments({ blog });

        res.status(200).json({
            success: true,
            count
        })
    }
)