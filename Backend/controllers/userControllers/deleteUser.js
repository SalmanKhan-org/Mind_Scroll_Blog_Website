const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const User = require("../../models/userModel");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.deleteUser = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;
        let user = await User.findById(id);
        if (!user) {
            return next(new ErrorHandler("User Not Found", 404));
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message:"User Deleted Successfully"
        })
    }
)