const { catchAsyncError } = require("../../middlewares/catchAsyncError");

exports.getUser = catchAsyncError(
    async (req, res, next) => {
        let user = req?.user;

        res.status(200).json({
            success: true,
            user
        })
    }
)