const { catchAsyncError } = require("../../middlewares/catchAsyncError");
const User = require("../../models/userModel");

exports.getAllUsers = catchAsyncError(
    async (req, res, next) => {

        const allUsers = await User.find().sort({ createdAt: -1 }).lean().exec();

        res.status(200).json({
            success: true,
            allUsers
        })
    }
)