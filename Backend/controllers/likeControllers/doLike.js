const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Like = require("../../models/likeSchema");

exports.doLike = catchAsyncError(
    async (req, res, next) => {
        const user = req.user?._id;
        const { blogId } = req.params;

        let like
        like = await Like.findOne({ user, blog:blogId });

        if (!like) {
            like = await Like.create({user,blog:blogId})
        } else {
            await Like.findByIdAndDelete(like?._id)
        }
        const likeCount = await Like.countDocuments({ blog: blogId });
        res.status(200).json({
            success: true,
            likeCount,
            message:"Blog Liked"
        })
    }
)