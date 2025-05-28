const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const Like = require("../../models/likeSchema");

exports.countLikes = catchAsyncError(async (req, res, next) => {
    const { blogId , userId} = req.params;
    
    // Count total likes for this blog
    const likeCount = await Like.countDocuments({ blog: blogId });

    // Check if the current user already liked this blog
    const isLiked = await Like.exists({ blog: blogId, user: userId });


    res.status(200).json({
        success: true,
        likeCount,
        liked: !!isLiked  // true or false
    });
});

exports.totalLikes = catchAsyncError(async (req, res, next) => {
    const { blogId} = req.params;

    // Count total likes for this blog
    const likeCount = await Like.countDocuments({ blog: blogId });

    res.status(200).json({
        success: true,
        likeCount,
    });
});