const { catchAsyncError } = require("../../middlewares/catchAsyncError");

exports.logout = catchAsyncError(
    async (req, res, next) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });

        res.status(200).json({
            success: true,
            message: "User Logout Successfully"
        })
    }
)